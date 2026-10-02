"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import {
  AmountField,
  AmountFieldControl,
  AmountFieldCurrency,
  AmountFieldDescription,
  AmountFieldInput,
  AmountFieldLabel,
} from "../docs-amount-field"

const sizes = [
  { size: "default", hint: "ارتفاع ۴۰ پیکسل" },
  { size: "lg", hint: "ارتفاع ۴۸ پیکسل" },
] as const

export function AmountFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      {sizes.map(({ size, hint }) => (
        <AmountField key={size} size={size}>
          <AmountFieldLabel>مبلغ</AmountFieldLabel>
          <AmountFieldControl>
            <ButtonDemoIcon data-icon="inline-start" />
            <AmountFieldInput placeholder="۰" />
            <AmountFieldCurrency unit="تومان" />
          </AmountFieldControl>
          <AmountFieldDescription>{hint}</AmountFieldDescription>
        </AmountField>
      ))}
    </div>
  )
}
