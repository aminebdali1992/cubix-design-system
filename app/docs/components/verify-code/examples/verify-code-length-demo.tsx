"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

export function VerifyCodeLengthDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <VerifyCode className="max-w-[280px] mx-auto" length={4}>
        <VerifyCodeLabel>کد ۴ رقمی</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
      <VerifyCode className="max-w-[280px] mx-auto" length={6}>
        <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
    </div>
  )
}
