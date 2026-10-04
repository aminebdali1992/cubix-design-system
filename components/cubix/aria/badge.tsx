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
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent text-caption leading-none font-normal whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      size: {
        default: "h-5 px-2",
        lg: "h-6 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&>svg]:size-3.5!",
      },
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
        dot: "size-2 min-w-0 gap-0 rounded-full bg-primary p-0 text-transparent",
      },
    },
    compoundVariants: [
      { variant: "dot", size: "lg", className: "size-3" },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

type BadgeHostProps = React.ComponentProps<"span"> & {
  "data-slot"?: string
  "data-variant"?: string
  "data-size"?: string
}

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    render?: ReactElement<BadgeHostProps>
  }) {
  const badgeClassName = cn(badgeVariants({ variant, size }), className)

  if (isValidElement<BadgeHostProps>(render)) {
    return cloneElement(render, {
      ...props,
      className: cn(badgeClassName, render.props.className),
      "data-slot": "badge",
      "data-variant": variant ?? "default",
      "data-size": size ?? "default",
      children: children ?? render.props.children,
    })
  }

  return (
    <span
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={badgeClassName}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
