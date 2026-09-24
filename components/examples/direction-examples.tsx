"use client"

import * as React from "react"

import { Button } from "@/components/cubix/button"
import {
  DirectionProvider,
  useDirection,
} from "@/components/cubix/direction"
import { Label } from "@/components/cubix/label"
import { Slider } from "@/components/cubix/slider"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cubix/tabs"

type TextDirection = "ltr" | "rtl"

const copy = {
  ltr: {
    volume: "Volume",
    account: "Account",
    password: "Password",
    accountPanel: "Make changes to your account here.",
    passwordPanel: "Change your password here.",
  },
  rtl: {
    volume: "میزان صدا",
    account: "حساب کاربری",
    password: "رمز عبور",
    accountPanel: "تغییرات حساب کاربری خود را اینجا اعمال کنید.",
    passwordPanel: "رمز عبور خود را اینجا تغییر دهید.",
  },
} as const

export function DirectionDemo() {
  const [direction, setDirection] = React.useState<TextDirection>("ltr")
  const t = copy[direction]

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          Preview direction
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={direction === "ltr" ? "default" : "outline"}
            onClick={() => setDirection("ltr")}
          >
            LTR
          </Button>
          <Button
            size="sm"
            variant={direction === "rtl" ? "default" : "outline"}
            onClick={() => setDirection("rtl")}
          >
            RTL
          </Button>
        </div>
      </div>
      <div dir={direction} lang={direction === "rtl" ? "fa" : "en"}>
        <DirectionProvider direction={direction}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>{t.volume}</Label>
              <Slider defaultValue={[40]} max={100} step={1} />
            </div>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">{t.account}</TabsTrigger>
                <TabsTrigger value="password">{t.password}</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p className="rounded-lg border bg-card p-4 text-sm text-card-foreground">
                  {t.accountPanel}
                </p>
              </TabsContent>
              <TabsContent value="password">
                <p className="rounded-lg border bg-card p-4 text-sm text-card-foreground">
                  {t.passwordPanel}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </DirectionProvider>
      </div>
    </div>
  )
}

function DirectionReadout() {
  const direction = useDirection()

  return (
    <p className="text-sm text-muted-foreground">
      Current direction:{" "}
      <code className="font-mono text-foreground">{direction}</code>
    </p>
  )
}

export function DirectionHookDemo() {
  const [direction, setDirection] = React.useState<TextDirection>("ltr")

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={direction === "ltr" ? "default" : "outline"}
          onClick={() => setDirection("ltr")}
        >
          LTR
        </Button>
        <Button
          size="sm"
          variant={direction === "rtl" ? "default" : "outline"}
          onClick={() => setDirection("rtl")}
        >
          RTL
        </Button>
      </div>
      <DirectionProvider direction={direction}>
        <DirectionReadout />
      </DirectionProvider>
    </div>
  )
}
