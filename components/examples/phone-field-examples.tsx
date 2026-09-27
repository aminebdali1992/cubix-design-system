"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { PhoneFieldDemoIcon } from "@/components/examples/phone-field-demo-icon"
import {
  PhoneField,
  PhoneFieldClear,
  PhoneFieldControl,
  PhoneFieldDescription,
  PhoneFieldError,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "@/app/docs/components/phone-field/docs-phone-field"

export function PhoneFieldDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldControl>
        <PhoneFieldDemoIcon data-icon="inline-start" />
        <PhoneFieldInput
          defaultValue="۰۹۱۲۳۴۵۶۷۸۹"
          placeholder="۰۹۱۲۰۰۰۰۰۰۰"
        />
        <PhoneFieldClear aria-label="پاک کردن" />
      </PhoneFieldControl>
      <PhoneFieldDescription>
        برای ورود و بازیابی حساب از این شماره استفاده می‌شود.
      </PhoneFieldDescription>
    </PhoneField>
  )
}

export function PhoneFieldDescriptionDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
      <PhoneFieldDescription>
        شماره باید با ۰۹ شروع شود و ۱۱ رقم باشد.
      </PhoneFieldDescription>
    </PhoneField>
  )
}

export function PhoneFieldInvalidDemo() {
  return (
    <PhoneField className="w-full max-w-sm" invalid>
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldInput defaultValue="۰۹۱۲" placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
      <PhoneFieldError>یک شماره همراه معتبر وارد کنید.</PhoneFieldError>
    </PhoneField>
  )
}

export function PhoneFieldDisabledDemo() {
  return (
    <PhoneField className="w-full max-w-sm" disabled>
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldInput
        defaultValue="۰۹۱۲۳۴۵۶۷۸۹"
        placeholder="۰۹۱۲۰۰۰۰۰۰۰"
      />
      <PhoneFieldDescription>
        این فیلد فعلاً قابل ویرایش نیست.
      </PhoneFieldDescription>
    </PhoneField>
  )
}

export function PhoneFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <PhoneField size="default">
        <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
        <PhoneFieldControl>
          <PhoneFieldDemoIcon data-icon="inline-start" />
          <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
          <PhoneFieldClear aria-label="پاک کردن" />
        </PhoneFieldControl>
        <PhoneFieldDescription>ارتفاع ۴۰ پیکسل</PhoneFieldDescription>
      </PhoneField>
      <PhoneField size="lg">
        <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
        <PhoneFieldControl>
          <PhoneFieldDemoIcon data-icon="inline-start" />
          <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
          <PhoneFieldClear aria-label="پاک کردن" />
        </PhoneFieldControl>
        <PhoneFieldDescription>ارتفاع ۴۸ پیکسل</PhoneFieldDescription>
      </PhoneField>
    </div>
  )
}

export function PhoneFieldIconsDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldControl>
        <PhoneFieldDemoIcon data-icon="inline-start" />
        <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
      </PhoneFieldControl>
    </PhoneField>
  )
}

export function PhoneFieldClearDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldControl>
        <PhoneFieldInput
          defaultValue="۰۹۱۲۳۴۵۶۷۸۹"
          placeholder="۰۹۱۲۰۰۰۰۰۰۰"
        />
        <PhoneFieldClear aria-label="پاک کردن" />
      </PhoneFieldControl>
    </PhoneField>
  )
}

export function PhoneFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          ورود با شماره همراه
        </p>
        <p className="text-caption text-muted-foreground">
          کد تأیید به این شماره ارسال می‌شود.
        </p>
      </div>
      <PhoneField>
        <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
        <PhoneFieldControl>
          <PhoneFieldDemoIcon data-icon="inline-start" />
          <PhoneFieldInput
            name="phone"
            placeholder="۰۹۱۲۰۰۰۰۰۰۰"
            required
          />
          <PhoneFieldClear aria-label="پاک کردن" />
        </PhoneFieldControl>
        <PhoneFieldDescription>
          یک شماره همراه معتبر وارد کنید.
        </PhoneFieldDescription>
      </PhoneField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}

export function PhoneFieldCustomDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="۰۹۱۲۰۰۰۰۰۰۰"
      />
      <PhoneFieldDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </PhoneFieldDescription>
    </PhoneField>
  )
}
