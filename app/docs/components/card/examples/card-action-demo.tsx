"use client"

import { BellIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../docs-card"

export function CardActionDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>اعلان‌ها</CardTitle>
        <CardDescription>۳ پیام خوانده‌نشده دارید.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            خواندن همه
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <BellIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-description text-muted-foreground">انتشار شما با موفقیت انجام شد.</p>
        </div>
      </CardContent>
    </Card>
  )
}
