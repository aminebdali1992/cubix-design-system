"use client"

import * as React from "react"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error"

type AvatarContextValue = {
  status: ImageLoadingStatus
  setStatus: (status: ImageLoadingStatus) => void
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null)

function useAvatarContext() {
  const context = React.useContext(AvatarContext)
  if (!context) {
    throw new Error("Avatar parts must be used within Avatar.")
  }
  return context
}

function Avatar({
  className,
  size = "default",
  ring = false,
  ...props
}: ComponentProps<"span"> & {
  size?: "default" | "sm" | "lg" | "xl" | "2xl"
  ring?: boolean
}) {
  const [status, setStatus] = React.useState<ImageLoadingStatus>("idle")
  const value = React.useMemo(() => ({ status, setStatus }), [status])

  return (
    <AvatarContext.Provider value={value}>
      <span
        data-slot="avatar"
        data-size={size}
        data-ring={ring ? "true" : undefined}
        className={cn(
          "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=2xl]:size-16 data-[size=lg]:size-10 data-[size=sm]:size-6 data-[size=xl]:size-12 dark:after:mix-blend-lighten data-[ring=true]:before:pointer-events-none data-[ring=true]:before:absolute data-[ring=true]:before:-inset-[3px] data-[ring=true]:before:rounded-full data-[ring=true]:before:border data-[ring=true]:before:border-border",
          className
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
}

function AvatarImage({
  className,
  alt,
  src,
  onLoad,
  onError,
  ref,
  ...props
}: ComponentProps<"img">) {
  const { status, setStatus } = useAvatarContext()

  React.useEffect(() => {
    if (!src) {
      setStatus("error")
      return
    }
    setStatus("loading")
  }, [setStatus, src])

  return (
    <img
      alt={alt}
      src={src}
      {...props}
      data-slot="avatar-image"
      hidden={status !== "loaded"}
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth > 0) {
          setStatus("loaded")
        }
        onLoad?.(event)
      }}
      onError={(event) => {
        setStatus("error")
        onError?.(event)
      }}
      ref={(node) => {
        if (node?.complete) {
          setStatus(node.naturalWidth > 0 ? "loaded" : "error")
        }
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
    />
  )
}

function AvatarFallback({
  className,
  delay = 0,
  ...props
}: ComponentProps<"span"> & {
  delay?: number
}) {
  const { status } = useAvatarContext()
  const [waiting, setWaiting] = React.useState(delay > 0)

  React.useEffect(() => {
    if (delay <= 0) {
      setWaiting(false)
      return
    }
    setWaiting(true)
    const timeoutId = window.setTimeout(() => setWaiting(false), delay)
    return () => window.clearTimeout(timeoutId)
  }, [delay, status])

  if (status === "loaded" || waiting) {
    return null
  }

  return (
    <span
      data-slot="avatar-fallback"
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
  children,
  render,
  ...props
}: ComponentProps<"span"> & {
  render?: React.ReactElement<{
    className?: string
    "data-slot"?: string
    children?: React.ReactNode
  }>
}) {
  const badgeClassName = cn(
    "absolute end-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background outline-none select-none focus-visible:ring-ring",
    "empty:group-data-[size=sm]/avatar:size-1.5 group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
    "empty:group-data-[size=default]/avatar:size-2 group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
    "empty:group-data-[size=lg]/avatar:size-2.5 group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
    "empty:group-data-[size=xl]/avatar:size-2.5 empty:group-data-[size=xl]/avatar:end-0.5 empty:group-data-[size=xl]/avatar:bottom-0.5 group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
    "empty:group-data-[size=2xl]/avatar:size-3 empty:group-data-[size=2xl]/avatar:end-[3.5px] empty:group-data-[size=2xl]/avatar:bottom-[3.5px] not-empty:group-data-[size=2xl]/avatar:end-[1.5px] not-empty:group-data-[size=2xl]/avatar:bottom-[1.5px] group-data-[size=2xl]/avatar:size-4 group-data-[size=2xl]/avatar:[&>svg]:size-3",
    className
  )

  if (React.isValidElement(render)) {
    return React.cloneElement(render, {
      ...props,
      className: cn(badgeClassName, render.props.className),
      "data-slot": "avatar-badge",
      children: children ?? render.props.children,
    })
  }

  return (
    <span data-slot="avatar-badge" className={badgeClassName} {...props}>
      {children}
    </span>
  )
}

function AvatarGroup({ className, ...props }: ComponentProps<"div">) {
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

function AvatarGroupCount({ className, ...props }: ComponentProps<"div">) {
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
