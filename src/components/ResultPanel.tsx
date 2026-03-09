"use client";

import { useState } from "react";
import type { GeneratedBrief } from "@/lib/types";

function Section({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const normalized = content.replace(/\\n/g, "\n");
  const lines = normalized.split("\n").filter((l) => l.trim());
  const isList =
    lines.length > 1 ||
    lines.some((l) => /^[-•*]\s/.test(l.trim()) || /^\d+\.\s/.test(l.trim()));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900/50">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
        {title}
      </h3>
      <div className="text-zinc-700 dark:text-zinc-300">
        {isList ? (
          <ul className="list-inside list-disc space-y-1">
            {lines.map((line, i) => (
              <li key={i}>{line.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "").trim()}</li>
            ))}
          </ul>
        ) : (
          <p className="whitespace-pre-wrap">{normalized}</p>
        )}
      </div>
    </div>
  );
}

export function ResultPanel({
  brief,
  onStartOver,
}: {
  brief: GeneratedBrief;
  onStartOver: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const fullText = [
    "PROJECT BRIEF",
    "",
    "Project Overview",
    brief.projectOverview,
    "",
    "Recommended Pages",
    brief.recommendedPages.replace(/\\n/g, "\n"),
    "",
    "Recommended Features",
    brief.recommendedFeatures.replace(/\\n/g, "\n"),
    "",
    "Audience Summary",
    brief.audienceSummary,
    "",
    "Design Direction",
    brief.designDirection,
    "",
    "Content Suggestions",
    brief.contentSuggestions.replace(/\\n/g, "\n"),
    "",
    "Estimated Scope",
    brief.estimatedScope,
    "",
    "Suggested Next Steps",
    brief.suggestedNextSteps.replace(/\\n/g, "\n"),
    "",
    "---",
    "Want Pixlane Studio to build this for you?",
    "https://pixlane.com",
  ].join("\n");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = fullText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadAsText = () => {
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-brief.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Your Project Brief
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button
            type="button"
            onClick={downloadAsText}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Download .txt
          </button>
          <button
            type="button"
            onClick={onStartOver}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Start over
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <Section title="Project Overview" content={brief.projectOverview} />
        <Section title="Recommended Pages" content={brief.recommendedPages} />
        <Section title="Recommended Features" content={brief.recommendedFeatures} />
        <Section title="Audience Summary" content={brief.audienceSummary} />
        <Section title="Design Direction" content={brief.designDirection} />
        <Section title="Content Suggestions" content={brief.contentSuggestions} />
        <Section title="Estimated Scope" content={brief.estimatedScope} />
        <Section title="Suggested Next Steps" content={brief.suggestedNextSteps} />
      </div>

      <div className="mt-12 rounded-xl border border-teal-200 bg-teal-50/50 p-6 dark:border-teal-800 dark:bg-teal-900/20">
        <p className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">
          Want Pixlane Studio to build this for you?
        </p>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          We turn briefs like this into polished websites and digital products.
        </p>
        <a
          href="https://pixlane.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400"
        >
          Get in touch →
        </a>
      </div>
    </div>
  );
}
