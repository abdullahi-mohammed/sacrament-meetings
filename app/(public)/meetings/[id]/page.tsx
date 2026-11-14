import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchMeeting(id: string) {
  const numId = Number(id);
  if (Number.isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
    return null;
  }

  return getMeetingById(numId);
}

async function MeetingDetailContent({ params }: MeetingDetailPageProps) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}

export default function MeetingDetailPage({ params }: MeetingDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-3xl mx-auto p-8 animate-pulse space-y-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mx-auto"></div>
          <div className="space-y-4 pt-4">
            <div className="h-10 bg-zinc-100 dark:bg-zinc-800/60 rounded"></div>
            <div className="h-10 bg-zinc-100 dark:bg-zinc-800/60 rounded"></div>
            <div className="h-24 bg-zinc-100 dark:bg-zinc-800/60 rounded"></div>
          </div>
        </div>
      }
    >
      <MeetingDetailContent params={params} />
    </Suspense>
  );
}
