"use client"

import {
  AmountField,
  AmountFieldControl,
  AmountFieldCurrency,
  AmountFieldDescription,
  AmountFieldInput,
  AmountFieldLabel,
} from "../docs-amount-field"

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
