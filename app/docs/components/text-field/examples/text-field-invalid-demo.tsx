"use client"

import { TextField, TextFieldError, TextFieldInput, TextFieldLabel } from "../docs-text-field"

export function TextFieldInvalidDemo() {
  return (
    <TextField className="w-full max-w-sm" invalid>
      <TextFieldLabel>نام کاربری</TextFieldLabel>
      <TextFieldInput dir="ltr" defaultValue="amin!" autoComplete="username" />
      <TextFieldError>فقط حروف انگلیسی، عدد و زیرخط مجاز است.</TextFieldError>
    </TextField>
  )
}
