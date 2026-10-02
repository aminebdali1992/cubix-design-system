"use client"

import { Label } from "@/components/cubix/label"
import { Switch } from "../docs-switch"

export function SwitchDescriptionDemo() {
  return (
    <div className="flex w-full max-w-sm items-start justify-between gap-4 rounded-lg border p-4">
      <Label htmlFor="analytics" className="grid gap-1.5 leading-none">
        <span className="text-label font-normal text-foreground">اشتراک‌گذاری آمار</span>
        <span className="text-caption font-normal text-muted-foreground">
          با ارسال داده‌های ناشناس استفاده، به بهبود Cubix کمک کنید.
        </span>
      </Label>
      <Switch id="analytics" defaultChecked className="mt-0.5" />
    </div>
  )
}
