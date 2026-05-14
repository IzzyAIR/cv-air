import type { Lang } from "../i18n";
import { getContent } from "../i18n";

export function getHero(lang: Lang) {
  return getContent(lang).hero;
}
