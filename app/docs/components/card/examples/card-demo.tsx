"use client"

import { RocketIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../docs-card"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>انتشار نسخه جدید</CardTitle>
        <CardDescription>تغییرات شما آماده انتشار است. با یک کلیک منتشرش کنید.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>
          <RocketIcon data-icon="inline-start" />
          انتشار
        </Button>
      </CardFooter>
    </Card>
  )
}
