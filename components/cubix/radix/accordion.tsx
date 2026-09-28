"use client"

/*
  Cubix Accordion - stacked sections that each reveal a panel.

  Single mode keeps one section open and lets the open trigger close it
  again; multiple mode keeps any number open. Both modes take string arrays
  for value and defaultValue, the same API on every base. ArrowUp and
  ArrowDown move focus between the enabled triggers (wrapping at the ends),
  Home and End jump to the first and last one. Layout uses logical
  properties, so the chevron sits at the inline end and follows dir="rtl"
  without a flip.
*/
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type AccordionProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive.Root>,
  | "type"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "collapsible"
  | "orientation"
> & {
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

function Accordion({
  className,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  ...props
}: AccordionProps) {
  const rootClassName = cn("flex w-full flex-col", className)

  if (multiple) {
    return (
      <AccordionPrimitive.Root
        data-slot="accordion"
        type="multiple"
        className={rootClassName}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...props}
      />
    )
  }

  /*
    Single mode stores one string. An empty string means every item is
    closed, so a controlled empty array stays controlled.
  */
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      type="single"
      collapsible
      className={rootClassName}
      value={value === undefined ? undefined : (value[0] ?? "")}
      defaultValue={defaultValue?.[0]}
      onValueChange={(next) => {
        onValueChange?.(next ? [next] : [])
      }}
      {...props}
    />
  )
}

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item>

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  )
}

type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
> & {
  icon?: React.ReactNode
}

function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className="m-0 flex font-sans text-description font-normal tracking-normal"
    >
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-3 rounded-lg border border-transparent py-3 text-start font-[family-name:var(--font-arab),var(--font-sans),ui-sans-serif,sans-serif] text-label font-normal text-foreground outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {icon ? (
          <span
            data-slot="accordion-trigger-title"
            className="flex min-w-0 items-center gap-2"
          >
            <span
              data-slot="accordion-trigger-icon-start"
              aria-hidden="true"
              className="inline-flex shrink-0 items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6"
            >
              {icon}
            </span>
            {children}
          </span>
        ) : (
          children
        )}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          className="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-aria-expanded/accordion-trigger:rotate-180 motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
>

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-label text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none"
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
    </AccordionPrimitive.Content>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
}
