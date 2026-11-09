import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const numId = Number(id);
  if (Number.isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
    return null;
  }

  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const proto = headersList.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
    const res = await fetch(`${proto}://${host}/api/meetings/${id}`, { cache: 'no-store' });
    if (res.ok) {
      const data: SacramentMeeting = await res.json();
      return data;
    }
  } catch {
    // Fallback to direct in-memory call during prerender or if internal fetch is unavailable
  }

  return getMeetingById(numId);
}

export default async function MeetingDetailPage({ params }: MeetingDetailPageProps) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
