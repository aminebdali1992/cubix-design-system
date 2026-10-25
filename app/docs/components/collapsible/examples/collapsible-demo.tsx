"use client"

import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../docs-collapsible"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full max-w-[350px] flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 ps-4">
        <h4 className="text-label font-normal">سفارش شماره ۴۱۸۹</h4>
        <CollapsibleTrigger
          render={<Button variant="ghost" size="icon-sm" aria-label="نمایش جزئیات سفارش" />}
        >
          <ChevronsUpDownIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
        </CollapsibleTrigger>
      </div>
      <div className="flex items-center justify-between rounded-lg border px-4 py-2 text-label">
        <span className="text-muted-foreground">وضعیت</span>
        <span>ارسال شده</span>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 rounded-lg border px-4 py-2">
          <p className="text-label">آدرس ارسال</p>
          <p className="text-caption text-muted-foreground">تهران، خیابان ولیعصر، کوچه نسترن، پلاک ۱۲</p>
        </div>
        <div className="flex flex-col gap-1 rounded-lg border px-4 py-2">
          <p className="text-label">اقلام سفارش</p>
          <p className="text-caption text-muted-foreground">۲ عدد هدفون استودیویی بی‌سیم</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}