import type {
  About,
  Contact,
  Education,
  Experience,
  Hero,
  NavLink,
  SiteMeta,
  TechStack,
} from "../types/cv";
import { en } from "./en";
import { ru } from "./ru";
import { uz } from "./uz";

export type Lang = "en" | "ru" | "uz";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
];

export const DEFAULT_LANG: Lang = "en";

export interface CvContent {
  siteMeta: SiteMeta;
  navLinks: NavLink[];
  brand: { prefix: string; suffix: string };
  hero: Hero;
  about: About;
  techStack: TechStack;
  experience: Experience;
  education: Education;
  contact: Contact;
}

const translations: Record<Lang, CvContent> = { en, ru, uz };

export function getContent(lang: Lang): CvContent {
  return translations[lang] ?? translations[DEFAULT_LANG];
}

export function isLang(value: string | undefined): value is Lang {
  return value === "en" || value === "ru" || value === "uz";
}

export function langHref(lang: Lang, hash = ""): string {
  const base = lang === DEFAULT_LANG ? "/" : `/${lang}/`;
  return hash ? `${base}${hash}` : base;
}
