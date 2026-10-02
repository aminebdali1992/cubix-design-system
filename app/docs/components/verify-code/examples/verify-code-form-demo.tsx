"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

export function VerifyCodeFormDemo() {
  return (
    <form
      className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">تایید هویت</p>
        <p className="text-caption text-muted-foreground">
          کد ارسال‌شده را وارد کنید تا ادامه دهید.
        </p>
      </div>
      <VerifyCode name="verifyCode">
        <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">تایید</Button>
      </div>
    </form>
  )
}
