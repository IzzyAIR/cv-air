import type { Lang } from "../i18n";
import { getContent } from "../i18n";

export function getEducation(lang: Lang) {
  return getContent(lang).education;
}
