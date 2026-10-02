"use client"

import { SmartphoneIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  PhoneField,
  PhoneFieldClear,
  PhoneFieldControl,
  PhoneFieldDescription,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "../docs-phone-field"

export function PhoneFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">ورود با شماره همراه</p>
        <p className="text-caption text-muted-foreground">کد تأیید به این شماره ارسال می‌شود.</p>
      </div>
      <PhoneField name="phone">
        <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
        <PhoneFieldControl>
          <SmartphoneIcon data-icon="inline-start" />
          <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" required />
          <PhoneFieldClear aria-label="پاک کردن" />
        </PhoneFieldControl>
        <PhoneFieldDescription>یک شماره همراه معتبر وارد کنید.</PhoneFieldDescription>
      </PhoneField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">دریافت کد</Button>
      </div>
    </form>
  )
}
