"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import {
  AmountField,
  AmountFieldControl,
  AmountFieldCurrency,
  AmountFieldInput,
  AmountFieldLabel,
} from "../docs-amount-field"

export function AmountFieldIconsDemo() {
  return (
    <AmountField className="w-full max-w-sm">
      <AmountFieldLabel>موجودی کیف پول</AmountFieldLabel>
      <AmountFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <AmountFieldInput placeholder="۰" />
        <AmountFieldCurrency unit="تومان" />
      </AmountFieldControl>
    </AmountField>
  )
}
