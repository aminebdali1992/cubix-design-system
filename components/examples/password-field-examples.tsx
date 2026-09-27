"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldError,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/app/docs/components/password-field/docs-password-field"
import { PasswordFieldDemoIcon } from "@/components/examples/password-field-demo-icon"

export function PasswordFieldDemo() {
  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldDemoIcon data-icon="inline-start" />
        <PasswordFieldInput
          defaultValue="CubixPass123"
          placeholder="رمز عبور خود را وارد کنید"
        />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        حداقل ۸ کاراکتر، شامل حرف و عدد.
      </PasswordFieldDescription>
    </PasswordField>
  )
}

export function PasswordFieldDescriptionDemo() {
  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>رمز عبور جدید</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput
          autoComplete="new-password"
          placeholder="رمز عبور خود را وارد کنید"
        />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        از ترکیب حروف بزرگ، کوچک و عدد استفاده کنید.
      </PasswordFieldDescription>
    </PasswordField>
  )
}

export function PasswordFieldInvalidDemo() {
  return (
    <PasswordField className="w-full max-w-sm" invalid>
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput defaultValue="123" placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldError>رمز عبور باید حداقل ۸ کاراکتر باشد.</PasswordFieldError>
    </PasswordField>
  )
}

export function PasswordFieldDisabledDemo() {
  return (
    <PasswordField className="w-full max-w-sm" disabled>
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput
          defaultValue="CubixPass123"
          placeholder="رمز عبور خود را وارد کنید"
        />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        این فیلد فعلاً قابل ویرایش نیست.
      </PasswordFieldDescription>
    </PasswordField>
  )
}

export function PasswordFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <PasswordField size="default">
        <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
        <PasswordFieldControl>
          <PasswordFieldDemoIcon data-icon="inline-start" />
          <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
          <PasswordFieldToggle />
        </PasswordFieldControl>
        <PasswordFieldDescription>ارتفاع ۴۰ پیکسل</PasswordFieldDescription>
      </PasswordField>
      <PasswordField size="lg">
        <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
        <PasswordFieldControl>
          <PasswordFieldDemoIcon data-icon="inline-start" />
          <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
          <PasswordFieldToggle />
        </PasswordFieldControl>
        <PasswordFieldDescription>ارتفاع ۴۸ پیکسل</PasswordFieldDescription>
      </PasswordField>
    </div>
  )
}

export function PasswordFieldIconsDemo() {
  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldDemoIcon data-icon="inline-start" />
        <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
    </PasswordField>
  )
}

export function PasswordFieldToggleDemo() {
  return (
    <PasswordField className="w-full max-w-sm" defaultVisible>
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput
          defaultValue="CubixPass123"
          placeholder="رمز عبور خود را وارد کنید"
        />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        با دکمه چشم می‌توانید رمز را نمایش یا مخفی کنید.
      </PasswordFieldDescription>
    </PasswordField>
  )
}

export function PasswordFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          ورود به حساب
        </p>
        <p className="text-caption text-muted-foreground">
          رمز عبور حساب Cubix خود را وارد کنید.
        </p>
      </div>
      <PasswordField>
        <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
        <PasswordFieldControl>
          <PasswordFieldDemoIcon data-icon="inline-start" />
          <PasswordFieldInput
            name="password"
            placeholder="رمز عبور خود را وارد کنید"
            required
          />
          <PasswordFieldToggle />
        </PasswordFieldControl>
        <PasswordFieldDescription>
          حداقل ۸ کاراکتر، شامل حرف و عدد.
        </PasswordFieldDescription>
      </PasswordField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ورود</Button>
      </div>
    </form>
  )
}

export function PasswordFieldCustomDemo() {
  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl className="border-border bg-muted has-[[data-slot=password-field-input]:focus-visible]:bg-background dark:bg-muted dark:has-[[data-slot=password-field-input]:focus-visible]:bg-background">
        <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </PasswordFieldDescription>
    </PasswordField>
  )
}
