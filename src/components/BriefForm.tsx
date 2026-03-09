"use client";

import { useState } from "react";
import type { BriefFormData } from "@/lib/types";
import {
  FORM_STEPS,
  BUSINESS_TYPES,
  WEBSITE_TYPES,
  BUDGET_RANGES,
  REQUIRED_BY_BACKEND,
  REQUIRED_PER_STEP,
} from "@/lib/constants";

const INITIAL_DATA: BriefFormData = {
  businessName: "",
  businessType: "",
  websiteType: "",
  targetAudience: "",
  mainGoal: "",
  desiredPages: "",
  keyFeatures: "",
  visualStyle: "",
  budgetRange: "",
  timeline: "",
  extraNotes: "",
};

function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "textarea";
}) {
  const base =
    "mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400";

  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={base}
        />
      )}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-900 transition-colors focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-teal-400 dark:focus:ring-teal-400"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export function BriefForm({
  onSubmit,
  onBack,
  error,
}: {
  onSubmit: (data: BriefFormData) => void;
  onBack: () => void;
  error: string | null;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BriefFormData>(INITIAL_DATA);
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentStep = FORM_STEPS[step];
  const isLast = step === FORM_STEPS.length - 1;
  const fields = currentStep.fields as readonly (keyof BriefFormData)[];

  const update = (key: keyof BriefFormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setValidationError(null);
  };

  const validateCurrentStep = (): boolean => {
    const requiredForStep = REQUIRED_PER_STEP[step] ?? [];
    for (const f of requiredForStep) {
      const v = data[f as keyof BriefFormData];
      if (!v || String(v).trim() === "") return false;
    }
    return true;
  };

  const validateAllRequired = (): boolean => {
    for (const f of REQUIRED_BY_BACKEND) {
      const v = data[f];
      if (!v || String(v).trim() === "") return false;
    }
    return true;
  };

  const handleNext = () => {
    if (isLast) {
      setValidationError(null);
      if (!validateAllRequired()) {
        setValidationError("Please complete all required fields from earlier steps.");
        return;
      }
      onSubmit(data);
    } else {
      if (!validateCurrentStep()) return;
      setValidationError(null);
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (step === 0) onBack();
    else setStep((s) => s - 1);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-10">
        <button
          type="button"
          onClick={handlePrev}
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400 dark:hover:text-zinc-300"
        >
          ← Back
        </button>
      </div>

      <div className="mb-8">
        <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
          Step {step + 1} of {FORM_STEPS.length}
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">
          {currentStep.title}
        </h2>
      </div>

      <div className="space-y-6">
        {fields.includes("businessName") && (
          <Input
            label="Business name"
            value={data.businessName}
            onChange={(v) => update("businessName", v)}
            placeholder="e.g. Acme Inc."
            required
          />
        )}
        {fields.includes("businessType") && (
          <Select
            label="Business type / industry"
            value={data.businessType}
            onChange={(v) => update("businessType", v)}
            options={BUSINESS_TYPES}
            required
          />
        )}
        {fields.includes("websiteType") && (
          <Select
            label="Website or product type"
            value={data.websiteType}
            onChange={(v) => update("websiteType", v)}
            options={WEBSITE_TYPES}
            required
          />
        )}
        {fields.includes("targetAudience") && (
          <Input
            label="Target audience"
            value={data.targetAudience}
            onChange={(v) => update("targetAudience", v)}
            placeholder="e.g. Small business owners, 25-45"
            required
          />
        )}
        {fields.includes("mainGoal") && (
          <Input
            label="Main goal of the website/product"
            value={data.mainGoal}
            onChange={(v) => update("mainGoal", v)}
            placeholder="e.g. Generate leads, sell products"
            required
          />
        )}
        {fields.includes("desiredPages") && (
          <Input
            label="Desired pages"
            value={data.desiredPages}
            onChange={(v) => update("desiredPages", v)}
            placeholder="e.g. Home, About, Services, Contact"
          />
        )}
        {fields.includes("keyFeatures") && (
          <Input
            label="Key features"
            value={data.keyFeatures}
            onChange={(v) => update("keyFeatures", v)}
            placeholder="e.g. Contact form, blog, portfolio"
            type="textarea"
          />
        )}
        {fields.includes("visualStyle") && (
          <Input
            label="Visual style / tone"
            value={data.visualStyle}
            onChange={(v) => update("visualStyle", v)}
            placeholder="e.g. Modern, minimal, professional"
          />
        )}
        {fields.includes("budgetRange") && (
          <Select
            label="Budget range"
            value={data.budgetRange}
            onChange={(v) => update("budgetRange", v)}
            options={BUDGET_RANGES}
          />
        )}
        {fields.includes("timeline") && (
          <Input
            label="Timeline"
            value={data.timeline}
            onChange={(v) => update("timeline", v)}
            placeholder="e.g. 2-3 months, ASAP"
          />
        )}
        {fields.includes("extraNotes") && (
          <Input
            label="Extra notes"
            value={data.extraNotes}
            onChange={(v) => update("extraNotes", v)}
            placeholder="Anything else we should know"
            type="textarea"
          />
        )}
      </div>

      {(validationError || error) && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {validationError ?? error}
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="rounded-lg bg-teal-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:hover:bg-teal-400 dark:focus:ring-teal-400"
        >
          {isLast ? "Generate Brief" : "Continue"}
        </button>
      </div>
    </div>
  );
}
