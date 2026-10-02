"use client"

import {
  AmountField,
  AmountFieldDescription,
  AmountFieldInput,
  AmountFieldLabel,
} from "../docs-amount-field"

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
