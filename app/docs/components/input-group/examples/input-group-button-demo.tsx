"use client"

import { useState } from "react"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/app/docs/components/popover/docs-popover"
import {
  CopyIcon,
  InfoCircleIcon,
  StarIcon,
  TickIcon,
} from "@/components/docs/empty-icons"
import { cn } from "@/lib/utils"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../docs-input-group"

export function InputGroupButtonDemo() {
  const [copied, setCopied] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText("https://cubix.ir")
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput dir="ltr" defaultValue="https://cubix.ir" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="کپی" onClick={copyUrl}>
            {copied ? <TickIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Popover>
            <PopoverTrigger
              render={
                <InputGroupButton size="icon-xs" variant="secondary" aria-label="اطلاعات" />
              }
            >
              <InfoCircleIcon />
            </PopoverTrigger>
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>اتصال شما امن نیست</PopoverTitle>
                <PopoverDescription>
                  در این سایت اطلاعات حساس وارد نکنید.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
        <InputGroupInput dir="ltr" placeholder="cubix.ir" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="علاقه‌مندی"
            onClick={() => setIsFavorite((value) => !value)}
          >
            <StarIcon className={cn(isFavorite && "fill-primary text-primary")} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="عبارت جستجو را بنویسید" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">جستجو</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}