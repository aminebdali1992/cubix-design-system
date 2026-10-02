"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Textarea, TextareaControl } from "../docs-textarea"

export function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <label
        htmlFor="textarea-demo"
        className="w-fit text-label leading-none font-normal text-foreground"
      >
        یادداشت
      </label>
      <TextareaControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <Textarea
          id="textarea-demo"
          placeholder="یادداشت خود را بنویسید..."
          defaultValue="جلسه فردا ساعت ۱۰ - آماده‌سازی گزارش ماهانه."
        />
      </TextareaControl>
      <p className="text-caption text-muted-foreground">یادداشت شما ذخیره می‌شود.</p>
    </div>
  )
}
