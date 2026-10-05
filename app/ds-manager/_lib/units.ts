export type CssUnit = "em" | "rem";

export type UnitRange = { min: number; max: number; step: number };

const PRECISION = 3;

export function roundUnit(value: number): number {
  return Number(value.toFixed(PRECISION));
}

export function formatUnit(value: number, unit: CssUnit): string {
  return `${roundUnit(value)}${unit}`;
}
