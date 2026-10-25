"use client"

import * as React from "react"

import {
  Branch,
  BranchContent,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from "../docs-branch"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"

const replies = [
  "برای انتشار، اول فهرست تغییرات را مرور کن و بعد تست‌های اصلی را اجرا کن.",
  "نسخه‌ی جدید را پشت یک فلگ منتشر کن تا در صورت مشکل سریع برگردی.",
  "بعد از انتشار، یک ساعت نرخ خطا و زمان پاسخ را زیر نظر بگیر.",
]

export function BranchControlledDemo() {
  const [branch, setBranch] = React.useState(1)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-start gap-3">
      <div className="flex flex-wrap gap-2">
        {replies.map((_, index) => (
          <Button
            key={index}
            size="xs"
            variant={branch === index ? "secondary" : "outline"}
            onClick={() => setBranch(index)}
          >
            نسخه {(index + 1).toLocaleString("fa-IR")}
          </Button>
        ))}
      </div>
      <Branch branch={branch} onBranchChange={setBranch}>
        <BranchContent>
          {replies.map((text) => (
            <Bubble key={text} variant="muted">
              <BubbleContent>{text}</BubbleContent>
            </Bubble>
          ))}
        </BranchContent>
        <BranchSelector>
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}
