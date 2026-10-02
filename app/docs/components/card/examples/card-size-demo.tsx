"use client"

import { CheckIcon, ChevronLeftIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../docs-card"

const features = [
  "زمان‌بندی روزانه یا هفتگی را انتخاب کنید.",
  "برای کانال‌ها یا هم‌تیمی‌های مشخص ارسال کنید.",
  "نمودارها، جدول‌ها و شاخص‌های کلیدی را اضافه کنید.",
]

export function CardSizeDemo() {
  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>گزارش‌های زمان‌بندی‌شده</CardTitle>
        <CardDescription>خلاصه هفتگی، بدون خروجی دستی.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-muted-foreground">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-foreground" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Button variant="outline" size="sm">
          تغییرات جدید
        </Button>
        <Button size="sm">
          راه‌اندازی
          <ChevronLeftIcon data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  )
}
