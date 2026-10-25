"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Admonition } from "../docs-admonition"

export function AdmonitionDemo() {
  return (
    <Admonition
      className="w-full max-w-2xl"
      title="نسخه‌ی جدید داشبورد منتشر شد"
      description="امکانات تازه و بهبودهای عملکرد رو همین الان امتحان کنید."
      actions={
        <Button size="xs" variant="outline">
          مشاهده
        </Button>
      }
    />
  )
}
