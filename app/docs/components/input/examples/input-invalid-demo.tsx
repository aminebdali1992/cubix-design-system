"use client"

import { Input } from "../docs-input"

export function InputInvalidDemo() {
  return (
    <Input type="email" placeholder="ایمیل" aria-invalid className="max-w-sm" />
  )
}
