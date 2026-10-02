"use client"

import {
  TextField,
  TextFieldClear,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "../docs-text-field"

export function TextFieldClearDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>جستجو در مخاطبین</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput defaultValue="امین" placeholder="نام مخاطب" />
        <TextFieldClear aria-label="پاک کردن" />
      </TextFieldControl>
    </TextField>
  )
}
