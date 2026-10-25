"use client"

import { Input } from "@/app/docs/components/input/docs-input"
import { Field } from "@/components/cubix/field"
import { Label } from "../docs-label"

export function LabelDisabledDemo() {
  return (
    <Field className="w-full max-w-xs" data-disabled={true}>
      <Label htmlFor="label-disabled-input">غیرفعال</Label>
      <Input id="label-disabled-input" placeholder="غیرفعال" disabled />
    </Field>
  )
}