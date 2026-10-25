"use client"

import { Textarea } from "@/app/docs/components/textarea/docs-textarea"
import { Field } from "@/components/cubix/field"
import { Label } from "../docs-label"

export function LabelTextareaDemo() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-textarea-message">پیام</Label>
      <Textarea id="label-textarea-message" placeholder="پیام خود را بنویسید" />
    </Field>
  )
}