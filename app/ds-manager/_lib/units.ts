export type CssUnit = "em" | "rem" | "px" | "%";

export type UnitRange = { min: number; max: number; step: number };

const PRECISION = 3;
const PX_PER_REM = 16;

export function roundUnit(value: number): number {
  return Number(value.toFixed(PRECISION));
}

export function formatUnit(value: number, unit: CssUnit): string {
  return `${roundUnit(value)}${unit}`;
}

export function formatRem(value: number): string {
  return formatUnit(value, "rem");
}

export function formatPx(rem: number): string {
  return `${roundUnit(rem * PX_PER_REM)}px`;
}
