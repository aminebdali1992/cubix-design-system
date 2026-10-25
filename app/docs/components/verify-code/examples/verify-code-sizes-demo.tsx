"use client"

import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

export function VerifyCodeSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <VerifyCode className="max-w-[280px] mx-auto" size="default">
        <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
      <VerifyCode className="max-w-[338px] mx-auto" size="lg">
        <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
    </div>
  )
}
