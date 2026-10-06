"use client";

import { DEFAULT_SPACING, DENSITY_STEPS, SPACING_RANGE, spacingRem } from "../_lib/spacing";
import { formatPx, formatRem } from "../_lib/units";
import type { DesignEditor } from "../_lib/use-design-editor";
import { PanelSection, PropertyRow, SidePanel } from "./panel-section";
import { ResetDot } from "./reset-dot";
import { UnitInput } from "./unit-input";

const BASE_HINT =
  "--spacing: the base unit. Every p-*, m-*, gap-* and size-* utility is a multiple of it.";

function DensityList({ base }: { base: number }) {
  return (
    <ul aria-label="Density" className="flex flex-col gap-1.5 py-1">
      {DENSITY_STEPS.map((multiple) => {
        const rem = spacingRem(base, multiple);
        return (
          <li key={multiple} className="flex min-w-0 items-center gap-2 font-mono text-caption">
            <span className="w-6 shrink-0 text-muted-foreground">×{multiple}</span>
            <span
              aria-hidden
              className="block h-2 shrink-0 rounded-xs bg-foreground"
              style={{ width: formatRem(rem) }}
            />
            <span className="min-w-0 truncate text-muted-foreground tabular-nums">
              {formatRem(rem)} ({formatPx(rem)})
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function SpacingPanel({ editor }: { editor: DesignEditor }) {
  const { spacing } = editor;

  return (
    <SidePanel title="Spacing">
      <PanelSection title="Base unit" collapsible={false}>
        <PropertyRow
          label="Spacing"
          hint={BASE_HINT}
          htmlFor="ds-spacing"
          adornment={
            spacing !== DEFAULT_SPACING ? (
              <ResetDot
                label={`Reset --spacing to the Cubix default (${formatRem(DEFAULT_SPACING)})`}
                onReset={() => editor.setSpacing(DEFAULT_SPACING)}
              />
            ) : null
          }
        >
          <UnitInput
            id="ds-spacing"
            label="Spacing base"
            unit="rem"
            value={spacing}
            range={SPACING_RANGE}
            onCommit={editor.setSpacing}
          />
        </PropertyRow>
      </PanelSection>
      <PanelSection title="Density" collapsible={false}>
        <DensityList base={spacing} />
      </PanelSection>
    </SidePanel>
  );
}
