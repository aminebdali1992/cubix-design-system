"use client"

import * as React from "react"

import { Chip, Chips } from "../docs-chips"

const skills = [
  { value: "design", label: "طراحی" },
  { value: "frontend", label: "فرانت‌اند" },
  { value: "backend", label: "بک‌اند" },
]

export function ChipsControlledDemo() {
  const [value, setValue] = React.useState<string[]>(["design"])
  const selectedLabels = skills
    .filter((skill) => value.includes(skill.value))
    .map((skill) => skill.label)

  return (
    <div className="flex flex-col items-center gap-4">
      <Chips multiple value={value} onValueChange={setValue} className="w-fit justify-center">
        {skills.map((skill) => (
          <Chip key={skill.value} value={skill.value}>
            {skill.label}
          </Chip>
        ))}
      </Chips>
      <p aria-live="polite" className="text-caption text-muted-foreground">
        انتخاب‌شده: {selectedLabels.length ? selectedLabels.join("، ") : "هیچ‌کدام"}
      </p>
    </div>
  )
}
