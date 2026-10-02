/*
  Cubix Aspect Ratio - a container that keeps a constant width-to-height ratio.

  Children are usually positioned with absolute inset-0 so they fill the box.
  Cubix uses the CSS aspect-ratio property on every base so width constraints
  such as max-w-sm apply to the same element that holds the ratio. The Radix
  padding-bottom wrapper would ignore those classes on the root.
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
