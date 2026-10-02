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

export function NumberFieldDisabledDemo() {
  return (
    <NumberField className="w-full max-w-sm" disabled>
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
        <NumberFieldStepper />
      </NumberFieldControl>
      <NumberFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</NumberFieldDescription>
    </NumberField>
  )
}
