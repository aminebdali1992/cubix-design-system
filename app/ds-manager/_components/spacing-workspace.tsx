"use client";

import { useDesign } from "../_lib/design-context";
import { DEFAULT_SPACING } from "../_lib/spacing";
import { formatRem } from "../_lib/units";
import { SpacingPanel } from "./spacing-panel";
import { SpacingSpecimens } from "./spacing-specimens";
import { CanvasSkeleton } from "./states";
import { Workspace } from "./workspace";

export function SpacingWorkspace() {
  const { palette, editor } = useDesign();
  const base = `--spacing: ${formatRem(editor.spacing)}`;

  return (
    <Workspace
      title="Spacing"
      description={editor.spacing === DEFAULT_SPACING ? `${base} (default)` : base}
      variables={palette}
      panel={<SpacingPanel editor={editor} />}
    >
      {palette ? (
        <SpacingSpecimens spacing={editor.spacing} />
      ) : (
        <CanvasSkeleton label="Loading the spacing preview" />
      )}
    </Workspace>
  );
}
