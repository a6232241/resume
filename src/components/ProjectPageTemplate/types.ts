export interface ProjectDetailData {
  hero?: {
    title: string;
    tagline: string;
  };
  overview?: {
    duration: string;
    team: string;
    projectType: string;
    mainTechs: string[];
    platforms: string[];
  };
  motivation?: {
    title: string;
    description: string;
    keyQuestions: string[];
  };
  challenges?: Array<{
    title: string;
    symptom: string;
    rootCause: string;
    impact: string;
  }>;
  solutions?: Array<{
    problem: string;
    approach: string;
    details: string[];
    result: string;
    category: string;
  }>;
  architecture?: {
    title: string;
    layers: Array<{
      name: string;
      responsibilities: string[];
    }>;
  };
  metrics?: {
    accuracy: { title: string; before: string; after: string; improvement: string };
    performance: { title: string; before: string; after: string; improvement: string };
    development: { cpp_reuse_rate: string; timeline: string };
  };
  learnings?: Array<{
    title: string;
    category: string;
    description: string;
  }>;
}
