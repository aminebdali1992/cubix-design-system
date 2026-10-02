"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

export function VerifyCodeCustomDemo() {
  return (
    <VerifyCode className="w-full max-w-sm">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl digitClassName="border-border bg-muted dark:bg-muted" />
      <VerifyCodeResend />
    </VerifyCode>
  )
}
