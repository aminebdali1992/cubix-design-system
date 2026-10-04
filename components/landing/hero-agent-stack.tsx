import { CursorAgentInstall } from "@/components/landing/cursor-agent-install"
import { cn } from "@/lib/utils"

function SchematicWindow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-foreground/20 bg-background/80",
        "shadow-[0_18px_40px_-28px_rgba(0,0,0,0.28)]",
        "dark:border-white/20 dark:bg-[#141414]/55 dark:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-foreground/12 px-3.5 dark:border-white/12">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border border-foreground/25 dark:border-white/30" />
          <span className="size-2 rounded-full border border-foreground/25 dark:border-white/30" />
          <span className="size-2 rounded-full border border-foreground/25 dark:border-white/30" />
        </div>
        <div className="mx-auto h-5 w-[40%] max-w-[168px] rounded-md border border-foreground/14 dark:border-white/16" />
        <div className="w-10" />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[40px_132px_minmax(0,1fr)]">
        <div className="border-e border-foreground/12 dark:border-white/12" />
        <div className="hidden border-e border-foreground/12 p-3 dark:border-white/12 md:block">
          <div className="space-y-2">
            <div className="h-px w-12 bg-foreground/18 dark:bg-white/20" />
            <div className="h-px w-[85%] bg-foreground/12 dark:bg-white/14" />
            <div className="ms-2 h-px w-[60%] bg-foreground/12 dark:bg-white/14" />
            <div className="h-px w-[72%] bg-foreground/12 dark:bg-white/14" />
            <div className="h-px w-[55%] bg-foreground/12 dark:bg-white/14" />
            <div className="mt-3 h-px w-[68%] bg-foreground/12 dark:bg-white/14" />
            <div className="h-px w-[48%] bg-foreground/12 dark:bg-white/14" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="border-b border-foreground/12 px-4 py-2.5 dark:border-white/12">
            <div className="h-px w-24 bg-foreground/18 dark:bg-white/20" />
          </div>
          <div className="flex-1 space-y-3 p-4">
            <div className="ms-auto h-7 w-[52%] rounded-xl border border-foreground/14 dark:border-white/16" />
            <div className="h-px w-[70%] bg-foreground/14 dark:bg-white/16" />
            <div className="h-px w-[58%] bg-foreground/12 dark:bg-white/14" />
            <div className="h-20 rounded-lg border border-dashed border-foreground/14 dark:border-white/16" />
            <div className="h-px w-[44%] bg-foreground/12 dark:bg-white/14" />
          </div>
          <div className="border-t border-foreground/12 px-3 py-2.5 dark:border-white/12">
            <div className="h-8 rounded-full border border-foreground/14 dark:border-white/16" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroAgentStack() {
  return (
    <div className="relative z-20 mx-auto w-full max-w-4xl pt-10 pb-12 md:pt-14 md:pb-16">
      {/* farthest */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] top-0 -z-20 h-[min(100%,520px)] origin-top scale-[0.88] md:inset-x-[9%]"
      >
        <div className="h-full opacity-[0.35] dark:opacity-[0.28]">
          <SchematicWindow />
        </div>
      </div>

      {/* middle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[4%] top-4 -z-10 h-[min(100%,540px)] origin-top scale-[0.94] md:top-5 md:inset-x-[4.5%]"
      >
        <div className="h-full opacity-[0.55] dark:opacity-[0.42]">
          <SchematicWindow />
        </div>
      </div>

      <div className="relative z-10">
        <CursorAgentInstall />
      </div>
    </div>
  )
}
