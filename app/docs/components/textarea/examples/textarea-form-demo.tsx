"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "@/app/docs/components/button/docs-button"
import { Textarea, TextareaControl } from "../docs-textarea"

export function TextareaFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body font-medium">ارسال پیام</p>
        <p className="text-caption text-muted-foreground">موضوع درخواست خود را کوتاه توضیح دهید.</p>
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="textarea-form-message"
          className="w-fit text-label leading-none font-normal text-foreground"
        >
          پیام
        </label>
        <TextareaControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <Textarea
            id="textarea-form-message"
            name="message"
            placeholder="پیام خود را بنویسید..."
            required
          />
        </TextareaControl>
        <p className="text-caption text-muted-foreground">حداکثر ۵۰۰ کاراکتر.</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ارسال</Button>
      </div>
    </form>
  )
}
