"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Breadcrumb } from "./breadcrumb"

/*
  Cubix Page Header - React Aria version. Pure layout around the React Aria Breadcrumb,
  so the API is identical across Base UI, Radix and React Aria.
*/

type PageHeaderSize = "default" | "small" | "large" | "full"

const pageHeaderVariants = cva("flex w-full flex-col gap-4", {
  variants: {
    size: {
      default: "pt-12",
      small: "pt-12",
      large: "pt-12",
      full: "pt-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

// Width container. Owns the @container used by the meta row.
const pageHeaderContainerVariants = cva("@container mx-auto w-full px-6 xl:px-10", {
  variants: {
    size: {
      small: "max-w-[768px]",
      default: "max-w-[1200px]",
      large: "max-w-[1600px]",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const PageHeaderContext = React.createContext<{ size: PageHeaderSize; containerClassName?: string }>({ size: "default" })

function usePageHeader() {
  return React.useContext(PageHeaderContext)
}

function PageHeaderContainer({ className, ...props }: React.ComponentProps<"div">) {
  const { size, containerClassName } = usePageHeader()
  return (
    <div
      data-slot="page-header-container"
      className={cn(pageHeaderContainerVariants({ size }), containerClassName, className)}
      {...props}
    />
  )
}

type PageHeaderProps = React.ComponentProps<"div"> &
  VariantProps<typeof pageHeaderVariants> & { containerClassName?: string }

function PageHeader({ className, size, containerClassName, ...props }: PageHeaderProps) {
  const contextSize: PageHeaderSize = size ?? "default"
  return (
    <PageHeaderContext.Provider value={{ size: contextSize, containerClassName }}>
      <div
        data-slot="page-header"
        data-size={contextSize}
        className={cn(pageHeaderVariants({ size: contextSize }), className)}
        {...props}
      />
    </PageHeaderContext.Provider>
  )
}

type PageHeaderBreadcrumbProps = React.ComponentProps<typeof Breadcrumb>

function PageHeaderBreadcrumb({ className, ...props }: PageHeaderBreadcrumbProps) {
  return (
    <PageHeaderContainer>
      <Breadcrumb
        data-slot="page-header-breadcrumb"
        className={cn("flex items-center gap-4 [&_li]:text-label", className)}
        {...props}
      />
    </PageHeaderContainer>
  )
}

type PageHeaderMetaProps = React.ComponentProps<"div">

function PageHeaderMeta({ className, ...props }: PageHeaderMetaProps) {
  return (
    <PageHeaderContainer>
      <div
        data-slot="page-header-meta"
        className={cn(
          "flex flex-col gap-4 @xl:flex-row @xl:items-center @xl:justify-between",
          "*:data-[slot=page-header-icon]:shrink-0",
          "*:data-[slot=page-header-summary]:flex-1",
          className
        )}
        {...props}
      />
    </PageHeaderContainer>
  )
}

type PageHeaderIconProps = React.ComponentProps<"div">

function PageHeaderIcon({ className, ...props }: PageHeaderIconProps) {
  return (
    <div data-slot="page-header-icon" className={cn("text-muted-foreground", className)} {...props} />
  )
}

type PageHeaderSummaryProps = React.ComponentProps<"div">

function PageHeaderSummary({ className, ...props }: PageHeaderSummaryProps) {
  return (
    <div data-slot="page-header-summary" className={cn("flex flex-col gap-1", className)} {...props} />
  )
}

type PageHeaderTitleProps = React.ComponentProps<"h1"> & {
  /** Heading element to render. Defaults to h1. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function PageHeaderTitle({ className, as: Heading = "h1", ...props }: PageHeaderTitleProps) {
  return (
    <Heading
      data-slot="page-header-title"
      className={cn("text-title font-medium text-foreground", className)}
      {...props}
    />
  )
}

type PageHeaderDescriptionProps = React.ComponentProps<"div">

function PageHeaderDescription({ className, ...props }: PageHeaderDescriptionProps) {
  return (
    <div
      data-slot="page-header-description"
      className={cn("text-body font-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

type PageHeaderAsideProps = React.ComponentProps<"div">

function PageHeaderAside({ className, ...props }: PageHeaderAsideProps) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

type PageHeaderNavigationTabsProps = React.ComponentProps<"div">

function PageHeaderNavigationTabs({ className, ...props }: PageHeaderNavigationTabsProps) {
  const { size } = usePageHeader()
  return (
    <PageHeaderContainer className={cn(size === "full" && "border-b border-border")}>
      <div
        data-slot="page-header-footer"
        className={cn(
          "w-full [&>nav]:border-b-0",
          size !== "full" && "border-b border-border",
          className
        )}
        {...props}
      />
    </PageHeaderContainer>
  )
}

export {
  PageHeader,
  PageHeaderAside,
  PageHeaderBreadcrumb,
  PageHeaderDescription,
  PageHeaderIcon,
  PageHeaderMeta,
  PageHeaderNavigationTabs,
  PageHeaderSummary,
  PageHeaderTitle,
  pageHeaderVariants,
  usePageHeader,
}
export type {
  PageHeaderAsideProps,
  PageHeaderBreadcrumbProps,
  PageHeaderDescriptionProps,
  PageHeaderIconProps,
  PageHeaderMetaProps,
  PageHeaderNavigationTabsProps,
  PageHeaderProps,
  PageHeaderSize,
  PageHeaderSummaryProps,
  PageHeaderTitleProps,
}
