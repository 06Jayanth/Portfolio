export interface PersonalInfo {
  name: string;
  title: string;
  shortBio: string;
  fullBio?: string;
  designPhilosophy: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  figma: string;
  twitter?: string;
  dribbble?: string;
  behance?: string;
  location: string;
  status: string;
  experienceYears: string;
  stats: { label: string; value: string }[];
  resumePdfUrl?: string;
  resumePdfFileName?: string;
  resumePdfSize?: string;
  resumePdfUpdatedAt?: string;
}

export interface TargetUser {
  persona: string;
  role: string;
  quote: string;
  painPoints: string[];
}

export interface UserFlowStep {
  step: string;
  action: string;
  screen: string;
  description: string;
}

export interface DesignDecision {
  title: string;
  description: string;
  impact: string;
}

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface ProjectScreen {
  title: string;
  desc: string;
  image?: string;
  type: 'mobile' | 'desktop';
  tags: string[];
  aspect?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  platform: 'Mobile App' | 'Web Application' | 'SaaS & AI';
  role: string;
  duration: string;
  tools: string[];
  thumbnail: string;
  bannerImage?: string;
  figmaPrototypeUrl: string;
  livePreviewUrl?: string;
  overview: string;
  problemStatement: string;
  designObjective: string;
  targetUsers: TargetUser[];
  userFlow: UserFlowStep[];
  wireframeInsights: string[];
  designDecisions: DesignDecision[];
  challengesAndSolutions: ChallengeSolution[];
  finalOutcome: {
    stats: { label: string; value: string }[];
    summary: string;
  };
  screens: ProjectScreen[];
  colorPalette: { name: string; hex: string; role: string }[];
  typography: { style: string; sample: string; usage: string }[];
  hidden?: boolean;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  category: 'Mobile UI' | 'Web & SaaS' | 'Components' | 'Experimental';
  description: string;
  image: string;
  figmaFrame: string;
  tags: string[];
  date: string;
  color: string;
  details?: string;
  hidden?: boolean;
}

export interface ProcessStage {
  number: number;
  name: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface SkillItem {
  name: string;
  proficiency: string;
  context: string;
  tag?: string;
}

export interface SkillCategory {
  category: 'Design' | 'UX' | 'Tools';
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  credentialUrl?: string;
  image?: string;
  tags?: string[];
  certificateId?: string;
  internId?: string;
  recipientName?: string;
  role?: string;
  duration?: string;
  verificationEmail?: string;
  accreditations?: string[];
  hidden?: boolean;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'owner' | 'admin';
  displayName?: string;
  createdAt?: string;
}

