"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ProgressContextValue = {
  value: number | null | undefined
}

const ProgressContext = React.createContext<ProgressContextValue>({
  value: null,
})

function Progress({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressContext.Provider value={{ value }}>
      <div
        data-slot="progress"
        className={cn("flex w-full flex-wrap gap-3", className)}
      >
        {children}
        <ProgressPrimitive.Root
          data-slot="progress-track"
          className="relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted"
          value={value}
          {...props}
        >
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className="size-full flex-1 bg-primary transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
    </ProgressContext.Provider>
  )
}

function ProgressTrack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-track"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { value } = React.useContext(ProgressContext)

  return (
    <div
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      style={{ width: `${value || 0}%` }}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="progress-label"
      className={cn("text-description font-medium", className)}
      {...props}
    />
  )
}

function ProgressValue({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { value } = React.useContext(ProgressContext)
  const formatted =
    value == null || Number.isNaN(value) ? null : `${Math.round(value)}%`

  return (
    <span
      data-slot="progress-value"
      className={cn(
        "ml-auto text-description text-muted-foreground tabular-nums",
        className
      )}
      {...props}
    >
      {children ?? formatted}
    </span>
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
