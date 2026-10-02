"use client"

import { TextField, TextFieldDescription, TextFieldInput, TextFieldLabel } from "../docs-text-field"

export function TextFieldDescriptionDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام کاربری</TextFieldLabel>
      <TextFieldInput dir="ltr" placeholder="amin" autoComplete="username" />
      <TextFieldDescription>فقط حروف انگلیسی، عدد و زیرخط مجاز است.</TextFieldDescription>
    </TextField>
  )
}
