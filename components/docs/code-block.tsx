"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { highlight, type LanguageName } from "sugar-high";
import { lang as resolveLang } from "sugar-high/lang";

import { cn } from "@/lib/utils";

function languageFromTitle(
  title?: string,
  lang?: string
): LanguageName {
  if (lang) {
    return resolveLang(lang) ?? "typescript";
  }

  if (!title) {
    return "typescript";
  }

  const lower = title.trim().toLowerCase();
  if (lower === "terminal") {
    return "shell";
  }

  const fileName = title.split(/[/\\]/).pop() ?? title;
  const extension = fileName.includes(".")
    ? fileName.split(".").pop()
    : undefined;

  return (
    resolveLang(extension ?? "") ??
    resolveLang(lower) ??
    "typescript"
  );
}

export function CopyCodeButton({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy code"
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {copied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </button>
  );
}

export function CodeHighlight({
  code,
  title,
  lang,
  className,
}: {
  code: string;
  title?: string;
  lang?: string;
  className?: string;
}) {
  const html = React.useMemo(
    () => highlight(code, { lang: languageFromTitle(title, lang) }),
    [code, title, lang]
  );

  return (
    <pre
      className={cn(
        "cubix-scrollbar docs-code overflow-x-auto p-4 text-xs leading-normal",
        className
      )}
    >
      <code
        className="font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  );
}

export function CodeBlock({
  code,
  title,
  lang,
  className,
  collapsible = false,
}: {
  code: string;
  title?: string;
  lang?: string;
  className?: string;
  collapsible?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const canCollapse = collapsible && code.split("\n").length > 16;

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-lg border bg-background text-foreground",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-1.5">
        <figcaption className="min-h-7 min-w-0 flex-1 truncate font-mono text-xs leading-7 text-muted-foreground">
          {title ?? "\u00a0"}
        </figcaption>
        {canCollapse ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="h-7 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        ) : null}
        <CopyCodeButton code={code} />
      </div>
      <div
        className={cn(
          "relative",
          canCollapse && !expanded && "max-h-64 overflow-hidden"
        )}
      >
        <CodeHighlight code={code} title={title} lang={lang} />
        {canCollapse && !expanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />
        ) : null}
      </div>
    </figure>
  );
}
