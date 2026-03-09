import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildBriefPrompt } from "@/lib/prompt";
import { generateDemoBrief } from "@/lib/demo-brief";
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

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      const brief = generateDemoBrief(body);
      return NextResponse.json(brief);
    }

    const prompt = buildBriefPrompt(body);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const fullPrompt = `You return only valid JSON. No markdown, no explanation, no code blocks.\n\n${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const content = response.text();

    if (!content) {
      const brief = generateDemoBrief(body);
      return NextResponse.json(brief);
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
