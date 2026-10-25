"use client"

import { CopyIcon, DocumentIcon } from "@/components/docs/empty-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../docs-input-group"

export function InputGroupBlockStartDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <InputGroup className="h-auto">
          <InputGroupInput id="block-start-input"
            aria-label="ورودی" placeholder="امین ابدالی" />
          <InputGroupAddon align="block-start">
            <InputGroupText className="text-caption text-muted-foreground/70">نام و نام خانوادگی</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <InputGroup className="overflow-hidden">
          <InputGroupTextarea
            id="block-start-textarea"
            aria-label="کد"
            dir="ltr"
            placeholder="console.log('سلام دنیا');"
            className="font-mono"
          />
          <InputGroupAddon align="block-start" className="border-b bg-muted/50">
            <DocumentIcon />
            <InputGroupText className="font-mono">script.js</InputGroupText>
            <InputGroupButton size="icon-xs" className="ms-auto" aria-label="کپی">
              <CopyIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
