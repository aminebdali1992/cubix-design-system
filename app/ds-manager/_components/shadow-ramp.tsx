"use client";

import { Button } from "@/components/cubix/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/cubix/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/cubix/toggle-group";

import {
  SHADOW_RANGES,
  SHADOW_STEPS,
  editableLayer,
  shadowValue,
  withLength,
  type ShadowLayer,
  type ShadowLength,
  type ShadowStep,
} from "../_lib/shadow";
import type { DesignEditor } from "../_lib/use-design-editor";
import { ResetDot } from "./reset-dot";
import { AdjustmentsIcon } from "./section-icons";
import { UnitInput } from "./unit-input";

const FIELD_LABEL = "text-caption text-muted-foreground";

type LayerPairProps = {
  step: ShadowStep;
  label: string;
  fields: readonly [ShadowLength, ShadowLength];
  layer: ShadowLayer;
  onCommit: (layer: ShadowLayer) => void;
};

function LayerPair({ step, label, fields, layer, onCommit }: LayerPairProps) {
  const [first, second] = fields;
  const firstId = `ds-shadow-${step}-${first}`;

  return (
    <>
      <label htmlFor={firstId} className={FIELD_LABEL}>
        {label}
      </label>
      {fields.map((field) => (
        <UnitInput
          key={field}
          id={field === first ? firstId : `ds-shadow-${step}-${second}`}
          label={`--shadow-${step} ${field}`}
          unit="px"
          value={layer[field]}
          range={SHADOW_RANGES[field]}
          onCommit={(value) => onCommit(withLength(layer, field, value))}
        />
      ))}
    </>
  );
}

function StepEditor({ step, editor }: { step: ShadowStep; editor: DesignEditor }) {
  const layer = editableLayer(editor.shadow, step);
  const commit = (next: ShadowLayer) => editor.setShadowStep(step, next);

  return (
    <Popover dir="ltr">
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon-xs" aria-label={`Edit --shadow-${step}`} />
        }
      >
        <AdjustmentsIcon className="size-3.5" />
      </PopoverTrigger>
      <PopoverContent side="left" align="start" className="w-66">
        <PopoverHeader>
          <PopoverTitle className="text-caption">--shadow-{step}</PopoverTitle>
        </PopoverHeader>
        <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-x-2 gap-y-1.5">
          <span className={FIELD_LABEL}>Type</span>
          <ToggleGroup
            aria-label={`--shadow-${step} type`}
            variant="segmented"
            size="sm"
            value={[layer.inset ? "inner" : "drop"]}
            onValueChange={(value) => {
              const next = value[0];
              if (next) commit({ ...layer, inset: next === "inner" });
            }}
            className="col-span-2 w-full"
          >
            <ToggleGroupItem value="drop" className="flex-1">
              Drop
            </ToggleGroupItem>
            <ToggleGroupItem value="inner" className="flex-1">
              Inner
            </ToggleGroupItem>
          </ToggleGroup>
          <LayerPair step={step} label="X / Y" fields={["x", "y"]} layer={layer} onCommit={commit} />
          <LayerPair
            step={step}
            label="Blur / Spread"
            fields={["blur", "spread"]}
            layer={layer}
            onCommit={commit}
          />
          <label htmlFor={`ds-shadow-${step}-opacity`} className={FIELD_LABEL}>
            Opacity
          </label>
          <UnitInput
            id={`ds-shadow-${step}-opacity`}
            label={`--shadow-${step} opacity`}
            unit="%"
            value={layer.opacity}
            range={SHADOW_RANGES.opacity}
            onCommit={(opacity) => commit({ ...layer, opacity })}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function StepRow({ step, editor }: { step: ShadowStep; editor: DesignEditor }) {
  const value = shadowValue(editor.shadow, step);
  const pinned = editor.shadow.overrides[step] !== undefined;

  return (
    <div data-slot="property-row" className="flex min-h-8 min-w-0 items-center gap-2 py-1">
      <div className="flex w-12 shrink-0 items-center gap-1">
        <span className="truncate text-caption text-muted-foreground">{step}</span>
        {pinned ? (
          <ResetDot
            label={`Reset --shadow-${step} to follow the ramp`}
            onReset={() => editor.setShadowStep(step, null)}
          />
        ) : null}
      </div>
      <span
        title={value}
        className="min-w-0 flex-1 truncate font-mono text-caption text-muted-foreground tabular-nums"
      >
        {value}
      </span>
      <StepEditor step={step} editor={editor} />
    </div>
  );
}

export function ShadowRampRows({ editor }: { editor: DesignEditor }) {
  return (
    <>
      {SHADOW_STEPS.map((step) => (
        <StepRow key={step} step={step} editor={editor} />
      ))}
    </>
  );
}
