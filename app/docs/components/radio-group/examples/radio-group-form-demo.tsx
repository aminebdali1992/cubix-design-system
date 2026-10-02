"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Label } from "@/components/cubix/label"
import { RadioGroup, RadioGroupItem } from "../docs-radio-group"

const shippingMethods = [
  { value: "standard", label: "ارسال عادی", hint: "۳ تا ۵ روز کاری" },
  { value: "express", label: "ارسال سریع", hint: "۱ روز کاری" },
  { value: "pickup", label: "تحویل حضوری", hint: "از نزدیک‌ترین شعبه" },
]

export function RadioGroupFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p id="radio-form-title" className="text-body leading-none font-medium text-foreground">
          روش ارسال
        </p>
        <p className="text-caption text-muted-foreground">زمان تحویل سفارش را انتخاب کنید.</p>
      </div>
      <RadioGroup
        name="shipping"
        defaultValue="standard"
        required
        aria-labelledby="radio-form-title"
      >
        {shippingMethods.map((method) => (
          <div key={method.value} className="flex items-start gap-2">
            <RadioGroupItem
              id={`radio-form-${method.value}`}
              value={method.value}
              className="mt-0.5"
            />
            <Label htmlFor={`radio-form-${method.value}`} className="grid gap-1">
              <span className="text-foreground">{method.label}</span>
              <span className="text-caption text-muted-foreground">{method.hint}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}
