"use client";

import { useDesign } from "../_lib/design-context";
import { formatRem } from "../_lib/radius";
import { RadiusPanel } from "./radius-panel";
import { RadiusSpecimens } from "./radius-specimens";
import { CanvasSkeleton } from "./states";
import { Workspace } from "./workspace";

export function RadiusWorkspace() {
  const { palette, editor } = useDesign();

  return (
    <Workspace
      title="Radius"
      description={`--radius: ${formatRem(editor.radius.base)}`}
      variables={palette}
      panel={<RadiusPanel editor={editor} />}
    >
      {palette ? (
        <RadiusSpecimens radius={editor.radius} />
      ) : (
        <CanvasSkeleton label="Loading the radius preview" />
      )}
    </Workspace>
  );
}
