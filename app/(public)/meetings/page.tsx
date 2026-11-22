import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import Link from 'next/link';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';

async function MeetingsList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  if (meetings.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-zinc-500 dark:text-zinc-400">No meeting agendas found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Math.max(1, Number(searchParams?.page) || 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Sacrament Meeting Bulletins
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Select a meeting below to view or print the full order of service and announcements.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <MeetingSearch />
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Link
              href="/meetings/new"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg border border-blue-700 text-blue-700 shadow-sm hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-950/40 transition-colors"
            >
              Create Meeting
            </Link>
            <Link
              href="/meetings/current"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-blue-700 text-white shadow-sm hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
            >
              Go to This Sunday &rarr;
            </Link>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-64"
              />
            ))}
          </div>
        }
      >
        <MeetingsList query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
