"use client"

/*
  Cubix Radio Group - single-select control set.

  RadioGroupItem is the control only. Compose with Label via id / htmlFor.
  Values and states use Cubix tokens. Arrow keys follow the reading
  direction, so they are mirrored in RTL.
*/
import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/*
  Radix RadioGroup reads arrow key direction from dir and falls back to ltr.
  Cubix is Persian-first, so the group starts right-to-left and then follows
  the closest dir on the page. An explicit dir prop wins.
*/
function usePageDir(dir?: "ltr" | "rtl") {
  const nodeRef = React.useRef<HTMLDivElement | null>(null)
  const [pageDir, setPageDir] = React.useState<"ltr" | "rtl">("rtl")

  React.useLayoutEffect(() => {
    const closest = nodeRef.current?.parentElement?.closest("[dir]")?.getAttribute("dir")
    if (closest === "ltr" || closest === "rtl") {
      setPageDir(closest)
    }
  }, [])

  return { nodeRef, resolvedDir: dir ?? pageDir }
}

function RadioGroup({
  className,
  dir,
  ref,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const { nodeRef, resolvedDir } = usePageDir(dir)
  const setRef = (node: HTMLDivElement | null) => {
    nodeRef.current = node
    if (typeof ref === "function") {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      dir={resolvedDir}
      ref={setRef}
      className={cn("group/radio-group grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-[18px] shrink-0 items-center justify-center rounded-full border border-input transition-[background-color,border-color,box-shadow] outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-[state=checked]:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:data-[state=checked]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:data-[state=checked]:opacity-50 dark:bg-input/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:focus-visible:ring-primary/20 group-has-[:focus-visible]/field-label:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="pointer-events-none absolute top-1/2 left-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground"
      />
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
