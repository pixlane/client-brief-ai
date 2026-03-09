import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildBriefPrompt } from "@/lib/prompt";
import type { BriefFormData, GeneratedBrief } from "@/lib/types";

function parseBriefResponse(text: string): GeneratedBrief {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
  const parsed = JSON.parse(cleaned) as Record<string, string>;

  return {
    projectOverview: parsed.projectOverview ?? "",
    recommendedPages: parsed.recommendedPages ?? "",
    recommendedFeatures: parsed.recommendedFeatures ?? "",
    audienceSummary: parsed.audienceSummary ?? "",
    designDirection: parsed.designDirection ?? "",
    contentSuggestions: parsed.contentSuggestions ?? "",
    estimatedScope: parsed.estimatedScope ?? "",
    suggestedNextSteps: parsed.suggestedNextSteps ?? "",
  };
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as BriefFormData;

    const required = [
      "businessName",
      "businessType",
      "websiteType",
      "targetAudience",
      "mainGoal",
    ] as const;

    for (const key of required) {
      const val = body[key];
      if (!val || typeof val !== "string" || val.trim().length === 0) {
        return NextResponse.json(
          { error: `Missing or empty required field: ${key}` },
          { status: 400 }
        );
      }
    }

    const prompt = buildBriefPrompt(body);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You return only valid JSON. No markdown, no explanation, no code blocks.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const brief = parseBriefResponse(content);
    return NextResponse.json(brief);
  } catch (err) {
    console.error("Generate brief error:", err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Could not parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
