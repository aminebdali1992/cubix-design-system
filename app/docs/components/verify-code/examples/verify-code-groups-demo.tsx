"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

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
