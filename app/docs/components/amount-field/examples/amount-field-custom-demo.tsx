"use client"

import {
  AmountField,
  AmountFieldDescription,
  AmountFieldInput,
  AmountFieldLabel,
} from "../docs-amount-field"

export function AmountFieldCustomDemo() {
  return (
    <AmountField className="w-full max-w-sm">
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="۰"
      />
      <AmountFieldDescription>با className می‌توانید ظاهر را سفارشی کنید.</AmountFieldDescription>
    </AmountField>
  )
}
