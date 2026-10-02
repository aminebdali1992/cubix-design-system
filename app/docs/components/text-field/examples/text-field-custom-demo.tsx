"use client"

import { TextField, TextFieldDescription, TextFieldInput, TextFieldLabel } from "../docs-text-field"

export function TextFieldCustomDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="نام کامل"
      />
      <TextFieldDescription>با className می‌توانید ظاهر را سفارشی کنید.</TextFieldDescription>
    </TextField>
  )
}
