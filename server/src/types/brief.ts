// Types partagés entre client et serveur
export interface BriefData {
  companyName: string;
  email: string;
  sector: string;
  companyDescription: string;
  logo: any;
  brandGuidelines: any;
  productPhotos: any[];
  currentSocialNetworks: string[];
  socialMediaGoals: string[];
  contentTypes: string[];
  communicationStyle: string;
  targetAudience: {
    demographic: string[];
    professional: string[];
    behavioral: string[];
    geographic: string[];
  };
  uniqueSellingPoints: string;
  customerBenefits: string;
  audienceNeeds: string;
  productSolution: string;
  competitors: string;
  competitorStrategies: string[];
  successMetrics: string[];
  roiExpectations: string[];
  specificThemes: string;
  additionalInfo: string;
  legalConstraints: {
    regulations: string[];
    compliance: string[];
    disclaimers: string[];
  };
  budget: {
    totalBudget: string;
    allocation: Record<string, number>;
    constraints: string[];
  };
  resources: {
    internalTeam: string[];
    externalPartners: string[];
    tools: string[];
  };
  previousCampaigns: {
    name: string;
    period: string;
    results: string[];
    learnings: string[];
  }[];
  competitiveAnalysis: {
    directCompetitors: {
      name: string;
      strengths: string[];
      weaknesses: string[];
      strategies: string[];
    }[];
    marketPosition: string;
    differentiators: string[];
    opportunities: string[];
  };
}
