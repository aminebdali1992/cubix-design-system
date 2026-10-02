"use client"

import { Label } from "@/components/cubix/label"
import { Switch } from "../docs-switch"

export function SwitchCustomDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="custom-switch"
        defaultChecked
        className="data-checked:bg-emerald-600 data-unchecked:bg-muted-foreground/30 data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-muted-foreground/30 dark:data-unchecked:bg-muted-foreground/30 dark:data-[state=unchecked]:bg-muted-foreground/30"
      />
      <Label htmlFor="custom-switch">اعلان‌های ایمیلی</Label>
    </div>
  )
}
