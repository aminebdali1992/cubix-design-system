"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Chip, Chips } from "../docs-chips"

const sizes = [
  { value: "xs", label: "خیلی کوچک" },
  { value: "sm", label: "کوچک" },
  { value: "default", label: "پیش‌فرض" },
  { value: "lg", label: "بزرگ" },
] as const

export function ChipsSizesDemo() {
  return (
    <Chips multiple defaultValue={sizes.map((size) => size.value)} className="w-fit justify-center">
      {sizes.map((size) => (
        <Chip key={size.value} value={size.value} size={size.value} icon={<ButtonDemoIcon />}>
          {size.label}
        </Chip>
      ))}
    </Chips>
  )
}
