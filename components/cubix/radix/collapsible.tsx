"use client"

/*
  Cubix Collapsible - Radix UI version.

  The root and panel expose data-open / data-closed and the trigger exposes
  data-panel-open, the same state attributes as the Base UI and React Aria
  versions. render={<Button variant="ghost" />} composes the trigger with
  another element; asChild works as well.
*/
import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const CollapsibleOpenContext = React.createContext(false)

function openStateAttributes(open: boolean) {
  return {
    "data-open": open ? "" : undefined,
    "data-closed": open ? undefined : "",
  }
}

function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen

  return (
    <CollapsibleOpenContext.Provider value={isOpen}>
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        {...openStateAttributes(isOpen)}
        open={isOpen}
        onOpenChange={(next) => {
          if (open === undefined) setUncontrolledOpen(next)
          onOpenChange?.(next)
        }}
        {...props}
      />
    </CollapsibleOpenContext.Provider>
  )
}

function CollapsibleTrigger({
  render,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
  render?: React.ReactElement<Record<string, unknown>>
}) {
  const open = React.useContext(CollapsibleOpenContext)

  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      data-panel-open={open ? "" : undefined}
      asChild={asChild || render !== undefined}
      {...props}
    >
      {render
        ? children === undefined
          ? render
          : React.cloneElement(render, undefined, children)
        : children}
    </CollapsiblePrimitive.CollapsibleTrigger>
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const open = React.useContext(CollapsibleOpenContext)

  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...openStateAttributes(open)}
      className={cn(
        "overflow-hidden text-description data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
