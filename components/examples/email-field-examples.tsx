"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { EmailFieldDemoIcon } from "@/components/examples/email-field-demo-icon"
import {
  EmailField,
  EmailFieldClear,
  EmailFieldControl,
  EmailFieldDescription,
  EmailFieldError,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/app/docs/components/email-field/docs-email-field"

export function EmailFieldDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldControl>
        <EmailFieldDemoIcon data-icon="inline-start" />
        <EmailFieldInput
          defaultValue="amin@cubix.com"
          placeholder="example@cubix.com"
        />
        <EmailFieldClear aria-label="پاک کردن" />
      </EmailFieldControl>
      <EmailFieldDescription>
        برای ورود و بازیابی حساب از این ایمیل استفاده می‌شود.
      </EmailFieldDescription>
    </EmailField>
  )
}

export function EmailFieldDescriptionDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل کاری</EmailFieldLabel>
      <EmailFieldInput placeholder="example@cubix.com" />
      <EmailFieldDescription>
        ترجیحاً از ایمیل سازمانی خود استفاده کنید.
      </EmailFieldDescription>
    </EmailField>
  )
}

export function EmailFieldInvalidDemo() {
  return (
    <EmailField className="w-full max-w-sm" invalid>
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldInput defaultValue="amin@" placeholder="example@cubix.com" />
      <EmailFieldError>یک آدرس ایمیل معتبر وارد کنید.</EmailFieldError>
    </EmailField>
  )
}

export function EmailFieldDisabledDemo() {
  return (
    <EmailField className="w-full max-w-sm" disabled>
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldInput
        defaultValue="amin@cubix.com"
        placeholder="example@cubix.com"
      />
      <EmailFieldDescription>
        این فیلد فعلاً قابل ویرایش نیست.
      </EmailFieldDescription>
    </EmailField>
  )
}

export function EmailFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <EmailField size="default">
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldControl>
          <EmailFieldDemoIcon data-icon="inline-start" />
          <EmailFieldInput placeholder="example@cubix.com" />
          <EmailFieldClear aria-label="پاک کردن" />
        </EmailFieldControl>
        <EmailFieldDescription>ارتفاع ۴۰ پیکسل</EmailFieldDescription>
      </EmailField>
      <EmailField size="lg">
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldControl>
          <EmailFieldDemoIcon data-icon="inline-start" />
          <EmailFieldInput placeholder="example@cubix.com" />
          <EmailFieldClear aria-label="پاک کردن" />
        </EmailFieldControl>
        <EmailFieldDescription>ارتفاع ۴۸ پیکسل</EmailFieldDescription>
      </EmailField>
    </div>
  )
}

export function EmailFieldIconsDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldControl>
        <EmailFieldDemoIcon data-icon="inline-start" />
        <EmailFieldInput placeholder="example@cubix.com" />
      </EmailFieldControl>
    </EmailField>
  )
}

export function EmailFieldClearDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldControl>
        <EmailFieldInput
          defaultValue="amin@cubix.com"
          placeholder="example@cubix.com"
        />
        <EmailFieldClear aria-label="پاک کردن" />
      </EmailFieldControl>
    </EmailField>
  )
}

export function EmailFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          ورود با ایمیل
        </p>
        <p className="text-caption text-muted-foreground">
          لینک ورود به این آدرس ارسال می‌شود.
        </p>
      </div>
      <EmailField>
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldControl>
          <EmailFieldDemoIcon data-icon="inline-start" />
          <EmailFieldInput
            name="email"
            placeholder="example@cubix.com"
            required
          />
          <EmailFieldClear aria-label="پاک کردن" />
        </EmailFieldControl>
        <EmailFieldDescription>
          یک آدرس ایمیل معتبر وارد کنید.
        </EmailFieldDescription>
      </EmailField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}

export function EmailFieldCustomDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="example@cubix.com"
      />
      <EmailFieldDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </EmailFieldDescription>
    </EmailField>
  )
}
