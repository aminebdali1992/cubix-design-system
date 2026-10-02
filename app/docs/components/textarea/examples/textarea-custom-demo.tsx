"use client"

import { Textarea, TextareaControl } from "../docs-textarea"

export function TextareaCustomDemo() {
  return (
    <TextareaControl className="w-full max-w-sm border-border bg-muted has-[[data-slot=textarea]:focus-visible]:bg-background dark:bg-muted dark:has-[[data-slot=textarea]:focus-visible]:bg-background">
      <Textarea placeholder="ظاهر سفارشی با className" />
    </TextareaControl>
  )
}
