"use client";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 py-20">
      <div
        className="h-12 w-12 animate-spin rounded-full border-2 border-teal-500/30 border-t-teal-500"
        aria-hidden
      />
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        Generating your brief...
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">
        This usually takes 10–20 seconds.
      </p>
    </div>
  );
}
