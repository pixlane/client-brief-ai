import type { BriefFormData, GeneratedBrief } from "./types";

export function generateDemoBrief(data: BriefFormData): GeneratedBrief {
  return {
    projectOverview: `${data.businessName} is a ${data.businessType} building a ${data.websiteType}. The primary goal is to ${data.mainGoal}. This project targets ${data.targetAudience}.`,
    recommendedPages: `- Home\n- About\n- Services / Products\n- Contact\n- FAQ`,
    recommendedFeatures: `- Contact form\n- Responsive design\n- Clear call-to-action sections\n- SEO optimization`,
    audienceSummary: `Primary audience: ${data.targetAudience}. The design and content should speak directly to their needs and pain points.`,
    designDirection: `Visual style: ${data.visualStyle || "Modern, clean, professional"}. The tone should align with the brand and resonate with the target audience.`,
    contentSuggestions: `- Clear value proposition on the homepage\n- Case studies or testimonials\n- FAQ section addressing common questions\n- Strong CTAs throughout`,
    estimatedScope: `Based on ${data.budgetRange || "the stated budget"} and ${data.timeline || "timeline"}, this project can be scoped appropriately.`,
    suggestedNextSteps: `- Finalize content strategy\n- Create wireframes\n- Design mockups\n- Development and QA\n- Launch and iterate`,
  };
}
