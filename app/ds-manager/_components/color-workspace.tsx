"use client";

import { useDesign } from "../_lib/design-context";
import type { ColorMode } from "../_lib/tokens";
import type { Overrides } from "../_lib/use-design-editor";
import { ColorPanel } from "./color-panel";
import { ColorSpecimens } from "./color-specimens";
import { CanvasSkeleton, PanelSkeleton } from "./states";
import { Workspace } from "./workspace";

function describe(mode: ColorMode | null, overrides: Overrides) {
  if (!mode) return "Loading the palette";
  const count = Object.keys(overrides[mode]).length;
  return `Editing the ${mode} palette, ${count} override${count === 1 ? "" : "s"}`;
}

export function ColorWorkspace() {
  const { palettes, palette, mode, setMode, editor } = useDesign();

  return (
    <Workspace
      title="Color"
      description={describe(mode, editor.overrides)}
      variables={palette}
      panel={
        palettes && mode ? (
          <ColorPanel mode={mode} onModeChange={setMode} palettes={palettes} editor={editor} />
        ) : (
          <PanelSkeleton label="Loading the color tokens" />
        )
      }
    >
      {palette ? (
        <ColorSpecimens palette={palette} />
      ) : (
        <CanvasSkeleton label="Loading the color preview" />
      )}
    </Workspace>
  );
}
