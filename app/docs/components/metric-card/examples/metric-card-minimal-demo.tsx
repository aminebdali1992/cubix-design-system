"use client"

import { useEffect, useState } from "react"

import {
  MetricCard,
  MetricCardContent,
  MetricCardDifferential,
  MetricCardHeader,
  MetricCardLabel,
  MetricCardValue,
} from "../docs-metric-card"

export function MetricCardMinimalDemo() {
  const [data, setData] = useState<Array<{ value: number; timestamp: string }>>([])

  useEffect(() => {
    const now = new Date()
    setData(
      Array.from({ length: 12 }, (_, i) => ({
        value: Math.floor(4000 + i * 100 + (Math.random() * 2000 - 800)),
        timestamp: new Date(now.getTime() - (11 - i) * 60 * 60 * 1000).toISOString(),
      }))
    )
  }, [])

  const averageValue = data.reduce((acc, curr) => acc + curr.value, 0) / data.length
  const diff = data[data.length - 1]?.value - data[0]?.value || 0
  const diffPercentage = (diff / averageValue) * 100

  return (
    <div className="w-full max-w-xs">
      <MetricCard isLoading={!data.length}>
        <MetricCardHeader>
          <MetricCardLabel>کاربران فعال</MetricCardLabel>
        </MetricCardHeader>
        <MetricCardContent>
          <MetricCardValue>
            {averageValue.toLocaleString("fa-IR", { maximumFractionDigits: 0 })}
          </MetricCardValue>
          <MetricCardDifferential variant={diffPercentage > 0 ? "positive" : "negative"}>
            {diffPercentage > 0 ? "+" : "-"}
            {Math.abs(diffPercentage).toLocaleString("fa-IR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }).replace("٫", ".")}
            ٪
          </MetricCardDifferential>
        </MetricCardContent>
      </MetricCard>
    </div>
  )
}
