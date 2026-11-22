'use client';

import { useFormStatus } from 'react-dom';
import { deleteMeeting } from '@/lib/actions';

function DeleteSubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950/40"
      aria-label={label}
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}

export default function DeleteMeetingButton({
  id,
  meetingLabel,
}: {
  id: number;
  meetingLabel: string;
}) {
  const deleteMeetingWithId = deleteMeeting.bind(null, id);

  return (
    <form action={deleteMeetingWithId}>
      <DeleteSubmitButton label={`Delete meeting for ${meetingLabel}`} />
    </form>
  );
}
