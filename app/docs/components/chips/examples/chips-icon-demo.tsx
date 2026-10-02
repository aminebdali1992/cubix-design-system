"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Chip, Chips } from "../docs-chips"

const skills = [
  { value: "design", label: "طراحی", icon: <ButtonDemoIcon /> },
  { value: "frontend", label: "فرانت‌اند", icon: <ButtonDemoIcon /> },
  { value: "backend", label: "بک‌اند", icon: <ButtonDemoIcon /> },
]

export function ChipsIconDemo() {
  return (
    <Chips defaultValue={["design"]} className="w-fit justify-center">
      {skills.map((skill) => (
        <Chip key={skill.value} value={skill.value} icon={skill.icon}>
          {skill.label}
        </Chip>
      ))}
    </Chips>
  )
}
