"use client";

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-20 text-center">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6, 182, 212, 0.08), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(34, 211, 238, 0.05), transparent)",
        }}
      />
      <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
        Client Brief AI
      </h1>
      <p className="mb-2 max-w-xl text-xl text-zinc-600 dark:text-zinc-400">
        Generate a clear website or product brief in minutes.
      </p>
      <p className="mb-12 max-w-lg text-base text-zinc-500 dark:text-zinc-500">
        Describe your business, goals, and needs. Get an AI-generated brief you
        can use to plan your next website or digital product.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="rounded-lg bg-teal-600 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:hover:bg-teal-400 dark:focus:ring-teal-400"
      >
        Start Brief
      </button>
    </section>
  );
}
