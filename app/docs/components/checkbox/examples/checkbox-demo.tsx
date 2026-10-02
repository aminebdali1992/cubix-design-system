"use client"

import { Label } from "@/components/cubix/label"
import { Checkbox } from "../docs-checkbox"

export function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-demo-terms" defaultChecked />
      <Label htmlFor="checkbox-demo-terms">پذیرش قوانین و شرایط</Label>
    </div>
  )
}
