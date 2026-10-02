"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

const steps = [
  {
    value: "order",
    title: "ثبت سفارش",
    description: "سفارش شما با شماره ۴۸۲۱ ثبت شد.",
  },
  {
    value: "packing",
    title: "بسته‌بندی",
    description: "کالاها در انبار بسته‌بندی شدند.",
  },
  {
    value: "delivery",
    title: "تحویل",
    description: "بسته روز شنبه به نشانی شما تحویل داده شد.",
  },
]

export function AccordionDisabledDemo() {
  return (
    <Accordion disabled defaultValue={["delivery"]} className="w-full max-w-md">
      {steps.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
