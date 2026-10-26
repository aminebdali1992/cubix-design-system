"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../accordion/docs-accordion"
import { ErrorDisplay } from "../docs-error-display"

const steps = [
  {
    value: "card",
    title: "اطلاعات کارت را بررسی کنید",
    content: "شماره کارت، تاریخ انقضا و رمز دوم را دوباره وارد کنید و از کافی بودن موجودی مطمئن شوید.",
  },
  {
    value: "gateway",
    title: "چند دقیقه بعد دوباره تلاش کنید",
    content: "درگاه پرداخت ممکن است موقتاً در دسترس نباشد. پس از چند دقیقه پرداخت را تکرار کنید.",
  },
  {
    value: "refund",
    title: "مبلغ از حساب کسر شده است؟",
    content: "اگر مبلغ کسر شده و سفارش ثبت نشده، تا ۷۲ ساعت به حساب شما بازمی‌گردد.",
  },
]

export function ErrorDisplayTroubleshootingDemo() {
  return (
    <div className="w-full max-w-2xl">
      <ErrorDisplay
        title="پرداخت انجام نشد"
        errorMessage="خطای درگاه پرداخت: سرویس‌دهنده پاسخ نداد (کد ۵۰۲)."
        supportFormParams={{ projectRef: "cubix-app", category: "billing" }}
      >
        <Accordion defaultValue={["card"]} className="w-full">
          {steps.map((step) => (
            <AccordionItem key={step.value} value={step.value} className="border-b last:border-b-0">
              <AccordionTrigger className="px-4">{step.title}</AccordionTrigger>
              <AccordionContent className="px-4">{step.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ErrorDisplay>
    </div>
  )
}
