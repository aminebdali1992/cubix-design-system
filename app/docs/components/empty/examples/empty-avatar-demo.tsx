"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/app/docs/components/avatar/docs-avatar"
import { Button } from "@/app/docs/components/button/docs-button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../docs-empty"

export function EmptyAvatarDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Avatar size="xl">
            <AvatarImage src="/docs/avatar/girl.jpg" alt="سارا" className="grayscale" />
            <AvatarFallback>س</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>کاربر آفلاین است</EmptyTitle>
        <EmptyDescription>
          این کاربر الان آفلاین است. می‌توانید برایش پیام بگذارید یا بعداً دوباره امتحان کنید.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">ارسال پیام</Button>
      </EmptyContent>
    </Empty>
  )
}
