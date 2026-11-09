import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-semibold mb-4">
              <span>Sunday Services at 9:00 AM</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Welcome to the <br className="hidden sm:inline" />
              <span className="text-blue-700 dark:text-blue-400">Oak Hills 2nd Ward</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
              Access weekly sacrament meeting programs, announcements, hymns, and speaker schedules directly from your mobile device or computer.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/meetings/current"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
              >
                This Sunday&apos;s Program &rarr;
              </Link>
              <Link
                href="/meetings"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 font-semibold text-sm sm:text-base border border-zinc-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Browse All Meetings
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-[8/5] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
            <Image
              src="/chapel-hero.svg"
              alt="Oak Hills Ward Chapel Meetinghouse Illustration"
              width={800}
              height={500}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Meeting Planner Features
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Designed for ward members, conducting leaders, and music directors to easily plan and follow along during worship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Real-Time Agendas
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                View complete orders of service with presiding leaders, conducting officers, hymns, prayers, and speaker topics.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Print-Ready Bulletins
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Generate clean, formatted printed programs for ushers and congregation members with a single click.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Current Sunday Auto-Routing
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Direct route <code className="text-xs bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded">/meetings/current</code> automatically redirects to the active week&apos;s sacrament meeting program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
