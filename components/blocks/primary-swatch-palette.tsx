"use client"

import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  previewPrimaryOptions,
  type PreviewPrimaryId,
} from "@/components/blocks/preview-primary"

export const cubixSwatchColor = "#6F87EE"

/** Title + row of round swatches + selected name. Shared by the docs header and block cards. */
export function PrimarySwatchPalette({
  value,
  onValueChange,
  title = "Primary color",
}: {
  value: PreviewPrimaryId
  onValueChange: (value: PreviewPrimaryId) => void
  title?: string
}) {
  const current =
    previewPrimaryOptions.find((option) => option.id === value) ??
    previewPrimaryOptions[0]

  return (
    <div dir="ltr" className="flex flex-col items-start gap-3 text-left">
      <p className="text-label font-normal text-foreground">{title}</p>
      <div role="group" aria-label={title} className="flex items-center gap-2.5">
        {previewPrimaryOptions.map((option) => {
          const color = option.color ?? cubixSwatchColor
          const selected = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              aria-label={option.label}
              aria-pressed={selected}
              title={option.label}
              onClick={() => onValueChange(option.id)}
              className={cn(
                "relative inline-flex size-7 shrink-0 items-center justify-center rounded-full outline-none",
                "transition-[transform,box-shadow] duration-200 ease-out hover:scale-110 active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              )}
              style={{
                backgroundColor: color,
                boxShadow: selected
                  ? `0 0 0 2px var(--popover, var(--background)), 0 0 0 4px ${color}`
                  : undefined,
              }}
            >
              <CheckIcon
                aria-hidden
                strokeWidth={2.5}
                className={cn(
                  "size-3.5 transition-[opacity,transform] duration-200",
                  selected ? "scale-100 opacity-100" : "scale-50 opacity-0"
                )}
                style={{ color: option.foreground ?? "#ffffff" }}
              />
            </button>
          )
        })}
      </div>
      <p className="text-caption font-normal text-muted-foreground" aria-live="polite">
        {current.label}
      </p>
    </div>
  )
}