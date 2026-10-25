"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Admonition } from "../docs-admonition"

export function AdmonitionWarningDemo() {
  return (
    <Admonition
      type="warning"
      className="w-full max-w-2xl"
      title="تأیید دستی لازم است"
      description="پیش از ادامه، تغییرات در انتظار را بررسی و تأیید کنید."
      actions={
        <Button size="xs" variant="warning">
          بررسی تغییرات
        </Button>
      }
    />
  )
}
