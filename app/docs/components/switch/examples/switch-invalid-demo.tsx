"use client"

import { Label } from "@/components/cubix/label"
import { Switch } from "../docs-switch"

export function SwitchInvalidDemo() {
  return (
    <div className="grid w-fit gap-2">
      <div className="flex items-center gap-2">
        <Switch id="terms" aria-invalid />
        <Label htmlFor="terms">پذیرش قوانین و شرایط</Label>
      </div>
      <p className="ps-11 text-caption text-destructive">برای ادامه باید این گزینه را روشن کنید.</p>
    </div>
  )
}
