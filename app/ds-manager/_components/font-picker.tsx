"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/cubix/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cubix/select";
import { Spinner } from "@/components/cubix/spinner";
import { cn } from "@/lib/utils";

import type { FontStatus } from "../_lib/font-loader";
import {
  FONT_CATEGORIES,
  FONT_SLOT_HINTS,
  FONT_SLOT_LABELS,
  SAME_AS_BODY_LABEL,
  isFontCategory,
  previewFamily,
  slotCatalog,
  type FontCategory,
  type FontSlot,
} from "../_lib/typography";

type CategoryFilter = FontCategory | "all";

const ALL_CATEGORIES = "all";

function isCategoryFilter(value: unknown): value is CategoryFilter {
  return value === ALL_CATEGORIES || isFontCategory(value);
}

function slotGroups(slot: FontSlot) {
  const catalog = slotCatalog(slot);
  return FONT_CATEGORIES.map((category) => ({
    ...category,
    fonts: catalog.filter((option) => option.category === category.value),
  })).filter((group) => group.fonts.length > 0);
}

type FontItemProps = {
  label: string;
  meta?: string;
  selected: boolean;
  onSelect: () => void;
};

function FontItem({ label, meta, selected, onSelect }: FontItemProps) {
  return (
    <CommandItem value={label} keywords={meta ? [meta] : undefined} onSelect={onSelect}>
      <CheckIcon aria-hidden className={cn("size-3.5", !selected && "invisible")} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <CommandShortcut className="tracking-normal">{meta ?? ""}</CommandShortcut>
    </CommandItem>
  );
}

type FontListProps = {
  slot: FontSlot;
  value: string | null;
  onSelect: (family: string | null) => void;
};

function FontList({ slot, value, onSelect }: FontListProps) {
  const [filter, setFilter] = React.useState<CategoryFilter>(ALL_CATEGORIES);
  const available = slotGroups(slot);
  const groups = available.filter(
    (group) => filter === ALL_CATEGORIES || group.value === filter
  );

  return (
    <Command className="gap-2 rounded-none! bg-transparent p-0">
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1 [&>[data-slot=command-input-wrapper]]:p-0">
          <CommandInput placeholder="Search fonts" aria-label="Search fonts" />
        </div>
        {available.length > 1 ? (
          <Select
            value={filter}
            onValueChange={(next) => {
              if (isCategoryFilter(next)) setFilter(next);
            }}
          >
            <SelectTrigger size="sm" aria-label="Font category" className="w-28 shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_CATEGORIES}>All</SelectItem>
              {available.map((group) => (
                <SelectItem key={group.value} value={group.value}>
                  {group.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>
      <CommandList className="max-h-72">
        <CommandEmpty>No fonts match your search.</CommandEmpty>
        {slot === "heading" && filter === ALL_CATEGORIES ? (
          <CommandGroup>
            <FontItem
              label={SAME_AS_BODY_LABEL}
              selected={value === null}
              onSelect={() => onSelect(null)}
            />
          </CommandGroup>
        ) : null}
        {groups.map((group) => (
          <CommandGroup key={group.value} heading={group.label}>
            {group.fonts.map((option) => (
              <FontItem
                key={option.family}
                label={option.family}
                meta={option.category}
                selected={value === option.family}
                onSelect={() => onSelect(option.family)}
              />
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
}

function StatusIcon({ status }: { status: FontStatus }) {
  if (status === "loading") return <Spinner aria-label="Loading font" className="size-3.5" />;
  if (status === "error") {
    return <TriangleAlertIcon aria-hidden className="size-3.5 text-destructive" />;
  }
  return <ChevronDownIcon aria-hidden className="size-3.5 text-muted-foreground" />;
}

type FontPickerProps = {
  id: string;
  slot: FontSlot;
  value: string | null;
  status: FontStatus;
  errorId?: string;
  onSelect: (family: string | null) => void;
};

export function FontPicker({ id, slot, value, status, errorId, onSelect }: FontPickerProps) {
  const [open, setOpen] = React.useState(false);
  const label = FONT_SLOT_LABELS[slot];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            id={id}
            variant="gray"
            size="xs"
            aria-label={`${label} font: ${value ?? SAME_AS_BODY_LABEL}`}
            aria-invalid={status === "error" || undefined}
            aria-describedby={status === "error" ? errorId : undefined}
            className="w-full min-w-0 justify-between gap-1.5 ps-2 pe-1.5"
          />
        }
      >
        <span
          className="min-w-0 truncate text-caption"
          style={value === null ? undefined : { fontFamily: previewFamily(value) }}
        >
          {value ?? SAME_AS_BODY_LABEL}
        </span>
        <StatusIcon status={status} />
      </DialogTrigger>
      <DialogContent dir="ltr" className="gap-3 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{label} font</DialogTitle>
          <DialogDescription className="sr-only">{FONT_SLOT_HINTS[slot]}</DialogDescription>
        </DialogHeader>
        <FontList
          slot={slot}
          value={value}
          onSelect={(family) => {
            onSelect(family);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
