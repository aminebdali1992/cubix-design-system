"use client"

/*
  Cubix Collapsible - React Aria version.

  Same parts as the Base UI and Radix collapsibles, built on React Aria
  Disclosure. Cubix props (open, defaultOpen, onOpenChange, disabled) map onto
  isExpanded / onExpandedChange / isDisabled. The root and panel expose
  data-open / data-closed and the trigger exposes data-panel-open, like Base
  UI, so the same state styles work on every base.

  CollapsibleTrigger renders an unstyled button. Pass render={<Button />} to
  take the look (variant, size, className, aria-label) of a Cubix Button.
*/
import * as React from "react"
import {
  Button as AriaButton,
  Disclosure,
  DisclosurePanel,
  DisclosureStateContext,
  type ButtonProps as AriaButtonProps,
  type DisclosurePanelProps,
  type DisclosureProps,
} from "react-aria-components"
import { type VariantProps } from "class-variance-authority"

import { buttonVariants } from "@/components/cubix/aria/button"
import { cn } from "@/lib/utils"

function openStateAttributes(open: boolean) {
  return {
    "data-open": open ? "" : undefined,
    "data-closed": open ? undefined : "",
  }
}

type CollapsibleProps = Omit<
  DisclosureProps,
  "className" | "children" | "isExpanded" | "defaultExpanded" | "onExpandedChange" | "isDisabled"
> & {
  className?: string
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}

function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  disabled,
  ...props
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen

  return (
    <Disclosure
      data-slot="collapsible"
      {...openStateAttributes(isOpen)}
      isExpanded={isOpen}
      onExpandedChange={(next) => {
        if (open === undefined) setUncontrolledOpen(next)
        onOpenChange?.(next)
      }}
      isDisabled={disabled}
      {...props}
    />
  )
}

type TriggerRenderProps = VariantProps<typeof buttonVariants> & {
  className?: string
  "aria-label"?: string
}

type CollapsibleTriggerProps = Omit<
  AriaButtonProps,
  "className" | "children" | "slot" | "isDisabled" | "render"
> & {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  render?: React.ReactElement<TriggerRenderProps>
}

function CollapsibleTrigger({
  className,
  disabled,
  render,
  ...props
}: CollapsibleTriggerProps) {
  const state = React.useContext(DisclosureStateContext)
  const look = render?.props

  return (
    <AriaButton
      slot="trigger"
      data-slot="collapsible-trigger"
      data-panel-open={state?.isExpanded ? "" : undefined}
      isDisabled={disabled}
      aria-label={look?.["aria-label"]}
      className={cn(
        look &&
          buttonVariants({
            variant: look.variant ?? "default",
            size: look.size ?? "default",
          }),
        look?.className,
        className
      )}
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  children,
  ...props
}: Omit<DisclosurePanelProps, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}) {
  const state = React.useContext(DisclosureStateContext)

  return (
    <DisclosurePanel
      data-slot="collapsible-content"
      {...openStateAttributes(state?.isExpanded ?? false)}
      className={cn(
        "h-(--disclosure-panel-height) overflow-hidden text-description transition-[height] duration-200 ease-out motion-reduce:transition-none [&[hidden]:not([hidden='until-found'])]:hidden",
        className
      )}
      {...props}
    >
      {children}
    </DisclosurePanel>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
