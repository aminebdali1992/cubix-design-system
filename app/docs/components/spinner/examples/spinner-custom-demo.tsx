"use client"

import type { ComponentProps } from "react"
import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function CustomSpinner({ className, ...props }: ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="در حال بارگذاری"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustomDemo() {
  return (
    <div className="flex items-center gap-4">
      <CustomSpinner />
    </div>
  )
}