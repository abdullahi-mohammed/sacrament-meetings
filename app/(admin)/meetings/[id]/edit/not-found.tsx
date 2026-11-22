import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <div className="mx-auto my-12 max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Meeting not found
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The meeting you tried to edit does not exist or may have been removed.
      </p>
      <Link
        href="/meetings"
        className="mt-6 inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
      >
        Back to Meetings
      </Link>
    </div>
  );
}
