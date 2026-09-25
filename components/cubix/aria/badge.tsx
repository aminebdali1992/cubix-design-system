"use client"

import * as React from "react"
import {
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-caption font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-[6px] hover:underline hover:decoration-dotted hover:decoration-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type BadgeHostProps = React.ComponentProps<"span"> & {
  "data-slot"?: string
  "data-variant"?: string
}

function Badge({
  className,
  variant = "default",
  render,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    render?: ReactElement<BadgeHostProps>
  }) {
  const badgeClassName = cn(badgeVariants({ variant }), className)

  if (isValidElement<BadgeHostProps>(render)) {
    return cloneElement(render, {
      ...props,
      className: cn(badgeClassName, render.props.className),
      "data-slot": "badge",
      "data-variant": variant ?? "default",
      children: children ?? render.props.children,
    })
  }

  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={badgeClassName}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
