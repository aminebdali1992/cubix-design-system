"use client"

import * as React from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

const settings = [
  {
    value: "account",
    title: "حساب کاربری",
    description: "نام، ایمیل و شماره تلفن خود را از این بخش ویرایش کنید.",
  },
  {
    value: "security",
    title: "امنیت",
    description: "رمز عبور را تغییر دهید و ورود دومرحله‌ای را فعال کنید.",
  },
  {
    value: "billing",
    title: "صورتحساب",
    description: "روش پرداخت و تاریخچه فاکتورها را مدیریت کنید.",
  },
]

const allValues = settings.map((item) => item.value)

export function AccordionControlledDemo() {
  const [value, setValue] = React.useState<string[]>(["security"])

  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={value.length === allValues.length}
          onClick={() => setValue(allValues)}
        >
          باز کردن همه
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={value.length === 0}
          onClick={() => setValue([])}
        >
          بستن همه
        </Button>
      </div>
      <Accordion multiple value={value} onValueChange={setValue}>
        {settings.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
