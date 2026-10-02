"use client"

import { Button } from "@/components/cubix/button"
import { Popover, PopoverContent, PopoverTrigger } from "../docs-popover"

const aligns = [
  { align: "start" as const, label: "از ابتدا" },
  { align: "center" as const, label: "وسط" },
  { align: "end" as const, label: "از انتها" },
]

export function PopoverAlignDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {aligns.map(({ align, label }) => (
        <Popover key={align}>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>{label}</PopoverTrigger>
          <PopoverContent align={align} className="w-40">
            <p className="text-label">تراز {label}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
