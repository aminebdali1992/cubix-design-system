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
