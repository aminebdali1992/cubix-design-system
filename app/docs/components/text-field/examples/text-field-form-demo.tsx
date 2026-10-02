"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "@/app/docs/components/button/docs-button"
import {
  TextField,
  TextFieldClear,
  TextFieldControl,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from "../docs-text-field"

export function TextFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">ایجاد حساب</p>
        <p className="text-caption text-muted-foreground">برای ادامه، نام کامل خود را وارد کنید.</p>
      </div>
      <TextField name="fullName">
        <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
        <TextFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <TextFieldInput placeholder="نام کامل" autoComplete="name" required />
          <TextFieldClear aria-label="پاک کردن" />
        </TextFieldControl>
        <TextFieldDescription>همان نامی که در مدارک رسمی ثبت شده است.</TextFieldDescription>
      </TextField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}
