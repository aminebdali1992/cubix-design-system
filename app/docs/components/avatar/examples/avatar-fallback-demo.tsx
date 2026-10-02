"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../docs-avatar"

export function AvatarFallbackDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Avatar>
        <AvatarImage src="/docs/avatar/missing.jpg" alt="نیلوفر" />
        <AvatarFallback>ن</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="/docs/avatar/missing.jpg" alt="علی" />
        <AvatarFallback>ع</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarImage src="/docs/avatar/missing.jpg" alt="سارا" />
        <AvatarFallback>س</AvatarFallback>
      </Avatar>
    </div>
  )
}
