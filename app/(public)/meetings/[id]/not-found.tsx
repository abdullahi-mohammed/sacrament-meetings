import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="max-w-xl mx-auto my-12 text-center p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Meeting Not Found
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The sacrament meeting agenda you requested does not exist or may have been removed.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/meetings"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
        >
          Browse All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          View Current Sunday
        </Link>
      </div>
    </div>
  );
}
