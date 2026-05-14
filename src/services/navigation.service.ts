import type { Lang } from "../i18n";
import { getContent } from "../i18n";

export function getNavLinks(lang: Lang) {
  return getContent(lang).navLinks;
}

export function getBrand(lang: Lang) {
  return getContent(lang).brand;
}
