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
      <VerifyCode className="max-w-[296px] mx-auto" length={6} groups={[3, 3]}>
        <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
      <VerifyCode className="max-w-[312px] mx-auto" length={6} groups={[2, 2, 2]}>
        <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
    </div>
  )
}
