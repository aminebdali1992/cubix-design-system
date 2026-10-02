"use client"

import { Textarea, TextareaControl } from "../docs-textarea"

export function TextareaInvalidDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <label
        htmlFor="textarea-bio-invalid"
        className="w-fit text-label leading-none font-normal text-foreground"
      >
        بیوگرافی
      </label>
      <TextareaControl>
        <Textarea
          id="textarea-bio-invalid"
          aria-invalid
          defaultValue="a"
          placeholder="درباره خودتان بنویسید..."
        />
      </TextareaControl>
      <p className="text-caption text-destructive">بیوگرافی باید حداقل ۱۰ کاراکتر باشد.</p>
    </div>
  )
}
