import type { Lang } from "../i18n";
import { getContent } from "../i18n";

export function getTechStack(lang: Lang) {
  return getContent(lang).techStack;
}
