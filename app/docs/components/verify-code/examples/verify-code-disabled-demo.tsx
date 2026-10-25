"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

export function VerifyCodeDisabledDemo() {
  return (
    <VerifyCode className="w-full max-w-[280px] mx-auto" disabled>
      <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
      <VerifyCodeControl />
      <VerifyCodeResend />
    </VerifyCode>
  )
}
