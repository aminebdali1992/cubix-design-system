"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeError,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

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
