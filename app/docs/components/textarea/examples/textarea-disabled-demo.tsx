"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Textarea, TextareaControl } from "../docs-textarea"

export function TextareaDisabledDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <label
        htmlFor="textarea-disabled"
        className="w-fit text-label leading-none font-normal text-muted-foreground"
      >
        یادداشت
      </label>
      <TextareaControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <Textarea
          id="textarea-disabled"
          disabled
          defaultValue="این فیلد فعلاً قابل ویرایش نیست."
          placeholder="یادداشت..."
        />
      </TextareaControl>
      <p className="text-caption text-muted-foreground">این فیلد فعلاً قابل ویرایش نیست.</p>
    </div>
  )
}
