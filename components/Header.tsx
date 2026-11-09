'use client';

import { useSyncExternalStore, Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';

const emptySubscribe = () => () => {};

function useCurrentDate(): string {
  return useSyncExternalStore(
    emptySubscribe,
    () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    () => ''
  );
}

export default function Header() {
  const currentDate = useCurrentDate();

  return (
    <header className="print:hidden border-b border-zinc-200 bg-white/90 backdrop-blur-sm sticky top-0 z-40 dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-blue-700 dark:text-zinc-100 dark:group-hover:text-blue-400 transition-colors">
              Oak Hills 2nd Ward
            </span>
            <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Sacrament Meeting Planner
            </span>
          </Link>
          <div className="md:hidden text-right">
            <time className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block">
              {currentDate || 'Sunday Service'}
            </time>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4">
          <Suspense fallback={<nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-2" />}>
            <NavLinks />
          </Suspense>
          <div className="hidden md:block pl-4 border-l border-zinc-200 dark:border-zinc-700 text-right">
            <span className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block font-semibold">
              Today
            </span>
            <time className="text-sm font-medium text-zinc-700 dark:text-zinc-300 min-h-[1.25rem] inline-block">
              {currentDate || 'Sunday Service'}
            </time>
          </div>
        </div>
      </div>
    </header>
  );
}
