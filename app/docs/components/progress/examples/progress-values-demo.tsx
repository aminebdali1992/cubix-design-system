"use client"

import { Progress } from "../docs-progress"

export function ProgressValuesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={0} aria-label="۰ درصد" />
      <Progress value={25} aria-label="۲۵ درصد" />
      <Progress value={50} aria-label="۵۰ درصد" />
      <Progress value={75} aria-label="۷۵ درصد" />
      <Progress value={100} aria-label="۱۰۰ درصد" />
    </div>
  )
}