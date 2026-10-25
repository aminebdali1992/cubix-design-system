"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  dir = "rtl",
  ...props
}: ScrollAreaPrimitive.Root.Props & { dir?: "rtl" | "ltr" }) {
  return (
    <DirectionProvider direction={dir}>
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      dir={dir}
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {/* Overrides the primitive's inline min-width: fit-content, which lets truncated children widen the content past the viewport. */}
        <ScrollAreaPrimitive.Content data-slot="scroll-area-content" style={{ minWidth: 0 }}>
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
    </DirectionProvider>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "z-10 flex touch-none p-0.5 opacity-0 transition-[opacity,width,height] delay-500 duration-300 select-none data-horizontal:h-[9px] data-horizontal:flex-col data-vertical:h-full data-vertical:w-[9px] data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-100 data-hovering:opacity-100 data-hovering:delay-0 data-hovering:duration-100",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border transition-colors hover:bg-foreground/30"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
