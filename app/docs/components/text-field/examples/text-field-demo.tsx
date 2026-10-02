"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import {
  TextField,
  TextFieldClear,
  TextFieldControl,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from "../docs-text-field"

export function TextFieldDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <TextFieldInput defaultValue="امین ابدالی" placeholder="نام کامل" />
        <TextFieldClear aria-label="پاک کردن" />
      </TextFieldControl>
      <TextFieldDescription>نام کامل خود را وارد کنید.</TextFieldDescription>
    </TextField>
  )
}
