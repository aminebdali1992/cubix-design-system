import { cssBlock } from "./css";
import { formatRem, roundUnit, type UnitRange } from "./units";

/** `--spacing` in rem. Cubix keeps the Tailwind base unit, so every `p-*`, `gap-*` and `size-*` is a multiple of it. */
export const DEFAULT_SPACING = 0.25;

export const SPACING_RANGE: UnitRange = { min: 0.125, max: 0.5, step: 0.0125 };

/** The multiples Cubix components reach for, from icon gaps to page gutters. */
export const SPACING_SCALE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 32] as const;

/** The steps that set a surface's density: inner gaps, control padding, card insets, section gaps. */
export const DENSITY_STEPS = [1, 2, 4, 6, 8] as const;

export function spacingRem(base: number, multiple: number): number {
  return roundUnit(base * multiple);
}

/** The base unit as it sits in a Cubix `globals.css`. */
export function spacingCss(base: number): string {
  return cssBlock("@theme", [["--spacing", formatRem(base)]]);
}
