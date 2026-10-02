"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { TextField, TextFieldControl, TextFieldInput, TextFieldLabel } from "../docs-text-field"

export function TextFieldIconsDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <TextFieldInput defaultValue="امین ابدالی" placeholder="نام کامل" />
        <ButtonDemoIcon data-icon="inline-end" />
      </TextFieldControl>
    </TextField>
  )
}
