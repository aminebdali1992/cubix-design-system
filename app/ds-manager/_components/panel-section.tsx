"use client";

import * as React from "react";
import { ChevronRightIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/cubix/collapsible";
import { ScrollArea } from "@/components/cubix/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/cubix/tooltip";
import { cn } from "@/lib/utils";

import { SIDEBAR_WIDTH } from "../_lib/layout";

export function SidePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside
      aria-label={title}
      className={cn("flex shrink-0 flex-col border-s bg-background", SIDEBAR_WIDTH)}
    >
      <div className="flex h-10 shrink-0 items-center border-b px-4 text-label font-medium">
        {title}
      </div>
      <ScrollArea className="min-h-0 flex-1">{children}</ScrollArea>
    </aside>
  );
}

const TITLE = "min-w-0 truncate text-caption font-medium text-foreground";
const ROW_LABEL = "min-w-0 truncate text-caption text-muted-foreground";

type PanelSectionProps = {
  title: string;
  action?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

function headerClassName(action: React.ReactNode) {
  return cn("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4", action ? "py-3" : "py-4");
}

const BODY = "flex min-w-0 flex-col gap-1 px-4 pb-3";

export function PanelSection({
  title,
  action,
  collapsible = true,
  defaultOpen = true,
  children,
}: PanelSectionProps) {
  if (!collapsible) {
    return (
      <section className="flex min-w-0 flex-col gap-1 border-b">
        <div className={headerClassName(action)}>
          <h3 className={cn(TITLE, "flex-1")}>{title}</h3>
          {action}
        </div>
        <div className={BODY}>{children}</div>
      </section>
    );
  }

  return (
    <Collapsible defaultOpen={defaultOpen} className="flex min-w-0 flex-col gap-1 border-b">
      <div className={headerClassName(action)}>
        <CollapsibleTrigger className="group/section flex min-w-0 flex-1 items-center justify-between gap-2 self-stretch rounded-sm text-start outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <span className={TITLE}>{title}</span>
          <ChevronRightIcon
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 group-data-panel-open/section:rotate-90"
          />
        </CollapsibleTrigger>
        {action}
      </div>
      <CollapsibleContent>
        <div className={BODY}>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

type PropertyRowProps = {
  label: string;
  hint: string;
  htmlFor?: string;
  adornment?: React.ReactNode;
  children: React.ReactNode;
};

export function PropertyRow({ label, hint, htmlFor, adornment, children }: PropertyRowProps) {
  return (
    <div data-slot="property-row" className="flex min-h-8 min-w-0 items-center gap-2 py-1">
      <div className="flex w-25 min-w-0 shrink-0 items-center gap-1">
        <Tooltip>
          <TooltipTrigger
            render={
              htmlFor ? <label htmlFor={htmlFor} className={ROW_LABEL} /> : <span className={ROW_LABEL} />
            }
          >
            {label}
          </TooltipTrigger>
          <TooltipContent side="left">{hint}</TooltipContent>
        </Tooltip>
        {adornment}
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2">{children}</div>
    </div>
  );
}
