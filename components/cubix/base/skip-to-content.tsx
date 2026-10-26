"use client"

import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

/*
  Cubix Skip to Content - Base UI version. A keyboard-accessible skip link
  that stays off-screen until focused with Tab, then slides into view so
  users can jump past header and sidebar chrome to the main landmark.
  Same API on Base UI, Radix and React Aria.
*/

type SkipToContentProps = Omit<ComponentProps<"a">, "href" | "children"> & {
  /** Hash href to the main content landmark, e.g. "#main". */
  href: string
  /** Link label. */
  children?: ReactNode
  /** Classes merged onto the positioning wrapper. */
  className?: string
}

function SkipToContent({ href, children = "پرش به محتوا", className, ...props }: SkipToContentProps) {
  return (
    <div
      data-slot="skip-to-content"
      className={cn(
        "pointer-events-none fixed start-3 top-0 z-50 -translate-y-[calc(100%+1rem)] transition-transform duration-200 ease-out focus-within:pointer-events-auto focus-within:translate-y-3 motion-reduce:transition-none",
        className
      )}
    >
      <a
        href={href}
        data-slot="skip-to-content-link"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "pointer-events-auto")}
        {...props}
      >
        {children}
      </a>
    </div>
  )
}

export { SkipToContent }
export type { SkipToContentProps }
