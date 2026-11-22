'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import {
  createMeeting,
  updateMeeting,
  type MeetingFormState,
} from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

const initialState: MeetingFormState = {
  message: null,
  errors: {},
};

type MeetingFormProps =
  | { mode: 'create'; meeting?: undefined }
  | { mode: 'edit'; meeting: SacramentMeeting };

function speakersToText(meeting?: SacramentMeeting): string {
  if (!meeting?.speakers?.length) return '';
  return meeting.speakers
    .map((speaker) => {
      const base = `${speaker.name} | ${speaker.topic}`;
      return speaker.type === 'musical-number'
        ? `${base} | musical-number`
        : base;
    })
    .join('\n');
}

function FieldError({
  id,
  messages,
}: {
  id: string;
  messages?: string[];
}) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true" className="min-h-5 mt-1">
      {messages?.map((message) => (
        <p key={message} className="text-sm text-red-600 dark:text-red-400">
          {message}
        </p>
      ))}
    </div>
  );
}

const inputClassName =
  'mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100';

export default function MeetingForm({ mode, meeting }: MeetingFormProps) {
  const boundAction =
    mode === 'edit'
      ? updateMeeting.bind(null, meeting.id)
      : createMeeting;

  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  const title = mode === 'edit' ? 'Edit Meeting' : 'Create Meeting';
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Create Meeting';

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {title}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Enter the order of service details. Required fields are marked.
          </p>
        </div>
        <Link
          href="/meetings"
          className="text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Cancel
        </Link>
      </div>

      {state.message ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Meeting Basics
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={meeting?.date ?? ''}
              aria-describedby="date-error"
              className={inputClassName}
              required
            />
            <FieldError id="date-error" messages={state.errors?.date} />
          </div>

          <div>
            <label htmlFor="meetingType" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Meeting Type
            </label>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={meeting?.meetingType ?? 'regular'}
              aria-describedby="meetingType-error"
              className={inputClassName}
              required
            >
              <option value="regular">Regular</option>
              <option value="testimony">Fast &amp; Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General Conference</option>
              <option value="special">Special</option>
            </select>
            <FieldError id="meetingType-error" messages={state.errors?.meetingType} />
          </div>

          <div>
            <label htmlFor="presiding" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Presiding
            </label>
            <input
              id="presiding"
              name="presiding"
              type="text"
              defaultValue={meeting?.presiding ?? ''}
              aria-describedby="presiding-error"
              className={inputClassName}
              required
            />
            <FieldError id="presiding-error" messages={state.errors?.presiding} />
          </div>

          <div>
            <label htmlFor="conducting" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Conducting
            </label>
            <input
              id="conducting"
              name="conducting"
              type="text"
              defaultValue={meeting?.conducting ?? ''}
              aria-describedby="conducting-error"
              className={inputClassName}
              required
            />
            <FieldError id="conducting-error" messages={state.errors?.conducting} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Hymns &amp; Prayers
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Opening Hymn Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min={1}
              defaultValue={meeting?.openingHymn.number ?? ''}
              aria-describedby="openingHymnNumber-error"
              className={inputClassName}
              required
            />
            <FieldError id="openingHymnNumber-error" messages={state.errors?.openingHymnNumber} />
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              defaultValue={meeting?.openingHymn.title ?? ''}
              aria-describedby="openingHymnTitle-error"
              className={inputClassName}
              required
            />
            <FieldError id="openingHymnTitle-error" messages={state.errors?.openingHymnTitle} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="openingPrayer" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Opening Prayer
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              defaultValue={meeting?.openingPrayer ?? ''}
              aria-describedby="openingPrayer-error"
              className={inputClassName}
              required
            />
            <FieldError id="openingPrayer-error" messages={state.errors?.openingPrayer} />
          </div>

          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Sacrament Hymn Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min={1}
              defaultValue={meeting?.sacramentHymn.number ?? ''}
              aria-describedby="sacramentHymnNumber-error"
              className={inputClassName}
              required
            />
            <FieldError id="sacramentHymnNumber-error" messages={state.errors?.sacramentHymnNumber} />
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              defaultValue={meeting?.sacramentHymn.title ?? ''}
              aria-describedby="sacramentHymnTitle-error"
              className={inputClassName}
              required
            />
            <FieldError id="sacramentHymnTitle-error" messages={state.errors?.sacramentHymnTitle} />
          </div>

          <div>
            <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Closing Hymn Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min={1}
              defaultValue={meeting?.closingHymn.number ?? ''}
              aria-describedby="closingHymnNumber-error"
              className={inputClassName}
              required
            />
            <FieldError id="closingHymnNumber-error" messages={state.errors?.closingHymnNumber} />
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              defaultValue={meeting?.closingHymn.title ?? ''}
              aria-describedby="closingHymnTitle-error"
              className={inputClassName}
              required
            />
            <FieldError id="closingHymnTitle-error" messages={state.errors?.closingHymnTitle} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="closingPrayer" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Closing Prayer
            </label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              defaultValue={meeting?.closingPrayer ?? ''}
              aria-describedby="closingPrayer-error"
              className={inputClassName}
              required
            />
            <FieldError id="closingPrayer-error" messages={state.errors?.closingPrayer} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Program Details
        </legend>

        <div>
          <label htmlFor="speakers" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Speakers &amp; Musical Numbers
          </label>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            One per line: Name | Topic or Name | Topic | musical-number
          </p>
          <textarea
            id="speakers"
            name="speakers"
            rows={4}
            defaultValue={speakersToText(meeting)}
            aria-describedby="speakers-error"
            className={inputClassName}
          />
          <FieldError id="speakers-error" messages={state.errors?.speakers} />
        </div>

        <div>
          <label htmlFor="wardBusiness" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Ward Business
          </label>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            One item per line
          </p>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={
              meeting?.wardBusiness?.map((item) => item.description).join('\n') ?? ''
            }
            aria-describedby="wardBusiness-error"
            className={inputClassName}
          />
          <FieldError id="wardBusiness-error" messages={state.errors?.wardBusiness} />
        </div>

        <div>
          <label htmlFor="announcements" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Announcements
          </label>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            One announcement per line
          </p>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={meeting?.announcements?.join('\n') ?? ''}
            aria-describedby="announcements-error"
            className={inputClassName}
          />
          <FieldError id="announcements-error" messages={state.errors?.announcements} />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            value="on"
            defaultChecked={meeting?.stakeBusiness ?? false}
            aria-describedby="stakeBusiness-error"
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-blue-700 focus:ring-blue-600"
          />
          <div>
            <label htmlFor="stakeBusiness" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Include stake business
            </label>
            <FieldError id="stakeBusiness-error" messages={state.errors?.stakeBusiness} />
          </div>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          {isPending ? 'Saving…' : submitLabel}
        </button>
        <Link
          href="/meetings"
          className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Back to Meetings
        </Link>
      </div>
    </form>
  );
}
