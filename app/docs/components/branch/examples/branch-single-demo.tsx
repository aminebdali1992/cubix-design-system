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

export function BranchSingleDemo() {
  return (
    <Branch className="mx-auto max-w-md">
      <BranchContent>
        <Bubble variant="muted">
          <BubbleContent>
            این پاسخ فقط یک نسخه دارد، برای همین انتخابگر نمایش داده نمی‌شود.
          </BubbleContent>
        </Bubble>
      </BranchContent>
      <BranchSelector>
        <BranchPrevious />
        <BranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>
  )
}
