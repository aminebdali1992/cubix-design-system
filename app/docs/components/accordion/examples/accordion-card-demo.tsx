"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/cubix/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../docs-accordion"

const items = [
  {
    value: "plans",
    question: "چه پلن‌هایی دارید؟",
    answer: "سه پلن پایه، تیمی و سازمانی داریم که می‌توانید ماهانه یا سالانه پرداخت کنید.",
  },
  {
    value: "billing",
    question: "صورت‌حساب چه زمانی صادر می‌شود؟",
    answer: "صورت‌حساب در ابتدای هر دوره صادر و به ایمیلتان فرستاده می‌شود.",
  },
  {
    value: "cancel",
    question: "می‌توانم اشتراکم را لغو کنم؟",
    answer: "بله. هر زمان از بخش اشتراک لغو کنید، دسترسی تا پایان دوره‌ی فعلی باقی می‌ماند.",
  },
]

export function AccordionCardDemo() {
  return (
    <Card className="w-full max-w-md pb-1">
      <CardHeader>
        <CardTitle>اشتراک و پرداخت</CardTitle>
        <CardDescription>پرسش‌های رایج درباره‌ی پلن‌ها، صورت‌حساب و لغو اشتراک.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Accordion defaultValue={["plans"]}>
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value} className="px-(--card-spacing)">
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
