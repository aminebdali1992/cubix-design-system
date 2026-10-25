"use client"

import {
  Branch,
  BranchContent,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
  useBranch,
} from "../docs-branch"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"

const replies = [
  "برای انتشار، اول فهرست تغییرات را مرور کن و بعد تست‌های اصلی را اجرا کن.",
  "نسخه‌ی جدید را پشت یک فلگ منتشر کن تا در صورت مشکل سریع برگردی.",
  "بعد از انتشار، یک ساعت نرخ خطا و زمان پاسخ را زیر نظر بگیر.",
]

function CustomBranchPage() {
  const { currentBranch, totalBranches } = useBranch()

  return (
    <BranchPage className="min-w-20">
      نسخه {(currentBranch + 1).toLocaleString("fa-IR")} از{" "}
      {totalBranches.toLocaleString("fa-IR")}
    </BranchPage>
  )
}

export function BranchPageLabelDemo() {
  return (
    <Branch defaultBranch={0} className="mx-auto max-w-md">
      <BranchContent>
        {replies.map((text) => (
          <Bubble key={text} variant="muted">
            <BubbleContent>{text}</BubbleContent>
          </Bubble>
        ))}
      </BranchContent>
      <BranchSelector>
        <BranchPrevious />
        <CustomBranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>
  )
}
