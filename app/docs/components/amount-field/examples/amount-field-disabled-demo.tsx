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

export function AmountFieldDisabledDemo() {
  return (
    <AmountField className="w-full max-w-sm" disabled>
      <AmountFieldLabel>مبلغ</AmountFieldLabel>
      <AmountFieldControl>
        <ButtonDemoIcon data-icon="inline-start" />
        <AmountFieldInput defaultValue="۱۲۵۰۰۰۰" placeholder="۰" />
        <AmountFieldCurrency unit="تومان" />
      </AmountFieldControl>
      <AmountFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</AmountFieldDescription>
    </AmountField>
  )
}
