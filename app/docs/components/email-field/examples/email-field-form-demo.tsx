"use client"

import { MailIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  EmailField,
  EmailFieldClear,
  EmailFieldControl,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "../docs-email-field"

export function EmailFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">ورود با ایمیل</p>
        <p className="text-caption text-muted-foreground">لینک ورود به این آدرس ارسال می‌شود.</p>
      </div>
      <EmailField name="email">
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldControl>
          <MailIcon data-icon="inline-start" />
          <EmailFieldInput placeholder="example@cubix.com" required />
          <EmailFieldClear aria-label="پاک کردن" />
        </EmailFieldControl>
        <EmailFieldDescription>یک آدرس ایمیل معتبر وارد کنید.</EmailFieldDescription>
      </EmailField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ارسال لینک</Button>
      </div>
    </form>
  )
}
