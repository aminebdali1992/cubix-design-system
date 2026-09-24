"use client"

import { PlusIcon, SaveIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Kbd } from "@/components/cubix/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/cubix/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function TooltipSidesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(["left", "top", "bottom", "right"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger
            render={<Button variant="outline" className="w-fit capitalize" />}
          >
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function TooltipKeyboardDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="outline" size="icon-sm" aria-label="Save" />}
      >
        <SaveIcon />
      </TooltipTrigger>
      <TooltipContent>
        Save Changes <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}

export function TooltipDisabledDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-block w-fit" />}>
        <Button variant="outline" disabled>
          Disabled
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function TooltipRtlDemo() {
  return (
    <div dir="rtl" className="flex flex-wrap items-center justify-center gap-2">
      {(["top", "bottom", "inline-start", "inline-end"] as const).map(
        (side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>
              {side}
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        )
      )}
    </div>
  )
}

export function TooltipIconDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Add to library" />
        }
      >
        <PlusIcon />
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  )
}

export function TooltipDelayDemo() {
  return (
    <TooltipProvider delay={700}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Slow open
        </TooltipTrigger>
        <TooltipContent>Opens after 700ms</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
