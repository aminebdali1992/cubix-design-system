"use client"

import { Admonition } from "../docs-admonition"

export function AdmonitionSuccessDemo() {
  return (
    <Admonition
      type="success"
      className="w-full max-w-2xl"
      title="اتصال تأیید شد"
      description="حساب شما با موفقیت متصل شد. اکنون می‌توانید این صفحه را ببندید."
    />
  )
}
