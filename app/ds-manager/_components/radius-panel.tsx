"use client";

import * as React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/cubix/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/cubix/tooltip";

import {
  DEFAULT_RADIUS,
  RADIUS_PRESETS,
  RADIUS_RANGE,
  RADIUS_STEPS,
  activePreset,
  derivedRadius,
  formatRem,
  radiusValue,
  type RadiusPresetId,
  type RadiusStepSpec,
} from "../_lib/radius";
import type { DesignEditor } from "../_lib/use-design-editor";
import { PanelSection, PropertyRow, SidePanel } from "./panel-section";
import { ResetDot } from "./reset-dot";
import { CornerLargeIcon, CornerSmallIcon, CornerSquareIcon, RadiusIcon } from "./section-icons";
import { UnitInput } from "./unit-input";

const PRESET_ICONS: Readonly<
  Record<RadiusPresetId, React.ComponentType<React.ComponentProps<"svg">>>
> = {
  none: CornerSquareIcon,
  small: CornerSmallIcon,
  medium: RadiusIcon,
  large: CornerLargeIcon,
};

const BASE_HINT =
  "--radius: the base corner radius. Every --radius-* step multiplies it; pin a step under Derived steps to break it out.";

function PresetPicker({ editor }: { editor: DesignEditor }) {
  const preset = activePreset(editor.radius);

  return (
    <ToggleGroup
      aria-label="Radius preset"
      variant="segmented"
      size="sm"
      value={preset ? [preset] : []}
      onValueChange={(value) => {
        const next = RADIUS_PRESETS.find((option) => option.id === value[0]);
        if (next) editor.setRadius(next.value);
      }}
      className="w-full"
    >
      {RADIUS_PRESETS.map((option) => {
        const Icon = PRESET_ICONS[option.id];
        return (
          <Tooltip key={option.id}>
            <TooltipTrigger
              render={
                <ToggleGroupItem
                  value={option.id}
                  aria-label={`${option.label}, ${formatRem(option.value)}`}
                  className="flex-1"
                />
              }
            >
              <Icon className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {option.label} - {formatRem(option.value)}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </ToggleGroup>
  );
}

function StepRow({ spec, editor }: { spec: RadiusStepSpec; editor: DesignEditor }) {
  const { radius } = editor;
  const derived = derivedRadius(radius, spec);
  const id = `ds-${spec.token}`;

  return (
    <PropertyRow
      label={`--${spec.token}`}
      hint={`--${spec.token}: ${spec.expression}`}
      htmlFor={id}
      adornment={
        radius.overrides[spec.token] !== undefined ? (
          <ResetDot
            label={`Reset --${spec.token} to follow --radius (${formatRem(derived)})`}
            onReset={() => editor.setRadiusStep(spec.token, null)}
          />
        ) : null
      }
    >
      <UnitInput
        id={id}
        label={`--${spec.token}`}
        unit="rem"
        value={radiusValue(radius, spec)}
        range={RADIUS_RANGE}
        onCommit={(value) => editor.setRadiusStep(spec.token, value === derived ? null : value)}
      />
    </PropertyRow>
  );
}

export function RadiusPanel({ editor }: { editor: DesignEditor }) {
  const { radius } = editor;

  return (
    <SidePanel title="Radius">
      <PanelSection title="Presets" collapsible={false}>
        <PresetPicker editor={editor} />
      </PanelSection>
      <PanelSection title="Fine tune" collapsible={false}>
        <PropertyRow
          label="Radius"
          hint={BASE_HINT}
          htmlFor="ds-radius"
          adornment={
            radius.base !== DEFAULT_RADIUS.base ? (
              <ResetDot
                label={`Reset --radius to the Cubix default (${formatRem(DEFAULT_RADIUS.base)})`}
                onReset={() => editor.setRadius(DEFAULT_RADIUS.base)}
              />
            ) : null
          }
        >
          <UnitInput
            id="ds-radius"
            label="Radius"
            unit="rem"
            value={radius.base}
            range={RADIUS_RANGE}
            onCommit={editor.setRadius}
          />
        </PropertyRow>
      </PanelSection>
      <PanelSection title="Derived steps" defaultOpen={false}>
        {RADIUS_STEPS.map((spec) => (
          <StepRow key={spec.token} spec={spec} editor={editor} />
        ))}
      </PanelSection>
    </SidePanel>
  );
}
