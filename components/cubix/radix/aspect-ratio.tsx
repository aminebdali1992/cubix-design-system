"use client"

import type { ComponentProps } from "react"
import { AspectRatio as AspectRatioPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function AspectRatio({
  className,
  ratio,
  ...props
}: Omit<ComponentProps<typeof AspectRatioPrimitive.Root>, "ratio"> & {
  ratio: number
}) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      ratio={ratio}
      className={cn("relative", className)}
      {...props}
    />
  )
}

export { AspectRatio }
