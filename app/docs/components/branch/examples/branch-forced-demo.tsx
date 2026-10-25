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

export function BranchForcedDemo() {
  return (
    <Branch className="mx-auto max-w-md">
      <BranchContent>
        <Bubble variant="muted">
          <BubbleContent>
            با prop force، انتخابگر حتی با یک نسخه هم نمایش داده می‌شود.
          </BubbleContent>
        </Bubble>
      </BranchContent>
      <BranchSelector force>
        <BranchPrevious />
        <BranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>
  )
}
