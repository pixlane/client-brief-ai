"use client";

export function Header() {
  return (
    <header className="border-b border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="text-lg font-semibold text-zinc-900 dark:text-white"
        >
          Client Brief AI
        </a>
        <a
          href="https://pixlane.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
        >
          by Pixlane Studio
        </a>
      </div>
    </header>
  );
}
