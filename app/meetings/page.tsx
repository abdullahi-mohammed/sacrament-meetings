import { headers } from 'next/headers';
import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';
import { getMeetings } from '@/lib/meetings-db';
import Link from 'next/link';

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const proto = headersList.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
    const res = await fetch(`${proto}://${host}/api/meetings`, { cache: 'no-store' });
    if (res.ok) {
      const data: SacramentMeeting[] = await res.json();
      return data;
    }
  } catch {
    // Fallback during static build or if direct internal fetch fails
  }
  return getMeetings();
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

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
        <div>
          <Link
            href="/meetings/current"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-blue-700 text-white shadow-sm hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
          >
            Go to This Sunday &rarr;
          </Link>
        </div>
      </div>

      {meetings.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">No meeting agendas found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
}
