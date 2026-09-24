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
      className={cn("relative", className)}
      {...props}
    />
  )
}

export { AspectRatio }
