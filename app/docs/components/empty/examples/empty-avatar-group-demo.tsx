"use client"

import { PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/app/docs/components/avatar/docs-avatar"
import { Button } from "@/app/docs/components/button/docs-button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../docs-empty"

const people = [
  { src: "/docs/avatar/girl.jpg", alt: "سارا", fallback: "س" },
  { src: "/docs/avatar/ali.jpg", alt: "علی", fallback: "ع" },
  { src: "/docs/avatar/niloofar.jpg", alt: "نیلوفر", fallback: "ن" },
]

export function EmptyAvatarGroupDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup aria-label="اعضای تیم">
            {people.map((person) => (
              <Avatar key={person.alt} size="xl">
                <AvatarImage src={person.src} alt={person.alt} className="grayscale" />
                <AvatarFallback>{person.fallback}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>هنوز عضوی ندارید</EmptyTitle>
        <EmptyDescription>اعضای تیم را برای همکاری روی این پروژه دعوت کنید.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <PlusIcon data-icon="inline-start" />
          دعوت اعضا
        </Button>
      </EmptyContent>
    </Empty>
  )
}
