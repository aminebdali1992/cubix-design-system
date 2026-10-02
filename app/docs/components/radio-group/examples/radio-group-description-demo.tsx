"use client"

import { Label } from "@/components/cubix/label"
import { RadioGroup, RadioGroupItem } from "../docs-radio-group"

const plans = [
  { value: "free", title: "رایگان", description: "برای پروژه‌های شخصی و آزمایشی." },
  {
    value: "pro",
    title: "حرفه‌ای",
    description: "برای تیم‌هایی که به امکانات و پشتیبانی بیشتر نیاز دارند.",
  },
  { value: "enterprise", title: "سازمانی", description: "امنیت پیشرفته و قرارداد اختصاصی." },
]

export function RadioGroupDescriptionDemo() {
  return (
    <RadioGroup defaultValue="pro" aria-label="انتخاب طرح" className="w-full max-w-sm">
      {plans.map((plan) => (
        <div
          key={plan.value}
          className="flex items-start gap-3 rounded-lg border bg-background p-4"
        >
          <RadioGroupItem id={`radio-plan-${plan.value}`} value={plan.value} className="mt-0.5" />
          <Label htmlFor={`radio-plan-${plan.value}`} className="grid gap-1.5">
            <span className="text-foreground">{plan.title}</span>
            <span className="text-caption text-muted-foreground">{plan.description}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
