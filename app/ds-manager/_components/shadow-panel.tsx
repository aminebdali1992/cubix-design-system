"use client";

import { Button } from "@/components/cubix/button";

import type { DesignEditor } from "../_lib/use-design-editor";
import { PanelSection, SidePanel } from "./panel-section";
import { ShadowRampRows } from "./shadow-ramp";
import { ShadowSeedFields } from "./shadow-seed";

export function ShadowPanel({ editor }: { editor: DesignEditor }) {
  return (
    <SidePanel title="Shadow">
      <PanelSection
        title="Seed"
        collapsible={false}
        action={
          editor.shadow.seed ? (
            <Button variant="ghost" size="xs" onClick={editor.resetShadowSeed}>
              Reset
            </Button>
          ) : null
        }
      >
        <ShadowSeedFields editor={editor} />
      </PanelSection>
      <PanelSection title="Ramp">
        <ShadowRampRows editor={editor} />
      </PanelSection>
    </SidePanel>
  );
}
