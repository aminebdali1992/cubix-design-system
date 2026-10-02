"use client"

import { Chip, Chips } from "../docs-chips"

const categories = [
  { value: "electronics", label: "لوازم دیجیتال" },
  { value: "fashion", label: "پوشاک" },
  { value: "home", label: "خانه و آشپزخانه" },
]

export function ChipsDisabledDemo() {
  return (
    <Chips disabled defaultValue={["fashion"]} className="w-fit justify-center">
      {categories.map((category) => (
        <Chip key={category.value} value={category.value}>
          {category.label}
        </Chip>
      ))}
    </Chips>
  )
}
