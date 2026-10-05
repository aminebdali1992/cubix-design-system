import * as React from "react";

import { Card } from "@/components/cubix/card";
import { cn } from "@/lib/utils";

const DEFAULT_GRID = "grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-4";

const SPANS = {
  single: "",
  wide: "@md:col-span-2",
  full: "col-span-full",
} as const;

export function SpecimenPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container mx-auto flex w-full max-w-6xl flex-col gap-8 p-6">{children}</div>
  );
}

type SpecimenSectionProps = {
  title: string;
  description: string;
  gridClassName?: string;
  children: React.ReactNode;
};

export function SpecimenSection({
  title,
  description,
  gridClassName = DEFAULT_GRID,
  children,
}: SpecimenSectionProps) {
  return (
    <section data-slot="specimen-section" className="flex min-w-0 flex-col gap-4">
      <div className="flex max-w-sm min-w-0 flex-col gap-1">
        <h2 className="text-label font-medium text-foreground">{title}</h2>
        <p className="text-caption text-muted-foreground">{description}</p>
      </div>
      <div className={cn("grid min-w-0 items-stretch gap-3", gridClassName)}>{children}</div>
    </section>
  );
}

const SURFACES = {
  palette: "",
  shell: "bg-(--ds-surface)",
} as const;

type SpecimenCardProps = {
  label: string;
  detail?: string;
  span?: keyof typeof SPANS;
  /** Body surface: `palette` previews the edited card color; `shell` matches the editor chrome. The label footer always uses the shell surface. */
  surface?: keyof typeof SURFACES;
  children: React.ReactNode;
};

export function SpecimenCard({
  label,
  detail,
  span = "single",
  surface = "palette",
  children,
}: SpecimenCardProps) {
  return (
    <Card
      data-slot="specimen-card"
      size="sm"
      className={cn("min-w-0 gap-0 rounded-(--ds-card-radius) py-0", SPANS[span], SURFACES[surface])}
    >
      <div className="flex min-h-20 min-w-0 flex-1">{children}</div>
      <div className="flex min-w-0 flex-col gap-0.5 border-t bg-(--ds-surface) p-3 font-mono text-caption">
        <span className="truncate text-foreground" title={label}>
          {label}
        </span>
        {detail ? (
          <span className="truncate text-muted-foreground" title={detail}>
            {detail}
          </span>
        ) : null}
      </div>
    </Card>
  );
}
