import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SiteFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl px-5 lg:max-w-6xl lg:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
