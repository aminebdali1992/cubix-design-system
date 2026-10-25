"use client"

import { RefreshCcwIcon } from "lucide-react"
import { NotificationIcon } from "@/components/docs/empty-icons"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../docs-empty"

export function EmptyBackgroundDemo() {
  return (
    <Empty className="h-full bg-gradient-to-b from-muted/50 from-30% to-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <NotificationIcon />
        </EmptyMedia>
        <EmptyTitle>اعلانی ندارید</EmptyTitle>
        <EmptyDescription>
          همه‌چیز را دیده‌اید. اعلان‌های جدید اینجا نمایش داده می‌شوند.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <RefreshCcwIcon data-icon="inline-start" />
          به‌روزرسانی
        </Button>
      </EmptyContent>
    </Empty>
  )
}
