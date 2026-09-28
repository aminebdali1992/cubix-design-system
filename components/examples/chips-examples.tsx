"use client"

import * as React from "react"

import { Chip, Chips } from "@/app/docs/components/chips/docs-chips"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/docs/components/avatar/docs-avatar"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

const categories = [
  { value: "electronics", label: "لوازم دیجیتال" },
  { value: "fashion", label: "پوشاک" },
  { value: "home", label: "خانه و آشپزخانه" },
  { value: "beauty", label: "زیبایی و سلامت" },
  { value: "books", label: "کتاب" },
]

const skills = [
  { value: "design", label: "طراحی" },
  { value: "frontend", label: "فرانت‌اند" },
  { value: "backend", label: "بک‌اند" },
]

export function ChipsDemo() {
  return (
    <Chips defaultValue={["fashion"]} className="mx-auto w-fit max-w-md">
      {categories.map((item) => (
        <Chip key={item.value} value={item.value}>
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}

export function ChipsMultipleDemo() {
  return (
    <Chips multiple defaultValue={["design", "frontend"]} className="mx-auto w-fit max-w-md">
      {skills.map((item) => (
        <Chip key={item.value} value={item.value}>
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}

export function ChipsControlledDemo() {
  const [value, setValue] = React.useState<string[]>(["design"])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">
      <Chips multiple value={value} onValueChange={setValue} className="w-fit">
        {skills.map((item) => (
          <Chip key={item.value} value={item.value}>
            {item.label}
          </Chip>
        ))}
      </Chips>
      <p className="text-caption text-muted-foreground">
        انتخاب‌شده: {value.length ? value.join("، ") : "هیچ‌کدام"}
      </p>
    </div>
  )
}

const variants = [
  { value: "default", label: "پیش‌فرض" },
  { value: "secondary", label: "ثانویه" },
  { value: "gray", label: "خاکستری" },
  { value: "outline", label: "خط‌دار" },
] as const

export function ChipsVariantsDemo() {
  const [items, setItems] = React.useState<(typeof variants)[number][]>([
    ...variants,
  ])

  return (
    <Chips
      multiple
      value={items.map((item) => item.value)}
      onValueChange={() => {}}
      className="mx-auto w-fit flex-nowrap"
    >
      {items.map((item) => (
        <Chip
          key={item.value}
          value={item.value}
          variant={item.value}
          icon={<ButtonDemoIcon />}
          onRemove={() =>
            setItems((prev) => prev.filter((i) => i.value !== item.value))
          }
        >
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}

const sizes = [
  { value: "xs", label: "خیلی کوچک" },
  { value: "sm", label: "کوچک" },
  { value: "default", label: "پیش‌فرض" },
  { value: "lg", label: "بزرگ" },
] as const

export function ChipsSizesDemo() {
  const [items, setItems] = React.useState<(typeof sizes)[number][]>([
    ...sizes,
  ])

  return (
    <Chips
      multiple
      value={items.map((item) => item.value)}
      onValueChange={() => {}}
      className="mx-auto w-fit flex-nowrap"
    >
      {items.map((item) => (
        <Chip
          key={item.value}
          value={item.value}
          size={item.value}
          icon={<ButtonDemoIcon />}
          onRemove={() =>
            setItems((prev) => prev.filter((i) => i.value !== item.value))
          }
        >
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}

const people = [
  { value: "reza", label: "رضا احمدی", src: "/docs/avatar/cn.png", initial: "ر" },
  { value: "ali", label: "علی رضایی", src: "/docs/avatar/er.png", initial: "ع" },
  { value: "maryam", label: "مریم کریمی", src: "/docs/avatar/lr.png", initial: "م" },
]

export function ChipsAvatarDemo() {
  const [items, setItems] = React.useState(people)

  return (
    <Chips
      multiple
      value={items.map((item) => item.value)}
      onValueChange={() => {}}
      className="mx-auto w-fit flex-nowrap"
    >
      {items.map((item) => (
        <Chip
          key={item.value}
          value={item.value}
          variant="gray"
          avatar={
            <Avatar>
              <AvatarImage src={item.src} alt={item.label} />
              <AvatarFallback>{item.initial}</AvatarFallback>
            </Avatar>
          }
          onRemove={() =>
            setItems((prev) => prev.filter((i) => i.value !== item.value))
          }
        >
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}

export function ChipsRemovableDemo() {
  const [items, setItems] = React.useState(skills)

  return (
    <Chips
      multiple
      value={items.map((item) => item.value)}
      onValueChange={() => {}}
      className="mx-auto w-fit max-w-md"
    >
      {items.map((item) => (
        <Chip
          key={item.value}
          value={item.value}
          onRemove={() => {
            setItems((prev) => prev.filter((i) => i.value !== item.value))
          }}
        >
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}

export function ChipsDisabledItemDemo() {
  return (
    <Chips defaultValue={["fashion"]} className="mx-auto w-fit max-w-md">
      {categories.map((item) => (
        <Chip
          key={item.value}
          value={item.value}
          disabled={item.value === "books"}
        >
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}

export function ChipsDisabledDemo() {
  return (
    <Chips disabled defaultValue={["fashion"]} className="mx-auto w-fit max-w-md">
      {categories.map((item) => (
        <Chip key={item.value} value={item.value}>
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}

export function ChipsIconDemo() {
  return (
    <Chips defaultValue={["design"]} className="mx-auto w-fit max-w-md">
      {skills.map((item) => (
        <Chip key={item.value} value={item.value} icon={<ButtonDemoIcon />}>
          {item.label}
        </Chip>
      ))}
    </Chips>
  )
}
