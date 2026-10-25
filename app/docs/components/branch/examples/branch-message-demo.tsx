"use client"

import { BotIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/cubix/avatar"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/cubix/message"
import {
  Branch,
  BranchContent,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from "../docs-branch"

const replies = [
  "برای انتشار، اول فهرست تغییرات را مرور کن و بعد تست‌های اصلی را اجرا کن.",
  "نسخه‌ی جدید را پشت یک فلگ منتشر کن تا در صورت مشکل سریع برگردی.",
  "بعد از انتشار، یک ساعت نرخ خطا و زمان پاسخ را زیر نظر بگیر.",
]

export function BranchMessageDemo() {
  return (
    <Message className="mx-auto max-w-md">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback className="bg-foreground text-background">
            <BotIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Branch defaultBranch={0}>
          <BranchContent>
            {replies.map((text) => (
              <Bubble key={text} variant="muted">
                <BubbleContent>{text}</BubbleContent>
              </Bubble>
            ))}
          </BranchContent>
          <BranchSelector>
            <BranchPrevious />
            <BranchPage />
            <BranchNext />
          </BranchSelector>
        </Branch>
      </MessageContent>
    </Message>
  )
}
