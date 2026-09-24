"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BoxesIcon, GithubIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { defaultBlocksHref } from "@/app/blocks/blocks-data";
import { Button } from "@/components/cubix/button";
import { SiteFrame } from "@/components/site-frame";
import { ThemeToggle } from "@/components/theme-toggle";

function HeaderBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-14 items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BoxesIcon className="size-4" />
          </span>
          Cubix
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground md:flex">
          <Link
            href="/docs"
            className="transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="/docs/components"
            className="transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <Link
            href={defaultBlocksHref}
            className="transition-colors hover:text-foreground"
          >
            Blocks
          </Link>
          <Link
            href="/docs/theming"
            className="transition-colors hover:text-foreground"
          >
            Theming
          </Link>
          <Link
            href="/docs/typeset"
            className="transition-colors hover:text-foreground"
          >
            Typeset
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          nativeButton={false}
          render={
            <a href="https://github.com" target="_blank" rel="noreferrer" />
          }
        >
          <GithubIcon />
          GitHub
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}

export function SiteHeader({ className }: { className?: string }) {
  const pathname = usePathname();
  const framed = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      {framed ? (
        <SiteFrame>
          <HeaderBar className="border-x border-border px-5 lg:px-6" />
        </SiteFrame>
      ) : (
        <HeaderBar className="px-4 sm:px-6" />
      )}
    </header>
  );
}
