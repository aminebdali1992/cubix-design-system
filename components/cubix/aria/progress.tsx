"use client"

/*
  Cubix Progress - React Aria version.

  Same parts and classes as the Base UI and Radix progress, built on React
  Aria ProgressBar. value / min / max map onto value / minValue / maxValue,
  and a null or missing value shows the indeterminate state. ProgressLabel
  names the progress bar automatically, and ProgressValue shows the
  locale-formatted percentage unless children are passed.
*/
import * as React from "react"
import {
  Label as AriaLabel,
  ProgressBar,
  type ProgressBarProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

type ProgressContextValue = {
  percentage: number | undefined
  valueText: string | undefined
}

const ProgressContext = React.createContext<ProgressContextValue>({
  percentage: undefined,
  valueText: undefined,
})

type ProgressProps = Omit<
  ProgressBarProps,
  "className" | "children" | "value" | "minValue" | "maxValue" | "isIndeterminate"
> & {
  className?: string
  children?: React.ReactNode
  value?: number | null
  min?: number
  max?: number
}

function Progress({
  className,
  children,
  value,
  min = 0,
  max = 100,
  ...props
}: ProgressProps) {
  return (
    <ProgressBar
      data-slot="progress"
      value={value ?? undefined}
      isIndeterminate={value == null}
      minValue={min}
      maxValue={max}
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {({ percentage, valueText }) => (
        <ProgressContext.Provider value={{ percentage, valueText }}>
          {children}
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </ProgressContext.Provider>
      )}
    </ProgressBar>
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

function ProgressLabel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AriaLabel>, "elementType">) {
  return (
    <AriaLabel
      elementType="span"
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
  const { valueText } = React.useContext(ProgressContext)

  return (
    <span
      data-slot="progress-value"
      className={cn(
        "ms-auto text-description text-muted-foreground tabular-nums",
        className
      )}
      {...props}
    >
      {children ?? valueText}
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
