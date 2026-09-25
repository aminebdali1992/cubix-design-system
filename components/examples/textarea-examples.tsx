"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"
import {
  Textarea,
  TextareaControl,
} from "@/app/docs/components/textarea/docs-textarea"

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
      <p className="text-caption text-muted-foreground">
        یادداشت شما ذخیره می‌شود.
      </p>
    </div>
  )
}

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
        <Textarea
          id="textarea-message"
          placeholder="پیام خود را بنویسید..."
        />
      </TextareaControl>
      <p className="text-caption text-muted-foreground">
        پیام شما به تیم پشتیبانی ارسال می‌شود.
      </p>
    </div>
  )
}

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
        <Textarea
          id="textarea-icons"
          placeholder="یادداشت خود را بنویسید..."
        />
      </TextareaControl>
    </div>
  )
}

export function TextareaHeightDemo() {
  return (
    <TextareaControl className="w-full max-w-sm">
      <Textarea
        className="min-h-32"
        placeholder="یادداشت‌های طولانی..."
      />
    </TextareaControl>
  )
}

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
      <p className="text-caption text-destructive">
        بیوگرافی باید حداقل ۱۰ کاراکتر باشد.
      </p>
    </div>
  )
}

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
      <p className="text-caption text-muted-foreground">
        این فیلد فعلاً قابل ویرایش نیست.
      </p>
    </div>
  )
}

export function TextareaFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body font-medium">ارسال پیام</p>
        <p className="text-caption text-muted-foreground">
          موضوع درخواست خود را کوتاه توضیح دهید.
        </p>
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
        <p className="text-caption text-muted-foreground">
          حداکثر ۵۰۰ کاراکتر.
        </p>
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

export function TextareaCustomDemo() {
  return (
    <TextareaControl className="w-full max-w-sm border-border bg-muted has-[[data-slot=textarea]:focus-visible]:bg-background dark:bg-muted dark:has-[[data-slot=textarea]:focus-visible]:bg-background">
      <Textarea placeholder="ظاهر سفارشی با className" />
    </TextareaControl>
  )
}
