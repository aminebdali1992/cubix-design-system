"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

const items = [
  {
    value: "account",
    question: "چطور حساب کاربری بسازم؟",
    answer: "روی «ثبت‌نام» بزنید، ایمیل و رمز عبور را وارد کنید و لینک تأیید را از ایمیلتان باز کنید.",
  },
  {
    value: "password",
    question: "رمز عبورم را فراموش کرده‌ام، چه کنم؟",
    answer: "در صفحه‌ی ورود روی «فراموشی رمز» بزنید تا لینک تغییر رمز به ایمیلتان فرستاده شود.",
  },
  {
    value: "delete",
    question: "چطور حسابم را حذف کنم؟",
    answer: "از بخش تنظیمات حساب، گزینه‌ی «حذف حساب» را بزنید. این کار برگشت‌پذیر نیست.",
  },
]

export function AccordionBordersDemo() {
  return (
    <Accordion defaultValue={["account"]} className="w-full max-w-md rounded-lg border">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="border-b px-4 last:border-b-0">
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
