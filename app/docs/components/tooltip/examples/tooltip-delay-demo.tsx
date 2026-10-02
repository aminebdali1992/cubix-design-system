"use client"

import { Button } from "@/components/cubix/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../docs-tooltip"

export function TooltipDelayDemo() {
  return (
    <Tooltip delay={700}>
      <TooltipTrigger render={<Button variant="outline" size="sm" />}>
        باز شدن با تأخیر
      </TooltipTrigger>
      <TooltipContent>بعد از ۷۰۰ میلی‌ثانیه باز می‌شود</TooltipContent>
    </Tooltip>
  )
}
