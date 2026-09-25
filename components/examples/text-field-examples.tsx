"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"
import {
  TextField,
  TextFieldClear,
  TextFieldControl,
  TextFieldDescription,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/app/docs/components/text-field/docs-text-field"

export function TextFieldDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <TextFieldInput defaultValue="امین ابدالی" placeholder="امین ابدالی" />
        <TextFieldClear aria-label="پاک کردن" />
      </TextFieldControl>
      <TextFieldDescription>نام کامل خود را وارد کنید.</TextFieldDescription>
    </TextField>
  )
}

export function TextFieldDescriptionDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام کاربری</TextFieldLabel>
      <TextFieldInput placeholder="amin" />
      <TextFieldDescription>
        فقط حروف انگلیسی، عدد و زیرخط مجاز است.
      </TextFieldDescription>
    </TextField>
  )
}

export function TextFieldInvalidDemo() {
  return (
    <TextField className="w-full max-w-sm" invalid>
      <TextFieldLabel>نام کاربری</TextFieldLabel>
      <TextFieldInput defaultValue="amin!" />
      <TextFieldError>فقط حروف انگلیسی، عدد و زیرخط مجاز است.</TextFieldError>
    </TextField>
  )
}

export function TextFieldDisabledDemo() {
  return (
    <TextField className="w-full max-w-sm" disabled>
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldInput defaultValue="امین ابدالی" placeholder="امین ابدالی" />
      <TextFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</TextFieldDescription>
    </TextField>
  )
}

export function TextFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <TextField size="default">
        <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
        <TextFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <TextFieldInput placeholder="امین ابدالی" />
          <TextFieldClear aria-label="پاک کردن" />
        </TextFieldControl>
        <TextFieldDescription>ارتفاع ۴۰ پیکسل</TextFieldDescription>
      </TextField>
      <TextField size="lg">
        <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
        <TextFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <TextFieldInput placeholder="امین ابدالی" />
          <TextFieldClear aria-label="پاک کردن" />
        </TextFieldControl>
        <TextFieldDescription>ارتفاع ۴۸ پیکسل</TextFieldDescription>
      </TextField>
    </div>
  )
}

export function TextFieldIconsDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <TextFieldInput placeholder="امین ابدالی" />
        <ButtonDemoIcon data-icon="inline-end" />
      </TextFieldControl>
    </TextField>
  )
}

export function TextFieldClearDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput defaultValue="امین ابدالی" placeholder="امین ابدالی" />
        <TextFieldClear aria-label="پاک کردن" />
      </TextFieldControl>
    </TextField>
  )
}

export function TextFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          ایجاد حساب
        </p>
        <p className="text-caption text-muted-foreground">
          برای ادامه، نام کامل خود را وارد کنید.
        </p>
      </div>
      <TextField>
        <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
        <TextFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <TextFieldInput
            name="fullName"
            placeholder="امین ابدالی"
            required
          />
          <TextFieldClear aria-label="پاک کردن" />
        </TextFieldControl>
        <TextFieldDescription>نام کامل خود را وارد کنید.</TextFieldDescription>
      </TextField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}

export function TextFieldCustomDemo() {
  return (
    <TextField className="w-full max-w-sm">
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="امین ابدالی"
      />
      <TextFieldDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </TextFieldDescription>
    </TextField>
  )
}
