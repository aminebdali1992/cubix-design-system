"use client"

import { Label } from "@/components/cubix/label"
import { Checkbox } from "../docs-checkbox"

export function CheckboxDisabledDemo() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-disabled-email" disabled />
        <Label htmlFor="checkbox-disabled-email">اعلان‌های ایمیلی</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-disabled-push" disabled defaultChecked />
        <Label htmlFor="checkbox-disabled-push">اعلان‌های فشاری</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-disabled-sms" disabled indeterminate />
        <Label htmlFor="checkbox-disabled-sms">پیامک‌ها</Label>
      </div>
    </div>
  )
}
