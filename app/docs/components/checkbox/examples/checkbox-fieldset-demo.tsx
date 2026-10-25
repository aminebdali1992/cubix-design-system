"use client"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/cubix/field"
import { Checkbox } from "../docs-checkbox"

const items = [
  { id: "orders", label: "ایمیل هنگام ثبت سفارش جدید", defaultChecked: true },
  { id: "payments", label: "پیامک یادآوری قبل از سررسید فاکتور" },
  { id: "shipping", label: "اعلان تغییر وضعیت ارسال سفارش" },
  { id: "reports", label: "گزارش هفتگی فروش و بازدید فروشگاه" },
]

export function CheckboxFieldsetDemo() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend variant="label" className="data-[variant=label]:text-title">اعلان‌هایی که می‌خواهید دریافت کنید</FieldLegend>
      <FieldDescription>
        انتخاب کنید درباره کدام رویدادهای فروشگاه از طریق ایمیل یا پیامک باخبر شوید.
      </FieldDescription>
      <FieldGroup className="mt-2 gap-3">
        {items.map((item) => (
          <Field key={item.id} orientation="horizontal">
            <Checkbox id={`checkbox-fieldset-${item.id}`} defaultChecked={item.defaultChecked} />
            <FieldLabel htmlFor={`checkbox-fieldset-${item.id}`}>{item.label}</FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}