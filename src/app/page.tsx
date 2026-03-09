"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BriefForm } from "@/components/BriefForm";
import { LoadingState } from "@/components/LoadingState";
import { ResultPanel } from "@/components/ResultPanel";
import type { BriefFormData, GeneratedBrief } from "@/lib/types";

type View = "hero" | "form" | "loading" | "result";

export default function Home() {
  const [view, setView] = useState<View>("hero");
  const [brief, setBrief] = useState<GeneratedBrief | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = useCallback(() => {
    setError(null);
    setView("form");
  }, []);

  const handleBack = useCallback(() => {
    setError(null);
    setView("hero");
  }, []);

  const handleSubmit = useCallback(async (data: BriefFormData) => {
    setError(null);
    setView("loading");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        const msg =
          json?.error ?? "Something went wrong. Please try again.";
        setError(msg);
        setView("form");
        return;
      }

      setBrief(json as GeneratedBrief);
      setView("result");

      if (typeof window !== "undefined" && window.localStorage) {
        try {
          localStorage.setItem(
            "client-brief-ai-last",
            JSON.stringify({ data: json, at: Date.now() })
          );
        } catch {
          // ignore
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setView("form");
    }
  }, []);

  const handleStartOver = useCallback(() => {
    setBrief(null);
    setError(null);
    setView("hero");
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        {view === "hero" && <Hero onStart={handleStart} />}
      {view === "form" && (
        <BriefForm
          onSubmit={handleSubmit}
          onBack={handleBack}
          error={error}
        />
      )}
      {view === "loading" && <LoadingState />}
      {view === "result" && brief && (
          <ResultPanel brief={brief} onStartOver={handleStartOver} />
        )}
      </main>
    </>
  );
}
