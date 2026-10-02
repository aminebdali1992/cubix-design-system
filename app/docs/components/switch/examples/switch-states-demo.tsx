"use client"

import { Label } from "@/components/cubix/label"
import { Switch } from "../docs-switch"

export function SwitchStatesDemo() {
  return (
    <div className="grid w-fit gap-3">
      <div className="flex items-center gap-2">
        <Switch id="state-on" defaultChecked />
        <Label htmlFor="state-on">روشن</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="state-off" />
        <Label htmlFor="state-off">خاموش</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="state-disabled" disabled />
        <Label htmlFor="state-disabled">غیرفعال</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="state-disabled-on" disabled defaultChecked />
        <Label htmlFor="state-disabled-on">غیرفعال و روشن</Label>
      </div>
    </div>
  )
}
