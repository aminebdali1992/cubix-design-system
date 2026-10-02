"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

const plans = [
  {
    value: "starter",
    title: "پلن پایه",
    description: "برای پروژه‌های شخصی با یک کاربر و پنج گیگابایت فضا.",
  },
  {
    value: "team",
    title: "پلن تیمی",
    description: "تا ده کاربر، فضای نامحدود و پشتیبانی در ساعات کاری.",
  },
  {
    value: "enterprise",
    title: "پلن سازمانی",
    description: "کاربر نامحدود، ورود یکپارچه و پشتیبانی شبانه‌روزی.",
  },
]

export function AccordionCustomDemo() {
  return (
    <Accordion defaultValue={["team"]} className="w-full max-w-md gap-2">
      {plans.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="rounded-xl border bg-muted/40 px-4 last:border-b"
        >
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
