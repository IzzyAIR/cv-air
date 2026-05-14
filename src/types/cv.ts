export interface SiteMeta {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  twitterTitle: string;
  twitterDescription: string;
  jsonLd: Record<string, unknown>;
  footerText: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

export interface Hero {
  brand: { prefix: string; suffix: string };
  tagline: string;
  firstName: string;
  lastName: string;
  summary: string;
  meta: string;
  ctas: HeroCta[];
  photoAlt: string;
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface About {
  kicker: string;
  titleLeading: string;
  titleHighlighted: string;
  titleTrailing: string;
  paragraphs: string[];
  stats: AboutStat[];
}

export interface TechCategory {
  title: string;
  items: string[];
}

export interface TechStack {
  kicker: string;
  title: string;
  categories: TechCategory[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  highlights?: string[];
  stack: string[];
}

export interface Experience {
  kicker: string;
  title: string;
  items: ExperienceItem[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface Education {
  educationKicker: string;
  educationTitle: string;
  education: EducationItem[];
  languagesKicker: string;
  languagesTitle: string;
  languages: LanguageItem[];
}

export interface ContactLink {
  type: "telegram" | "phone" | "portfolio";
  href: string;
  label: string;
}

export interface Contact {
  kicker: string;
  titleLeading: string;
  titleHighlighted: string;
  description: string;
  emailLabel: string;
  email: string;
  links: ContactLink[];
}
