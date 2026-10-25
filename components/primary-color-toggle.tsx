"use client";

import * as React from "react";

import {
  applyGlobalPrimary,
  globalPrimaryStorageKey,
  previewPrimaryOptions,
  resolvePreviewPrimary,
  type PreviewPrimaryId,
} from "@/components/blocks/preview-primary";
import { Button } from "@/components/cubix/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/cubix/popover";
import { cubixSwatchColor, PrimarySwatchPalette } from "@/components/blocks/primary-swatch-palette";
import { cn } from "@/lib/utils";

function Swatch({ color }: { color?: string }) {
  return (
    <span
      aria-hidden
      className={cn("size-3.5 shrink-0 rounded-full")}
      style={{ backgroundColor: color ?? cubixSwatchColor }}
    />
  );
}

export function PrimaryColorToggle() {
  const [value, setValue] = React.useState<PreviewPrimaryId>("cubix");

  React.useEffect(() => {
    try {
      setValue(resolvePreviewPrimary(localStorage.getItem(globalPrimaryStorageKey)));
    } catch {}
  }, []);

  const current =
    previewPrimaryOptions.find((option) => option.id === value) ??
    previewPrimaryOptions[0];

  function change(next: PreviewPrimaryId) {
    setValue(next);
    applyGlobalPrimary(next);
    try {
      if (next === "cubix") localStorage.removeItem(globalPrimaryStorageKey);
      else localStorage.setItem(globalPrimaryStorageKey, next);
    } catch {}
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Primary color: ${current.label}`}
            title="Primary color"
          />
        }
      >
        <Swatch color={current.color} />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-4">
        <PrimarySwatchPalette value={value} onValueChange={change} />
      </PopoverContent>
    </Popover>
  );
}