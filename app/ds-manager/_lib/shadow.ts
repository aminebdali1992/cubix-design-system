import { cssBlock } from "./css";
import { roundUnit, type UnitRange } from "./units";

export const SHADOW_STEPS = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

export type ShadowStep = (typeof SHADOW_STEPS)[number];

/** The ramp Cubix ships: Tailwind's defaults, untouched. */
export const TAILWIND_SHADOWS: Readonly<Record<ShadowStep, string>> = {
  "2xs": "0 1px rgb(0 0 0 / 0.05)",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
};

/** One shadow layer in px; `opacity` is the percent of the seed color it paints with. */
export type ShadowLayer = {
  inset: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  opacity: number;
};

/** The single shadow every step scales from. */
export type ShadowSeed = Omit<ShadowLayer, "inset"> & { color: string };

export type ShadowState = {
  /** `null` keeps the Tailwind ramp; any seed edit replaces it with a derived one. */
  seed: ShadowSeed | null;
  overrides: Readonly<Partial<Record<ShadowStep, ShadowLayer>>>;
};

export const DEFAULT_SEED: ShadowSeed = {
  color: "oklch(0 0 0)",
  opacity: 10,
  blur: 3,
  spread: 0,
  x: 0,
  y: 1,
};

export const DEFAULT_SHADOW: ShadowState = { seed: null, overrides: {} };

export type ShadowLength = "x" | "y" | "blur" | "spread";

export const SHADOW_RANGES: Readonly<Record<ShadowLength | "opacity", UnitRange>> = {
  x: { min: -20, max: 20, step: 0.5 },
  y: { min: -20, max: 20, step: 0.5 },
  blur: { min: 0, max: 40, step: 0.5 },
  spread: { min: -10, max: 10, step: 0.5 },
  opacity: { min: 0, max: 100, step: 1 },
};

export function withLength<T extends Record<ShadowLength, number>>(
  target: T,
  field: ShadowLength,
  value: number
): T {
  const next = { ...target };
  next[field] = value;
  return next;
}

type StepScale = { offset: number; blur: number; opacity: number };

/** How far each step sits from the seed: offsets and spread grow together, blur faster, opacity in three bands. */
const STEP_SCALES: Readonly<Record<ShadowStep, StepScale>> = {
  "2xs": { offset: 0.5, blur: 0.5, opacity: 0.5 },
  xs: { offset: 0.5, blur: 1, opacity: 0.5 },
  sm: { offset: 1, blur: 1, opacity: 1 },
  md: { offset: 1.5, blur: 2, opacity: 1 },
  lg: { offset: 2.5, blur: 3.5, opacity: 1 },
  xl: { offset: 4, blur: 6, opacity: 1 },
  "2xl": { offset: 6, blur: 10, opacity: 1.5 },
};

const ALPHA_FUNCTIONS = /^(oklch|oklab|lch|lab|rgb|hsl|hwb)\(([^/]*)\)$/i;

/** The seed color at a given opacity; `color-mix` covers colors that cannot take an alpha channel. */
export function colorWithOpacity(color: string, opacity: number): string {
  const percent = `${roundUnit(opacity)}%`;
  const match = ALPHA_FUNCTIONS.exec(color.trim());
  if (match) return `${match[1]}(${match[2].trim()} / ${percent})`;
  return `color-mix(in oklab, ${color} ${percent}, transparent)`;
}

export function derivedLayer(seed: ShadowSeed, step: ShadowStep): ShadowLayer {
  const scale = STEP_SCALES[step];
  return {
    inset: false,
    x: roundUnit(seed.x * scale.offset),
    y: roundUnit(seed.y * scale.offset),
    blur: roundUnit(seed.blur * scale.blur),
    spread: roundUnit(seed.spread * scale.offset),
    opacity: roundUnit(Math.min(100, seed.opacity * scale.opacity)),
  };
}

export function layerCss(layer: ShadowLayer, color: string): string {
  const lengths = [layer.x, layer.y, layer.blur, layer.spread].map((value) => `${value}px`).join(" ");
  return `${layer.inset ? "inset " : ""}${lengths} ${colorWithOpacity(color, layer.opacity)}`;
}

/** The layer a step's editor opens on: its pin, or what the seed (or the default seed) derives. */
export function editableLayer(shadow: ShadowState, step: ShadowStep): ShadowLayer {
  return shadow.overrides[step] ?? derivedLayer(shadow.seed ?? DEFAULT_SEED, step);
}

export type ShadowSource = "tailwind" | "seed" | "pinned";

export function shadowSource(shadow: ShadowState, step: ShadowStep): ShadowSource {
  if (shadow.overrides[step]) return "pinned";
  return shadow.seed ? "seed" : "tailwind";
}

export function shadowValue(shadow: ShadowState, step: ShadowStep): string {
  const color = (shadow.seed ?? DEFAULT_SEED).color;
  const pinned = shadow.overrides[step];
  if (pinned) return layerCss(pinned, color);
  return shadow.seed ? layerCss(derivedLayer(shadow.seed, step), color) : TAILWIND_SHADOWS[step];
}

export function isDefaultShadow(shadow: ShadowState): boolean {
  return shadow.seed === null && Object.keys(shadow.overrides).length === 0;
}

/** Every step is set on the canvas, so the scoped shadow utilities always have a value to read. */
export function shadowVariables(shadow: ShadowState): Readonly<Record<string, string>> {
  return Object.fromEntries(SHADOW_STEPS.map((step) => [`shadow-${step}`, shadowValue(shadow, step)]));
}

/** The ramp as it sits in a Cubix `globals.css`; empty while it is still Tailwind's. */
export function shadowCss(shadow: ShadowState): string {
  if (isDefaultShadow(shadow)) return "";
  return cssBlock(
    "@theme",
    SHADOW_STEPS.map((step) => [`--shadow-${step}`, shadowValue(shadow, step)] as const)
  );
}
