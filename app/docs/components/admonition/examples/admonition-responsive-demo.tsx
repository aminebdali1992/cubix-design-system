"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Admonition } from "../docs-admonition"

export function AdmonitionResponsiveDemo() {
  return (
    <Admonition
      layout="responsive"
      className="w-full max-w-2xl"
      title="نسخه جدید در دسترس است"
      description="برای استفاده از امکانات تازه، برنامه را به‌روزرسانی کنید."
      actions={
        <Button size="xs" variant="outline">
          به‌روزرسانی
        </Button>
      }
    />
  )
}
