"use client"

import { PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../docs-avatar"

const people = [
  { src: "/docs/avatar/girl.jpg", alt: "مریم", fallback: "م" },
  { src: "/docs/avatar/missing-a.jpg", alt: "علی", fallback: "ع" },
  { src: "/docs/avatar/missing-n.jpg", alt: "نیلوفر", fallback: "ن" },
]

export function AvatarGroupIconDemo() {
  return (
    <AvatarGroup aria-label="دعوت به تیم">
      {people.map((person) => (
        <Avatar key={person.alt}>
          <AvatarImage src={person.src} alt={person.alt} />
          <AvatarFallback>{person.fallback}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>
        <PlusIcon />
      </AvatarGroupCount>
    </AvatarGroup>
  )
}
