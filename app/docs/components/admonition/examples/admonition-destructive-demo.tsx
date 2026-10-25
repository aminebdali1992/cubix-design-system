"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Admonition } from "../docs-admonition"

export function AdmonitionDestructiveDemo() {
  return (
    <Admonition
      type="destructive"
      className="w-full max-w-2xl"
      title="حذف پروژه غیرقابل بازگشت است"
      description="با حذف این پروژه، تمام داده‌ها و فایل‌های آن برای همیشه پاک می‌شوند."
      actions={
        <Button size="xs" variant="destructive">
          حذف پروژه
        </Button>
      }
    />
  )
}
