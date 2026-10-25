"use client"

import { Label } from "@/components/cubix/label"
import { Checkbox } from "../docs-checkbox"

export function CheckboxDescriptionDemo() {
  return (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <Checkbox
          id="checkbox-description-updates"
          defaultChecked
          aria-describedby="checkbox-description-updates-hint"
        />
        <Label htmlFor="checkbox-description-updates">دریافت خبرنامه ماهانه محصول</Label>
      </div>
      <p
        id="checkbox-description-updates-hint"
        className="mt-1.5 ps-[26px] text-caption text-muted-foreground"
      >
        ماهی یک ایمیل درباره قابلیت‌های تازه، تغییرات مهم و پیشنهادهای ویژه برایتان می‌فرستیم. هر زمان بخواهید می‌توانید اشتراک را لغو کنید.
      </p>
    </div>
  )
}