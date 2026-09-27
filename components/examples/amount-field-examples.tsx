"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"
import {
  AmountField,
  AmountFieldControl,
  AmountFieldCurrency,
  AmountFieldDescription,
  AmountFieldError,
  AmountFieldInput,
  AmountFieldLabel,
} from "@/app/docs/components/amount-field/docs-amount-field"

export function AmountFieldDemo() {
  return (
    <AmountField className="w-full max-w-sm">
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <AmountFieldInput defaultValue="۱۲۵۰۰۰۰" placeholder="۰" />
        <AmountFieldCurrency unit="تومان" />
      </AmountFieldControl>
      <AmountFieldDescription>
        مبلغ را به تومان وارد کنید. ارقام به‌صورت خودکار گروه‌بندی می‌شوند.
      </AmountFieldDescription>
    </AmountField>
  )
}

export function AmountFieldDescriptionDemo() {
  return (
    <AmountField className="w-full max-w-sm">
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldInput placeholder="۰" />
      <AmountFieldDescription>
        فقط عدد وارد کنید. جداکننده هزارگان به‌صورت خودکار اضافه می‌شود.
      </AmountFieldDescription>
    </AmountField>
  )
}

export function AmountFieldAmountInWordsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <AmountField>
        <AmountFieldLabel>مبلغ</AmountFieldLabel>
        <AmountFieldControl>
          <AmountFieldInput defaultValue="۱۲۵۰۰۰" placeholder="۰" />
          <AmountFieldCurrency unit="تومان" />
        </AmountFieldControl>
        <AmountFieldDescription amountInWords />
      </AmountField>
      <AmountField>
        <AmountFieldLabel>مبلغ</AmountFieldLabel>
        <AmountFieldControl>
          <AmountFieldInput defaultValue="۱۲۵۰۰۰۰" placeholder="۰" />
          <AmountFieldCurrency unit="ریال" />
        </AmountFieldControl>
        <AmountFieldDescription amountInWords />
      </AmountField>
    </div>
  )
}

export function AmountFieldInvalidDemo() {
  return (
    <AmountField className="w-full max-w-sm" invalid>
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldInput defaultValue="" placeholder="۰" />
      <AmountFieldError>یک مبلغ معتبر وارد کنید.</AmountFieldError>
    </AmountField>
  )
}

export function AmountFieldDisabledDemo() {
  return (
    <AmountField className="w-full max-w-sm" disabled>
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <AmountFieldInput defaultValue="۱۲۵۰۰۰۰" placeholder="۰" />
        <AmountFieldCurrency unit="تومان" />
      </AmountFieldControl>
      <AmountFieldDescription>
        این فیلد فعلاً قابل ویرایش نیست.
      </AmountFieldDescription>
    </AmountField>
  )
}

export function AmountFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <AmountField size="default">
        <AmountFieldLabel>مبلغ</AmountFieldLabel>
        <AmountFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <AmountFieldInput placeholder="۰" />
          <AmountFieldCurrency unit="تومان" />
        </AmountFieldControl>
        <AmountFieldDescription>ارتفاع ۴۰ پیکسل</AmountFieldDescription>
      </AmountField>
      <AmountField size="lg">
        <AmountFieldLabel>مبلغ</AmountFieldLabel>
        <AmountFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <AmountFieldInput placeholder="۰" />
          <AmountFieldCurrency unit="تومان" />
        </AmountFieldControl>
        <AmountFieldDescription>ارتفاع ۴۸ پیکسل</AmountFieldDescription>
      </AmountField>
    </div>
  )
}

export function AmountFieldIconsDemo() {
  return (
    <AmountField className="w-full max-w-sm">
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <AmountFieldInput placeholder="۰" />
        <AmountFieldCurrency unit="تومان" />
      </AmountFieldControl>
    </AmountField>
  )
}

export function AmountFieldCurrencyDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <AmountField>
        <AmountFieldLabel>مبلغ</AmountFieldLabel>
        <AmountFieldControl>
          <AmountFieldInput defaultValue="۲۵۰۰۰۰" placeholder="۰" />
          <AmountFieldCurrency unit="تومان" />
        </AmountFieldControl>
      </AmountField>
      <AmountField>
        <AmountFieldLabel>مبلغ</AmountFieldLabel>
        <AmountFieldControl>
          <AmountFieldInput defaultValue="۲۵۰۰۰۰۰" placeholder="۰" />
          <AmountFieldCurrency unit="ریال" />
        </AmountFieldControl>
      </AmountField>
    </div>
  )
}

export function AmountFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          پرداخت
        </p>
        <p className="text-caption text-muted-foreground">
          مبلغ قابل پرداخت را وارد کنید.
        </p>
      </div>
      <AmountField>
        <AmountFieldLabel>مبلغ</AmountFieldLabel>
        <AmountFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <AmountFieldInput name="amount" placeholder="۰" required />
          <AmountFieldCurrency unit="تومان" />
        </AmountFieldControl>
        <AmountFieldDescription>
          یک مبلغ معتبر به تومان وارد کنید.
        </AmountFieldDescription>
      </AmountField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}

export function AmountFieldCustomDemo() {
  return (
    <AmountField className="w-full max-w-sm">
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="۰"
      />
      <AmountFieldDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </AmountFieldDescription>
    </AmountField>
  )
}
