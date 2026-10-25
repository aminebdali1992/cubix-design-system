"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeResend,
  VerifyCodeLabel,
} from "../docs-verify-code"

export function VerifyCodeInvalidDemo() {
  return (
    <VerifyCode className="w-full max-w-[280px] mx-auto" invalid defaultValue="۱۲۳۴">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend
        waitingLabel={<span className="text-destructive">کد تایید معتبر نیست.</span>}
        expiredLabel={<span className="text-destructive">کد تایید معتبر نیست.</span>}
      />
    </VerifyCode>
  )
}
