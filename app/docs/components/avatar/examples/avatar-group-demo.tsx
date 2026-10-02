"use client"

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../docs-avatar"

const people = [
  { src: "/docs/avatar/girl.jpg", alt: "مریم", fallback: "م" },
  { src: "/docs/avatar/missing-a.jpg", alt: "علی", fallback: "ع" },
  { src: "/docs/avatar/missing-n.jpg", alt: "نیلوفر", fallback: "ن" },
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
              <AvatarFallback>{person.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      ))}
    </div>
  )
}
