"use client"

import { Checkbox } from "@/app/docs/components/checkbox/docs-checkbox"
import { Field } from "@/components/cubix/field"
import { Label } from "../docs-label"

export function LabelCheckboxDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox id="label-checkbox-news" />
      <Label htmlFor="label-checkbox-news">دریافت خبرنامه با ایمیل</Label>
    </Field>
  )
}