"use client"

import { PlusIcon } from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../docs-avatar"

export function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Avatar ring size="2xl">
        <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
        <AvatarFallback />
      </Avatar>
      <Avatar ring size="2xl">
        <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
        <AvatarFallback />
        <AvatarBadge aria-label="آنلاین" className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <Avatar ring size="2xl">
        <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
        <AvatarFallback />
        <AvatarBadge aria-label="افزودن هم‌تیمی" render={<button type="button" />}>
          <PlusIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
