export default function MeetingsLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full max-w-6xl mx-auto space-y-6 animate-pulse"
    >
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-2"></div>
          <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md hidden sm:block"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
              <div className="h-3 w-8 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
            <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>
            <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading meeting agendas...</span>
    </div>
  );
}
