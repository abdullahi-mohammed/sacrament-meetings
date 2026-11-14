import Link from 'next/link';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="print:hidden mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Oak Hills 2nd Ward
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Sacrament Meeting is held every Sunday at 9:00 AM. Visitors and members are always warmly welcome.
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Meetinghouse: 1250 Oak Hills Drive, Rexburg, ID
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/meetings"
                  className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                >
                  All Meetings & Bulletins
                </Link>
              </li>
              <li>
                <Link
                  href="/meetings/current"
                  className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                >
                  This Sunday&apos;s Program
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Planner Purpose
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Organized to assist bishoprics, music coordinators, and ward members in accessing sacrament meeting agendas and bulletins digitally.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2">
          <p>&copy; {currentYear} Oak Hills 2nd Ward. WDD 430 Project.</p>
          <p>Built with Next.js App Router &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
