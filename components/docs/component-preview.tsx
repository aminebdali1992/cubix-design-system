"use client";

import * as React from "react";
import { CodeIcon, EyeIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { CodeHighlight, CopyCodeButton } from "@/components/docs/code-block";

export function ComponentPreview({
  children,
  code,
  className,
  previewClassName,
  align = "center",
}: {
  children: React.ReactNode;
  code: string;
  className?: string;
  previewClassName?: string;
  align?: "center" | "start";
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");

  return (
    <div
      className={cn(
        "not-prose group relative z-0 my-6 overflow-hidden rounded-xl border bg-background contain-paint",
        className
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/40 px-2 py-2">
        <div className="flex gap-1">
          {(
            [
              { id: "preview", label: "Preview", icon: EyeIcon },
              { id: "code", label: "Code", icon: CodeIcon },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                tab === id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
        {tab === "code" ? <CopyCodeButton code={code} /> : null}
      </div>
      <div className="relative isolate overflow-hidden">
        <div
          className={cn(
            "flex min-h-[350px] w-full flex-wrap justify-center gap-4 p-8 [&>[data-slot=collapsible]]:w-full [&>[data-slot=collapsible]]:max-w-[350px] [&>[data-slot=accordion]]:w-full [&>[data-slot=accordion]]:max-w-lg",
            align === "start" ? "items-start" : "items-center",
            previewClassName,
            tab === "code" && "invisible pointer-events-none"
          )}
          aria-hidden={tab === "code"}
        >
          {children}
        </div>
        <div
          className={cn(
            "absolute inset-0 z-10 overflow-auto bg-background",
            tab === "code" ? "block" : "hidden"
          )}
          aria-hidden={tab !== "code"}
        >
          <CodeHighlight code={code} lang="tsx" className="min-h-full" />
        </div>
      </div>
    </div>
  );
}
