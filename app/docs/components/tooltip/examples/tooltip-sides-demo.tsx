"use client"

import { Button } from "@/components/cubix/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../docs-tooltip"

const sides = [
  { side: "top" as const, label: "بالا" },
  { side: "bottom" as const, label: "پایین" },
  { side: "inline-start" as const, label: "ابتدا" },
  { side: "inline-end" as const, label: "انتها" },
]

export function TooltipSidesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {sides.map(({ side, label }) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>{label}</TooltipTrigger>
          <TooltipContent side={side}>افزودن به کتابخانه</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
