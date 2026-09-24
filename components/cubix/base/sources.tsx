"use client"

import * as React from "react"
import { BookOpenIcon, ChevronDownIcon, ExternalLinkIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/cubix/collapsible"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/cubix/hover-card"
import { cn } from "@/lib/utils"

type SourcesContextValue = {
  count: number
  isOpen: boolean
}

const SourcesContext = React.createContext<SourcesContextValue | null>(null)

function useSources() {
  const context = React.useContext(SourcesContext)
  if (!context) {
    throw new Error("Sources parts must be used within Sources.")
  }
  return context
}

function getHostname(href?: string) {
  if (!href) {
    return null
  }
  try {
    return new URL(href).hostname.replace(/^www\./, "")
  } catch {
    return null
  }
}

export type SourcesProps = Omit<
  React.ComponentProps<typeof Collapsible>,
  "onOpenChange"
> & {
  count?: number
  onOpenChange?: (open: boolean) => void
}

function Sources({
  className,
  count = 0,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: SourcesProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const contextValue = React.useMemo(
    () => ({ count, isOpen }),
    [count, isOpen]
  )

  return (
    <SourcesContext.Provider value={contextValue}>
      <Collapsible
        data-slot="sources"
        open={isOpen}
        onOpenChange={handleOpenChange}
        className={cn("not-prose w-full", className)}
        {...props}
      >
        {children}
      </Collapsible>
    </SourcesContext.Provider>
  )
}

export type SourcesTriggerProps = React.ComponentProps<
  typeof CollapsibleTrigger
> & {
  label?: React.ReactNode
}

function SourcesTrigger({
  className,
  children,
  label,
  ...props
}: SourcesTriggerProps) {
  const { count, isOpen } = useSources()
  const resolvedLabel =
    label ?? (count === 1 ? "1 source" : `${Math.max(count, 0)} sources`)

  return (
    <CollapsibleTrigger
      data-slot="sources-trigger"
      className={cn(
        "group/sources-trigger inline-flex h-8 max-w-full items-center gap-1.5 rounded-lg px-2 text-caption text-muted-foreground outline-none transition-colors",
        "hover:bg-muted/70 hover:text-foreground focus-visible:bg-muted/70 focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <BookOpenIcon className="size-3.5 shrink-0 opacity-80" />
          <span className="min-w-0 truncate font-medium tracking-tight">
            {resolvedLabel}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-3.5 shrink-0 opacity-70 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </>
      )}
    </CollapsibleTrigger>
  )
}

export type SourcesContentProps = React.ComponentProps<
  typeof CollapsibleContent
>

function SourcesContent({
  className,
  children,
  ...props
}: SourcesContentProps) {
  return (
    <CollapsibleContent
      data-slot="sources-content"
      className={cn(
        "outline-none data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1",
        className
      )}
      {...props}
    >
      <div
        data-slot="sources-list"
        className="mt-1.5 flex flex-col gap-0.5 overflow-hidden rounded-xl border bg-card p-1 shadow-xs"
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

export type SourcesEmptyProps = React.ComponentProps<"div">

function SourcesEmpty({
  className,
  children = "No sources cited.",
  ...props
}: SourcesEmptyProps) {
  return (
    <div
      data-slot="sources-empty"
      className={cn(
        "px-3 py-4 text-center text-caption text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type SourceProps = React.ComponentProps<"a"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  hostname?: string
  showFavicon?: boolean
}

function Source({
  className,
  href,
  title,
  description,
  hostname,
  showFavicon = true,
  children,
  ...props
}: SourceProps) {
  const host = hostname ?? getHostname(href)
  const resolvedTitle = title ?? host ?? href ?? "Source"

  return (
    <a
      data-slot="source"
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group/source flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-caption outline-none transition-colors",
        "hover:bg-muted/80 focus-visible:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-background text-muted-foreground shadow-xs">
            {showFavicon && host ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://www.google.com/s2/favicons?domain=${host}&sz=32`}
                alt=""
                width={14}
                height={14}
                className="size-3.5"
              />
            ) : (
              <BookOpenIcon className="size-3.5" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-start gap-1.5">
              <span className="min-w-0 flex-1 truncate font-medium leading-5 text-foreground">
                {resolvedTitle}
              </span>
              <ExternalLinkIcon className="mt-0.5 size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/source:opacity-100 group-focus-visible/source:opacity-100" />
            </span>
            {description ? (
              <span className="mt-0.5 line-clamp-2 text-label leading-relaxed text-muted-foreground">
                {description}
              </span>
            ) : host ? (
              <span className="mt-0.5 block truncate text-label text-muted-foreground">
                {host}
              </span>
            ) : null}
          </span>
        </>
      )}
    </a>
  )
}

export type SourcePreviewProps = React.ComponentProps<typeof HoverCard> & {
  href?: string
  title?: React.ReactNode
  description?: React.ReactNode
  hostname?: string
}

function SourcePreview({
  href,
  title,
  description,
  hostname,
  children,
  ...props
}: SourcePreviewProps) {
  const host = hostname ?? getHostname(href)
  const resolvedTitle = title ?? host ?? "Source"

  return (
    <HoverCard {...props}>
      <HoverCardTrigger
        data-slot="source-preview-trigger"
        render={
          <button
            type="button"
            className="inline-flex translate-y-px items-center rounded-md bg-muted px-1.5 py-0.5 text-label font-medium text-foreground underline-offset-2 outline-none transition-colors hover:bg-muted/80 hover:underline focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        }
      >
        {children ?? resolvedTitle}
      </HoverCardTrigger>
      <HoverCardContent
        data-slot="source-preview-content"
        align="start"
        sideOffset={6}
        className="w-72 space-y-2.5 p-3"
      >
        <div className="flex items-start gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-background shadow-xs">
            {host ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
            ) : (
              <BookOpenIcon className="size-4 text-muted-foreground" />
            )}
          </span>
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="truncate text-caption font-medium leading-5">
              {resolvedTitle}
            </div>
            {host ? (
              <div className="truncate text-label text-muted-foreground">{host}</div>
            ) : null}
          </div>
        </div>
        {description ? (
          <p className="text-label leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-label font-medium text-foreground underline-offset-2 hover:underline"
          >
            Open source
            <ExternalLinkIcon className="size-3" />
          </a>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  )
}

export {
  Sources,
  SourcesTrigger,
  SourcesContent,
  SourcesEmpty,
  Source,
  SourcePreview,
  useSources,
  getHostname,
}
