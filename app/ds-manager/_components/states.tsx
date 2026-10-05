import Link from "next/link";
import { ArrowLeftIcon, MonitorIcon, TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/cubix/empty";
import { Skeleton } from "@/components/cubix/skeleton";
import { cn } from "@/lib/utils";

import { SIDEBAR_WIDTH } from "../_lib/layout";

const SKELETON_SECTIONS = 3;
const SKELETON_CARDS = 4;
const SKELETON_ROWS = 8;

export function DesktopOnlyNotice() {
  return (
    <Empty className="min-h-dvh md:hidden">
      <EmptyHeader>
        <EmptyMedia variant="outline">
          <MonitorIcon />
        </EmptyMedia>
        <EmptyTitle>DS Manager works best on a desktop</EmptyTitle>
        <EmptyDescription>Open it on your computer to edit the design system.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/" />}>
          <ArrowLeftIcon data-icon="inline-start" />
          Back to home
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export function CanvasSkeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-label={label} className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-6">
      {Array.from({ length: SKELETON_SECTIONS }, (_, section) => (
        <div key={section} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-72" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: SKELETON_CARDS }, (_, card) => (
              <Skeleton key={card} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PanelSkeleton({ label }: { label: string }) {
  return (
    <aside
      aria-busy="true"
      aria-label={label}
      className={cn("flex shrink-0 flex-col gap-3 border-s bg-background p-4", SIDEBAR_WIDTH)}
    >
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      {Array.from({ length: SKELETON_ROWS }, (_, row) => (
        <div key={row} className="flex items-center gap-2">
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-8 w-36" />
        </div>
      ))}
    </aside>
  );
}

export function PaletteError() {
  return (
    <Empty className="flex-1">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlertIcon />
        </EmptyMedia>
        <EmptyTitle>Could not read the design tokens</EmptyTitle>
        <EmptyDescription>
          The system tokens were not found in the loaded stylesheets. Reload the page to try again.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}