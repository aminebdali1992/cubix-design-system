"use client"

import { SaveIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Kbd } from "@/components/cubix/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../docs-tooltip"

export function TooltipKeyboardDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon-sm" aria-label="ذخیره" />}>
        <SaveIcon />
      </TooltipTrigger>
      <TooltipContent>
        ذخیره تغییرات <Kbd>Ctrl + S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
