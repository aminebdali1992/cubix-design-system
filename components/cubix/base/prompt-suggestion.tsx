"use client"

import * as React from "react"

import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"

export type PromptSuggestionsProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "wrap"
}

function PromptSuggestions({
  className,
  orientation = "horizontal",
  children,
  ...props
}: PromptSuggestionsProps) {
  return (
    <div
      data-slot="prompt-suggestions"
      data-orientation={orientation}
      role="list"
      className={cn(
        "flex w-full gap-2",
        orientation === "horizontal" &&
          "flex-nowrap overflow-x-auto overscroll-x-contain pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        orientation === "wrap" && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type PromptSuggestionsEmptyProps = React.ComponentProps<"div">

function PromptSuggestionsEmpty({
  className,
  children = "No suggestions yet.",
  ...props
}: PromptSuggestionsEmptyProps) {
  return (
    <div
      data-slot="prompt-suggestions-empty"
      className={cn(
        "flex w-full items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center text-description text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type PromptSuggestionProps = Omit<
  React.ComponentProps<typeof Button>,
  "onClick"
> & {
  suggestion: string
  active?: boolean
  onClick?: (suggestion: string) => void
}

function PromptSuggestion({
  suggestion,
  onClick,
  className,
  variant = "outline",
  size = "sm",
  active = false,
  disabled,
  children,
  ...props
}: PromptSuggestionProps) {
  return (
    <Button
      data-slot="prompt-suggestion"
      data-active={active ? "" : undefined}
      role="listitem"
      type="button"
      variant={variant}
      size={size}
      disabled={disabled}
      aria-pressed={active || undefined}
      className={cn(
        "h-8 shrink-0 rounded-full px-3.5 font-normal shadow-none",
        "data-active:border-foreground/20 data-active:bg-accent data-active:text-accent-foreground",
        className
      )}
      onClick={() => {
        if (disabled) {
          return
        }
        onClick?.(suggestion)
      }}
      {...props}
    >
      {children ?? suggestion}
    </Button>
  )
}

export { PromptSuggestion, PromptSuggestions, PromptSuggestionsEmpty }
