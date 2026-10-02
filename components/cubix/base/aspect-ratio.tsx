/*
  Cubix Aspect Ratio - a container that keeps a constant width-to-height ratio.

  Children are usually positioned with absolute inset-0 so they fill the box.
  The same visual API ships on Base UI, React Aria and Radix.
*/
import type { CSSProperties, ComponentProps } from "react"

import { cn } from "@/lib/utils"

type AspectRatioProps = ComponentProps<"div"> & {
  ratio: number
}

function AspectRatio({ ratio, className, style, ...props }: AspectRatioProps) {
  const ratioStyle = {
    ...style,
    aspectRatio: ratio,
  } satisfies CSSProperties

  return (
    <div
      data-slot="aspect-ratio"
      style={ratioStyle}
      className={cn("relative overflow-hidden", className)}
      {...props}
    />
  )
}

export { AspectRatio, type AspectRatioProps }
