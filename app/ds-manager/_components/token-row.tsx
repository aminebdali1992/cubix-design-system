"use client";

import * as React from "react";

import { Button } from "@/components/cubix/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/cubix/input-group";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/cubix/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/cubix/tooltip";
import { cn } from "@/lib/utils";

import { alphaPercent } from "../_lib/contrast";
import { isValidColor } from "../_lib/palette";
import type { ColorMode } from "../_lib/tokens";
import { IconAction } from "./icon-action";
import { ResetDot } from "./reset-dot";
import { CopyIcon } from "./section-icons";

const SWATCH_RADIUS = "rounded-[3px]";

const SWATCH_CHECKERBOARD =
  "bg-[conic-gradient(var(--border)_25%,var(--background)_0_50%,var(--border)_0_75%,var(--background)_0)] dark:bg-[conic-gradient(var(--muted)_25%,var(--accent)_0_50%,var(--muted)_0_75%,var(--accent)_0)] bg-size-[calc(var(--spacing)*3)]";

function ColorSwatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block size-3.5 shrink-0 overflow-hidden border border-foreground/10 bg-clip-padding dark:border-foreground/14",
        SWATCH_RADIUS,
        SWATCH_CHECKERBOARD
      )}
    >
      <span className="absolute inset-0 block rounded-xs" style={{ backgroundColor: color }} />
    </span>
  );
}

type TokenValueInputProps = {
  token: string;
  value: string;
  onCommit: (value: string) => void;
};

function TokenValueInput({ token, value, onCommit }: TokenValueInputProps) {
  const [draft, setDraft] = React.useState(value);
  const invalid = !isValidColor(draft);
  const alpha = alphaPercent(value);

  const commit = () => {
    if (invalid) {
      setDraft(value);
      return;
    }
    const next = draft.trim();
    if (next !== value) onCommit(next);
  };

  return (
    <InputGroup>
      <InputGroupAddon>
        <ColorSwatch color={value} />
      </InputGroupAddon>
      <InputGroupInput
        aria-label={`--${token} value`}
        aria-invalid={invalid || undefined}
        spellCheck={false}
        autoComplete="off"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit();
          if (event.key === "Escape") setDraft(value);
        }}
        className="min-w-0 text-caption tabular-nums md:text-caption"
      />
      {alpha !== null ? (
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-caption tabular-nums">{alpha}%</InputGroupText>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}

type ColorFieldProps = TokenValueInputProps;

function ColorField({ token, value, onCommit }: ColorFieldProps) {
  return (
    <Popover dir="ltr">
      <PopoverTrigger
        render={
          <Button
            variant="gray"
            size="xs"
            aria-label={`--${token}: ${value}`}
            className="ms-auto w-24 justify-start gap-0 ps-0 pe-2"
          />
        }
      >
        <span aria-hidden className="flex size-7 shrink-0 items-center justify-center">
          <ColorSwatch color={value} />
        </span>
        <span className="min-w-0 flex-1 truncate text-start text-caption tabular-nums">{value}</span>
      </PopoverTrigger>
      <PopoverContent side="left" align="start" className="w-66">
        <PopoverHeader>
          <PopoverTitle className="text-caption">--{token}</PopoverTitle>
        </PopoverHeader>
        <TokenValueInput key={value} token={token} value={value} onCommit={onCommit} />
      </PopoverContent>
    </Popover>
  );
}

type TokenRowProps = {
  token: string;
  value: string;
  overridden: boolean;
  otherMode: ColorMode;
  otherValue: string;
  onChange: (value: string) => void;
  onReset: () => void;
};

export function TokenRow({
  token,
  value,
  overridden,
  otherMode,
  otherValue,
  onChange,
  onReset,
}: TokenRowProps) {
  return (
    <div
      data-slot="token-row"
      data-overridden={overridden || undefined}
      className="flex min-h-8 min-w-0 items-center gap-2 py-1"
    >
      <div className="flex min-w-0 items-center gap-1">
        <Tooltip>
          <TooltipTrigger
            render={<span className="min-w-0 truncate text-caption text-muted-foreground" />}
          >
            {token}
          </TooltipTrigger>
          <TooltipContent side="left">--{token}</TooltipContent>
        </Tooltip>
        {overridden ? (
          <ResetDot label={`Reset --${token} to the style default`} onReset={onReset} />
        ) : null}
      </div>
      <div className="flex flex-1 items-center gap-2">
        <ColorField token={token} value={value} onCommit={onChange} />
        <IconAction
          label={`Copy --${token} from the ${otherMode} palette (${otherValue})`}
          icon={
            <CopyIcon className="size-3 text-muted-foreground transition-colors group-hover/button:text-foreground" />
          }
          disabled={otherValue === value}
          onClick={() => onChange(otherValue)}
          side="left"
        />
      </div>
    </div>
  );
}
