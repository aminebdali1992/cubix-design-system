"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "@/app/docs/components/button/docs-button"
import {
  NumberField,
  NumberFieldControl,
  NumberFieldDescription,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldStepper,
} from "../docs-number-field"

export function NumberFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">ثبت سفارش</p>
        <p className="text-caption text-muted-foreground">تعداد مورد نظر را وارد کنید.</p>
      </div>
      <NumberField name="quantity">
        <NumberFieldLabel>تعداد</NumberFieldLabel>
        <NumberFieldControl>
          <ButtonDemoIcon data-icon="inline-start" />
          <NumberFieldInput min={1} placeholder="۱" required />
          <NumberFieldStepper />
        </NumberFieldControl>
        <NumberFieldDescription>حداقل ۱ عدد.</NumberFieldDescription>
      </NumberField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}
