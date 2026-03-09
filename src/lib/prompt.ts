import type { BriefFormData } from "./types";

export function buildBriefPrompt(data: BriefFormData): string {
  return `You are an expert project strategist helping create clear, actionable briefs for website and digital product projects.

Generate a structured project brief based on the following client input. Return ONLY valid JSON with these exact keys (no markdown, no code blocks):
- projectOverview (2-3 sentences summarizing the project)
- recommendedPages (bullet list as a single string, newlines as \\n)
- recommendedFeatures (bullet list as a single string, newlines as \\n)
- audienceSummary (2-3 sentences about target audience)
- designDirection (2-3 sentences on visual style and tone)
- contentSuggestions (bullet list as a single string, newlines as \\n)
- estimatedScope (1-2 sentences on project scope)
- suggestedNextSteps (bullet list as a single string, newlines as \\n)

Client input:
- Business name: ${data.businessName}
- Business type: ${data.businessType}
- Website/product type: ${data.websiteType}
- Target audience: ${data.targetAudience}
- Main goal: ${data.mainGoal}
- Desired pages: ${data.desiredPages}
- Key features: ${data.keyFeatures}
- Visual style / tone: ${data.visualStyle}
- Budget range: ${data.budgetRange}
- Timeline: ${data.timeline}
- Extra notes: ${data.extraNotes || "None"}

Be concise, professional, and actionable. Tailor recommendations to the budget and timeline where appropriate.`;
}
