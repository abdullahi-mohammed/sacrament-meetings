import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetingByDate } from '@/lib/meetings-db';

export const instant = false;

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  sunday.setDate(today.getDate() + daysUntilSunday);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  const formattedSunday = `${year}-${month}-${day}`;

  const meeting = await getMeetingByDate(formattedSunday);

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  // Fallback to all meetings if no meeting matches the current Sunday date
  redirect('/meetings');
}
