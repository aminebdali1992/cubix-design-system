"use client"

import { Label } from "@/components/cubix/label"
import { Switch } from "../docs-switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">حالت هواپیما</Label>
    </div>
  )
}
