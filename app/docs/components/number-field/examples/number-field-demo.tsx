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

export function NumberFieldDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
        <NumberFieldStepper />
      </NumberFieldControl>
      <NumberFieldDescription>
        فقط عدد وارد کنید. با فلش‌ها مقدار را کم یا زیاد کنید.
      </NumberFieldDescription>
    </NumberField>
  )
}
