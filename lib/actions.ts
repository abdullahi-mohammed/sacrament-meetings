'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  addMeeting,
  deleteMeeting as deleteMeetingFromDb,
  updateMeeting as updateMeetingInDb,
} from '@/lib/meetings-db';
import type {
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from '@/lib/types';

const MeetingFormSchema = z.object({
  date: z.string().min(1, { message: 'Date is required.' }),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], {
    message: 'Select a valid meeting type.',
  }),
  presiding: z.string().trim().min(1, { message: 'Presiding leader is required.' }),
  conducting: z.string().trim().min(1, { message: 'Conducting leader is required.' }),
  announcements: z.string().optional(),
  openingHymnNumber: z.coerce
    .number({ message: 'Opening hymn number must be a number.' })
    .int()
    .positive({ message: 'Opening hymn number must be positive.' }),
  openingHymnTitle: z
    .string()
    .trim()
    .min(1, { message: 'Opening hymn title is required.' }),
  openingPrayer: z.string().trim().min(1, { message: 'Opening prayer is required.' }),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.string().optional(),
  sacramentHymnNumber: z.coerce
    .number({ message: 'Sacrament hymn number must be a number.' })
    .int()
    .positive({ message: 'Sacrament hymn number must be positive.' }),
  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, { message: 'Sacrament hymn title is required.' }),
  speakers: z.string().optional(),
  closingHymnNumber: z.coerce
    .number({ message: 'Closing hymn number must be a number.' })
    .int()
    .positive({ message: 'Closing hymn number must be positive.' }),
  closingHymnTitle: z
    .string()
    .trim()
    .min(1, { message: 'Closing hymn title is required.' }),
  closingPrayer: z.string().trim().min(1, { message: 'Closing prayer is required.' }),
});

export type MeetingFormState = {
  message?: string | null;
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    speakers?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
};

function parseLineList(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseWardBusiness(value: string | undefined): WardBusinessItem[] {
  return parseLineList(value).map((description) => ({ description }));
}

function parseSpeakers(value: string | undefined): SpeakerItem[] {
  return parseLineList(value).map((line) => {
    const [name = '', topic = '', typeRaw = 'speaker'] = line
      .split('|')
      .map((part) => part.trim());
    const type: SpeakerItem['type'] =
      typeRaw === 'musical-number' ? 'musical-number' : 'speaker';
    return { name, topic, type };
  });
}

function formDataToMeeting(
  data: z.infer<typeof MeetingFormSchema>
): Omit<SacramentMeeting, 'id'> {
  return {
    date: data.date,
    meetingType: data.meetingType as MeetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: parseLineList(data.announcements),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: parseWardBusiness(data.wardBusiness),
    stakeBusiness: data.stakeBusiness === 'on' || data.stakeBusiness === 'true',
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: parseSpeakers(data.speakers),
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}

function getRawFormValues(formData: FormData) {
  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.get('announcements') ?? '',
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness') ?? '',
    stakeBusiness: formData.get('stakeBusiness') ?? '',
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    speakers: formData.get('speakers') ?? '',
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  };
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  void prevState;

  const validatedFields = MeetingFormSchema.safeParse(getRawFormValues(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  const meeting = formDataToMeeting(validatedFields.data);

  try {
    await addMeeting(meeting);
  } catch (error) {
    console.error('createMeeting failed:', error);
    throw new Error('Failed to create meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  void prevState;

  const validatedFields = MeetingFormSchema.safeParse(getRawFormValues(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  const meeting = formDataToMeeting(validatedFields.data);

  try {
    const updated = await updateMeetingInDb(id, meeting);
    if (!updated) {
      return { message: 'Meeting not found. Failed to update meeting.' };
    }
  } catch (error) {
    console.error('updateMeeting failed:', error);
    throw new Error('Failed to update meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    const deleted = await deleteMeetingFromDb(id);
    if (!deleted) {
      throw new Error('Meeting not found.');
    }
  } catch (error) {
    console.error('deleteMeeting failed:', error);
    throw new Error('Failed to delete meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
