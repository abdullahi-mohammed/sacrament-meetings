import Link from 'next/link';
import type { SacramentMeeting, MeetingType } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export function formatMeetingDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getMeetingTypeLabel(type: MeetingType): { label: string; badgeClass: string } {
  switch (type) {
    case 'testimony':
      return {
        label: 'Fast & Testimony',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      };
    case 'stake':
      return {
        label: 'Stake Business / Conf',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      };
    case 'general':
      return {
        label: 'General Conference',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      };
    case 'regular':
    default:
      return {
        label: 'Regular Meeting',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      };
  }
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const { label, badgeClass } = getMeetingTypeLabel(meeting.meetingType);
  const formattedDate = formatMeetingDate(meeting.date);

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-600 transition-all">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${badgeClass}`}>
              {label}
            </span>
            <h3 className="mt-2 text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {formattedDate}
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            #{meeting.id}
          </span>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400 my-4 border-t border-b border-zinc-100 dark:border-zinc-800/80 py-3">
          <div>
            <dt className="text-xs uppercase font-medium text-zinc-400 dark:text-zinc-500">Presiding</dt>
            <dd className="font-medium text-zinc-800 dark:text-zinc-200">{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase font-medium text-zinc-400 dark:text-zinc-500">Conducting</dt>
            <dd className="font-medium text-zinc-800 dark:text-zinc-200">{meeting.conducting}</dd>
          </div>
        </dl>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400 block mb-1">
              Music Highlights
            </span>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
              <span className="font-medium">Opening:</span> #{meeting.openingHymn.number} &ldquo;{meeting.openingHymn.title}&rdquo;
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
              <span className="font-medium">Sacrament:</span> #{meeting.sacramentHymn.number} &ldquo;{meeting.sacramentHymn.title}&rdquo;
            </p>
          </div>

          {meeting.speakers && meeting.speakers.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400 block mb-1">
                Speakers &amp; Music
              </span>
              <ul className="space-y-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                {meeting.speakers.map((sp, idx) => (
                  <li key={idx} className="truncate">
                    &bull; <span className="font-medium text-zinc-800 dark:text-zinc-200">{sp.name}</span>
                    {sp.topic ? ` &mdash; ${sp.topic}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {meeting.announcements?.length ? `${meeting.announcements.length} announcements` : 'No announcements'}
        </span>
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus-visible:underline"
          aria-label={`View full program for ${formattedDate}`}
        >
          View Program
          <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
