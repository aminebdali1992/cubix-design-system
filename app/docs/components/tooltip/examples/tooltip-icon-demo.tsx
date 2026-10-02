"use client"

import { BookmarkPlusIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../docs-tooltip"

export function TooltipIconDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="outline" size="icon-sm" aria-label="افزودن به کتابخانه" />}
      >
        <BookmarkPlusIcon />
      </TooltipTrigger>
      <TooltipContent>افزودن به کتابخانه</TooltipContent>
    </Tooltip>
  )
}
