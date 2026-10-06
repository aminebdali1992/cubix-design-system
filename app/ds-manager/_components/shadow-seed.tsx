"use client";

import * as React from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/cubix/input-group";
import { Slider } from "@/components/cubix/slider";

import { isValidColor } from "../_lib/palette";
import {
  DEFAULT_SEED,
  SHADOW_RANGES,
  withLength,
  type ShadowLength,
  type ShadowSeed,
} from "../_lib/shadow";
import type { DesignEditor } from "../_lib/use-design-editor";
import { PropertyRow } from "./panel-section";
import { ColorSwatch } from "./token-row";
import { UnitInput } from "./unit-input";

const UNIT_FIELD = "w-18 shrink-0";

function firstValue(value: number | readonly number[]): number {
  return typeof value === "number" ? value : (value[0] ?? 0);
}

type SeedSliderProps = {
  field: ShadowLength;
  label: string;
  hint: string;
  value: number;
  onCommit: (value: number) => void;
};

/** Dragging previews the value locally and commits once on release, so a drag is one undo step. */
function SeedSlider({ field, label, hint, value, onCommit }: SeedSliderProps) {
  const range = SHADOW_RANGES[field];
  const id = `ds-shadow-${field}`;
  const [draft, setDraft] = React.useState(value);
  const [synced, setSynced] = React.useState(value);
  if (synced !== value) {
    setSynced(value);
    setDraft(value);
  }

  return (
    <PropertyRow label={label} hint={hint} htmlFor={id}>
      <Slider
        aria-label={label}
        min={range.min}
        max={range.max}
        step={range.step}
        value={[draft]}
        onValueChange={(next) => setDraft(firstValue(next))}
        onValueCommitted={(next) => {
          const committed = firstValue(next);
          if (committed !== value) onCommit(committed);
        }}
        className="min-w-0 flex-1"
      />
      <div className={UNIT_FIELD}>
        <UnitInput id={id} label={label} unit="px" value={draft} range={range} onCommit={onCommit} />
      </div>
    </PropertyRow>
  );
}

function SeedColor({ seed, onCommit }: { seed: ShadowSeed; onCommit: (patch: Partial<ShadowSeed>) => void }) {
  const [draft, setDraft] = React.useState(seed.color);
  const [synced, setSynced] = React.useState(seed.color);
  if (synced !== seed.color) {
    setSynced(seed.color);
    setDraft(seed.color);
  }
  const invalid = !isValidColor(draft);

  const commit = () => {
    const next = draft.trim();
    if (invalid) setDraft(seed.color);
    else if (next !== seed.color) onCommit({ color: next });
  };

  return (
    <PropertyRow
      label="Color"
      hint="The color every step paints with; opacity sets how strongly the base step shows it."
      htmlFor="ds-shadow-color"
    >
      <InputGroup variant="filled" className="h-7 min-w-0 flex-1">
        <InputGroupAddon>
          <ColorSwatch color={isValidColor(draft) ? draft : seed.color} />
        </InputGroupAddon>
        <InputGroupInput
          id="ds-shadow-color"
          aria-label="Shadow color"
          aria-invalid={invalid || undefined}
          spellCheck={false}
          autoComplete="off"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") commit();
            if (event.key === "Escape") setDraft(seed.color);
          }}
          className="h-full min-w-0 text-caption tabular-nums md:text-caption"
        />
      </InputGroup>
      <div className={UNIT_FIELD}>
        <UnitInput
          id="ds-shadow-opacity"
          label="Shadow opacity"
          unit="%"
          value={seed.opacity}
          range={SHADOW_RANGES.opacity}
          onCommit={(opacity) => onCommit({ opacity })}
        />
      </div>
    </PropertyRow>
  );
}

const LENGTH_FIELDS: readonly { field: ShadowLength; label: string; hint: string }[] = [
  { field: "blur", label: "Blur", hint: "The base blur; larger steps blur faster than they move." },
  { field: "spread", label: "Spread", hint: "How far the base shadow grows past the surface before blurring." },
  { field: "x", label: "Offset X", hint: "Horizontal light direction; every step moves by a multiple of it." },
  { field: "y", label: "Offset Y", hint: "Vertical light direction; every step moves by a multiple of it." },
];

export function ShadowSeedFields({ editor }: { editor: DesignEditor }) {
  const seed = editor.shadow.seed ?? DEFAULT_SEED;

  return (
    <>
      <SeedColor seed={seed} onCommit={editor.setShadowSeed} />
      {LENGTH_FIELDS.map(({ field, label, hint }) => (
        <SeedSlider
          key={field}
          field={field}
          label={label}
          hint={hint}
          value={seed[field]}
          onCommit={(value) => editor.setShadowSeed(withLength(seed, field, value))}
        />
      ))}
    </>
  );
}
