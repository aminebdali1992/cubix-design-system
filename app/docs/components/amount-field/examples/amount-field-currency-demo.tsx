"use client"

import {
  AmountField,
  AmountFieldControl,
  AmountFieldCurrency,
  AmountFieldInput,
  AmountFieldLabel,
} from "../docs-amount-field"

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
