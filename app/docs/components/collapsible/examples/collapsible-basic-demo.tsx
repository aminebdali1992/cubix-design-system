"use client"

import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../docs-collapsible"

export function CollapsibleBasicDemo() {
  return (
    <div className="w-full max-w-sm rounded-lg border p-1">
      <Collapsible className="rounded-lg data-open:bg-muted">
        <CollapsibleTrigger render={<Button variant="ghost" className="w-full" />}>
          جزئیات محصول
          <ChevronDownIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4 ms-auto transition-transform group-data-panel-open/button:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0">
          <p className="text-muted-foreground">
            این هدفون با باتری ۴۰ ساعته، حذف نویز فعال و اتصال هم‌زمان به دو دستگاه عرضه می‌شود.
          </p>
          <Button size="xs">بیشتر بدانید</Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}