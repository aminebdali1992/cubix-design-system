"use client"

import {
  Branch,
  BranchContent,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from "../docs-branch"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"

const versions = [
  "نسخه‌ی کوتاه: فقط مراحل اصلی انتشار.",
  "نسخه‌ی کامل: جزئیات مهاجرت داده، پایش و بازگشت.",
  "نسخه‌ی کاربرمحور: تمرکز روی ریسک‌ها و اطلاع‌رسانی به کاربران.",
  "نسخه‌ی محتاطانه: انتشار مرحله‌ای با یادداشت‌های هر مرحله.",
  "نسخه‌ی مدیریتی: خلاصه‌ای کوتاه از برنامه‌ی انتشار.",
]

export function BranchManyDemo() {
  return (
    <Branch defaultBranch={2} className="mx-auto max-w-md">
      <BranchContent>
        {versions.map((text) => (
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
  )
}
