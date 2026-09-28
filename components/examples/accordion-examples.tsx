"use client"

import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/docs/components/accordion/docs-accordion"
import { Button } from "@/components/cubix/button"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

const faqs = [
  {
    value: "accessible",
    question: "آیا دسترس‌پذیر است؟",
    answer:
      "بله. از الگوی WAI-ARIA پیروی می‌کند و همهٔ بخش‌ها با صفحه‌کلید باز و بسته می‌شوند.",
  },
  {
    value: "styled",
    question: "آیا ظاهر آماده دارد؟",
    answer:
      "بله. با توکن‌های Cubix رنگ‌آمیزی شده و در حالت تیره هم درست نمایش داده می‌شود.",
  },
  {
    value: "animated",
    question: "آیا انیمیشن دارد؟",
    answer:
      "بله. ارتفاع بخش‌ها نرم تغییر می‌کند و اگر کاهش حرکت در سیستم فعال باشد، انیمیشن حذف می‌شود.",
  },
]

const shipping = [
  {
    value: "delivery",
    question: "سفارش چند روزه می‌رسد؟",
    answer:
      "سفارش‌های تهران یک روز کاری و سفارش‌های شهرهای دیگر دو تا چهار روز کاری بعد تحویل داده می‌شوند.",
  },
  {
    value: "cost",
    question: "هزینهٔ ارسال چطور حساب می‌شود؟",
    answer:
      "ارسال سفارش‌های بالای یک میلیون تومان رایگان است و برای بقیه بر اساس وزن بسته حساب می‌شود.",
  },
  {
    value: "returns",
    question: "می‌توانم کالا را مرجوع کنم؟",
    answer:
      "بله. تا هفت روز پس از تحویل می‌توانید از صفحهٔ سفارش‌ها درخواست مرجوعی ثبت کنید.",
  },
]

export function AccordionDemo() {
  return (
    <Accordion defaultValue={["accessible"]} className="mx-auto w-full max-w-md">
      {faqs.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AccordionMultipleDemo() {
  return (
    <Accordion
      multiple
      defaultValue={["delivery", "returns"]}
      className="mx-auto w-full max-w-md"
    >
      {shipping.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const allShippingValues = shipping.map((item) => item.value)

export function AccordionControlledDemo() {
  const [value, setValue] = React.useState<string[]>(["cost"])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setValue(allShippingValues)}
        >
          باز کردن همه
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue([])}>
          بستن همه
        </Button>
      </div>
      <Accordion multiple value={value} onValueChange={setValue}>
        {shipping.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export function AccordionDisabledItemDemo() {
  return (
    <Accordion defaultValue={["profile"]} className="mx-auto w-full max-w-md">
      <AccordionItem value="profile">
        <AccordionTrigger>اطلاعات حساب</AccordionTrigger>
        <AccordionContent>
          نام، ایمیل و شمارهٔ تلفن خود را از این بخش ویرایش کنید.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment" disabled>
        <AccordionTrigger>روش‌های پرداخت</AccordionTrigger>
        <AccordionContent>
          این بخش پس از تأیید حساب فعال می‌شود.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="notifications">
        <AccordionTrigger>اعلان‌ها</AccordionTrigger>
        <AccordionContent>
          انتخاب کنید کدام پیام‌ها با ایمیل یا پیامک برایتان فرستاده شود.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function AccordionDisabledDemo() {
  return (
    <Accordion disabled className="mx-auto w-full max-w-md">
      {faqs.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AccordionIconDemo() {
  return (
    <Accordion defaultValue={["accessible"]} className="mx-auto w-full max-w-md">
      {faqs.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger icon={<ButtonDemoIcon />}>
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AccordionCustomStylingDemo() {
  return (
    <Accordion defaultValue={["delivery"]} className="mx-auto w-full max-w-md gap-2">
      {shipping.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="rounded-xl border bg-muted/40 px-4 last:border-b"
        >
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AccordionLtrDemo() {
  return (
    <Accordion
      dir="ltr"
      lang="en"
      defaultValue={["shipping"]}
      className="mx-auto w-full max-w-md"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>How long does delivery take?</AccordionTrigger>
        <AccordionContent>
          Orders ship within one business day and arrive in two to four days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Can I return an item?</AccordionTrigger>
        <AccordionContent>
          Yes. Request a return from your orders page within seven days of
          delivery.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
