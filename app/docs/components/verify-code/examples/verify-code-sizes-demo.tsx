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
      <VerifyCode size="default">
        <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
      <VerifyCode size="lg">
        <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
        <VerifyCodeControl />
        <VerifyCodeResend />
      </VerifyCode>
    </div>
  )
}
