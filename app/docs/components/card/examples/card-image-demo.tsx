"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../docs-card"

export function CardImageDemo() {
  return (
    <Card className="w-full max-w-sm pt-0">
      <div aria-hidden className="aspect-video bg-linear-to-br from-muted to-muted-foreground/20" />
      <CardHeader>
        <CardTitle>دورهمی طراحی سیستم</CardTitle>
        <CardDescription>
          توکن‌ها، baseها و رابط عامل هوشمند - یک جلسه عملی برای تیم‌های محصول.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full">
          مشاهده جزئیات
        </Button>
      </CardFooter>
    </Card>
  )
}
