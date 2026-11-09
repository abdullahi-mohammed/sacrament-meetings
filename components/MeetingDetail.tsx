'use client';

import Link from 'next/link';
import type { SacramentMeeting, MeetingType } from '@/lib/types';
import { formatMeetingDate } from './MeetingCard';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function getMeetingTypeTitle(type: MeetingType): string {
  switch (type) {
    case 'testimony':
      return 'Fast & Testimony Meeting';
    case 'stake':
      return 'Stake Conference / Business';
    case 'general':
      return 'General Conference Session';
    case 'regular':
    default:
      return 'Sacrament Meeting';
  }
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = formatMeetingDate(meeting.date);
  const meetingTitle = getMeetingTypeTitle(meeting.meetingType);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Top action bar - Hidden when printing */}
      <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/meetings"
          className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <span aria-hidden="true" className="mr-1.5">&larr;</span> Back to All Meetings
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-700 text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer transition-colors"
            aria-label="Print this sacrament meeting program"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Program
          </button>
        </div>
      </div>

      {/* Program Bulletin Card - Styled for screen and optimized for paper print */}
      <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 sm:p-10 print:border-none print:shadow-none print:p-0 print:text-black print:bg-transparent">
        {/* Header / Ward Information */}
        <header className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6 print:border-zinc-400">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-blue-700 dark:text-blue-400 print:text-zinc-600">
            The Church of Jesus Christ of Latter-day Saints
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100 print:text-black">
            Oak Hills 2nd Ward
          </h1>
          <p className="mt-1 text-lg font-medium text-zinc-700 dark:text-zinc-300 print:text-zinc-800">
            {meetingTitle}
          </p>
          <time className="mt-1 block text-sm text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
            {formattedDate}
          </time>
        </header>

        {/* Presiding and Conducting Leaders */}
        <section aria-label="Presiding and Conducting Officers" className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 print:bg-transparent print:border-none print:p-0">
          <div>
            <span className="font-semibold text-zinc-500 dark:text-zinc-400 block text-xs uppercase tracking-wider print:text-zinc-600">
              Presiding
            </span>
            <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 print:text-black">
              {meeting.presiding}
            </span>
          </div>
          <div>
            <span className="font-semibold text-zinc-500 dark:text-zinc-400 block text-xs uppercase tracking-wider print:text-zinc-600">
              Conducting
            </span>
            <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 print:text-black">
              {meeting.conducting}
            </span>
          </div>
        </section>

        {/* Order of Service / Agenda */}
        <section aria-label="Order of Service" className="space-y-4">
          <h2 className="text-base font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-2 print:border-zinc-300 print:text-black">
            Order of Service
          </h2>

          <div className="space-y-3.5 text-sm sm:text-base">
            {/* Opening Hymn */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60 print:border-zinc-200 gap-1">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 print:text-zinc-800">Opening Hymn</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black sm:text-right">
                #{meeting.openingHymn.number} &ldquo;{meeting.openingHymn.title}&rdquo;
              </span>
            </div>

            {/* Opening Prayer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60 print:border-zinc-200 gap-1">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 print:text-zinc-800">Invocation</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black sm:text-right">
                {meeting.openingPrayer}
              </span>
            </div>

            {/* Ward Business */}
            <div className="py-2 border-b border-zinc-100 dark:border-zinc-800/60 print:border-zinc-200">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span className="font-medium text-zinc-700 dark:text-zinc-300 print:text-zinc-800">Ward Business</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 print:text-zinc-600 sm:text-right">
                  Conducted by Bishopric
                </span>
              </div>
              {meeting.wardBusiness && meeting.wardBusiness.length > 0 ? (
                <ul className="mt-1.5 ml-4 list-disc space-y-1 text-sm text-zinc-800 dark:text-zinc-200 print:text-black">
                  {meeting.wardBusiness.map((item, idx) => (
                    <li key={idx}>{item.description}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs sm:text-sm italic text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                  No ward business scheduled
                </p>
              )}
              {meeting.stakeBusiness && (
                <p className="mt-1.5 text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-400 print:text-black">
                  * Stake Business conducted today
                </p>
              )}
            </div>

            {/* Sacrament Hymn */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60 print:border-zinc-200 gap-1">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 print:text-zinc-800">Sacrament Hymn</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black sm:text-right">
                #{meeting.sacramentHymn.number} &ldquo;{meeting.sacramentHymn.title}&rdquo;
              </span>
            </div>

            {/* Administration of the Sacrament */}
            <div className="text-center py-2.5 bg-blue-50/50 dark:bg-zinc-800/30 rounded-lg print:bg-transparent print:py-1">
              <span className="text-xs sm:text-sm italic font-medium text-zinc-600 dark:text-zinc-400 print:text-zinc-700">
                Administration of the Sacrament by the Priesthood
              </span>
            </div>

            {/* Speakers and Musical Items */}
            <div className="py-2 border-b border-zinc-100 dark:border-zinc-800/60 print:border-zinc-200">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 print:text-zinc-800 block mb-2">
                Speakers &amp; Musical Numbers
              </span>

              {meeting.speakers && meeting.speakers.length > 0 ? (
                <div className="space-y-3">
                  {meeting.speakers.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between pl-3 border-l-2 border-blue-400 dark:border-blue-600 print:border-zinc-400 py-1"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black">
                            {item.name}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              item.type === 'musical-number'
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 print:border print:border-zinc-300'
                                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 print:border print:border-zinc-300'
                            }`}
                          >
                            {item.type === 'musical-number' ? 'Musical Number' : 'Speaker'}
                          </span>
                        </div>
                        {item.topic && (
                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 print:text-zinc-700 mt-0.5">
                            Topic: {item.topic}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm italic text-zinc-500 dark:text-zinc-400">
                  Open for bearing of testimonies by the congregation.
                </p>
              )}
            </div>

            {/* Closing Hymn */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60 print:border-zinc-200 gap-1">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 print:text-zinc-800">Closing Hymn</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black sm:text-right">
                #{meeting.closingHymn.number} &ldquo;{meeting.closingHymn.title}&rdquo;
              </span>
            </div>

            {/* Closing Prayer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 gap-1">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 print:text-zinc-800">Benediction</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black sm:text-right">
                {meeting.closingPrayer}
              </span>
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        {meeting.announcements && meeting.announcements.length > 0 && (
          <section aria-label="Ward Announcements" className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 print:border-zinc-300">
            <h2 className="text-base font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-3 print:text-black">
              Ward Announcements
            </h2>
            <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300 print:text-black list-disc ml-5">
              {meeting.announcements.map((announcement, idx) => (
                <li key={idx}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
