"use client"

import { Label } from "@/components/cubix/label"
import { RadioGroup, RadioGroupItem } from "../docs-radio-group"

const alignments = [
  { value: "start", label: "ابتدا" },
  { value: "center", label: "وسط" },
  { value: "end", label: "انتها" },
]

export function RadioGroupHorizontalDemo() {
  return (
    <RadioGroup defaultValue="center" aria-label="تراز متن" className="flex w-fit gap-6">
      {alignments.map((alignment) => (
        <div key={alignment.value} className="flex items-center gap-2">
          <RadioGroupItem id={`radio-align-${alignment.value}`} value={alignment.value} />
          <Label htmlFor={`radio-align-${alignment.value}`}>{alignment.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
