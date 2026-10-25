"use client"

import { Spinner } from "@/components/cubix/spinner"

export function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs items-center gap-3 rounded-xl bg-muted p-3">
      <Spinner />
      <span className="min-w-0 flex-1 truncate text-label font-normal text-foreground">
        در حال پرداخت
      </span>
      <span className="text-description tabular-nums text-muted-foreground">۱۲۰٬۰۰۰ تومان</span>
    </div>
  )
}