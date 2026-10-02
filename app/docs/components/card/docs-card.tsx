"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaCard from "@/components/cubix/aria/card"
import * as BaseCard from "@/components/cubix/base/card"
import * as RadixCard from "@/components/cubix/radix/card"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useCardBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Card(props: ComponentProps<typeof BaseCard.Card>) {
  const base = useCardBase()

  if (base === "radix") {
    return <RadixCard.Card {...props} />
  }

  if (base === "aria") {
    return <AriaCard.Card {...props} />
  }

  return <BaseCard.Card {...props} />
}

function CardHeader(props: ComponentProps<typeof BaseCard.CardHeader>) {
  const base = useCardBase()

  if (base === "radix") {
    return <RadixCard.CardHeader {...props} />
  }

  if (base === "aria") {
    return <AriaCard.CardHeader {...props} />
  }

  return <BaseCard.CardHeader {...props} />
}

function CardTitle(props: ComponentProps<typeof BaseCard.CardTitle>) {
  const base = useCardBase()

  if (base === "radix") {
    return <RadixCard.CardTitle {...props} />
  }

  if (base === "aria") {
    return <AriaCard.CardTitle {...props} />
  }

  return <BaseCard.CardTitle {...props} />
}

function CardDescription(props: ComponentProps<typeof BaseCard.CardDescription>) {
  const base = useCardBase()

  if (base === "radix") {
    return <RadixCard.CardDescription {...props} />
  }

  if (base === "aria") {
    return <AriaCard.CardDescription {...props} />
  }

  return <BaseCard.CardDescription {...props} />
}

function CardAction(props: ComponentProps<typeof BaseCard.CardAction>) {
  const base = useCardBase()

  if (base === "radix") {
    return <RadixCard.CardAction {...props} />
  }

  if (base === "aria") {
    return <AriaCard.CardAction {...props} />
  }

  return <BaseCard.CardAction {...props} />
}

function CardContent(props: ComponentProps<typeof BaseCard.CardContent>) {
  const base = useCardBase()

  if (base === "radix") {
    return <RadixCard.CardContent {...props} />
  }

  if (base === "aria") {
    return <AriaCard.CardContent {...props} />
  }

  return <BaseCard.CardContent {...props} />
}

function CardFooter(props: ComponentProps<typeof BaseCard.CardFooter>) {
  const base = useCardBase()

  if (base === "radix") {
    return <RadixCard.CardFooter {...props} />
  }

  if (base === "aria") {
    return <AriaCard.CardFooter {...props} />
  }

  return <BaseCard.CardFooter {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
