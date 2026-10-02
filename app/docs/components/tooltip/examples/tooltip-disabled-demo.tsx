"use client"

import { Button } from "@/components/cubix/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../docs-tooltip"

export function TooltipDisabledDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<span tabIndex={0} className="inline-block w-fit" />}>
        <Button variant="outline" size="sm" disabled>
          غیرفعال
        </Button>
      </TooltipTrigger>
      <TooltipContent>این قابلیت فعلاً در دسترس نیست</TooltipContent>
    </Tooltip>
  )
}
