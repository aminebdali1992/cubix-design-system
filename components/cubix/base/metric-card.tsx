"use client"

import * as React from "react"
import { ChevronRightIcon, CircleHelpIcon } from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { Card, CardContent, CardTitle } from "./card"
import { Skeleton } from "./skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
type MetricCardContextValue = {
  isLoading?: boolean
  isDisabled?: boolean
}

const MetricCardContext = React.createContext<MetricCardContextValue>({
  isLoading: false,
  isDisabled: false,
})

function useMetricCard() {
  return React.useContext(MetricCardContext)
}

type MetricCardProps = React.ComponentProps<"div"> & {
  isLoading?: boolean
  isDisabled?: boolean
}

function MetricCard({
  isLoading = false,
  isDisabled = false,
  className,
  children,
  ...props
}: MetricCardProps) {
  const value = React.useMemo(() => ({ isLoading, isDisabled }), [isLoading, isDisabled])
  return (
    <Card
      data-slot="metric-card"
      data-loading={isLoading ? "" : undefined}
      data-disabled={isDisabled ? "" : undefined}
      className={cn(
        "group/metric-card relative gap-0 rounded-lg border border-border py-0 ring-0 data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <MetricCardContext.Provider value={value}>{children}</MetricCardContext.Provider>
    </Card>
  )
}

type MetricCardHeaderProps = React.ComponentProps<"div"> & {
  /*
    Renders the chevron as a link. Omit href (keep linkTooltip) when the card
    is already wrapped in a link - an anchor inside an anchor is invalid HTML.
  */
  href?: string
  linkTooltip?: React.ReactNode
  children: React.ReactNode
}

function MetricCardHeader({
  className,
  href,
  linkTooltip,
  children,
  ...props
}: MetricCardHeaderProps) {
  const chevronClassName = cn(
    buttonVariants({ variant: "ghost", size: "icon-xs" }),
    "absolute end-3 text-muted-foreground transition-colors group-hover/metric-card:text-foreground"
  )
  const chevron = (
    <>
      <ChevronRightIcon aria-hidden="true" className="size-3.5 rtl:rotate-180" strokeWidth={1.5} />
      <span className="sr-only">اطلاعات بیشتر</span>
    </>
  )

  return (
    <div
      data-slot="metric-card-header"
      className={cn("relative flex flex-row items-center justify-between gap-2 p-4 pb-0", className)}
      {...props}
    >
      <div className="flex flex-row items-center gap-2">{children}</div>
      {href || linkTooltip ? (
        <Tooltip>
          <TooltipTrigger
            render={href ? <a href={href} className={chevronClassName} /> : <span className={chevronClassName} />}
          >
            {chevron}
          </TooltipTrigger>
          {linkTooltip ? <TooltipContent>{linkTooltip}</TooltipContent> : null}
        </Tooltip>
      ) : null}
    </div>
  )
}

type MetricCardContentProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}

function MetricCardContent({
  className,
  orientation = "vertical",
  ...props
}: MetricCardContentProps) {
  return (
    <CardContent
      data-slot="metric-card-content"
      data-orientation={orientation}
      className={cn(
        "flex h-full flex-1 items-start gap-1 overflow-hidden p-4 pt-0",
        orientation === "horizontal" ? "flex-row items-baseline gap-2" : "flex-col",
        className
      )}
      {...props}
    />
  )
}

function MetricCardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="metric-card-icon"
      className={cn("text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5", className)}
      {...props}
    />
  )
}

type MetricCardLabelProps = React.ComponentProps<"div"> & {
  tooltip?: React.ReactNode
  children: React.ReactNode
}

