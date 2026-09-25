"use client"

import type { ReactNode } from "react"
import { ChevronDownIcon } from "lucide-react"
import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
  type ButtonProps,
  type DisclosureGroupProps,
  type DisclosurePanelProps,
  type DisclosureProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

type AccordionProps = Omit<
  DisclosureGroupProps,
  | "allowsMultipleExpanded"
  | "className"
  | "defaultExpandedKeys"
  | "expandedKeys"
  | "isDisabled"
  | "onExpandedChange"
> & {
  className?: string
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
}

function Accordion({
  className,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  disabled,
  ...props
}: AccordionProps) {
  return (
    <DisclosureGroup
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      allowsMultipleExpanded={multiple}
      isDisabled={disabled}
      expandedKeys={value}
      defaultExpandedKeys={defaultValue}
      onExpandedChange={
        onValueChange
          ? (keys) => {
              onValueChange(Array.from(keys, (key) => String(key)))
            }
          : undefined
      }
      {...props}
    />
  )
}

type AccordionItemProps = Omit<
  DisclosureProps,
  "className" | "id" | "isDisabled"
> & {
  className?: string
  value: string
  disabled?: boolean
}

function AccordionItem({
  className,
  value,
  disabled,
  ...props
}: AccordionItemProps) {
  return (
    <Disclosure
      data-slot="accordion-item"
      id={value}
      isDisabled={disabled}
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  )
}

type AccordionTriggerProps = Omit<ButtonProps, "children" | "className" | "slot"> & {
  className?: string
  children?: ReactNode
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <Heading
      data-slot="accordion-header"
      className="m-0 flex font-sans text-description font-medium tracking-normal"
    >
      <Button
        slot="trigger"
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-3 rounded-lg border border-transparent py-3 text-start text-description font-medium outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          className="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180"
        />
      </Button>
    </Heading>
  )
}

type AccordionContentProps = Omit<DisclosurePanelProps, "className" | "children"> & {
  className?: string
  children?: ReactNode
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <DisclosurePanel
      data-slot="accordion-content"
      className="h-(--disclosure-panel-height) overflow-hidden text-description text-muted-foreground transition-[height] duration-200 ease-out"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-3 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
          className
        )}
      >
        {children}
      </div>
    </DisclosurePanel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
