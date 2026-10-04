"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const COMMAND = "npx cubix-ui@latest init"

export function CopyInitCommand({ className }: { className?: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(id)
  }, [copied])

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(COMMAND)
      setCopied(true)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={copyCommand}
      aria-label={copied ? "Command copied" : "Copy install command"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span>{COMMAND}</span>
      {copied ? (
        <CheckIcon className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
      ) : (
        <CopyIcon className="size-3.5 opacity-70" aria-hidden />
      )}
    </button>
  )
}
