"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import type { Palette, Palettes } from "./palette";
import type { ColorMode } from "./tokens";
import { useDesignEditor, type DesignEditor } from "./use-design-editor";
import { resolvePalette, usePalettes, type PaletteState } from "./use-palettes";

type DesignContextValue = {
  paletteState: PaletteState;
  palettes: Palettes | null;
  /** `null` until the theme resolves on the client. */
  mode: ColorMode | null;
  setMode: (mode: ColorMode) => void;
  /** The edited palette for `mode`, or `null` while tokens or theme are loading. */
  palette: Palette | null;
  editor: DesignEditor;
};

const DesignContext = React.createContext<DesignContextValue | null>(null);

/** Holds the system being edited above the section routes, so edits and history survive navigation. */
export function DesignProvider({ children }: { children: React.ReactNode }) {
  const paletteState = usePalettes();
  const editor = useDesignEditor();
  const { resolvedTheme, setTheme } = useTheme();

  const mode: ColorMode | null =
    resolvedTheme === "dark" || resolvedTheme === "light" ? resolvedTheme : null;
  const palettes = paletteState.status === "ready" ? paletteState.palettes : null;
  const palette = React.useMemo(
    () => (palettes && mode ? resolvePalette(palettes, editor.overrides, mode) : null),
    [palettes, editor.overrides, mode]
  );

  const value = React.useMemo<DesignContextValue>(
    () => ({ paletteState, palettes, mode, setMode: setTheme, palette, editor }),
    [paletteState, palettes, mode, setTheme, palette, editor]
  );

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
}

export function useDesign(): DesignContextValue {
  const context = React.useContext(DesignContext);
  if (!context) throw new Error("useDesign must be used inside DesignProvider.");
  return context;
}
