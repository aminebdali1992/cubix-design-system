"use client"

import { Button } from "@/components/cubix/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../docs-tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="sm" />}>نگه دارید</TooltipTrigger>
      <TooltipContent>افزودن به کتابخانه</TooltipContent>
    </Tooltip>
  )
}
