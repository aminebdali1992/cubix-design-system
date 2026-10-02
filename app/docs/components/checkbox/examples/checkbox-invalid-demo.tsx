"use client"

import { Label } from "@/components/cubix/label"
import { Checkbox } from "../docs-checkbox"

export function CheckboxInvalidDemo() {
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="checkbox-invalid-terms"
          aria-invalid
          aria-describedby="checkbox-invalid-terms-error"
        />
        <Label htmlFor="checkbox-invalid-terms">پذیرش قوانین و شرایط</Label>
      </div>
      <p id="checkbox-invalid-terms-error" className="ps-6.5 text-caption text-destructive">
        برای ادامه باید قوانین را بپذیرید.
      </p>
    </div>
  )
}
