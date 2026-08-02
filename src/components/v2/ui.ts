import type { Lang } from "../../i18n";

/**
 * v2 chrome strings. Layout-bound UI copy only — everything that is real CV
 * content still comes through the services.
 *
 * One label per intent (contact / resume / work), reused in nav, hero and footer.
 */
const STRINGS = {
  en: {
    navAbout: "About",
    navWork: "Work",
    navStack: "Stack",
    navContact: "Contact",
    contact: "Get in touch",
    resume: "Download CV",
    menu: "Menu",
    about: "About",
    work: "Experience",
    stack: "What I build with",
    credentials: "Education and languages",
    education: "Education",
    languages: "Languages",
    contactTitle: "Open to new work",
    email: "Email",
    present: "now",
    v1: "Classic version",
    theme: "Switch theme",
  },
  ru: {
    navAbout: "Обо мне",
    navWork: "Опыт",
    navStack: "Стек",
    navContact: "Контакты",
    contact: "Связаться",
    resume: "Скачать CV",
    menu: "Меню",
    about: "Обо мне",
    work: "Опыт работы",
    stack: "С чем работаю",
    credentials: "Образование и языки",
    education: "Образование",
    languages: "Языки",
    contactTitle: "Открыт к новым проектам",
    email: "Почта",
    present: "сейчас",
    v1: "Классическая версия",
    theme: "Сменить тему",
  },
  uz: {
    navAbout: "Men haqimda",
    navWork: "Tajriba",
    navStack: "Stek",
    navContact: "Aloqa",
    contact: "Bogʻlanish",
    resume: "CV yuklab olish",
    menu: "Menyu",
    about: "Men haqimda",
    work: "Ish tajribasi",
    stack: "Nima bilan ishlayman",
    credentials: "Taʼlim va tillar",
    education: "Taʼlim",
    languages: "Tillar",
    contactTitle: "Yangi loyihalarga ochiqman",
    email: "Pochta",
    present: "hozir",
    v1: "Klassik versiya",
    theme: "Mavzuni almashtirish",
  },
} as const;

export const getUi = (lang: Lang) => STRINGS[lang];

/** v2 is the site: English at the root, the other locales under their prefix. */
export const v2Href = (lang: Lang, hash = "") =>
  `${lang === "en" ? "/" : `/${lang}/`}${hash}`;

/** The archived first design. */
export const v1Href = (lang: Lang) => (lang === "en" ? "/v1" : `/${lang}/v1`);

/** The skill bans the em-dash outright; content bundles are full of them. */
export const noDash = (s: string) => s.replace(/\s*—\s*/g, " - ");

/** Hero subtext is capped at 20 words: take whole sentences while they fit. */
export const leadFrom = (s: string, maxWords = 20) => {
  const sentences = s.split(/(?<=\.)\s+/);
  const out: string[] = [];
  let words = 0;
  for (const sentence of sentences) {
    const n = sentence.trim().split(/\s+/).length;
    if (out.length && words + n > maxWords) break;
    out.push(sentence.trim());
    words += n;
  }
  return out.join(" ");
};

/** "Project — description" becomes a bold lead-in plus body, with the dash dropped. */
export const splitLead = (h: string) => {
  const m = h.match(/^(.{2,70}?)\s+—\s+([\s\S]+)$/);
  return m
    ? { lead: noDash(m[1]), text: noDash(m[2]) }
    : { lead: "", text: noDash(h) };
};

export const stripUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");
