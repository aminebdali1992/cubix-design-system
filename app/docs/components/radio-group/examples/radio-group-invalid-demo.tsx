"use client"

import { Label } from "@/components/cubix/label"
import { RadioGroup, RadioGroupItem } from "../docs-radio-group"

const options = [
  { value: "monthly", label: "پرداخت ماهانه" },
  { value: "yearly", label: "پرداخت سالانه" },
]

export function RadioGroupInvalidDemo() {
  return (
    <div className="grid gap-2">
      <RadioGroup aria-label="دوره پرداخت" aria-invalid className="w-fit">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem
              id={`radio-invalid-${option.value}`}
              value={option.value}
              aria-invalid
            />
            <Label htmlFor={`radio-invalid-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <p className="ps-6.5 text-caption text-destructive">یک دوره پرداخت انتخاب کنید.</p>
    </div>
  )
}
