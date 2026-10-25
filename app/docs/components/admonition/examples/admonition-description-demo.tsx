"use client"

import { Admonition } from "../docs-admonition"

export function AdmonitionDescriptionDemo() {
  return (
    <Admonition
      type="note"
      className="w-full max-w-2xl"
      description="اعمال تغییرات ممکن است چند دقیقه طول بکشد."
    />
  )
}
