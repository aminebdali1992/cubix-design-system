"use client"

import { LockIcon } from "@/components/docs/empty-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../docs-input-group"

export function InputGroupInlineEndDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
            aria-label="رمز عبور"
          type="password"
          placeholder="رمز عبور را وارد کنید"
        />
        <InputGroupAddon align="inline-end">
          <LockIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}