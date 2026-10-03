import Link from "next/link";
import { ArrowUpRightIcon, CheckCircle2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { frameworks } from "./frameworks";
import {
  agentSurfaces,
  bases,
  designTokens,
  nextSteps,
  principles,
} from "./introduction-data";

const cardLinkClassName =
  "group rounded-xl border bg-card p-5 no-underline transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const iconTileClassName =
  "flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/40 text-foreground [&_svg]:size-4";

export function PrincipleGrid() {
  return (
    <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
      {principles.map((principle) => (
        <li key={principle.id} className="flex">
          <a href={`#${principle.id}`} className={cn(cardLinkClassName, "flex-1")}>
            <div className="flex items-center gap-2.5">
              <span className={iconTileClassName}>
                <principle.icon aria-hidden />
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                {principle.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {principle.description}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function BaseTable() {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">
              Base
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">
              Flag
            </th>
            <th className="px-4 py-3 text-start font-semibold">
              Choose it when
            </th>
          </tr>
        </thead>
        <tbody>
          {bases.map((base) => (
            <tr key={base.name} className="border-b last:border-0">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">
                {base.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                {base.flag}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{base.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TokenSwatches() {
  return (
    <ul className="my-6 grid list-none grid-cols-1 gap-3 ps-0 sm:grid-cols-3">
      {designTokens.map((token) => (
        <li
          key={token.name}
          className="flex items-center gap-3 rounded-xl border bg-card p-3"
        >
          <span
            aria-hidden
            className={cn(
              "size-8 shrink-0 rounded-md border border-border",
              token.swatchClassName
            )}
          />
          <div className="min-w-0">
            <p className="truncate font-mono text-xs font-medium text-foreground">
              {token.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {token.role}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AgentSurfaceList() {
  return (
    <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
      {agentSurfaces.map((surface) => {
        const content = (
          <>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-foreground">
                {surface.name}
              </h3>
              {surface.ready ? (
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              ) : (
                <span className="shrink-0 rounded-md border border-border/60 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                  In progress
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {surface.description}
            </p>
          </>
        );

        return (
          <li key={surface.name} className="flex">
            {surface.ready ? (
              <Link href={surface.href} className={cn(cardLinkClassName, "flex-1")}>
                {content}
              </Link>
            ) : (
              <div className="flex-1 rounded-xl border border-dashed bg-card p-5">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function FrameworkGrid() {
  return (
    <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
      {frameworks.map((framework) => {
        const content = (
          <>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className={iconTileClassName}
                  dangerouslySetInnerHTML={{ __html: framework.logo }}
                />
                <h3 className="truncate text-sm font-semibold text-foreground">
                  {framework.name}
                </h3>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-foreground">
                <CheckCircle2Icon aria-hidden className="size-3" />
                {framework.status}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {framework.description}
            </p>
          </>
        );

        return (
          <li key={framework.name} className="flex">
            {framework.href ? (
              <Link
                href={framework.href}
                className={cn(cardLinkClassName, "flex-1")}
              >
                {content}
              </Link>
            ) : (
              <div className="flex-1 rounded-xl border bg-card p-5">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function NextStepGrid() {
  return (
    <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
      {nextSteps.map((step) => (
        <li key={step.href} className="flex">
          <Link href={step.href} className={cn(cardLinkClassName, "flex-1")}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className={iconTileClassName}>
                  <step.icon aria-hidden />
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
              </div>
              <ArrowUpRightIcon
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
