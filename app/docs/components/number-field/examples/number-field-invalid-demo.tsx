"use client"

import {
  NumberField,
  NumberFieldControl,
  NumberFieldError,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldStepper,
} from "../docs-number-field"

export function NumberFieldInvalidDemo() {
  return (
    <NumberField className="w-full max-w-sm" invalid>
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldControl>
        <NumberFieldInput defaultValue="۰" placeholder="۰" />
        <NumberFieldStepper />
      </NumberFieldControl>
      <NumberFieldError>تعداد باید حداقل ۱ باشد.</NumberFieldError>
    </NumberField>
  )
}
