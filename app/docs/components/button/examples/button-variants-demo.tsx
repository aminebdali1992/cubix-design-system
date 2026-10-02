"use client"

import { Button } from "../docs-button"

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="gray">متن دکمه</Button>
      <Button variant="outline">متن دکمه</Button>
      <Button variant="ghost">متن دکمه</Button>
      <Button variant="link">متن دکمه</Button>
    </div>
  )
}
