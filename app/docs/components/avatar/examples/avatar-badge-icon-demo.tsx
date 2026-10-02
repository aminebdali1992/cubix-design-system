"use client"

import { PlusIcon } from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../docs-avatar"

const sizes = ["default", "lg", "xl", "2xl"] as const

export function AvatarBadgeIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size === "default" ? undefined : size}>
          <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
          <AvatarFallback>م</AvatarFallback>
          <AvatarBadge aria-label="افزودن هم‌تیمی" render={<button type="button" />}>
            <PlusIcon />
          </AvatarBadge>
        </Avatar>
      ))}
    </div>
  )
}
