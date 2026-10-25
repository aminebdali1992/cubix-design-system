"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaMetricCard from "@/components/cubix/aria/metric-card"
import * as BaseMetricCard from "@/components/cubix/base/metric-card"
import * as RadixMetricCard from "@/components/cubix/radix/metric-card"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useMetricCardModule() {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return RadixMetricCard
  if (base === "aria") return AriaMetricCard
  return BaseMetricCard
}

function MetricCard(props: ComponentProps<typeof BaseMetricCard.MetricCard>) {
  const Mod = useMetricCardModule()
  return <Mod.MetricCard {...props} />
}

function MetricCardHeader(props: ComponentProps<typeof BaseMetricCard.MetricCardHeader>) {
  const Mod = useMetricCardModule()
  return <Mod.MetricCardHeader {...props} />
}

function MetricCardIcon(props: ComponentProps<typeof BaseMetricCard.MetricCardIcon>) {
  const Mod = useMetricCardModule()
  return <Mod.MetricCardIcon {...props} />
}

function MetricCardLabel(props: ComponentProps<typeof BaseMetricCard.MetricCardLabel>) {
  const Mod = useMetricCardModule()
  return <Mod.MetricCardLabel {...props} />
}

function MetricCardContent(props: ComponentProps<typeof BaseMetricCard.MetricCardContent>) {
  const Mod = useMetricCardModule()
  return <Mod.MetricCardContent {...props} />
}

function MetricCardValue(props: ComponentProps<typeof BaseMetricCard.MetricCardValue>) {
  const Mod = useMetricCardModule()
  return <Mod.MetricCardValue {...props} />
}

function MetricCardDifferential(props: ComponentProps<typeof BaseMetricCard.MetricCardDifferential>) {
  const Mod = useMetricCardModule()
  return <Mod.MetricCardDifferential {...props} />
}

function MetricCardSparkline(props: ComponentProps<typeof BaseMetricCard.MetricCardSparkline>) {
  const Mod = useMetricCardModule()
  return <Mod.MetricCardSparkline {...props} />
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
}
