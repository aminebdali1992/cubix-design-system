"use client"

/*
  Cubix Accordion - stacked sections that each reveal a panel.

  Single mode keeps one section open and lets the open trigger close it
  again; multiple mode keeps any number open. ArrowUp and ArrowDown move focus
  between the enabled triggers of the same accordion (wrapping at the ends),
  Home and End jump to the first and last one. Layout uses logical
  properties, so the chevron sits at the inline end and follows dir="rtl"
  without a flip.
*/
import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const ACCORDION_SELECTOR = '[data-slot="accordion"]'
const TRIGGER_SELECTOR = '[data-slot="accordion-trigger"]'
const DISABLED_TRIGGER_SELECTOR =
  ':disabled, [aria-disabled="true"], [data-disabled]'

/*
  Moves focus from a trigger to a sibling trigger of the same accordion, so a
  nested accordion keeps its own sequence. Returns true when the key moved
  focus.
*/
function focusSiblingTrigger(trigger: EventTarget, key: string) {
  if (!(trigger instanceof HTMLElement)) return false
  const root = trigger.closest(ACCORDION_SELECTOR)
  if (!root) return false

  const triggers = Array.from(
    root.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR)
  ).filter(
    (item) =>
      item.closest(ACCORDION_SELECTOR) === root &&
      !item.matches(DISABLED_TRIGGER_SELECTOR)
  )
  const index = triggers.indexOf(trigger)
  if (index === -1) return false

  const last = triggers.length - 1
  let nextIndex: number
  switch (key) {
    case "ArrowDown":
      nextIndex = index === last ? 0 : index + 1
      break
    case "ArrowUp":
      nextIndex = index === 0 ? last : index - 1
      break
    case "Home":
      nextIndex = 0
      break
    case "End":
      nextIndex = last
      break
    default:
      return false
  }

  triggers[nextIndex]?.focus()
  return true
}

type AccordionProps = Omit<
  AccordionPrimitive.Root.Props<string>,
  "loopFocus" | "orientation"
>

function Accordion({ className, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root<string>
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

type AccordionItemProps = Omit<AccordionPrimitive.Item.Props, "value"> & {
  value: string
}

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  )
}

type AccordionTriggerProps = AccordionPrimitive.Trigger.Props & {
  icon?: React.ReactNode
}

function AccordionTrigger({
  className,
  children,
  icon,
  onKeyDown,
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
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.isDefaultPrevented()) return
          if (focusSiblingTrigger(event.currentTarget, event.key)) {
            event.preventDefault()
          }
        }}
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

type AccordionContentProps = Omit<AccordionPrimitive.Panel.Props, "className"> & {
  className?: string
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-label text-muted-foreground transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
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
    </AccordionPrimitive.Panel>
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
