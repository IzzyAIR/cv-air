import type { Lang } from "../i18n";
import { getContent } from "../i18n";

export function getContact(lang: Lang) {
  return getContent(lang).contact;
}
