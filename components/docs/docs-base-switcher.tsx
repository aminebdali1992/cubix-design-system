"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BASES, DEFAULT_BASE, parseComponentPath } from "@/lib/bases";
import { cn } from "@/lib/utils";

export function DocsBaseSwitcher({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const pathname = usePathname();
  const parsed = parseComponentPath(pathname);
  const activeBase = parsed?.slug === slug ? parsed.base : DEFAULT_BASE;
  const active = BASES.find((item) => item.name === activeBase) ?? BASES[0];

  return (
    <div
      className={cn(
        "flex w-full items-center gap-6",
        className
      )}
    >
      {BASES.map((item) => (
        <Link
          key={item.name}
          href={`/docs/components/${item.name}/${slug}`}
          data-active={item.name === activeBase}
          className="relative inline-flex items-center justify-center gap-1 pt-1 pb-0.5 text-base font-medium text-muted-foreground no-underline transition-colors after:absolute after:inset-x-0 after:bottom-[-4px] after:h-0.5 after:bg-foreground after:opacity-0 after:transition-opacity hover:text-foreground data-[active=true]:text-foreground data-[active=true]:after:opacity-100"
        >
          {item.title}
        </Link>
      ))}
      <div
        className="ml-auto size-4 shrink-0 text-muted-foreground opacity-80 [&_svg]:size-4"
        dangerouslySetInnerHTML={{ __html: active.logo }}
      />
    </div>
  );
}
