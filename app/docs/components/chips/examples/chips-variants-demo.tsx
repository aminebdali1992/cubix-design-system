"use client"

import { Chip, Chips } from "../docs-chips"

const variants = [
  { value: "default", label: "طراحی محصول" },
  { value: "secondary", label: "تجربه کاربری" },
  { value: "gray", label: "رابط کاربری" },
  { value: "outline", label: "تحقیق کاربر" },
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
        >
          {variant.label}
        </Chip>
      ))}
    </Chips>
  )
}
