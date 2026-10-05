import { families, trackingRows, typeRoles } from "@/app/docs/typeset/typeset-data";

import { cssBlock } from "./css";
import { formatUnit, roundUnit, type UnitRange } from "./units";

export const FONT_SLOTS = ["sans", "heading", "mono"] as const;

export type FontSlot = (typeof FONT_SLOTS)[number];

export const FONT_SLOT_LABELS: Readonly<Record<FontSlot, string>> = {
  sans: "Body",
  heading: "Heading",
  mono: "Mono",
};

export const FONT_SLOT_SPECIMEN_LABELS: Readonly<Record<FontSlot, string>> = {
  sans: "Body",
  heading: "Headings",
  mono: "Mono",
};

export const SAME_AS_BODY_LABEL = "Same as body";

type CubixFamilyToken = (typeof families)[number]["name"];

function cubixFamily(token: CubixFamilyToken): string {
  const entry = families.find((family) => family.name === token);
  if (!entry) throw new Error(`Cubix family ${token} is missing from the typeset data.`);
  return entry.value;
}

/** The Latin face each slot pairs with. Cubix keeps Latin glyphs on these in every locale. */
export const LATIN_FACES: Readonly<Record<FontSlot, string>> = {
  sans: cubixFamily("--font-sans"),
  heading: cubixFamily("--font-heading"),
  mono: cubixFamily("--font-mono"),
};

export const FONT_SLOT_HINTS: Readonly<Record<FontSlot, string>> = {
  sans: `Persian face for body copy and interface text, paired with ${LATIN_FACES.sans} for Latin. Exported as --font-sans.`,
  heading: `Persian face for headings and display type, paired with ${LATIN_FACES.heading} for Latin. Exported as --font-heading.`,
  mono: "Code face. Persian inside code falls back to the body face, as in Cubix. Exported as --font-mono.",
};

export type FontCategory = "sans-serif" | "serif" | "display" | "monospace";

export const FONT_CATEGORIES: readonly { value: FontCategory; label: string }[] = [
  { value: "sans-serif", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
  { value: "display", label: "Display" },
  { value: "monospace", label: "Mono" },
];

export function isFontCategory(value: unknown): value is FontCategory {
  return FONT_CATEGORIES.some((category) => category.value === value);
}

export type FontOption = {
  family: string;
  category: FontCategory;
  /** Persian faces fill the Persian slots; Latin faces fill the mono slot. */
  script: "persian" | "latin";
  /** Google Fonts css2 axis spec, for faces Cubix does not bundle. */
  googleAxis?: string;
  /** CSS reference for a face Cubix already loads, used verbatim in stacks and exports. */
  bundledStack?: string;
};

export const BUNDLED_PERSIAN_FAMILY = cubixFamily("--font-iran-sans");

export const FONT_CATALOG: readonly FontOption[] = [
  { family: BUNDLED_PERSIAN_FAMILY, category: "sans-serif", script: "persian", bundledStack: "var(--font-arab)" },
  { family: "Vazirmatn", category: "sans-serif", script: "persian", googleAxis: "wght@100..900" },
  { family: "Noto Sans Arabic", category: "sans-serif", script: "persian", googleAxis: "wght@100..900" },
  { family: "Noto Kufi Arabic", category: "sans-serif", script: "persian", googleAxis: "wght@100..900" },
  { family: "Readex Pro", category: "sans-serif", script: "persian", googleAxis: "wght@160..700" },
  { family: "Changa", category: "sans-serif", script: "persian", googleAxis: "wght@200..800" },
  { family: "Cairo", category: "sans-serif", script: "persian", googleAxis: "wght@200..1000" },
  { family: "Harmattan", category: "sans-serif", script: "persian", googleAxis: "wght@400;500;600;700" },
  { family: "Noto Naskh Arabic", category: "serif", script: "persian", googleAxis: "wght@400..700" },
  { family: "Markazi Text", category: "serif", script: "persian", googleAxis: "wght@400..700" },
  { family: "Amiri", category: "serif", script: "persian", googleAxis: "wght@400;700" },
  { family: "Scheherazade New", category: "serif", script: "persian", googleAxis: "wght@400;500;600;700" },
  { family: "Mirza", category: "serif", script: "persian", googleAxis: "wght@400;500;600;700" },
  { family: "Lateef", category: "serif", script: "persian", googleAxis: "wght@200;300;400;500;600;700;800" },
  { family: "Lalezar", category: "display", script: "persian", googleAxis: "wght@400" },
  { family: "Reem Kufi", category: "display", script: "persian", googleAxis: "wght@400..700" },
  { family: LATIN_FACES.mono, category: "monospace", script: "latin", bundledStack: "var(--font-mono)" },
  { family: "JetBrains Mono", category: "monospace", script: "latin", googleAxis: "wght@100..800" },
  { family: "IBM Plex Mono", category: "monospace", script: "latin", googleAxis: "wght@100;200;300;400;500;600;700" },
  { family: "Fira Code", category: "monospace", script: "latin", googleAxis: "wght@300..700" },
  { family: "Source Code Pro", category: "monospace", script: "latin", googleAxis: "wght@200..900" },
  { family: "Roboto Mono", category: "monospace", script: "latin", googleAxis: "wght@100..700" },
];

/** Body and heading pick the Persian face; mono picks the code face. */
export function slotCatalog(slot: FontSlot): readonly FontOption[] {
  const script = slot === "mono" ? "latin" : "persian";
  return FONT_CATALOG.filter((option) => option.script === script);
}

export function findFont(family: string): FontOption | undefined {
  return FONT_CATALOG.find((option) => option.family === family);
}

/** CSS reference for one face: the bundled variable, or the quoted family Google serves. */
export function fontReference(family: string): string {
  return findFont(family)?.bundledStack ?? `"${family}"`;
}

/** Inline style family for a single face, used to preview it in the picker. */
export function previewFamily(family: string): string {
  const option = findFont(family);
  if (option?.bundledStack) return `${option.bundledStack}, var(--font-sans)`;
  return `"${family}", ${option?.category === "monospace" ? "monospace" : "sans-serif"}`;
}

export function googleFontsUrl(options: readonly FontOption[]): string | null {
  const families = options.flatMap((option) =>
    option.googleAxis ? [`family=${option.family.replaceAll(" ", "+")}:${option.googleAxis}`] : []
  );
  if (families.length === 0) return null;
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}

export function formatEm(value: number): string {
  return formatUnit(value, "em");
}

function parseEm(value: string): number {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) throw new Error(`"${value}" is not an em value.`);
  return parsed;
}

