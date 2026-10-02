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

export function CarouselDemo() {
  return (
    <div className="mx-auto w-full max-w-xs px-12">
      <Carousel>
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
    </div>
  )
}
