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

export function CarouselOrientationDemo() {
  return (
    <div className="mx-auto w-full max-w-xs py-12">
      <Carousel orientation="vertical" opts={{ align: "start" }}>
        <CarouselContent className="-mt-1 h-52">
          {slides.map((label) => (
            <CarouselItem key={label} className="pt-1 md:basis-1/2">
              <div className="h-full p-1">
                <Card className="h-full py-0">
                  <CardContent className="flex h-full items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{label}</span>
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
