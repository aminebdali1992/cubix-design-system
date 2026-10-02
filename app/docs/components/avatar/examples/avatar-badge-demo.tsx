"use client"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../docs-avatar"

const sizes = ["sm", "default", "lg", "xl", "2xl"] as const

export function AvatarBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size === "default" ? undefined : size}>
          <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
          <AvatarFallback>م</AvatarFallback>
          <AvatarBadge aria-label="آنلاین" className="bg-chart-2" />
        </Avatar>
      ))}
    </div>
  )
}
