"use client"

import * as React from "react"

import {
  Card,
  CardContent,
} from "@/app/docs/components/card/docs-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/app/docs/components/carousel/docs-carousel"

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

export function CarouselBasicDemo() {
  return (
    <div className="mx-auto w-full max-w-xs px-12">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Slide label={String(index + 1)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export function CarouselSizesDemo() {
  return (
    <div className="mx-auto w-full max-w-sm px-12">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Slide label={String(index + 1)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export function CarouselSpacingDemo() {
  return (
    <div className="mx-auto w-full max-w-sm px-12">
      <Carousel>
        <CarouselContent className="-ms-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="ps-1 md:basis-1/2">
              <Slide label={String(index + 1)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export function CarouselOrientationDemo() {
  return (
    <div className="mx-auto w-full max-w-xs py-12">
      <Carousel orientation="vertical" opts={{ align: "start" }}>
        <CarouselContent className="-mt-1 h-[200px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="h-full p-1">
                <Card className="h-full py-0">
                  <CardContent className="flex h-full items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Slide label={String(index + 1)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  )
}

export function CarouselRtlDemo() {
  const labels = ["۱", "۲", "۳", "۴", "۵"]

  return (
    <div dir="rtl" lang="fa" className="mx-auto w-full max-w-xs px-12">
      <Carousel>
        <CarouselContent>
          {labels.map((label) => (
            <CarouselItem key={label}>
              <Slide label={label} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
