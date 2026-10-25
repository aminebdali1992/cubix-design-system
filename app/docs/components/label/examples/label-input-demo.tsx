"use client"

import { Input } from "@/app/docs/components/input/docs-input"
import { Field } from "@/components/cubix/field"
import { Label } from "../docs-label"

export function LabelInputDemo() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-input-username">نام کاربری</Label>
      <Input id="label-input-username" placeholder="نام کاربری را وارد کنید" />
    </Field>
  )
}