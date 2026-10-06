import type { ColorMode } from "./tokens";

export type Palette = Readonly<Record<string, string>>;

export type Palettes = Readonly<Record<ColorMode, Palette>>;

const MODE_SELECTORS: Readonly<Record<ColorMode, string>> = {
  light: ":root",
  dark: ".dark",
};

function hasChildRules(rule: CSSRule): rule is CSSRule & { cssRules: CSSRuleList } {
  return "cssRules" in rule;
}

function collectStyleRules(rules: CSSRuleList, into: CSSStyleRule[]) {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) into.push(rule);
    if (hasChildRules(rule)) collectStyleRules(rule.cssRules, into);
  }
}

function readSheetRules(sheet: CSSStyleSheet): CSSRuleList | null {
  try {
    return sheet.cssRules;
  } catch {
    return null;
  }
}

/**
 * Reads both palettes straight from the loaded stylesheets, so the editor
 * always starts from the tokens the site actually ships, whatever theme the
 * page is currently rendered in.
 */
export function readPalettes(tokens: readonly string[]): Palettes | null {
  const styleRules: CSSStyleRule[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    const rules = readSheetRules(sheet);
    if (rules) collectStyleRules(rules, styleRules);
  }

  const read = (selector: string) => {
    const palette: Record<string, string> = {};
    for (const rule of styleRules) {
      if (rule.selectorText !== selector) continue;
      for (const token of tokens) {
        const value = rule.style.getPropertyValue(`--${token}`).trim();
        if (value) palette[token] = value;
      }
    }
    return palette;
  };

  const light = read(MODE_SELECTORS.light);
  const dark = read(MODE_SELECTORS.dark);
  const complete = tokens.every((token) => token in light && token in dark);
  return complete ? { light, dark } : null;
}

export function isValidColor(value: string): boolean {
  if (value.trim().length === 0) return false;
  // `CSS.supports` is browser-only, and polyfills may define a partial `CSS`.
  // Server renders only ever see committed, valid colors.
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") return true;
  return CSS.supports("color", value);
}
