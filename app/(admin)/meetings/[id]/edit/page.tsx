import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

async function EditMeetingContent({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const numId = Number(id);

  if (Number.isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(numId);

  if (!meeting) {
    notFound();
  }

  return <MeetingForm mode="edit" meeting={meeting} />;
}

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Suspense
        fallback={
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 rounded bg-zinc-100 dark:bg-zinc-800/60" />
            <div className="h-10 rounded bg-zinc-100 dark:bg-zinc-800/60" />
            <div className="h-24 rounded bg-zinc-100 dark:bg-zinc-800/60" />
          </div>
        }
      >
        <EditMeetingContent params={params} />
      </Suspense>
    </div>
  );
}
