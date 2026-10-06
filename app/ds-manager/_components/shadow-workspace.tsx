"use client";

import { useDesign } from "../_lib/design-context";
import type { ShadowState } from "../_lib/shadow";
import { ShadowPanel } from "./shadow-panel";
import { ShadowSpecimens } from "./shadow-specimens";
import { CanvasSkeleton } from "./states";
import { Workspace } from "./workspace";

function describe(shadow: ShadowState): string {
  const pinned = Object.keys(shadow.overrides).length;
  const base = shadow.seed
    ? `Seed: ${shadow.seed.y}px offset, ${shadow.seed.blur}px blur, ${shadow.seed.opacity}% ${shadow.seed.color}`
    : "No seed set. The preview uses the Tailwind ramp Cubix ships.";
  return pinned > 0 ? `${base} ${pinned} edited ${pinned === 1 ? "step" : "steps"}.` : base;
}

export function ShadowWorkspace() {
  const { palette, editor } = useDesign();

  return (
    <Workspace
      title="Shadow"
      description={describe(editor.shadow)}
      variables={palette}
      panel={<ShadowPanel editor={editor} />}
    >
      {palette ? (
        <ShadowSpecimens shadow={editor.shadow} />
      ) : (
        <CanvasSkeleton label="Loading the shadow preview" />
      )}
    </Workspace>
  );
}
