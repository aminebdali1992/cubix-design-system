"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"
import { motion } from "framer-motion"

import {
  blockNavigation,
  getBlocksSection,
  getCategoriesForSection,
} from "@/app/blocks/blocks-data"
import { cn } from "@/lib/utils"

function BlocksNav({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  const section = getBlocksSection(pathname)
  const categories = getCategoriesForSection(section)

  const groups = [
    {
      title: "Navigation",
      links: blockNavigation,
    },
    {
      title: "Categories",
      links: categories.map((category) => ({
        title: category.title,
        href: category.href,
      })),
    },
  ]

  return (
    <nav className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-3 font-mono text-label font-medium uppercase tracking-wider text-muted-foreground">
            {group.title}
          </h3>
          {group.links.length === 0 ? (
            <p className="pl-3 text-label leading-5 text-muted-foreground/70">
              Coming soon
            </p>
          ) : (
            <ul className="relative space-y-0.5 border-dotted-spaced-l">
              {group.links.map((link) => {
                const active =
                  group.title === "Navigation"
                    ? (link.href === "/blocks/landing-page" &&
                        section === "landing-page") ||
                      (link.href === "/blocks/ai-agent" &&
                        section === "ai-agent")
                    : pathname === link.href

                return (
                  <li key={link.href} className="relative">
                    {active ? (
                      <motion.div
                        layoutId={`blocks-active-line-${group.title}`}
                        className="absolute top-0 left-0 z-10 h-full w-px bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    ) : null}
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block border-l-2 border-transparent py-1 pl-3 text-label leading-5 text-muted-foreground no-underline transition-colors hover:text-foreground",
                        active && "font-medium text-foreground"
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )
}

export function BlocksSidebar() {
  const pathname = usePathname()
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [fadeBottom, setFadeBottom] = React.useState(true)

  const updateFade = React.useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight
    setFadeBottom(remaining > 8)
  }, [])

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateFade()
    el.addEventListener("scroll", updateFade, { passive: true })
    const observer = new ResizeObserver(updateFade)
    observer.observe(el)
    return () => {
      el.removeEventListener("scroll", updateFade)
      observer.disconnect()
    }
  }, [pathname, updateFade])

  return (
    <aside className="relative sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[250px] shrink-0 overflow-hidden border-dotted-spaced-r lg:block">
      <div
        ref={scrollerRef}
        className="no-scrollbar h-full overflow-y-auto p-6"
      >
        <BlocksNav pathname={pathname} />
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent transition-opacity duration-200",
          fadeBottom ? "opacity-100" : "opacity-0"
        )}
      />
    </aside>
  )
}

type BlocksMobileNavContextValue = {
  open: () => void
}

const BlocksMobileNavContext =
  React.createContext<BlocksMobileNavContextValue | null>(null)

export function BlocksMobileMenuTrigger({
  className,
}: {
  className?: string
}) {
  const ctx = React.useContext(BlocksMobileNavContext)

  return (
    <button
      type="button"
      onClick={() => ctx?.open()}
      aria-label="Open blocks navigation"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-accent lg:hidden",
        className
      )}
    >
      <MenuIcon className="size-4" />
    </button>
  )
}

export function BlocksMobileNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [fadeBottom, setFadeBottom] = React.useState(true)

  const updateFade = React.useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight
    setFadeBottom(remaining > 8)
  }, [])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const el = scrollerRef.current
    if (!el) return
    updateFade()
    el.addEventListener("scroll", updateFade, { passive: true })
    const observer = new ResizeObserver(updateFade)
    observer.observe(el)
    return () => {
      el.removeEventListener("scroll", updateFade)
      observer.disconnect()
    }
  }, [open, pathname, updateFade])

  const value = React.useMemo(() => ({ open: () => setOpen(true) }), [])

  return (
    <BlocksMobileNavContext.Provider value={value}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-overlay-strong"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Blocks navigation"
            className="absolute inset-y-0 left-0 flex w-80 max-w-[90%] flex-col overflow-hidden bg-background shadow-xl"
          >
            <div className="flex shrink-0 items-center justify-between px-6 pt-6 pb-2">
              <span className="text-caption font-semibold text-foreground">
                Blocks
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="-me-1.5 inline-flex size-8 items-center justify-center rounded-md text-foreground hover:bg-accent"
              >
                <XIcon className="size-4" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <div
                ref={scrollerRef}
                className="no-scrollbar h-full overflow-y-auto px-6 pt-4 pb-6"
              >
                <BlocksNav
                  pathname={pathname}
                  onNavigate={() => setOpen(false)}
                />
              </div>
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent transition-opacity duration-200",
                  fadeBottom ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          </div>
        </div>
      ) : null}
    </BlocksMobileNavContext.Provider>
  )
}
