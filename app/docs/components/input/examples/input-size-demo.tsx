"use client"

import { Input } from "../docs-input"

export function InputSizeDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Input size="default" placeholder="پیش‌فرض (۴۰ پیکسل)" />
      <Input size="lg" placeholder="بزرگ (۴۸ پیکسل)" />
    </div>
  )
}
