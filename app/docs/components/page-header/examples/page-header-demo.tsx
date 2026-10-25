"use client"

import { DatabaseIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card } from "@/app/docs/components/card/docs-card"

import {
  PageHeader,
  PageHeaderAside,
  PageHeaderDescription,
  PageHeaderIcon,
  PageHeaderMeta,
  PageHeaderSummary,
  PageHeaderTitle,
} from "../docs-page-header"

export function PageHeaderDemo() {
  return (
    <div className="w-full">
      <PageHeader size="default">
        <PageHeaderMeta>
          <PageHeaderIcon>
            <Card className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border py-0 ring-0">
              <DatabaseIcon className="size-5" />
            </Card>
          </PageHeaderIcon>
          <PageHeaderSummary>
            <PageHeaderTitle>تابع نمونه</PageHeaderTitle>
            <PageHeaderDescription>
              توابع بدون سرور که در لبهٔ شبکه با تأخیر کم و مقیاس‌پذیری خودکار اجرا می‌شوند.
            </PageHeaderDescription>
          </PageHeaderSummary>
          <PageHeaderAside>
            <Button variant="outline" size="sm">
              ثانویه
            </Button>
            <Button size="sm">استقرار تابع</Button>
          </PageHeaderAside>
        </PageHeaderMeta>
      </PageHeader>
    </div>
  )
}
