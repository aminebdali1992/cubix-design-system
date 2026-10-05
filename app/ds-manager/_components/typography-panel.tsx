"use client";

import { RotateCcwIcon } from "lucide-react";

import { useFontStatus } from "../_lib/font-loader";
import {
  DEFAULT_TYPOGRAPHY,
  FONT_SLOTS,
  FONT_SLOT_HINTS,
  FONT_SLOT_LABELS,
  TRACKING_SEED_RANGE,
  TRACKING_STEPS,
  TRACKING_STEP_RANGE,
  formatEm,
  seededTracking,
  trackingValue,
  type FontSlot,
  type TrackingStepSpec,
} from "../_lib/typography";
import type { DesignEditor } from "../_lib/use-design-editor";
import { FontPicker } from "./font-picker";
import { IconAction } from "./icon-action";
import { PanelSection, PropertyRow, SidePanel } from "./panel-section";
import { ResetDot } from "./reset-dot";
import { UnitInput } from "./unit-input";

const TRACKING_HINT =
  "Shifts every Cubix tracking token from its default by the same amount. Fine tune a token to pin it.";

function FontRow({ slot, editor }: { slot: FontSlot; editor: DesignEditor }) {
  const family = editor.typography.fonts[slot];
  const status = useFontStatus(family);
  const id = `ds-font-${slot}`;
  const errorId = `${id}-error`;

  return (
    <PropertyRow label={FONT_SLOT_LABELS[slot]} hint={FONT_SLOT_HINTS[slot]} htmlFor={id}>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <FontPicker
          id={id}
          slot={slot}
          value={family}
          status={status}
          errorId={errorId}
          onSelect={(next) => editor.setFont(slot, next)}
        />
        {status === "error" ? (
          <p id={errorId} role="alert" className="text-caption text-destructive">
            {family} could not be loaded. Check your connection, then pick it again.
          </p>
        ) : null}
      </div>
    </PropertyRow>
  );
}

function TrackingStepRow({ spec, editor }: { spec: TrackingStepSpec; editor: DesignEditor }) {
  const { typography } = editor;
  const overridden = typography.trackingOverrides[spec.token] !== undefined;
  const seeded = seededTracking(typography, spec);
  const id = `ds-${spec.token}`;

  return (
    <PropertyRow
      label={spec.label}
      hint={`--${spec.token} (Cubix default ${formatEm(spec.value)}): ${spec.usage}`}
      htmlFor={id}
      adornment={
        overridden ? (
          <ResetDot
            label={`Reset --${spec.token} to follow the seed (${formatEm(seeded)})`}
            onReset={() => editor.setTrackingStep(spec.token, null)}
          />
        ) : null
      }
    >
      <UnitInput
        id={id}
        label={`--${spec.token}`}
        unit="em"
        value={trackingValue(typography, spec)}
        range={TRACKING_STEP_RANGE}
        onCommit={(value) => editor.setTrackingStep(spec.token, value === seeded ? null : value)}
      />
    </PropertyRow>
  );
}

export function TypographyPanel({ editor }: { editor: DesignEditor }) {
  const { typography } = editor;
  const trackingDirty =
    typography.tracking !== DEFAULT_TYPOGRAPHY.tracking ||
    Object.keys(typography.trackingOverrides).length > 0;

  return (
    <SidePanel title="Typography">
      <PanelSection title="Fonts" collapsible={false}>
        {FONT_SLOTS.map((slot) => (
          <FontRow key={slot} slot={slot} editor={editor} />
        ))}
      </PanelSection>
      <PanelSection
        title="Letter spacing"
        collapsible={false}
        action={
          <IconAction
            label="Reset letter spacing"
            icon={<RotateCcwIcon />}
            disabled={!trackingDirty}
            onClick={editor.resetTracking}
            side="left"
          />
        }
      >
        <PropertyRow label="Tracking" hint={TRACKING_HINT} htmlFor="ds-tracking-seed">
          <UnitInput
            id="ds-tracking-seed"
            label="Tracking"
            unit="em"
            value={typography.tracking}
            range={TRACKING_SEED_RANGE}
            onCommit={editor.setTracking}
          />
        </PropertyRow>
      </PanelSection>
      <PanelSection title="Fine tune" defaultOpen={false}>
        {TRACKING_STEPS.map((spec) => (
          <TrackingStepRow key={spec.token} spec={spec} editor={editor} />
        ))}
      </PanelSection>
    </SidePanel>
  );
}
