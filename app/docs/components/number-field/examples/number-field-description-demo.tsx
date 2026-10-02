"use client"

import {
  NumberField,
  NumberFieldDescription,
  NumberFieldInput,
  NumberFieldLabel,
} from "../docs-number-field"

export function NumberFieldDescriptionDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldInput placeholder="۰" />
      <NumberFieldDescription>مقدار باید یک عدد صحیح باشد.</NumberFieldDescription>
    </NumberField>
  )
}
