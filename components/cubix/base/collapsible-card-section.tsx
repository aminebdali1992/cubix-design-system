"use client"

import type { PropsWithChildren, ReactNode } from "react"
import { ChevronLeftIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"

/*
  Cubix Collapsible Card Section - Base UI version. A collapsible section for
  optional or advanced settings inside a card or panel. Same API on
  Base UI, Radix and React Aria.
*/

type CollapsibleCardSectionProps = PropsWithChildren<{
  title: string
  description?: ReactNode
  defaultOpen?: boolean
  className?: string
}>

function CollapsibleCardSection({
  title,
  description,
  defaultOpen = false,
  className,
  children,
}: CollapsibleCardSectionProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className={className}>
      <CollapsibleTrigger
        className="group/trigger flex items-center gap-1 px-1 text-description font-medium text-foreground transition outline-none focus-visible:ring-3 focus-visible:ring-primary/20"
      >
        {title}
        <ChevronLeftIcon
          aria-hidden
          strokeWidth={1.5}
          className="size-4 transition group-hover/trigger:text-foreground group-data-panel-open/trigger:-rotate-90"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div data-slot="collapsible-card-section-content" className="px-1 pt-3 pb-1">
        {description && (
          <p data-slot="collapsible-card-section-description" className="mb-6 text-description text-muted-foreground">
            {description}
          </p>
        )}
        {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { CollapsibleCardSection }
export type { CollapsibleCardSectionProps }
