export interface BriefFormData {
  businessName: string;
  businessType: string;
  websiteType: string;
  targetAudience: string;
  mainGoal: string;
  desiredPages: string;
  keyFeatures: string;
  visualStyle: string;
  budgetRange: string;
  timeline: string;
  extraNotes: string;
}

export interface GeneratedBrief {
  projectOverview: string;
  recommendedPages: string;
  recommendedFeatures: string;
  audienceSummary: string;
  designDirection: string;
  contentSuggestions: string;
  estimatedScope: string;
  suggestedNextSteps: string;
}
