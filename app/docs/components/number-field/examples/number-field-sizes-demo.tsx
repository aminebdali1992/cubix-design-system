"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import {
  NumberField,
  NumberFieldControl,
  NumberFieldDescription,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldStepper,
} from "../docs-number-field"

const sizes = [
  { size: "default", hint: "ارتفاع ۴۰ پیکسل" },
  { size: "lg", hint: "ارتفاع ۴۸ پیکسل" },
] as const

export function NumberFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      {sizes.map(({ size, hint }) => (
        <NumberField key={size} size={size}>
          <NumberFieldLabel>تعداد</NumberFieldLabel>
          <NumberFieldControl>
            <ButtonDemoIcon data-icon="inline-start" />
            <NumberFieldInput placeholder="۰" />
            <NumberFieldStepper />
          </NumberFieldControl>
          <NumberFieldDescription>{hint}</NumberFieldDescription>
        </NumberField>
      ))}
    </div>
  )
}
