"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import {
  NumberField,
  NumberFieldControl,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldStepper,
} from "../docs-number-field"

export function NumberFieldIconsDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>موجودی انبار</NumberFieldLabel>
      <NumberFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <NumberFieldInput placeholder="۰" />
        <NumberFieldStepper />
      </NumberFieldControl>
    </NumberField>
  )
}
