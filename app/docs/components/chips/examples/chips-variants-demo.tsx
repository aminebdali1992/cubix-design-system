"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Chip, Chips } from "../docs-chips"

const variants = [
  { value: "default", label: "پیش‌فرض" },
  { value: "secondary", label: "ثانویه" },
  { value: "gray", label: "خاکستری" },
  { value: "outline", label: "خط‌دار" },
] as const

export function ChipsVariantsDemo() {
  return (
    <Chips
      multiple
      defaultValue={variants.map((variant) => variant.value)}
      className="w-fit justify-center"
    >
      {variants.map((variant) => (
        <Chip
          key={variant.value}
          value={variant.value}
          variant={variant.value}
          icon={<ButtonDemoIcon />}
        >
          {variant.label}
        </Chip>
      ))}
    </Chips>
  )
}
