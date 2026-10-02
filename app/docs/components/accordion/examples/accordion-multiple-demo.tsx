"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

const shipping = [
  {
    value: "delivery",
    question: "سفارش چند روزه می‌رسد؟",
    answer:
      "سفارش‌های تهران یک روز کاری و سفارش‌های شهرهای دیگر دو تا چهار روز کاری بعد تحویل داده می‌شوند.",
  },
  {
    value: "cost",
    question: "هزینه ارسال چطور حساب می‌شود؟",
    answer:
      "ارسال سفارش‌های بالای یک میلیون تومان رایگان است و برای بقیه بر اساس وزن بسته حساب می‌شود.",
  },
  {
    value: "returns",
    question: "می‌توانم کالا را مرجوع کنم؟",
    answer: "بله. تا هفت روز پس از تحویل می‌توانید از صفحه سفارش‌ها درخواست مرجوعی ثبت کنید.",
  },
]

export function AccordionMultipleDemo() {
  return (
    <Accordion multiple defaultValue={["delivery", "returns"]} className="w-full max-w-md">
      {shipping.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
