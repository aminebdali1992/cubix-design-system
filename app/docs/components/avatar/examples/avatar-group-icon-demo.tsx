"use client"

import { PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../docs-avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip/docs-tooltip"

const people = [
  { src: "/docs/avatar/girl.jpg", alt: "مریم", fallback: "م" },
  { src: "/docs/avatar/ali.jpg", alt: "علی", fallback: "ع" },
  { src: "/docs/avatar/niloofar.jpg", alt: "نیلوفر", fallback: "ن" },
]

export function AvatarGroupIconDemo() {
  return (
    <AvatarGroup aria-label="دعوت به تیم">
      {people.map((person) => (
        <Avatar key={person.alt}>
          <AvatarImage src={person.src} alt={person.alt} />
          <AvatarFallback />
          <Tooltip>
            <TooltipTrigger className="absolute inset-0 z-10 rounded-full outline-none">
              <span className="sr-only">{person.alt}</span>
            </TooltipTrigger>
            <TooltipContent gap={4}>{person.alt}</TooltipContent>
          </Tooltip>
        </Avatar>
      ))}
      <AvatarGroupCount>
        <PlusIcon />
      </AvatarGroupCount>
    </AvatarGroup>
  )
}
