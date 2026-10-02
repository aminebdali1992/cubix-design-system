"use client"

import * as React from "react"

import { Card, CardContent } from "@/app/docs/components/card/docs-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../docs-carousel"

const slides = ["۱", "۲", "۳", "۴", "۵"]

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)] ?? digit)
}

function Slide({ label }: { label: string }) {
  return (
    <div className="p-1">
      <Card className="py-0">
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <span className="text-4xl font-semibold">{label}</span>
        </CardContent>
      </Card>
    </div>
  )
}

export function CarouselApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const sync = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }

    sync()
    api.on("select", sync)
    api.on("reInit", sync)

    return () => {
      api.off("select", sync)
      api.off("reInit", sync)
    }
  }, [api])

  return (
    <div className="mx-auto w-full max-w-xs px-12">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {slides.map((label) => (
            <CarouselItem key={label}>
              <Slide label={label} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        اسلاید {toPersianDigits(current)} از {toPersianDigits(count)}
      </div>
    </div>
  )
}
