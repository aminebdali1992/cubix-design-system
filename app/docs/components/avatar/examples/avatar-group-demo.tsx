"use client"

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../docs-avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip/docs-tooltip"

const people = [
  { src: "/docs/avatar/girl.jpg", alt: "مریم", fallback: "م" },
  { src: "/docs/avatar/ali.jpg", alt: "علی", fallback: "ع" },
  { src: "/docs/avatar/niloofar.jpg", alt: "نیلوفر", fallback: "ن" },
]

const sizes = ["sm", "default", "lg"] as const

export function AvatarGroupDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {sizes.map((size) => (
        <AvatarGroup key={size} aria-label="تیم طراحی">
          {people.map((person) => (
            <Avatar key={person.alt} size={size === "default" ? undefined : size}>
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
        </AvatarGroup>
      ))}
    </div>
  )
}
