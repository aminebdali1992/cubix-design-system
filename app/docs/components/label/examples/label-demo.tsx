"use client"

import { Checkbox } from "@/app/docs/components/checkbox/docs-checkbox"
import { Field } from "@/components/cubix/field"
import { Label } from "../docs-label"

export function LabelDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">قوانین و مقررات را می‌پذیرم</Label>
    </Field>
  )
}