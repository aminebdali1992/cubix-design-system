"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

export function VerifyCodeResendDemo() {
  return (
    <VerifyCode className="w-full max-w-[280px] mx-auto">
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend duration={120} />
    </VerifyCode>
  )
}
