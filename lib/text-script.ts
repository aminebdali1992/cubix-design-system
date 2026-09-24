/**
 * Script detection for Cubix typography.
 *
 * Alignment is not chosen by `lang` or `dir`. The shaper picks the
 * IRANSans Cubix face (used-box override) only for Arab-script
 * codepoints via `unicode-range`. These helpers exist so UI that must
 * set `data-script` or `dir` can make the same decision from the
 * actual string.
 */

const ARAB_CODEPOINT =
  /[\u0600-\u06FF\u0750-\u077F\u0870-\u089F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/u

const LATIN_LETTER = /[A-Za-z\u00C0-\u024F]/u

export type TextScript = "latn" | "arab" | "mixed"

export function hasArabScript(text: string): boolean {
  return ARAB_CODEPOINT.test(text)
}

export function hasLatinLetters(text: string): boolean {
  return LATIN_LETTER.test(text)
}

export function textScript(text: string): TextScript {
  const arab = hasArabScript(text)
  const latin = hasLatinLetters(text)
  if (arab && latin) return "mixed"
  if (arab) return "arab"
  return "latn"
}
