"use client"

import { Card, CardContent } from "@/app/docs/components/card/docs-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../docs-carousel"

const slides = ["۱", "۲", "۳", "۴", "۵"]

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

export function CarouselSizesDemo() {
  return (
    <div className="mx-auto w-full max-w-sm px-12">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {slides.map((label) => (
            <CarouselItem key={label} className="md:basis-1/2 lg:basis-1/3">
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
