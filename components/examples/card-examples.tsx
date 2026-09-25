"use client"

import {
  BellIcon,
  CheckIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/docs/components/card/docs-card"
import { Input } from "@/components/cubix/input"
import { Label } from "@/components/cubix/label"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Deploy to production</CardTitle>
        <CardDescription>
          Your changes are ready to go live. Deploy them with one click.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Deploy now</Button>
      </CardFooter>
    </Card>
  )
}

export function CardFormDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input placeholder="Name of your project" />
          <Input placeholder="Name of domain" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Create project</Button>
        <Button variant="outline" className="w-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}

export function CardActionDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <BellIcon className="mt-0.5 size-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Your deployment finished successfully.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function CardIconDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <SparklesIcon className="size-5" />
        </div>
        <CardTitle>Pro plan</CardTitle>
        <CardDescription>
          Unlock every component and priority support.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Upgrade</Button>
      </CardFooter>
    </Card>
  )
}

export function CardSizeDemo() {
  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Scheduled reports</CardTitle>
        <CardDescription>
          Weekly snapshots. No more manual exports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-foreground" />
            Choose a schedule (daily or weekly).
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-foreground" />
            Send to channels or specific teammates.
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-foreground" />
            Include charts, tables, and key metrics.
          </li>
        </ul>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Button variant="outline" size="sm">
          See what&apos;s new
        </Button>
        <Button size="sm">
          Set up
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export function CardImageDemo() {
  return (
    <Card className="w-full max-w-sm pt-0">
      <div
        aria-hidden
        className="aspect-video bg-linear-to-br from-muted to-muted-foreground/20"
      />
      <CardHeader>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          Tokens, bases, and agent UI - a hands-on session for product teams.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View details
        </Button>
      </CardFooter>
    </Card>
  )
}

export function CardSpacingDemo() {
  return (
    <Card className="w-full max-w-sm gap-0 [--card-spacing:--spacing(6)]">
      <CardHeader className="border-b">
        <CardTitle>Terms of Service</CardTitle>
        <CardDescription>
          Review the terms before accepting the agreement.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 py-(--card-spacing) text-muted-foreground">
        <p>
          These terms govern your use of the workspace, including access to
          shared documents and collaboration tools.
        </p>
        <p>
          You are responsible for the content you upload and for ensuring your
          team has the right permissions.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </CardFooter>
    </Card>
  )
}

export function CardRtlDemo() {
  return (
    <div dir="rtl" lang="fa" className="w-full max-w-xs">
      <form onSubmit={(event) => event.preventDefault()}>
        <Card>
          <CardHeader>
            <CardTitle>ورود به حساب</CardTitle>
            <CardDescription>
              برای ادامه، ایمیل و رمز عبور خود را وارد کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="card-rtl-email">ایمیل</Label>
                <Input
                  id="card-rtl-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="card-rtl-password">رمز عبور</Label>
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto px-0 text-description"
                  >
                    فراموشی رمز؟
                  </Button>
                </div>
                <Input
                  id="card-rtl-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button type="submit" className="w-full">
              ورود
            </Button>
            <p className="text-center text-description text-muted-foreground">
              حساب ندارید؟{" "}
              <Button type="button" variant="link" className="h-auto px-0">
                ثبت‌نام
              </Button>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
