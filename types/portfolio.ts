// types/portfolio.ts
export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  tech: string[];
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  demoUrl: string;
  codeUrl: string;
};

// types/portfolio.ts

export type Education = {
  school: string;
  degree: string;
  field: string;
  period: string;
  location?: string;
  bullets?: string[];
};