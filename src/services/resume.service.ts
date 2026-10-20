import type { Lang } from "../i18n";
import { getContent } from "../i18n";

export function getResume(lang: Lang) {
  return getContent(lang).resume;
}
