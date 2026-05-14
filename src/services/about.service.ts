import type { Lang } from "../i18n";
import { getContent } from "../i18n";

export function getAbout(lang: Lang) {
  return getContent(lang).about;
}
