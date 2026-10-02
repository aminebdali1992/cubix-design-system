"use client"

import { SparklesIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../docs-card"

export function CardIconDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <SparklesIcon className="size-5" />
        </div>
        <CardTitle>طرح حرفه‌ای</CardTitle>
        <CardDescription>دسترسی به همه کامپوننت‌ها و پشتیبانی اولویت‌دار.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">ارتقا</Button>
      </CardFooter>
    </Card>
  )
}