function MetricCardLabel({ className, tooltip, children, ...props }: MetricCardLabelProps) {
  return (
    <CardTitle
      data-slot="metric-card-label"
      className={cn("flex items-center gap-2 text-label font-normal text-muted-foreground", className)}
      {...props}
    >
      <span>{children}</span>
      {tooltip && (
        <Tooltip>
          <TooltipTrigger
            aria-label="اطلاعات بیشتر"
            className="inline-flex rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <CircleHelpIcon aria-hidden="true" className="size-3.5 -scale-x-100" strokeWidth={1.5} />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">{tooltip}</TooltipContent>
        </Tooltip>
      )}
    </CardTitle>
  )
}

function MetricCardValue({ className, ...props }: React.ComponentProps<"span">) {
  const { isLoading } = useMetricCard()
  if (isLoading) {
    return <Skeleton data-slot="metric-card-value-skeleton" className="h-7 w-32" />
  }
  return (
    <span
      data-slot="metric-card-value"
      className={cn("text-xl font-normal tabular-nums text-foreground", className)}
      {...props}
    />
  )
}

type MetricCardDifferentialProps = React.ComponentProps<"span"> & {
  variant?: "positive" | "negative" | "default"
}

function MetricCardDifferential({
  className,
  variant = "default",
  ...props
}: MetricCardDifferentialProps) {
  const { isLoading } = useMetricCard()
  if (isLoading) {
    return <Skeleton data-slot="metric-card-differential-skeleton" className="h-5 w-16" />
  }
  return (
    <span
      data-slot="metric-card-differential"
      dir="ltr"
      data-variant={variant}
      className={cn(
        variant === "positive"
          ? "text-success-text"
          : variant === "negative"
            ? "text-destructive"
            : "text-muted-foreground",
        "text-label font-normal tabular-nums",
        className
      )}
      {...props}
    />
  )
}

type SparklineTooltipProps = {
  active?: boolean
  payload?: Array<{ value?: number; payload?: { timestamp?: string } }>
  label?: unknown
}

function SparklineTooltip({ active, payload, label }: SparklineTooltipProps) {
  if (!active || !payload || !payload.length) return null
  const point = payload[0]
  const timestamp = point.payload?.timestamp
  return (
    <div className="rounded-sm bg-foreground px-2 py-1.5 text-label font-normal text-background">
      {label !== undefined && timestamp && (
        <div className="text-background/60">
          {new Intl.DateTimeFormat("fa-IR", {
            month: "short",
            day: "numeric",
            hour: "numeric",
          }).format(new Date(timestamp))}
        </div>
      )}
      <div className="tabular-nums">
        {(point.value ?? 0).toLocaleString("fa-IR", { maximumFractionDigits: 0 })}
      </div>
    </div>
  )
}

type MetricCardSparklineProps = React.ComponentProps<"div"> & {
  data?: Array<{ value: number; [key: string]: unknown }>
  dataKey?: string
}

function MetricCardSparkline({ className, data, dataKey, ...props }: MetricCardSparklineProps) {
  const { isLoading } = useMetricCard()
  const gradientId = `metric-sparkline-${React.useId().replace(/:/g, "")}`
  if (isLoading) {
    return <Skeleton data-slot="metric-card-sparkline-skeleton" className="h-14 w-full rounded-none" />
  }
  if (!data || data.length === 0) {
    return null
  }
  return (
    <div data-slot="metric-card-sparkline" className={cn("relative h-16 w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, left: 0, right: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <RechartsTooltip content={<SparklineTooltip />} />
          <Area
            type="step"
            dataKey={dataKey || "value"}
            fill={`url(#${gradientId})`}
            fillOpacity={0.1}
            stroke="var(--primary)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export {
  MetricCard,
  MetricCardHeader,
  MetricCardIcon,
  MetricCardLabel,
  MetricCardContent,
  MetricCardValue,
  MetricCardDifferential,
  MetricCardSparkline,
  useMetricCard,
}
export type {
  MetricCardProps,
  MetricCardHeaderProps,
  MetricCardContentProps,
  MetricCardLabelProps,
  MetricCardDifferentialProps,
  MetricCardSparklineProps,
}
