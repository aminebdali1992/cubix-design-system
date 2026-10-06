"use client";

import * as React from "react";

import { ScrollArea } from "@/components/cubix/scroll-area";

import { useDesign } from "../_lib/design-context";
import { radiusVariables } from "../_lib/radius";
import { shadowVariables } from "../_lib/shadow";
import { useTokenVariables } from "../_lib/use-palettes";
import { PaletteError } from "./states";

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="flex h-10 shrink-0 items-center border-b bg-background px-4">
      <div className="flex min-w-0 flex-1 items-baseline gap-2">
        <h1 className="shrink-0 text-label font-medium text-foreground">{title}</h1>
        <p className="min-w-0 truncate text-caption text-muted-foreground">{description}</p>
      </div>
    </header>
  );
}

type TokenVariables = Readonly<Record<string, string>>;

const NO_VARIABLES: TokenVariables = {};

type CanvasProps = {
  variables: TokenVariables | null;
  children: React.ReactNode;
};

/** The specimen surface: re-themed inline with the edited system, so the shell chrome never leaks in. */
function Canvas({ variables, children }: CanvasProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  useTokenVariables(ref, variables ?? NO_VARIABLES);

  return (
    <ScrollArea className="min-h-0 flex-1 bg-(--ds-canvas)">
      <div ref={ref} data-ds-canvas className="min-h-full">
        {children}
      </div>
    </ScrollArea>
  );
}

type WorkspaceProps = {
  title: string;
  description: string;
  /** Custom properties applied to the canvas; `null` while the system is still loading. */
  variables: TokenVariables | null;
  panel: React.ReactNode;
  children: React.ReactNode;
};

export function Workspace({ title, description, variables, panel, children }: WorkspaceProps) {
  const { paletteState, editor } = useDesign();
  const failed = paletteState.status === "error";
  const canvasVariables = React.useMemo(
    () =>
      variables
        ? { ...variables, ...radiusVariables(editor.radius), ...shadowVariables(editor.shadow) }
        : null,
    [variables, editor.radius, editor.shadow]
  );

  return (
    <>
      <main className="flex min-w-0 flex-1 flex-col">
        <PageHeader title={title} description={description} />
        {failed ? <PaletteError /> : <Canvas variables={canvasVariables}>{children}</Canvas>}
      </main>
      {failed ? null : panel}
    </>
  );
}
