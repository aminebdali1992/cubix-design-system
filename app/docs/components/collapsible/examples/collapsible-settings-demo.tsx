"use client"

import * as React from "react"
import { MaximizeIcon, MinimizeIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { TextFieldInput } from "@/components/cubix/text-field"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../docs-collapsible"

const toPersianDigits = (value: string) =>
  value.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])

function CornerInput({ label }: { label: string }) {
  const [value, setValue] = React.useState("۰")
  return (
    <TextFieldInput
      aria-label={label}
      className="h-8"
      inputMode="numeric"
      placeholder="۰"
      value={value}
      onChange={(event) => setValue(toPersianDigits(event.target.value))}
    />
  )
}

export function CollapsibleSettingsDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="flex w-full max-w-72 flex-col gap-4 rounded-lg border p-4">
      <div className="flex flex-col gap-1">
        <p className="text-label">گردی گوشه‌ها</p>
        <p className="text-caption text-muted-foreground">
          شعاع گوشه‌ها را یکسان یا جدا تنظیم کنید.
        </p>
      </div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex items-start gap-2">
        <div className="grid w-full grid-cols-2 gap-2">
          <CornerInput label="بالا راست" />
          <CornerInput label="بالا چپ" />
          <CollapsibleContent className="col-span-full -m-1 grid grid-cols-subgrid gap-2 p-1">
            <CornerInput label="پایین راست" />
            <CornerInput label="پایین چپ" />
          </CollapsibleContent>
        </div>
        <CollapsibleTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              aria-label={isOpen ? "بستن تنظیمات جداگانه" : "تنظیم جداگانه گوشه‌ها"}
            />
          }
        >
          {isOpen ? <MinimizeIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" /> : <MaximizeIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />}
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  )
}