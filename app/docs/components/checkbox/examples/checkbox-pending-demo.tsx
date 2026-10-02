"use client"

import * as React from "react"

import { Label } from "@/components/cubix/label"
import { Checkbox } from "../docs-checkbox"

const SAVE_DELAY_MS = 1500

export function CheckboxPendingDemo() {
  const [checked, setChecked] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const timeoutRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  function handleCheckedChange(next: boolean) {
    setChecked(next)
    setPending(true)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setPending(false), SAVE_DELAY_MS)
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="checkbox-pending-save"
        checked={checked}
        pending={pending}
        onCheckedChange={handleCheckedChange}
      />
      <Label htmlFor="checkbox-pending-save">ذخیره خودکار پیش‌نویس‌ها</Label>
    </div>
  )
}
