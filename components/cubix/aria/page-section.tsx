import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Cubix Page Section - React Aria version. Pure layout (no primitives), so the API
  is identical across Base UI, Radix and React Aria.
*/

const pageSectionVariants = cva("gap-6 pt-12 last:pb-12", {
  variants: {
    orientation: {
      horizontal: "grid @3xl:grid-cols-[1fr_2fr] @3xl:gap-12",
      vertical: "flex flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

type PageSectionProps = React.ComponentProps<"div"> &
  VariantProps<typeof pageSectionVariants>

function PageSection({ className, orientation = "vertical", ...props }: PageSectionProps) {
  return (
    <div
      data-slot="page-section"
      data-orientation={orientation}
      className={cn(pageSectionVariants({ orientation }), className)}
      {...props}
    />
  )
}

type PageSectionMetaProps = React.ComponentProps<"div"> & { containerClassName?: string }

function PageSectionMeta({ className, containerClassName, ...props }: PageSectionMetaProps) {
  return (
    <div data-slot="page-section-meta-container" className={cn("@container", containerClassName)}>
      <div
        data-slot="page-section-meta"
        className={cn(
          "flex flex-col gap-4 @xl:flex-row @xl:items-center @xl:justify-between",
          "*:data-[slot=page-section-summary]:flex-1",
          "*:data-[slot=page-section-summary]:@xl:self-center",
          "*:data-[slot=page-section-aside]:shrink-0",
          className
        )}
        {...props}
      />
    </div>
  )
}

type PageSectionSummaryProps = React.ComponentProps<"div">

function PageSectionSummary({ className, ...props }: PageSectionSummaryProps) {
  return (
    <div data-slot="page-section-summary" className={cn("flex flex-col gap-1", className)} {...props} />
  )
}

type PageSectionTitleProps = React.ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function PageSectionTitle({ as: Comp = "h2", className, ...props }: PageSectionTitleProps) {
  return (
    <Comp
      data-slot="page-section-title"
      className={cn("text-body font-medium text-foreground", className)}
      {...props}
    />
  )
}

type PageSectionDescriptionProps = React.ComponentProps<"div">

function PageSectionDescription({ className, style, ...props }: PageSectionDescriptionProps) {
  return (
    <div
      data-slot="page-section-description"
      className={cn("text-description font-normal text-muted-foreground", className)}
      // Optically aligns with the bottom of PageSectionAside.
      style={{ textBoxTrim: "trim-end", ...style } as React.CSSProperties}
      {...props}
    />
  )
}

type PageSectionAsideProps = React.ComponentProps<"div">

function PageSectionAside({ className, ...props }: PageSectionAsideProps) {
  return (
    <div
      data-slot="page-section-aside"
      className={cn("flex items-center gap-2 @xl:self-end", className)}
      {...props}
    />
  )
}

type PageSectionContentProps = React.ComponentProps<"div">

function PageSectionContent({ className, ...props }: PageSectionContentProps) {
  return <div data-slot="page-section-content" className={cn(className)} {...props} />
}

export {
  PageSection,
  PageSectionAside,
  PageSectionContent,
  PageSectionDescription,
  PageSectionMeta,
  PageSectionSummary,
  PageSectionTitle,
  pageSectionVariants,
}
export type {
  PageSectionAsideProps,
  PageSectionContentProps,
  PageSectionDescriptionProps,
  PageSectionMetaProps,
  PageSectionProps,
  PageSectionSummaryProps,
  PageSectionTitleProps,
}
