"use client"

import { ScrollArea, ScrollBar } from "../docs-scroll-area"

const works = [
  { title: "کوهستان", artist: "سارا احمدی" },
  { title: "دریا", artist: "علی رضایی" },
  { title: "جنگل", artist: "مریم کریمی" },
  { title: "کویر", artist: "رضا محمدی" },
  { title: "شهر", artist: "نگار حسینی" },
]

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-lg border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {works.map((work) => (
          <figure key={work.title} className="shrink-0">
            <div className="flex aspect-square w-[150px] items-center justify-center rounded-lg bg-muted text-label font-normal text-muted-foreground">
              {work.title}
            </div>
            <figcaption className="pt-2 text-caption font-normal text-muted-foreground">
              عکس از <span className="text-foreground">{work.artist}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
