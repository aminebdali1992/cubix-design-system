"use client";

import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/cubix/input-group";

import { formatUnit, roundUnit, type CssUnit, type UnitRange } from "../_lib/units";

const LARGE_STEP_MULTIPLIER = 10;

function parseValue(text: string, unit: CssUnit): number | null {
  const trimmed = text.trim();
  const number = trimmed.toLowerCase().endsWith(unit) ? trimmed.slice(0, -unit.length) : trimmed;
  if (number.trim() === "") return null;
  const value = Number(number);
  return Number.isFinite(value) ? value : null;
}

function clamp(value: number, { min, max }: UnitRange) {
  return roundUnit(Math.min(max, Math.max(min, value)));
}

type UnitInputProps = {
  id: string;
  label: string;
  unit: CssUnit;
  value: number;
  range: UnitRange;
  onCommit: (value: number) => void;
};

export function UnitInput({ id, label, unit, value, range, onCommit }: UnitInputProps) {
  const [draft, setDraft] = React.useState(String(value));
  const [synced, setSynced] = React.useState(value);
  if (synced !== value) {
    setSynced(value);
    setDraft(String(value));
  }

  const parsed = parseValue(draft, unit);

  const commit = (next: number) => {
    const clamped = clamp(next, range);
    setDraft(String(clamped));
    if (clamped !== value) onCommit(clamped);
  };

  const settle = () => {
    if (parsed === null) setDraft(String(value));
    else commit(parsed);
  };

  return (
    <InputGroup variant="filled" className="h-7">
      <InputGroupInput
        id={id}
        role="spinbutton"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={range.min}
        aria-valuemax={range.max}
        aria-valuetext={formatUnit(value, unit)}
        aria-invalid={parsed === null || undefined}
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={settle}
        onKeyDown={(event) => {
          if (event.key === "Enter") settle();
          if (event.key === "Escape") setDraft(String(value));
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            const direction = event.key === "ArrowUp" ? 1 : -1;
            const multiplier = event.shiftKey ? LARGE_STEP_MULTIPLIER : 1;
            commit((parsed ?? value) + direction * range.step * multiplier);
          }
        }}
        className="h-full min-w-0 text-caption tabular-nums md:text-caption"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText className="text-caption">{unit}</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
