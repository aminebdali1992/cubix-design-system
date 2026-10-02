"use client"

import { Chip, Chips } from "../docs-chips"

const skills = [
  { value: "design", label: "طراحی" },
  { value: "frontend", label: "فرانت‌اند" },
  { value: "backend", label: "بک‌اند" },
  { value: "devops", label: "دواپس" },
]

export function ChipsMultipleDemo() {
  return (
    <Chips multiple defaultValue={["design", "frontend"]} className="w-fit justify-center">
      {skills.map((skill) => (
        <Chip key={skill.value} value={skill.value}>
          {skill.label}
        </Chip>
      ))}
    </Chips>
  )
}
