"use client";

import * as React from "react";

import { readPalettes, type Palette, type Palettes } from "./palette";
import { ALL_TOKENS, type ColorMode } from "./tokens";
import type { Overrides } from "./use-design-editor";

export type PaletteState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; palettes: Palettes };

export function usePalettes(): PaletteState {
  const [state, setState] = React.useState<PaletteState>({ status: "loading" });

  React.useEffect(() => {
    const palettes = readPalettes(ALL_TOKENS);
    setState(palettes ? { status: "ready", palettes } : { status: "error" });
  }, []);

  return state;
}

export function resolvePalette(
  palettes: Palettes,
  overrides: Overrides,
  mode: ColorMode
): Palette {
  return { ...palettes[mode], ...overrides[mode] };
}

/** Applies token overrides as custom properties on an element, so everything inside re-themes live. */
export function useTokenVariables(
  ref: React.RefObject<HTMLElement | null>,
  values: Readonly<Record<string, string>>
) {
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const entries = Object.entries(values);
    for (const [token, value] of entries) element.style.setProperty(`--${token}`, value);
    return () => {
      for (const [token] of entries) element.style.removeProperty(`--${token}`);
    };
  }, [ref, values]);
}
