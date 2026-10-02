"use client"

import { Textarea, TextareaControl } from "../docs-textarea"

export function TextareaLabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <label
        htmlFor="textarea-message"
        className="w-fit text-label leading-none font-normal text-foreground"
      >
        پیام
      </label>
      <TextareaControl>
        <Textarea id="textarea-message" placeholder="پیام خود را بنویسید..." />
      </TextareaControl>
      <p className="text-caption text-muted-foreground">پیام شما به تیم پشتیبانی ارسال می‌شود.</p>
    </div>
  )
}
