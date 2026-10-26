"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Breadcrumb } from "./breadcrumb"

type PageBreadcrumbsActionsProps = React.ComponentProps<"div">

/* Actions at the end of the breadcrumbs row (the left side in RTL). Pass through the actions prop. */
function PageBreadcrumbsActions({ className, ...props }: PageBreadcrumbsActionsProps) {
  return (
    <div
      data-slot="page-breadcrumbs-actions"
      className={cn("ms-auto flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

type PageBreadcrumbsProps = React.ComponentProps<typeof Breadcrumb> & {
  actions?: React.ReactNode
  containerClassName?: string
  slotClassName?: string
}

/* Full-width breadcrumb row for page chrome. Sits above PageHeader and page content, not inside it. */
function PageBreadcrumbs({
  actions,
  className,
  children,
  containerClassName,
  slotClassName,
  ...props
}: PageBreadcrumbsProps) {
  return (
    <div data-slot="page-breadcrumbs" className={cn("w-full", slotClassName)}>
      <div
        data-slot="page-breadcrumbs-container"
        className={cn(
          "mx-auto flex min-h-12 w-full max-w-none items-center justify-between gap-4 border-b px-4 py-2",
          containerClassName
        )}
      >
        <Breadcrumb
          data-slot="page-breadcrumbs-list"
          className={cn("flex min-w-0 items-center gap-4", className)}
          {...props}
        >
          {children}
        </Breadcrumb>
        {actions}
      </div>
    </div>
  )
}

export { PageBreadcrumbs, PageBreadcrumbsActions }
export type { PageBreadcrumbsProps, PageBreadcrumbsActionsProps }
