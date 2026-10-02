"use client"

import * as React from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../docs-tabs"

const steps = [
  { value: "cart", label: "سبد خرید", description: "کالاهای انتخابی خود را بررسی کنید." },
  { value: "shipping", label: "ارسال", description: "نشانی و روش ارسال را انتخاب کنید." },
  { value: "payment", label: "پرداخت", description: "پرداخت را امن و سریع انجام دهید." },
]

export function TabsControlledDemo() {
  const [value, setValue] = React.useState(steps[0].value)
  const index = steps.findIndex((step) => step.value === value)

  return (
    <div className="grid w-full max-w-md gap-4">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList aria-label="مراحل خرید">
          {steps.map((step) => (
            <TabsTrigger key={step.value} value={step.value}>
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {steps.map((step) => (
          <TabsContent
            key={step.value}
            value={step.value}
            className="rounded-lg border p-4 text-muted-foreground"
          >
            {step.description}
          </TabsContent>
        ))}
      </Tabs>
      <div className="flex justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={index === 0}
          onClick={() => setValue(steps[index - 1].value)}
        >
          مرحله قبل
        </Button>
        <Button
          size="sm"
          disabled={index === steps.length - 1}
          onClick={() => setValue(steps[index + 1].value)}
        >
          مرحله بعد
        </Button>
      </div>
    </div>
  )
}
