"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../docs-avatar"

const sizes = ["sm", "default", "lg", "xl", "2xl"] as const

export function AvatarSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size === "default" ? undefined : size}>
          <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
          <AvatarFallback>م</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}
