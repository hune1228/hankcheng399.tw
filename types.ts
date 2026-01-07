export type Language = 'zh' | 'en';

export interface ContactInfo {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  phone: string;
}

export interface EducationItem {
  period: string;
  school: string;
  department: string;
  degree: string;
  status: string;
}

export interface ExperienceItem {
  period: string;
  organization: string;
  position: string;
  department?: string;
  description?: string[];
  techStack?: string[];
}

export interface ProjectItem {
  title: string;
  team: string[];
  date: string;
  description: string[];
  awards: string[];
}

export interface AwardItem {
  year: string;
  title: string;
  organization: string;
}

export interface CommunityItem {
  role: string;
  organization?: string;
  event?: string;
  period?: string;
}

export interface CommunityYearGroup {
  year: string;
  items: CommunityItem[];
}

export interface ResumeData {
  contact: ContactInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  awards: AwardItem[];
  community: CommunityYearGroup[];
  ui: {
    titles: {
      about: string;
      education: string;
      experience: string;
      projects: string;
      awards: string;
      community: string;
      contact: string;
    };
    actions: {
      toggleTheme: string;
      toggleLang: string;
    }
  }
}