export type TypeRole = (typeof typeRoles)[number];

export type TypeRoleToken = TypeRole["token"];

export function typeRole(token: TypeRoleToken): TypeRole {
  const role = typeRoles.find((entry) => entry.token === token);
  if (!role) throw new Error(`Cubix type role ${token} is missing from the typeset data.`);
  return role;
}

export function typeRoleTracking(role: TypeRole): string {
  return formatEm(parseEm(role.tracking));
}

export type TrackingToken = (typeof trackingRows)[number]["token"];

export type TrackingStepSpec = {
  token: TrackingToken;
  label: string;
  /** The Cubix default, before the seed shifts it. */
  value: number;
  usage: string;
};

const TRACKING_PREFIX = "tracking-";

function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const TRACKING_STEPS: readonly TrackingStepSpec[] = trackingRows.map((row) => ({
  token: row.token,
  label: titleCase(row.token.slice(TRACKING_PREFIX.length)),
  value: parseEm(row.value),
  usage: row.usage,
}));

export const TRACKING_SEED_RANGE: UnitRange = { min: -0.1, max: 0.2, step: 0.005 };

export const TRACKING_STEP_RANGE: UnitRange = { min: -0.5, max: 0.5, step: 0.005 };

export type TypographyState = {
  /** `null` on the heading slot means it follows the body face. */
  fonts: Readonly<Record<FontSlot, string | null>>;
  /** Shifts every Cubix tracking token from its default by the same amount. */
  tracking: number;
  trackingOverrides: Readonly<Partial<Record<TrackingToken, number>>>;
};

export const DEFAULT_TYPOGRAPHY: TypographyState = {
  fonts: { sans: BUNDLED_PERSIAN_FAMILY, heading: null, mono: LATIN_FACES.mono },
  tracking: 0,
  trackingOverrides: {},
};

export function resolveFamily(typography: TypographyState, slot: FontSlot): string {
  return typography.fonts[slot] ?? typography.fonts.sans ?? BUNDLED_PERSIAN_FAMILY;
}

/** A token follows its Cubix default plus the seed until it is edited on its own. */
export function trackingValue(typography: TypographyState, spec: TrackingStepSpec): number {
  return roundUnit(typography.trackingOverrides[spec.token] ?? typography.tracking + spec.value);
}

/** Seeded value of a token, ignoring any override on it. */
export function seededTracking(typography: TypographyState, spec: TrackingStepSpec): number {
  return roundUnit(typography.tracking + spec.value);
}

export function usedFonts(typography: TypographyState): readonly FontOption[] {
  const families = new Set(FONT_SLOTS.map((slot) => resolveFamily(typography, slot)));
  return [...families].flatMap((family) => {
    const option = findFont(family);
    return option ? [option] : [];
  });
}

/**
 * The three family stacks in the exact shape of the Cubix `@theme inline` block:
 * Persian face first, then the slot's Latin variable, then the generic fallback.
 */
export function fontStacks(typography: TypographyState): Readonly<Record<FontSlot, string>> {
  const body = fontReference(resolveFamily(typography, "sans"));
  const heading = fontReference(resolveFamily(typography, "heading"));
  const mono = fontReference(resolveFamily(typography, "mono"));
  return {
    sans: `${body}, var(--font-sans), ui-sans-serif, sans-serif`,
    heading: `${heading}, var(--font-heading), ui-sans-serif, sans-serif`,
    mono: `${body}, ${mono}, ui-monospace, monospace`,
  };
}

/** Custom properties the specimen canvas reads, so edits re-render it live. */
export function typographyVariables(typography: TypographyState): Readonly<Record<string, string>> {
  const stacks = fontStacks(typography);
  return Object.fromEntries([
    ...FONT_SLOTS.map((slot) => [`ds-font-${slot}`, stacks[slot]] as const),
    ...TRACKING_STEPS.map((spec) => [spec.token, formatEm(trackingValue(typography, spec))] as const),
  ]);
}

/** The typography tokens as they sit in a Cubix `globals.css`. */
export function typographyTokensCss(typography: TypographyState): string {
  const stacks = fontStacks(typography);
  const fonts = cssBlock(
    "@theme inline",
    FONT_SLOTS.map((slot) => [`--font-${slot}`, stacks[slot]] as const)
  );
  const tracking = cssBlock(
    "@theme",
    TRACKING_STEPS.map((spec) => [`--${spec.token}`, formatEm(trackingValue(typography, spec))] as const)
  );
  return `${fonts}\n\n${tracking}`;
}

export function typographyCss(typography: TypographyState): string {
  const url = googleFontsUrl(usedFonts(typography));
  const tokens = typographyTokensCss(typography);
  return url ? `@import url("${url}");\n\n${tokens}` : tokens;
}
