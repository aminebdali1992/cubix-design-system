"use client";

import * as React from "react";
import { InfoIcon, PlusIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cubix/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/cubix/toggle-group";

import type { Palettes } from "../_lib/palette";
import {
  BASE_COLORS,
  COLOR_MODES,
  TOKEN_GROUPS,
  isBaseColor,
  otherMode,
  type BaseColor,
  type ColorMode,
} from "../_lib/tokens";
import type { DesignEditor } from "../_lib/use-design-editor";
import { IconAction } from "./icon-action";
import { PanelSection, SidePanel } from "./panel-section";
import { MoonIcon, SunIcon } from "./section-icons";
import { TokenRow } from "./token-row";

const EDITING_HINT =
  "Light and dark are two independent palettes in one system. Every edit below lands in the one selected here, and the editor switches with it.";

function BaseColorField() {
  const [baseColor, setBaseColor] = React.useState<BaseColor>("neutral");

  return (
    <div className="flex items-center gap-3 border-b px-4 py-3">
      <span className="w-24 shrink-0 text-caption text-muted-foreground">Base color</span>
      <Select
        value={baseColor}
        onValueChange={(value) => {
          if (isBaseColor(value)) setBaseColor(value);
        }}
      >
        <SelectTrigger size="sm" aria-label="Base color" className="min-w-0 flex-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {BASE_COLORS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function isColorMode(value: unknown): value is ColorMode {
  return COLOR_MODES.some((mode) => mode === value);
}

function EditingField({ mode, onModeChange }: { mode: ColorMode; onModeChange: (mode: ColorMode) => void }) {
  return (
    <div className="flex flex-col gap-2 border-b px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-caption font-medium text-foreground">Editing</span>
        <IconAction label={EDITING_HINT} icon={<InfoIcon />} side="left" />
      </div>
      <ToggleGroup
        aria-label="Palette being edited"
        variant="segmented"
        size="sm"
        value={[mode]}
        onValueChange={(value) => {
          const next = value[0];
          if (isColorMode(next)) onModeChange(next);
        }}
        className="w-full"
      >
        <ToggleGroupItem value="light" className="flex-1">
          <SunIcon className="size-3" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" className="flex-1">
          <MoonIcon className="size-3" />
          Dark
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

type ColorPanelProps = {
  mode: ColorMode;
  onModeChange: (mode: ColorMode) => void;
  palettes: Palettes;
  editor: DesignEditor;
};

export function ColorPanel({ mode, onModeChange, palettes, editor }: ColorPanelProps) {
  const overrides = editor.overrides[mode];
  const other = otherMode(mode);

  const change = (token: string, value: string) => {
    if (value === palettes[mode][token]) editor.resetToken(mode, token);
    else editor.setToken(mode, token, value);
  };

  return (
    <SidePanel title="Color">
      <BaseColorField />
      <EditingField mode={mode} onModeChange={onModeChange} />
      <PanelSection
        title="Custom"
        action={<IconAction label="Add a custom token" icon={<PlusIcon />} disabled side="left" />}
      >
        <p className="text-caption text-muted-foreground">
          No custom tokens yet. Add one to expose a brand color to every component.
        </p>
      </PanelSection>
      {TOKEN_GROUPS.map((group) => (
        <PanelSection key={group.id} title={group.panelTitle}>
          {group.tokens.map((token) => (
            <TokenRow
              key={token}
              token={token}
              value={overrides[token] ?? palettes[mode][token]}
              overridden={token in overrides}
              otherMode={other}
              otherValue={editor.overrides[other][token] ?? palettes[other][token]}
              onChange={(value) => change(token, value)}
              onReset={() => editor.resetToken(mode, token)}
            />
          ))}
        </PanelSection>
      ))}
    </SidePanel>
  );
}
