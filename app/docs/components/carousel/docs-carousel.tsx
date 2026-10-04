"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaCarousel from "@/components/cubix/aria/carousel"
import * as BaseCarousel from "@/components/cubix/base/carousel"
import * as RadixCarousel from "@/components/cubix/radix/carousel"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type CarouselRootProps = ComponentProps<typeof BaseCarousel.Carousel>
type CarouselContentProps = ComponentProps<typeof BaseCarousel.CarouselContent>
type CarouselItemProps = ComponentProps<typeof BaseCarousel.CarouselItem>

type CarouselNavProps = {
  className?: string
  variant?:
    | "default"
    | "foreground"
    | "secondary"
    | "gray"
    | "destructive"
    | "destructive-secondary"
    | "outline"
    | "ghost"
    | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  disabled?: boolean
} & Omit<ComponentProps<"button">, "size">

function useCarouselBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Carousel(props: CarouselRootProps) {
  const base = useCarouselBase()

  if (base === "radix") {
    return <RadixCarousel.Carousel {...props} />
  }

  if (base === "aria") {
    return <AriaCarousel.Carousel {...props} />
  }

  return <BaseCarousel.Carousel {...props} />
}

function CarouselContent(props: CarouselContentProps) {
  const base = useCarouselBase()

  if (base === "radix") {
    return <RadixCarousel.CarouselContent {...props} />
  }

  if (base === "aria") {
    return <AriaCarousel.CarouselContent {...props} />
  }

  return <BaseCarousel.CarouselContent {...props} />
}

function CarouselItem(props: CarouselItemProps) {
  const base = useCarouselBase()

  if (base === "radix") {
    return <RadixCarousel.CarouselItem {...props} />
  }

  if (base === "aria") {
    return <AriaCarousel.CarouselItem {...props} />
  }

  return <BaseCarousel.CarouselItem {...props} />
}

function CarouselPrevious(props: CarouselNavProps) {
  const base = useCarouselBase()

  if (base === "radix") {
    return <RadixCarousel.CarouselPrevious {...props} />
  }

  if (base === "aria") {
    return <AriaCarousel.CarouselPrevious {...props} />
  }

  return <BaseCarousel.CarouselPrevious {...props} />
}

function CarouselNext(props: CarouselNavProps) {
  const base = useCarouselBase()

  if (base === "radix") {
    return <RadixCarousel.CarouselNext {...props} />
  }

  if (base === "aria") {
    return <AriaCarousel.CarouselNext {...props} />
  }

  return <BaseCarousel.CarouselNext {...props} />
}

export type { CarouselApi } from "@/components/cubix/base/carousel"
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
