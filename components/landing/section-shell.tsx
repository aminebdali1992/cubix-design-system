import type { ReactNode } from "react"

import { SiteFrame } from "@/components/site-frame"

const DEFAULT_SHELL_CLASS =
  "flex flex-col items-center justify-center gap-10 border-x border-border py-16 md:gap-12 md:py-24"

export function SectionShell({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section className="w-full">
      <div className="border-b border-border">
        <SiteFrame>
          <div className={className ?? DEFAULT_SHELL_CLASS}>
            <div className="flex w-full flex-col px-5 md:px-12">
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
                <div className="flex flex-col gap-3">
                  <div className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {eyebrow}
                  </div>
                  <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                    {title}
                  </h2>
                  <p className="text-base text-pretty text-muted-foreground md:text-lg">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            {children}
          </div>
        </SiteFrame>
      </div>
    </section>
  )
}

export function SectionDivider() {
  return (
    <section className="w-full" aria-hidden>
      <div className="border-b border-border">
        <SiteFrame>
          <div className="landing-hatch h-14 border-x border-border" />
        </SiteFrame>
      </div>
    </section>
  )
}
