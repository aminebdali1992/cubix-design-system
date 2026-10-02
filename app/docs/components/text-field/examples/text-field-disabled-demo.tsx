"use client"

import { TextField, TextFieldDescription, TextFieldInput, TextFieldLabel } from "../docs-text-field"

export function TextFieldDisabledDemo() {
  return (
    <TextField className="w-full max-w-sm" disabled>
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldInput defaultValue="امین ابدالی" placeholder="نام کامل" />
      <TextFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</TextFieldDescription>
    </TextField>
  )
}
