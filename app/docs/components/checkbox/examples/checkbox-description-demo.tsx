"use client"

import { Label } from "@/components/cubix/label"
import { Checkbox } from "../docs-checkbox"

export function CheckboxDescriptionDemo() {
  return (
    <div className="flex w-full max-w-sm items-start gap-3 rounded-lg border bg-background p-4">
      <Checkbox
        id="checkbox-description-updates"
        defaultChecked
        aria-describedby="checkbox-description-updates-hint"
        className="mt-0.5"
      />
      <div className="grid gap-1.5">
        <Label htmlFor="checkbox-description-updates">دریافت خبرنامه محصول</Label>
        <p id="checkbox-description-updates-hint" className="text-caption text-muted-foreground">
          ماهی یک ایمیل درباره قابلیت‌های جدید و تغییرات مهم دریافت می‌کنید.
        </p>
      </div>
    </div>
  )
}
