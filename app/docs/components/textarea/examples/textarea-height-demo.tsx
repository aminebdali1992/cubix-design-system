"use client"

import { Textarea, TextareaControl } from "../docs-textarea"

export function TextareaHeightDemo() {
  return (
    <TextareaControl className="w-full max-w-sm">
      <Textarea className="min-h-32" placeholder="یادداشت‌های طولانی..." />
    </TextareaControl>
  )
}
