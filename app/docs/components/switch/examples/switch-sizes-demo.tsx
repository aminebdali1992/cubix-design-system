"use client"

import { Label } from "@/components/cubix/label"
import { Switch } from "../docs-switch"

export function SwitchSizesDemo() {
  return (
    <div className="grid w-fit gap-3">
      <div className="flex items-center gap-2">
        <Switch size="sm" id="size-sm" defaultChecked />
        <Label htmlFor="size-sm">کوچک</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="size-default" defaultChecked />
        <Label htmlFor="size-default">پیش‌فرض</Label>
      </div>
    </div>
  )
}
