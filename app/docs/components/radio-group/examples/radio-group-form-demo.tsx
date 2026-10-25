"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Label } from "@/components/cubix/label"
import { RadioGroup, RadioGroupItem } from "../docs-radio-group"

const plans = [
  { value: "monthly", label: "ماهانه", description: "پرداخت هر ماه، لغو در هر زمان", price: "۹۹ هزار تومان" },
  { value: "quarterly", label: "سه‌ماهه", description: "۱۰٪ تخفیف نسبت به ماهانه", price: "۲۶۷ هزار تومان" },
  { value: "yearly", label: "سالانه", description: "۲ ماه رایگان، بهترین انتخاب", price: "۹۹۰ هزار تومان" },
]

export function RadioGroupFormDemo() {
  return (
    <form
      className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p id="radio-form-title" className="text-body leading-none font-normal text-foreground">
          انتخاب طرح اشتراک
        </p>
        <p className="text-caption text-muted-foreground">
          طرح مناسب خود را انتخاب کنید. هر زمان می‌توانید آن را تغییر دهید.
        </p>
      </div>
      <RadioGroup
        name="plan"
        defaultValue="yearly"
        required
        aria-labelledby="radio-form-title"
        className="gap-3"
      >
        {plans.map((plan) => (
          <Label
            key={plan.value}
            htmlFor={`radio-form-${plan.value}`}
            className="cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 has-checked:border-primary has-checked:bg-primary/5 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/5"
          >
            <RadioGroupItem id={`radio-form-${plan.value}`} value={plan.value} />
            <span className="grid flex-1 gap-1.5">
              <span className="flex items-center justify-between gap-3">
                <span className="text-foreground">{plan.label}</span>
                <span className="text-caption text-foreground">{plan.price}</span>
              </span>
              <span className="text-caption text-muted-foreground">{plan.description}</span>
            </span>
          </Label>
        ))}
      </RadioGroup>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه و پرداخت</Button>
      </div>
    </form>
  )
}