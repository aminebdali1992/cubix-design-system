"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"
import {
  NumberField,
  NumberFieldControl,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldStepper,
} from "@/app/docs/components/number-field/docs-number-field"

export function NumberFieldDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
        <NumberFieldStepper
          incrementLabel="افزایش"
          decrementLabel="کاهش"
        />
      </NumberFieldControl>
      <NumberFieldDescription>
        فقط عدد وارد کنید. با فلش‌ها مقدار را کم یا زیاد کنید.
      </NumberFieldDescription>
    </NumberField>
  )
}

export function NumberFieldDescriptionDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldInput placeholder="۰" />
      <NumberFieldDescription>
        مقدار باید یک عدد صحیح باشد.
      </NumberFieldDescription>
    </NumberField>
  )
}

export function NumberFieldInvalidDemo() {
  return (
    <NumberField className="w-full max-w-sm" invalid>
      <NumberFieldLabel>تعداد</NumberFieldLabel>
        <NumberFieldInput defaultValue="" placeholder="۰" />
      <NumberFieldError>یک عدد معتبر وارد کنید.</NumberFieldError>
    </NumberField>
  )
}

export function NumberFieldDisabledDemo() {
  return (
    <NumberField className="w-full max-w-sm" disabled>
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
        <NumberFieldStepper
          incrementLabel="افزایش"
          decrementLabel="کاهش"
        />
      </NumberFieldControl>
      <NumberFieldDescription>
        این فیلد فعلاً قابل ویرایش نیست.
      </NumberFieldDescription>
    </NumberField>
  )
}

export function NumberFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <NumberField size="default">
        <NumberFieldLabel>تعداد</NumberFieldLabel>
        <NumberFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <NumberFieldInput placeholder="۰" />
          <NumberFieldStepper
            incrementLabel="افزایش"
            decrementLabel="کاهش"
          />
        </NumberFieldControl>
        <NumberFieldDescription>ارتفاع ۴۰ پیکسل</NumberFieldDescription>
      </NumberField>
      <NumberField size="lg">
        <NumberFieldLabel>تعداد</NumberFieldLabel>
        <NumberFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <NumberFieldInput placeholder="۰" />
          <NumberFieldStepper
            incrementLabel="افزایش"
            decrementLabel="کاهش"
          />
        </NumberFieldControl>
        <NumberFieldDescription>ارتفاع ۴۸ پیکسل</NumberFieldDescription>
      </NumberField>
    </div>
  )
}

export function NumberFieldIconsDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <NumberFieldInput placeholder="۰" />
        <NumberFieldStepper
          incrementLabel="افزایش"
          decrementLabel="کاهش"
        />
      </NumberFieldControl>
    </NumberField>
  )
}

export function NumberFieldStepperDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldControl>
        <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
        <NumberFieldStepper
          incrementLabel="افزایش"
          decrementLabel="کاهش"
        />
      </NumberFieldControl>
    </NumberField>
  )
}

export function NumberFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          ثبت سفارش
        </p>
        <p className="text-caption text-muted-foreground">
          تعداد مورد نظر را وارد کنید.
        </p>
      </div>
      <NumberField>
        <NumberFieldLabel>تعداد</NumberFieldLabel>
        <NumberFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <NumberFieldInput name="quantity" placeholder="۰" required />
          <NumberFieldStepper
            incrementLabel="افزایش"
            decrementLabel="کاهش"
          />
        </NumberFieldControl>
        <NumberFieldDescription>
          یک عدد معتبر وارد کنید.
        </NumberFieldDescription>
      </NumberField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}

export function NumberFieldCustomDemo() {
  return (
    <NumberField className="w-full max-w-sm">
      <NumberFieldLabel>تعداد</NumberFieldLabel>
      <NumberFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="۰"
      />
      <NumberFieldDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </NumberFieldDescription>
    </NumberField>
  )
}
