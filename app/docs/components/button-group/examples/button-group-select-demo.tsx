"use client"

import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/docs/components/select/docs-select"
import { TextFieldInput } from "@/app/docs/components/text-field/docs-text-field"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupSelectDemo() {
  return (
    <ButtonGroup aria-label="انتقال وجه">
      <Select defaultValue="toman">
        <SelectTrigger aria-label="واحد پول">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="toman">تومان</SelectItem>
          <SelectItem value="dollar">دلار</SelectItem>
          <SelectItem value="euro">یورو</SelectItem>
        </SelectContent>
      </Select>
      <TextFieldInput placeholder="مبلغ را وارد کنید" aria-label="مبلغ" inputMode="decimal" />
      <Button variant="outline" size="icon" aria-label="انتقال">
        <ArrowLeftIcon className="size-4" absoluteStrokeWidth strokeWidth={1.6} />
      </Button>
    </ButtonGroup>
  )
}
