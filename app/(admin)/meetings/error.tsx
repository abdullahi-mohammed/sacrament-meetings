'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function AdminMeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin meetings route error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        We could not complete this meeting action. Try again or return to the
        meetings list.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
