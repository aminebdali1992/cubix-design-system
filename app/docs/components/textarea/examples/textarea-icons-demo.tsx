"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Textarea, TextareaControl } from "../docs-textarea"

export function TextareaIconsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <label
        htmlFor="textarea-icons"
        className="w-fit text-label leading-none font-normal text-foreground"
      >
        یادداشت
      </label>
      <TextareaControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <Textarea id="textarea-icons" placeholder="یادداشت خود را بنویسید..." />
      </TextareaControl>
    </div>
  )
}
