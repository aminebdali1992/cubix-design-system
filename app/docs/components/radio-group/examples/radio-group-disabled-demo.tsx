"use client"

import { Label } from "@/components/cubix/label"
import { RadioGroup, RadioGroupItem } from "../docs-radio-group"

export function RadioGroupDisabledDemo() {
  return (
    <RadioGroup defaultValue="email" aria-label="کانال اعلان" className="w-fit">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-disabled-email" value="email" />
        <Label htmlFor="radio-disabled-email">ایمیل</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-disabled-sms" value="sms" disabled />
        <Label htmlFor="radio-disabled-sms">پیامک (به‌زودی)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-disabled-push" value="push" />
        <Label htmlFor="radio-disabled-push">اعلان فشاری</Label>
      </div>
    </RadioGroup>
  )
}
