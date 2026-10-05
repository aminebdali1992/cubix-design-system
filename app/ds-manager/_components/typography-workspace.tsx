"use client";

import * as React from "react";

import { useDesign } from "../_lib/design-context";
import { useLoadFonts } from "../_lib/font-loader";
import {
  FONT_SLOTS,
  resolveFamily,
  typographyVariables,
  usedFonts,
} from "../_lib/typography";
import { CanvasSkeleton } from "./states";
import { TypographyPanel } from "./typography-panel";
import { TypographySpecimens } from "./typography-specimens";
import { Workspace } from "./workspace";

export function TypographyWorkspace() {
  const { palette, editor } = useDesign();
  const { typography } = editor;

  const fonts = React.useMemo(() => usedFonts(typography), [typography]);
  const variables = React.useMemo(
    () => (palette ? { ...palette, ...typographyVariables(typography) } : null),
    [palette, typography]
  );
  const description = FONT_SLOTS.map((slot) => resolveFamily(typography, slot)).join(" · ");

  useLoadFonts(fonts);

  return (
    <Workspace
      title="Typography"
      description={description}
      variables={variables}
      panel={<TypographyPanel editor={editor} />}
    >
      {variables ? (
        <TypographySpecimens typography={typography} />
      ) : (
        <CanvasSkeleton label="Loading the typography preview" />
      )}
    </Workspace>
  );
}
