"use client"

import { Label } from "@/components/cubix/label"
import { RadioGroup, RadioGroupItem } from "../docs-radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" aria-label="تراکم نمایش" className="w-fit">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-demo-default" value="default" />
        <Label htmlFor="radio-demo-default">پیش‌فرض</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-demo-comfortable" value="comfortable" />
        <Label htmlFor="radio-demo-comfortable">راحت</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-demo-compact" value="compact" />
        <Label htmlFor="radio-demo-compact">فشرده</Label>
      </div>
    </RadioGroup>
  )
}
