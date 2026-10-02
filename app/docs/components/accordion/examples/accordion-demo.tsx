"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

const faqs = [
  {
    value: "accessible",
    question: "آیا دسترس‌پذیر است؟",
    answer: "بله. از الگوی WAI-ARIA پیروی می‌کند و همه بخش‌ها با صفحه‌کلید باز و بسته می‌شوند.",
  },
  {
    value: "styled",
    question: "آیا ظاهر آماده دارد؟",
    answer: "بله. با توکن‌های Cubix رنگ‌آمیزی شده و در حالت تیره هم درست نمایش داده می‌شود.",
  },
  {
    value: "animated",
    question: "آیا انیمیشن دارد؟",
    answer:
      "بله. ارتفاع بخش‌ها نرم تغییر می‌کند و اگر کاهش حرکت در سیستم فعال باشد، انیمیشن حذف می‌شود.",
  },
]

export function AccordionDemo() {
  return (
    <Accordion defaultValue={["accessible"]} className="w-full max-w-md">
      {faqs.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
