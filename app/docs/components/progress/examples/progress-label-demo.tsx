"use client"

import { Progress, ProgressLabel, ProgressValue } from "../docs-progress"

export function ProgressLabelDemo() {
  return (
    <Progress value={56} className="w-full max-w-sm">
      <ProgressLabel>در حال بارگذاری</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}