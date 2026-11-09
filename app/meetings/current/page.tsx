import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); // roll back to most recent Sunday

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  const formattedSunday = `${year}-${month}-${day}`;

  const meetings = getMeetings(formattedSunday);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  // Fallback to all meetings if no meeting matches the current Sunday date
  redirect('/meetings');
}
