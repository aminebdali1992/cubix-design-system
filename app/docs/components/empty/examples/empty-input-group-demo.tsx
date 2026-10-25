"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
} from "@/app/docs/components/email-field/docs-email-field"
import { MailIcon } from "@/components/docs/mail-icon"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../docs-empty"

export function EmptyInputGroupDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MailIcon />
        </EmptyMedia>
        <EmptyTitle>هنوز عضو خبرنامه نیستید</EmptyTitle>
        <EmptyDescription>
          ایمیل‌تان را وارد کنید تا تازه‌ترین خبرها و به‌روزرسانی‌ها را دریافت کنید.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <form className="flex w-full max-w-sm gap-2" onSubmit={(event) => event.preventDefault()}>
          <EmailField className="flex-1" aria-label="ایمیل">
            <EmailFieldControl>
              <EmailFieldInput placeholder="example@cubix.com" />
            </EmailFieldControl>
          </EmailField>
          <Button type="submit">عضویت</Button>
        </form>
      </EmptyContent>
    </Empty>
  )
}
