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

const sizes = [
  { size: "default", hint: "ارتفاع ۴۰ پیکسل" },
  { size: "lg", hint: "ارتفاع ۴۸ پیکسل" },
] as const

export function TextFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      {sizes.map(({ size, hint }) => (
        <TextField key={size} size={size}>
          <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
          <TextFieldControl>
            <ButtonDemoIcon data-icon="inline-start" />
            <TextFieldInput placeholder="نام کامل" />
            <TextFieldClear aria-label="پاک کردن" />
          </TextFieldControl>
          <TextFieldDescription>{hint}</TextFieldDescription>
        </TextField>
      ))}
    </div>
  )
}
