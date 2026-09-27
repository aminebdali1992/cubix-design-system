"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeError,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "@/app/docs/components/verify-code/docs-verify-code"

export function VerifyCodeDemo() {
  return (
    <VerifyCode className="w-full max-w-sm">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend />
    </VerifyCode>
  )
}

export function VerifyCodeLengthDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <VerifyCode length={4}>
        <VerifyCodeLabel>کد ۴ رقمی</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
      <VerifyCode length={6}>
        <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
    </div>
  )
}

export function VerifyCodeGroupsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <VerifyCode length={6} groups={[3, 3]}>
        <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
      <VerifyCode length={6} groups={[2, 2, 2]}>
        <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
    </div>
  )
}

export function VerifyCodeInvalidDemo() {
  return (
    <VerifyCode className="w-full max-w-sm" invalid defaultValue="۱۲۳۴">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend />
      <VerifyCodeError>کد تایید معتبر نیست.</VerifyCodeError>
    </VerifyCode>
  )
}

export function VerifyCodeDisabledDemo() {
  return (
    <VerifyCode className="w-full max-w-sm" disabled>
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend />
    </VerifyCode>
  )
}

export function VerifyCodeSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <VerifyCode size="default">
        <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
      <VerifyCode size="lg">
        <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
    </div>
  )
}

export function VerifyCodeResendDemo() {
  return (
    <VerifyCode className="w-full max-w-sm">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend duration={120} />
    </VerifyCode>
  )
}

export function VerifyCodeFilledDemo() {
  return (
    <VerifyCode className="w-full max-w-sm" defaultValue="۱۲۳۴۵۶">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend />
    </VerifyCode>
  )
}

export function VerifyCodeFormDemo() {
  return (
    <form
      className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          تایید هویت
        </p>
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

export function VerifyCodeCustomDemo() {
  return (
    <VerifyCode className="w-full max-w-sm">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl digitClassName="border-border bg-muted dark:bg-muted" />
      <VerifyCodeResend />
    </VerifyCode>
  )
}
