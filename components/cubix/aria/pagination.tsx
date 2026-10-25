import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const paginationLinkBase =
  "inline-flex shrink-0 items-center justify-center gap-1.5 border border-transparent leading-none font-normal tracking-normal whitespace-nowrap text-foreground tabular-nums transition-colors outline-none select-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:border-border data-[active=true]:bg-background data-[active=true]:hover:bg-muted [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const paginationLinkSizes = {
  sm: "size-8 rounded-[min(var(--radius-md),12px)] text-caption",
  default: "size-10 rounded-lg text-label",
} as const

type PaginationSize = keyof typeof paginationLinkSizes

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      dir="rtl"
      aria-label="صفحه‌بندی"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("m-0 flex list-none items-center gap-1 p-0", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = React.ComponentProps<"a"> & {
  isActive?: boolean
  disabled?: boolean
  size?: PaginationSize
}

function PaginationLink({
  className,
  isActive,
  disabled,
  size = "sm",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      data-slot="pagination-link"
      data-active={isActive ? "true" : undefined}
      data-size={size}
      className={cn(paginationLinkBase, paginationLinkSizes[size], className)}
      {...props}
    />
  )
}

type PaginationStepProps = Omit<PaginationLinkProps, "isActive"> & {
  text?: React.ReactNode
}

const previousSizes = {
  sm: "h-8 w-auto ps-2 pe-3",
  default: "h-10 w-auto ps-3 pe-4",
} as const

const nextSizes = {
  sm: "h-8 w-auto ps-3 pe-2",
  default: "h-10 w-auto ps-4 pe-3",
} as const

function PaginationPrevious({
  className,
  text = "قبلی",
  size = "sm",
  ...props
}: PaginationStepProps) {
  return (
    <PaginationLink
      aria-label="رفتن به صفحه‌ی قبلی"
      data-slot="pagination-previous"
      size={size}
      className={cn(previousSizes[size], className)}
      {...props}
    >
      <ChevronRightIcon />
      {text ? <span>{text}</span> : null}
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "بعدی",
  size = "sm",
  ...props
}: PaginationStepProps) {
  return (
    <PaginationLink
      aria-label="رفتن به صفحه‌ی بعدی"
      data-slot="pagination-next"
      size={size}
      className={cn(nextSizes[size], className)}
      {...props}
    >
      {text ? <span>{text}</span> : null}
      <ChevronLeftIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  size = "sm",
  ...props
}: React.ComponentProps<"span"> & { size?: PaginationSize }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex items-center justify-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        paginationLinkSizes[size],
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">صفحه‌های بیشتر</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
