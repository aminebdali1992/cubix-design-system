"use client"

import {
  NumberField,
  NumberFieldDescription,
  NumberFieldInput,
  NumberFieldLabel,
} from "../docs-number-field"

export function NumberFieldCustomDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="۰"
      />
      <NumberFieldDescription>با className می‌توانید ظاهر را سفارشی کنید.</NumberFieldDescription>
    </NumberField>
  )
}
