"use client"

import { Chip, Chips } from "../docs-chips"

const categories = [
  { value: "electronics", label: "لوازم دیجیتال" },
  { value: "fashion", label: "پوشاک" },
  { value: "home", label: "خانه و آشپزخانه" },
  { value: "beauty", label: "زیبایی و سلامت" },
  { value: "books", label: "کتاب" },
]

export function ChipsDemo() {
  return (
    <Chips defaultValue={["fashion"]} className="w-fit max-w-md justify-center">
      {categories.map((category) => (
        <Chip key={category.value} value={category.value}>
          {category.label}
        </Chip>
      ))}
    </Chips>
  )
}
