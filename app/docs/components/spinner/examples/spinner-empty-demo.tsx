"use client"

import { Button } from "@/components/cubix/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/cubix/empty"
import { Spinner } from "@/components/cubix/spinner"

export function SpinnerEmptyDemo() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>در حال پردازش درخواست</EmptyTitle>
        <EmptyDescription>لطفاً صبر کنید و صفحه را تازه‌سازی نکنید.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          انصراف
        </Button>
      </EmptyContent>
    </Empty>
  )
}