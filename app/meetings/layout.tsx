import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {/* Meetings Subheader / Breadcrumbs (Hidden in print) */}
      <section className="print:hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/meetings" className="text-zinc-800 dark:text-zinc-200 font-medium hover:text-blue-600 transition-colors">
              Sacrament Meetings
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/meetings/current"
              className="font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4"
            >
              Current Sunday &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Main Meetings Route Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {children}
      </div>
    </div>
  );
}
