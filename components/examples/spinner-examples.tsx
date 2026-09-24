import * as React from "react"
import { ArrowUpIcon, LoaderIcon } from "lucide-react"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/cubix/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/cubix/input-group"
import { Spinner } from "@/components/cubix/spinner"
import { cn } from "@/lib/utils"

export function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs items-center gap-3 rounded-xl bg-muted p-3">
      <Spinner />
      <span className="min-w-0 flex-1 truncate text-sm font-medium">
        Processing payment...
      </span>
      <span className="text-sm tabular-nums text-muted-foreground">$100.00</span>
    </div>
  )
}

function CustomSpinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustomDemo() {
  return (
    <div className="flex items-center gap-4">
      <CustomSpinner />
    </div>
  )
}

export function SpinnerSizeDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}

export function SpinnerButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Processing
      </Button>
    </div>
  )
}

export function SpinnerBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
    </div>
  )
}

export function SpinnerInputGroupDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function SpinnerEmptyDemo() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export function SpinnerRtlDemo() {
  return (
    <div
      dir="rtl"
      className="flex w-full max-w-xs items-center gap-3 rounded-xl bg-muted p-3"
    >
      <Spinner />
      <span className="min-w-0 flex-1 truncate text-sm font-medium">
        Processing payment...
      </span>
      <span className="text-sm tabular-nums text-muted-foreground">$100.00</span>
    </div>
  )
}
