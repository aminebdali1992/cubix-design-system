"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

export function AccordionIconDemo() {
  return (
    <Accordion defaultValue={["shipping"]} className="w-full max-w-md">
      <AccordionItem value="shipping">
        <AccordionTrigger icon={<ButtonDemoIcon />}>ارسال سفارش</AccordionTrigger>
        <AccordionContent>
          سفارش‌های تهران یک روز کاری و شهرهای دیگر دو تا چهار روز کاری بعد می‌رسند.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment">
        <AccordionTrigger icon={<ButtonDemoIcon />}>پرداخت</AccordionTrigger>
        <AccordionContent>با همه کارت‌های عضو شتاب یا اعتبار کیف پول پرداخت کنید.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger icon={<ButtonDemoIcon />}>گارانتی</AccordionTrigger>
        <AccordionContent>همه کالاها هجده ماه گارانتی اصالت و سلامت فیزیکی دارند.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
