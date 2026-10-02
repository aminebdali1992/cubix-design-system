"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "@/app/docs/components/button/docs-button"
import {
  AmountField,
  AmountFieldControl,
  AmountFieldCurrency,
  AmountFieldDescription,
  AmountFieldInput,
  AmountFieldLabel,
} from "../docs-amount-field"

export function AmountFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">پرداخت</p>
        <p className="text-caption text-muted-foreground">مبلغ قابل پرداخت را وارد کنید.</p>
      </div>
      <AmountField name="amount">
        <AmountFieldLabel>مبلغ</AmountFieldLabel>
        <AmountFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <AmountFieldInput placeholder="۰" required />
          <AmountFieldCurrency unit="تومان" />
        </AmountFieldControl>
        <AmountFieldDescription>یک مبلغ معتبر به تومان وارد کنید.</AmountFieldDescription>
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
