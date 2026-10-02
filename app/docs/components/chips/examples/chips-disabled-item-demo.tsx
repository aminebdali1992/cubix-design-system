"use client"

import { Chip, Chips } from "../docs-chips"

const categories = [
  { value: "electronics", label: "لوازم دیجیتال" },
  { value: "fashion", label: "پوشاک" },
  { value: "books", label: "کتاب", disabled: true },
]

export function ChipsDisabledItemDemo() {
  return (
    <Chips defaultValue={["fashion"]} className="w-fit justify-center">
      {categories.map((category) => (
        <Chip key={category.value} value={category.value} disabled={category.disabled}>
          {category.label}
        </Chip>
      ))}
    </Chips>
  )
}
