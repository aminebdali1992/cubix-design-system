"use client"

import * as React from "react"

import { Label } from "@/components/cubix/label"
import { Switch } from "../docs-switch"

export function SwitchControlledDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div className="grid w-fit gap-3">
      <div className="flex items-center gap-2">
        <Switch id="notify" checked={checked} onCheckedChange={setChecked} />
        <Label htmlFor="notify">اعلان‌ها</Label>
      </div>
      <p className="text-caption text-muted-foreground">وضعیت: {checked ? "روشن" : "خاموش"}</p>
    </div>
  )
}
