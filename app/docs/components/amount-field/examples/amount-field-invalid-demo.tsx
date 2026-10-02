"use client"

import {
  AmountField,
  AmountFieldControl,
  AmountFieldCurrency,
  AmountFieldError,
  AmountFieldInput,
  AmountFieldLabel,
} from "../docs-amount-field"

export function AmountFieldInvalidDemo() {
  return (
    <AmountField className="w-full max-w-sm" invalid>
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldControl>
        <AmountFieldInput defaultValue="۰" placeholder="۰" />
        <AmountFieldCurrency unit="تومان" />
      </AmountFieldControl>
      <AmountFieldError>یک مبلغ معتبر وارد کنید.</AmountFieldError>
    </AmountField>
  )
}
