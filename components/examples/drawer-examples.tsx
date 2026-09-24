"use client"

import * as React from "react"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/cubix/drawer"
import { Input } from "@/components/cubix/input"
import { RadioGroup, RadioGroupItem } from "@/components/cubix/radio-group"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const DRAWER_SIDES = ["up", "right", "down", "left"] as const

const PARAGRAPHS = [
  "Your changes are saved automatically as you type.",
  "Delivery usually takes three to five business days, depending on your location and the shipping method you selected at checkout.",
  "We use your email address for account notifications and order updates. You can change this anytime from your profile settings.",
  "Two-factor authentication adds an extra layer of security to your account.",
  "By continuing, you agree to our Terms of Service and Privacy Policy.",
  "Refunds are processed within five to ten business days after we receive your return.",
  "Last updated March 12, 2026.",
  "Upgrade to Pro for unlimited projects, priority support, and advanced analytics.",
  "You have not verified your email yet. Check your inbox for a confirmation link.",
  "API requests are rate-limited to 1,000 calls per hour on the free plan.",
]

const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25-35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM - 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM - 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM - 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM - 6:45 PM",
    description: "Last slot before kitchen closes",
  },
]

function MuteBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full",
        className
      )}
    />
  )
}

export function DrawerDemo() {
  const [open, setOpen] = React.useState(false)
  const [deliveryTime, setDeliveryTime] = React.useState("asap")
  const isMobile = useIsMobile()

  function handleConfirm() {
    if (!deliveryTimes.some((time) => time.value === deliveryTime)) {
      return
    }
    setOpen(false)
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger render={<Button variant="outline" />}>
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pick a delivery time</DrawerTitle>
          <DrawerDescription>
            We&apos;ll prepare your order as soon as possible.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <RadioGroup
            value={deliveryTime}
            onValueChange={setDeliveryTime}
            className="gap-2"
          >
            {deliveryTimes.map((time) => (
              <label
                key={time.value}
                htmlFor={time.id}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border p-3 transition-colors has-[[data-slot=radio-group-item][data-checked]]:bg-muted/50"
              >
                <span className="grid flex-1 gap-0.5 text-left leading-none">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {time.label}
                    {time.badge ? (
                      <Badge variant="secondary">{time.badge}</Badge>
                    ) : null}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {time.description}
                  </span>
                </span>
                <RadioGroupItem value={time.value} id={time.id} />
              </label>
            ))}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm}>Confirm Delivery Time</Button>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerLayoutsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>
          Header
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you are done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="h-80 w-full rounded-lg bg-muted" />
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>
          Footer
        </DrawerTrigger>
        <DrawerContent>
          <div className="p-4">
            <div className="h-80 w-full rounded-lg bg-muted" />
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>
          Header and Footer
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you are done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="h-80 w-full rounded-lg bg-muted" />
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>
          Edge to Edge
        </DrawerTrigger>
        <DrawerContent>
          <div className="h-80 w-full bg-muted" />
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export function DrawerPositionDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {DRAWER_SIDES.map((side) => (
        <Drawer key={side} swipeDirection={side}>
          <DrawerTrigger
            render={<Button variant="outline" className="capitalize" />}
          >
            {side}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <MuteBlock />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}

export function DrawerSwipeHandleDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {DRAWER_SIDES.map((side) => (
        <Drawer key={side} swipeDirection={side} showSwipeHandle>
          <DrawerTrigger
            render={<Button variant="outline" className="capitalize" />}
          >
            {side}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="capitalize">Drawer</DrawerTitle>
              <DrawerDescription>
                Drawer with a swipe handle.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <MuteBlock />
            </div>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}

export function DrawerNestedDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {DRAWER_SIDES.map((side) => (
        <Drawer key={side} swipeDirection={side} showSwipeHandle>
          <DrawerTrigger
            render={<Button variant="outline" className="capitalize" />}
          >
            {side}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="capitalize">{side} drawer</DrawerTitle>
              <DrawerDescription>
                Open another drawer from the same direction.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <MuteBlock />
            </div>
            <DrawerFooter>
              <Drawer swipeDirection={side}>
                <DrawerTrigger render={<Button />}>
                  Open nested drawer
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Nested drawer</DrawerTitle>
                    <DrawerDescription>
                      The parent drawer stays mounted behind this one.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex-1 p-4">
                    <MuteBlock />
                  </div>
                  <DrawerFooter>
                    <Drawer swipeDirection={side}>
                      <DrawerTrigger render={<Button />}>
                        Open third drawer
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Third drawer</DrawerTitle>
                          <DrawerDescription>
                            This is the frontmost drawer in the stack.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="flex-1 p-4">
                          <MuteBlock />
                        </div>
                        <DrawerFooter>
                          <DrawerClose render={<Button variant="outline" />}>
                            Close
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                    <DrawerClose render={<Button variant="outline" />}>
                      Close
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}

export function DrawerNonModalDemo() {
  return (
    <Drawer modal={false} disablePointerDismissal swipeDirection="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        Non Modal
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Non Modal Drawer</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <MuteBlock />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const SNAP_POINTS = ["31rem", 1]

export function DrawerSnapPointsDemo() {
  return (
    <Drawer snapPoints={SNAP_POINTS} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open Snap Drawer
      </DrawerTrigger>
      <DrawerContent className="max-h-[calc(100dvh-1rem)]">
        <DrawerHeader>
          <DrawerTitle>Snap points</DrawerTitle>
          <DrawerDescription>
            Drag the drawer to snap between a compact peek and a near full-height
            view.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid flex-1 gap-3 overflow-y-auto p-4">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="h-12 rounded-lg bg-muted" />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium leading-none">
          Email
        </label>
        <Input type="email" id="email" defaultValue="m@example.com" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="username" className="text-sm font-medium leading-none">
          Username
        </label>
        <Input id="username" defaultValue="@cubix" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}

export function DrawerResponsiveDemo() {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" />}>
          Edit Profile
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button variant="outline" />}>
        Edit Profile
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you are done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerScrollableDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Scrollable
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Scrollable content</DrawerTitle>
          <DrawerDescription>
            Long content scrolls while the header and footer stay in place.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              {PARAGRAPHS[index % PARAGRAPHS.length]}
            </p>
          ))}
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
