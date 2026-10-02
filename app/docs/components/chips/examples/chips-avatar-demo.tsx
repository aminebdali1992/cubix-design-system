"use client"

import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/app/docs/components/avatar/docs-avatar"
import { Chip, Chips } from "../docs-chips"

const initialPeople = [
  { value: "maryam", label: "مریم کریمی", src: "/docs/avatar/girl.jpg", initial: "م" },
  { value: "reza", label: "رضا احمدی", initial: "ر" },
  { value: "ali", label: "علی رضایی", initial: "ع" },
]

export function ChipsAvatarDemo() {
  const [people, setPeople] = React.useState(initialPeople)
  const [selected, setSelected] = React.useState<string[]>(["maryam"])

  function removePerson(value: string) {
    setPeople((current) => current.filter((person) => person.value !== value))
    setSelected((current) => current.filter((item) => item !== value))
  }

  return (
    <Chips multiple value={selected} onValueChange={setSelected} className="w-fit justify-center">
      {people.map((person) => (
        <Chip
          key={person.value}
          value={person.value}
          variant="gray"
          avatar={
            <Avatar>
              {person.src ? <AvatarImage src={person.src} alt="" /> : null}
              <AvatarFallback>{person.initial}</AvatarFallback>
            </Avatar>
          }
          removeLabel={`حذف ${person.label}`}
          onRemove={() => removePerson(person.value)}
        >
          {person.label}
        </Chip>
      ))}
    </Chips>
  )
}
