"use client";

import Link from "next/link";
import { BoxesIcon, Redo2Icon, Undo2Icon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import { Separator } from "@/components/cubix/separator";
import { cn } from "@/lib/utils";

import { SIDEBAR_WIDTH } from "../_lib/layout";
import type { Palettes } from "../_lib/palette";
import { useModifierLabel } from "../_lib/use-shortcuts";
import type { DesignEditor } from "../_lib/use-design-editor";
import { GetCodeDialog } from "./get-code-dialog";
import { IconAction } from "./icon-action";

type TopBarProps = {
  editor: DesignEditor;
  palettes: Palettes | null;
};

export function TopBar({ editor, palettes }: TopBarProps) {
  const modifier = useModifierLabel();

  return (
    <header
      data-slot="ds-top-bar"
      className="flex h-14 shrink-0 items-center gap-3 border-b bg-background pe-3"
    >
      <div className={cn("flex shrink-0 items-center gap-3 self-stretch ps-3", SIDEBAR_WIDTH)}>
        <Link
          href="/"
          className="me-auto flex items-center gap-2 rounded-md outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
            <BoxesIcon className="size-3.5" aria-hidden />
          </span>
          <span className="flex items-baseline gap-1 text-label">
            <span className="font-medium text-foreground">DS</span>
            <span className="text-muted-foreground">Manager</span>
          </span>
        </Link>
        <Separator orientation="vertical" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <IconAction
          label="Undo"
          shortcut={[modifier, "Z"]}
          icon={<Undo2Icon />}
          disabled={!editor.canUndo}
          onClick={editor.undo}
        />
        <IconAction
          label="Redo"
          shortcut={[modifier, "Shift", "Z"]}
          icon={<Redo2Icon />}
          disabled={!editor.canRedo}
          onClick={editor.redo}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Share
        </Button>
        <GetCodeDialog
          palettes={palettes}
          overrides={editor.overrides}
          typography={editor.typography}
          radius={editor.radius}
          spacing={editor.spacing}
          shadow={editor.shadow}
        />
      </div>
    </header>
  );
}
