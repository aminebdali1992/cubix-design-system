"use client"

import { LoaderIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../docs-input-group"

export function InputGroupSpinnerDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="در حال جستجو" />
        <InputGroupAddon align="inline-end">
          <LoaderIcon role="status" aria-label="در حال بارگذاری" className="animate-spin" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="در حال پردازش" />
        <InputGroupAddon>
          <LoaderIcon role="status" aria-label="در حال بارگذاری" className="animate-spin" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="ذخیره‌ی تغییرات" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>در حال ذخیره</InputGroupText>
          <LoaderIcon role="status" aria-label="در حال بارگذاری" className="animate-spin" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="به‌روزرسانی اطلاعات" />
        <InputGroupAddon>
          <LoaderIcon role="status" aria-label="در حال بارگذاری" className="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>لطفاً صبر کنید</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}