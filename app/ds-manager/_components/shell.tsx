"use client";

import * as React from "react";

import { DesignProvider, useDesign } from "../_lib/design-context";
import { useShellScope } from "../_lib/use-shell-scope";
import { useUndoShortcuts } from "../_lib/use-shortcuts";
import { SectionNav } from "./section-nav";
import { DesktopOnlyNotice } from "./states";
import { TopBar } from "./top-bar";

function ShellLayout({ children }: { children: React.ReactNode }) {
  const { editor, palettes } = useDesign();

  useShellScope();
  useUndoShortcuts(editor.undo, editor.redo);

  return (
    <div dir="ltr" lang="en">
      <DesktopOnlyNotice />
      <div className="hidden h-dvh flex-col md:flex">
        <TopBar editor={editor} palettes={palettes} />
        <div className="flex min-h-0 flex-1">
          <SectionNav />
          {children}
        </div>
      </div>
    </div>
  );
}

export function DsManagerShell({ children }: { children: React.ReactNode }) {
  return (
    <DesignProvider>
      <ShellLayout>{children}</ShellLayout>
    </DesignProvider>
  );
}
