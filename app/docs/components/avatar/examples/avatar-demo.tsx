"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../docs-avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
      <AvatarFallback>م</AvatarFallback>
    </Avatar>
  )
}
