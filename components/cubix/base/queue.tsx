"use client"

import * as React from "react"
import { ChevronDownIcon, ImageIcon, PaperclipIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/cubix/collapsible"
import { cn } from "@/lib/utils"

export type QueueMessagePart = {
  type: string
  text?: string
  url?: string
  filename?: string
  mediaType?: string
}

export type QueueMessage = {
  id: string
  parts: QueueMessagePart[]
}

export type QueueTodo = {
  id: string
  title: string
  description?: string
  status?: "pending" | "completed"
}

export type QueueProps = React.ComponentProps<"div">

function Queue({ className, ...props }: QueueProps) {
  return (
    <div
      data-slot="queue"
      className={cn(
        "not-prose flex flex-col gap-1.5 overflow-hidden rounded-xl border bg-card px-2 pt-2 pb-2 text-card-foreground shadow-xs",
        className
      )}
      {...props}
    />
  )
}

export type QueueSectionProps = Omit<
  React.ComponentProps<typeof Collapsible>,
  "onOpenChange"
> & {
  onOpenChange?: (open: boolean) => void
}

function QueueSection({
  className,
  defaultOpen = true,
  onOpenChange,
  ...props
}: QueueSectionProps) {
  return (
    <Collapsible
      data-slot="queue-section"
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      className={cn("group/queue-section w-full", className)}
      {...props}
    />
  )
}

export type QueueSectionTriggerProps = React.ComponentProps<
  typeof CollapsibleTrigger
>

function QueueSectionTrigger({
  className,
  children,
  ...props
}: QueueSectionTriggerProps) {
  return (
    <CollapsibleTrigger
      data-slot="queue-section-trigger"
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-description font-medium text-muted-foreground outline-none transition-colors",
        "hover:bg-muted/70 hover:text-foreground focus-visible:bg-muted/70 focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      {...props}
    >
      {children}
    </CollapsibleTrigger>
  )
}

export type QueueSectionLabelProps = React.ComponentProps<"span"> & {
  count?: number
  label: string
  icon?: React.ReactNode
}

function QueueSectionLabel({
  count,
  label,
  icon,
  className,
  children,
  ...props
}: QueueSectionLabelProps) {
  return (
    <span
      data-slot="queue-section-label"
      className={cn("flex min-w-0 items-center gap-2", className)}
      {...props}
    >
      <ChevronDownIcon className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 -rotate-90 group-data-open/queue-section:rotate-0" />
      {icon ? (
        <span className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-3.5">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 truncate tracking-tight">
        {children ?? (
          <>
            {typeof count === "number" ? (
              <span className="tabular-nums">{count}</span>
            ) : null}
            {typeof count === "number" ? " " : null}
            {label}
          </>
        )}
      </span>
    </span>
  )
}

export type QueueSectionContentProps = React.ComponentProps<
  typeof CollapsibleContent
>

function QueueSectionContent({
  className,
  ...props
}: QueueSectionContentProps) {
  return (
    <CollapsibleContent
      data-slot="queue-section-content"
      className={cn(
        "outline-none data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1",
        className
      )}
      {...props}
    />
  )
}

export type QueueListProps = React.ComponentProps<"div">

function QueueList({ className, children, ...props }: QueueListProps) {
  return (
    <div
      data-slot="queue-list"
      className={cn(
        "mt-0.5 max-h-64 overflow-y-auto overscroll-contain pe-1",
        className
      )}
      {...props}
    >
      <ul data-slot="queue-list-items" className="flex flex-col gap-0.5">
        {children}
      </ul>
    </div>
  )
}

export type QueueItemProps = React.ComponentProps<"li">

function QueueItem({ className, ...props }: QueueItemProps) {
  return (
    <li
      data-slot="queue-item"
      className={cn(
        "group/queue-item flex flex-col gap-1 rounded-lg px-2.5 py-2 text-description transition-colors",
        "hover:bg-muted/70 focus-within:bg-muted/70",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemIndicatorProps = React.ComponentProps<"span"> & {
  completed?: boolean
}

function QueueItemIndicator({
  completed = false,
  className,
  ...props
}: QueueItemIndicatorProps) {
  return (
    <span
      data-slot="queue-item-indicator"
      data-completed={completed ? "true" : undefined}
      aria-hidden="true"
      className={cn(
        "mt-1.5 inline-block size-2 shrink-0 rounded-full border",
        completed
          ? "border-muted-foreground/25 bg-muted-foreground/15"
          : "border-foreground/35 bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemContentProps = React.ComponentProps<"span"> & {
  completed?: boolean
}

function QueueItemContent({
  completed = false,
  className,
  ...props
}: QueueItemContentProps) {
  return (
    <span
      data-slot="queue-item-content"
      data-completed={completed ? "true" : undefined}
      className={cn(
        "min-w-0 flex-1 grow break-words line-clamp-2 leading-5 [overflow-wrap:anywhere]",
        completed
          ? "text-muted-foreground/55 line-through"
          : "text-foreground/85",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemDescriptionProps = React.ComponentProps<"div"> & {
  completed?: boolean
}

function QueueItemDescription({
  completed = false,
  className,
  ...props
}: QueueItemDescriptionProps) {
  return (
    <div
      data-slot="queue-item-description"
      data-completed={completed ? "true" : undefined}
      className={cn(
        "ms-4 text-caption leading-relaxed",
        completed
          ? "text-muted-foreground/45 line-through"
          : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemActionsProps = React.ComponentProps<"div">

function QueueItemActions({ className, ...props }: QueueItemActionsProps) {
  return (
    <div
      data-slot="queue-item-actions"
      className={cn("flex shrink-0 items-center gap-0.5", className)}
      {...props}
    />
  )
}

export type QueueItemActionProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size"
>

function QueueItemAction({ className, ...props }: QueueItemActionProps) {
  return (
    <Button
      data-slot="queue-item-action"
      type="button"
      variant="ghost"
      size="icon-xs"
      className={cn(
        "text-muted-foreground opacity-0 transition-opacity",
        "hover:bg-background hover:text-foreground",
        "group-hover/queue-item:opacity-100 group-focus-within/queue-item:opacity-100 focus-visible:opacity-100",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemAttachmentProps = React.ComponentProps<"div">

function QueueItemAttachment({
  className,
  ...props
}: QueueItemAttachmentProps) {
  return (
    <div
      data-slot="queue-item-attachment"
      className={cn("ms-4 flex flex-wrap gap-1.5", className)}
      {...props}
    />
  )
}

export type QueueItemImageProps = React.ComponentProps<"img">

function QueueItemImage({
  className,
  alt = "",
  onError,
  ...props
}: QueueItemImageProps) {
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    setFailed(false)
  }, [props.src])

  if (failed || !props.src) {
    return (
      <span
        data-slot="queue-item-image"
        data-failed=""
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-md border bg-muted text-muted-foreground shadow-xs",
          className
        )}
        title={alt || undefined}
      >
        <ImageIcon className="size-3.5" />
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-slot="queue-item-image"
      alt={alt}
      width={32}
      height={32}
      {...props}
      className={cn(
        "size-8 rounded-md border bg-background object-cover shadow-xs",
        className
      )}
      onError={(event) => {
        setFailed(true)
        onError?.(event)
      }}
    />
  )
}

export type QueueItemFileProps = React.ComponentProps<"span">

function QueueItemFile({
  className,
  children,
  ...props
}: QueueItemFileProps) {
  return (
    <span
      data-slot="queue-item-file"
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-md border bg-muted/60 px-1.5 py-1 text-caption text-muted-foreground",
        className
      )}
      {...props}
    >
      <PaperclipIcon className="size-3 shrink-0" />
      <span className="max-w-28 truncate">{children}</span>
    </span>
  )
}

export type QueueEmptyProps = React.ComponentProps<"div">

function QueueEmpty({
  className,
  children = "Queue is empty.",
  ...props
}: QueueEmptyProps) {
  return (
    <div
      data-slot="queue-empty"
      className={cn(
        "px-2.5 py-4 text-center text-description text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type QueueItemRowProps = React.ComponentProps<"div">

function QueueItemRow({ className, ...props }: QueueItemRowProps) {
  return (
    <div
      data-slot="queue-item-row"
      className={cn("flex items-start gap-2", className)}
      {...props}
    />
  )
}

export {
  Queue,
  QueueSection,
  QueueSectionTrigger,
  QueueSectionLabel,
  QueueSectionContent,
  QueueList,
  QueueItem,
  QueueItemRow,
  QueueItemIndicator,
  QueueItemContent,
  QueueItemDescription,
  QueueItemActions,
  QueueItemAction,
  QueueItemAttachment,
  QueueItemImage,
  QueueItemFile,
  QueueEmpty,
}
