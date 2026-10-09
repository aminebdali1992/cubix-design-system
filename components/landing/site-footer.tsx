import { SiteFrame } from "@/components/site-frame"
import { siteConfig } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-b border-border">
      <SiteFrame>
        <div className="flex flex-col items-center justify-between gap-4 border-x border-border px-5 py-8 text-sm text-muted-foreground sm:flex-row lg:px-6">
          <p>
            © {new Date().getFullYear()} Cubix. Source on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.npm}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              npm
            </a>
            <span className="text-border" aria-hidden>
              |
            </span>
            <p>MIT License</p>
          </div>
        </div>
      </SiteFrame>
    </footer>
  )
}
