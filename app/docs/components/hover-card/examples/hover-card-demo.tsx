"use client"

import { CalendarIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/cubix/avatar"
import { Button } from "@/components/cubix/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../docs-hover-card"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>@maryam</HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar size="lg" ring>
            <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم رضایی" />
            <AvatarFallback>م</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <p className="text-label font-semibold">مریم رضایی</p>
              <p className="text-label text-muted-foreground">@maryam</p>
            </div>
            <p className="text-label text-muted-foreground">طراح رابط کاربری و علاقه‌مند به سیستم‌های طراحی فارسی.</p>
            <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <CalendarIcon className="size-3.5" />
              <span>عضو از مهر ۱۴۰۲</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
