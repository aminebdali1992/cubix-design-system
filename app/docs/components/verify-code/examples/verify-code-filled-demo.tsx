"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

export function VerifyCodeFilledDemo() {
  return (
    <VerifyCode className="w-full max-w-sm" defaultValue="۱۲۳۴۵۶">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend />
    </VerifyCode>
  )
}
