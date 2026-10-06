import { radiusBaseRem, radiusScale } from "@/app/docs/theming/theming-data";

import { cssBlock } from "./css";
import { formatRem, roundUnit, type UnitRange } from "./units";

export type RadiusToken = (typeof radiusScale)[number]["name"];

export type RadiusStepSpec = {
  token: RadiusToken;
  factor: number;
  /** The Cubix expression the step derives from, e.g. `calc(var(--radius) * 0.6)`. */
  expression: string;
};

export const RADIUS_STEPS: readonly RadiusStepSpec[] = radiusScale.map((step) => ({
  token: step.name,
  factor: step.factor,
  expression: step.value,
}));

export const RADIUS_PRESETS = [
  { id: "none", label: "None", value: 0 },
  { id: "small", label: "Small", value: 0.45 },
  { id: "medium", label: "Medium", value: radiusBaseRem },
  { id: "large", label: "Large", value: 0.875 },
] as const;

export type RadiusPresetId = (typeof RADIUS_PRESETS)[number]["id"];

export const RADIUS_RANGE: UnitRange = { min: 0, max: 8, step: 0.0625 };

export type RadiusState = {
  /** `--radius` in rem; every step derives from it. */
  base: number;
  overrides: Readonly<Partial<Record<RadiusToken, number>>>;
};

export const DEFAULT_RADIUS: RadiusState = { base: radiusBaseRem, overrides: {} };

/** A step's value as its Cubix factor sets it, ignoring any override on it. */
export function derivedRadius(radius: RadiusState, spec: RadiusStepSpec): number {
  return roundUnit(radius.base * spec.factor);
}

/** A step follows the base until it is edited on its own. */
export function radiusValue(radius: RadiusState, spec: RadiusStepSpec): number {
  return radius.overrides[spec.token] ?? derivedRadius(radius, spec);
}

export function activePreset(radius: RadiusState): RadiusPresetId | null {
  return RADIUS_PRESETS.find((preset) => preset.value === radius.base)?.id ?? null;
}

/**
 * Custom properties the specimen canvas reads. Every step is set explicitly: the
 * root resolves `--radius-*` against its own `--radius`, so the canvas cannot
 * inherit them.
 */
export function radiusVariables(radius: RadiusState): Readonly<Record<string, string>> {
  return Object.fromEntries([
    ["radius", formatRem(radius.base)] as const,
    ...RADIUS_STEPS.map((spec) => [spec.token, formatRem(radiusValue(radius, spec))] as const),
  ]);
}

/** The radius tokens as they sit in a Cubix `globals.css`; pinned steps override the derived scale. */
export function radiusCss(radius: RadiusState): string {
  const base = cssBlock(":root", [["--radius", formatRem(radius.base)]]);
  const pinned = RADIUS_STEPS.flatMap((spec) => {
    const value = radius.overrides[spec.token];
    return value === undefined ? [] : [[`--${spec.token}`, formatRem(value)] as const];
  });
  return pinned.length > 0 ? `${base}\n\n${cssBlock("@theme inline", pinned)}` : base;
}
