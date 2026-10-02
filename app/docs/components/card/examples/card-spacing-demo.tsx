"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../docs-card"

export function CardSpacingDemo() {
  return (
    <Card className="w-full max-w-sm gap-0 [--card-spacing:--spacing(6)]">
      <CardHeader className="border-b">
        <CardTitle>شرایط استفاده</CardTitle>
        <CardDescription>پیش از پذیرش توافق‌نامه، شرایط را مرور کنید.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 py-(--card-spacing) text-muted-foreground">
        <p>این شرایط استفاده شما از فضای کاری، اسناد مشترک و ابزارهای همکاری را تعیین می‌کند.</p>
        <p>مسئولیت محتوای بارگذاری‌شده و دسترسی‌های تیم با شماست.</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">رد کردن</Button>
        <Button>می‌پذیرم</Button>
      </CardFooter>
    </Card>
  )
}
