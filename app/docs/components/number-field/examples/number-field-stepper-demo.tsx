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

export function NumberFieldStepperDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد مهمان</NumberFieldLabel>
      <NumberFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <NumberFieldInput defaultValue="۲" min={1} max={10} placeholder="۱" />
        <NumberFieldStepper />
      </NumberFieldControl>
      <NumberFieldDescription>بین ۱ تا ۱۰ نفر.</NumberFieldDescription>
    </NumberField>
  )
}
