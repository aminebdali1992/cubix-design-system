"use client"

import { useState } from "react"


import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../docs-input-group"

const MAX_LENGTH = 280
const toFa = (value: number) => value.toLocaleString("fa-IR")

export function InputGroupBlockEndDemo() {
  const [comment, setComment] = useState("")

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <InputGroup className="h-auto">
          <InputGroupInput id="block-end-input"
            aria-label="مبلغ" placeholder="مبلغ را وارد کنید" />
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-caption text-muted-foreground/70">تومان</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <InputGroup className="overflow-hidden">
          <InputGroupTextarea
            id="block-end-textarea"
            aria-label="نظر"
            placeholder="نظر خود را بنویسید"
            maxLength={MAX_LENGTH}
            value={comment}
            onChange={(event) => setComment(event.target.value.slice(0, MAX_LENGTH))}
            className="field-sizing-fixed h-24 min-h-24 resize-none overflow-y-auto"
          />
          <InputGroupAddon align="block-end" className="border-t bg-muted/50">
            <InputGroupText>
              {toFa(comment.length)}/{toFa(MAX_LENGTH)}
            </InputGroupText>
            <InputGroupButton variant="default" size="sm" className="ms-auto">
              ارسال
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}