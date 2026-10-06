"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const DEFAULT_MAX = 100

type ProgressContextValue = {
  percentage: number | null
  registerLabel: (id: string) => () => void
}

const ProgressContext = React.createContext<ProgressContextValue>({
  percentage: null,
  registerLabel: () => () => {},
})

function toPercentage(value: number | null | undefined, max: number) {
  if (value == null || Number.isNaN(value) || max <= 0) return null
  return Math.min(100, Math.max(0, (value / max) * 100))
}

function Progress({
  className,
  children,
  value,
  max = DEFAULT_MAX,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const [labelId, setLabelId] = React.useState<string>()
  const registerLabel = React.useCallback((id: string) => {
    setLabelId(id)
    return () => setLabelId((current) => (current === id ? undefined : current))
  }, [])
  const percentage = toPercentage(value, max)

  return (
    <ProgressContext.Provider value={{ percentage, registerLabel }}>
      <div
        data-slot="progress"
        className={cn("flex w-full flex-wrap gap-3", className)}
      >
        {children}
        <ProgressPrimitive.Root
          data-slot="progress-track"
          className="relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted"
          value={value}
          max={max}
          aria-labelledby={ariaLabelledBy ?? labelId}
          {...props}
        >
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className="h-full bg-primary transition-all"
            style={{ width: `${percentage ?? 0}%` }}
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
  style,
  ...props
}: React.ComponentProps<"div">) {
  const { percentage } = React.useContext(ProgressContext)

  return (
    <div
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      style={{ width: `${percentage ?? 0}%`, ...style }}
      {...props}
    />
  )
}

function ProgressLabel({ className, id, ...props }: React.ComponentProps<"span">) {
  const generatedId = React.useId()
  const labelId = id ?? generatedId
  const { registerLabel } = React.useContext(ProgressContext)

  React.useLayoutEffect(() => registerLabel(labelId), [registerLabel, labelId])

  return (
    <span
      id={labelId}
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
  const { percentage } = React.useContext(ProgressContext)
  const formatted = percentage == null ? null : `${Math.round(percentage)}%`

  return (
    <span
      data-slot="progress-value"
      className={cn(
        "ms-auto text-description text-muted-foreground tabular-nums",
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
