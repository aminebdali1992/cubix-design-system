"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar as AvatarPrimitive, Slot } from "radix-ui"

function Avatar({
  className,
  size = "default",
  ring = false,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg" | "xl" | "2xl"
  ring?: boolean
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-ring={ring ? "true" : undefined}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=2xl]:size-16 data-[size=lg]:size-10 data-[size=sm]:size-6 data-[size=xl]:size-12 dark:after:mix-blend-lighten data-[ring=true]:before:pointer-events-none data-[ring=true]:before:absolute data-[ring=true]:before:-inset-[3px] data-[ring=true]:before:rounded-full data-[ring=true]:before:border data-[ring=true]:before:border-border",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  delay,
  delayMs,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  delay?: number
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      delayMs={delayMs ?? delay}
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-description text-muted-foreground group-data-[size=sm]/avatar:text-[10px]",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="avatar-badge"
      className={cn(
        "absolute end-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background outline-none select-none focus-visible:ring-ring",
        "empty:group-data-[size=sm]/avatar:size-1.5 group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "empty:group-data-[size=default]/avatar:size-2 group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "empty:group-data-[size=lg]/avatar:size-2.5 group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        "empty:group-data-[size=xl]/avatar:size-2.5 empty:group-data-[size=xl]/avatar:end-0.5 empty:group-data-[size=xl]/avatar:bottom-0.5 group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
        "empty:group-data-[size=2xl]/avatar:size-3 empty:group-data-[size=2xl]/avatar:end-[3.5px] empty:group-data-[size=2xl]/avatar:bottom-[3.5px] not-empty:group-data-[size=2xl]/avatar:end-[1.5px] not-empty:group-data-[size=2xl]/avatar:bottom-[1.5px] group-data-[size=2xl]/avatar:size-4 group-data-[size=2xl]/avatar:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      role="group"
      className={cn(
        "group/avatar-group flex -space-x-2 rtl:space-x-reverse *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-description text-muted-foreground ring-2 ring-background group-has-data-[size=sm]/avatar-group:text-[10px] group-has-data-[size=2xl]/avatar-group:size-16 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=xl]/avatar-group:size-12 [&>svg]:size-4 group-has-data-[size=2xl]/avatar-group:[&>svg]:size-7 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=xl]/avatar-group:[&>svg]:size-6 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge }
