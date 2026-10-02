"use client"

import { Button } from "@/components/cubix/button"
import { Popover, PopoverContent, PopoverTrigger } from "../docs-popover"

const sides = [
  { side: "top" as const, label: "بالا" },
  { side: "right" as const, label: "راست" },
  { side: "bottom" as const, label: "پایین" },
  { side: "left" as const, label: "چپ" },
]

export function PopoverSidesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {sides.map(({ side, label }) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>{label}</PopoverTrigger>
          <PopoverContent side={side} className="w-40">
            <p className="text-center text-label">پاپ‌آور سمت {label}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
