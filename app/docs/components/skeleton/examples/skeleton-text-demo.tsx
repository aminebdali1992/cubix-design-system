"use client"

import { Skeleton } from "@/components/cubix/skeleton"

export function SkeletonTextDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  )
}