"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

export function AccordionDisabledItemDemo() {
  return (
    <Accordion defaultValue={["profile"]} className="w-full max-w-md">
      <AccordionItem value="profile">
        <AccordionTrigger>اطلاعات حساب</AccordionTrigger>
        <AccordionContent>نام، ایمیل و شماره تلفن خود را از این بخش ویرایش کنید.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment" disabled>
        <AccordionTrigger>روش‌های پرداخت</AccordionTrigger>
        <AccordionContent>این بخش پس از تأیید حساب فعال می‌شود.</AccordionContent>
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
