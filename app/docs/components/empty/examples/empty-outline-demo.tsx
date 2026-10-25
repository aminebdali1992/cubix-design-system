"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { UploadIcon } from "@/components/docs/empty-icons"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../docs-empty"

export function EmptyOutlineDemo() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UploadIcon />
        </EmptyMedia>
        <EmptyTitle>فضای ابری خالی است</EmptyTitle>
        <EmptyDescription>
          فایل‌هایتان را در فضای ابری بارگذاری کنید تا از هر جا به آن‌ها دسترسی داشته باشید.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          بارگذاری فایل
        </Button>
      </EmptyContent>
    </Empty>
  )
}
