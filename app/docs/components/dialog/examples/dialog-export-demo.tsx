"use client"

import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/cubix/collapsible"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogSectionSeparator,
  DialogTitle,
  DialogTrigger,
} from "../docs-dialog"

export function DialogExportDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>خروجی گرفتن از نتایج</DialogTrigger>
      <DialogContent size="small">
        <DialogHeader>
          <DialogTitle>خروجی گرفتن از نتایج</DialogTitle>
        </DialogHeader>
        <DialogSection>
          <p className="text-label">همه‌ی ۲۵۰ ردیف به‌صورت فایل CSV دریافت می‌شوند.</p>
        </DialogSection>
        <DialogSectionSeparator />
        <Collapsible>
          <CollapsibleTrigger className="group flex w-full items-center justify-between px-5 py-4 text-start text-label outline-none focus-visible:bg-muted">
            چه چیزهایی شامل می‌شود
            <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-data-[panel-open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <DialogSection className="pt-1 text-muted-foreground">
              <ul className="list-disc space-y-1 ps-5">
                <li>ستون‌های جدول</li>
                <li>فیلترهای اعمال‌شده</li>
                <li>مرتب‌سازی فعلی</li>
              </ul>
            </DialogSection>
          </CollapsibleContent>
        </Collapsible>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>انصراف</DialogClose>
          <DialogClose render={<Button variant="success" size="sm" />}>دریافت CSV</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
