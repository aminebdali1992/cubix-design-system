"use client"

import { ScrollArea, ScrollBar } from "@/components/cubix/scroll-area"

const works = [
  { artist: "Ornella Binni" },
  { artist: "Tom Byrom" },
  { artist: "Vladimir Malyavko" },
] as const

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="flex flex-col gap-2 p-4">
        <h4 className="mb-2 text-sm leading-none font-medium">Tags</h4>
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} className="h-8 w-full rounded-md bg-muted" />
        ))}
      </div>
    </ScrollArea>
  )
}

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="aspect-square w-[150px] rounded-md bg-muted" />
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
