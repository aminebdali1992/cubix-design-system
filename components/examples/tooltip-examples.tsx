"use client"

import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"
import { Button } from "@/components/cubix/button"
import { Kbd } from "@/components/cubix/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/docs/components/tooltip/docs-tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="sm" />}>
        نگه دارید
      </TooltipTrigger>
      <TooltipContent>افزودن به کتابخانه</TooltipContent>
    </Tooltip>
  )
}

export function TooltipSidesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(
        [
          ["top", "بالا"],
          ["bottom", "پایین"],
          ["inline-start", "ابتدا (راست)"],
          ["inline-end", "انتها (چپ)"],
        ] as const
      ).map(([side, label]) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            {label}
          </TooltipTrigger>
          <TooltipContent side={side}>افزودن به کتابخانه</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function TooltipIconDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="outline" size="icon-sm" aria-label="افزودن به کتابخانه" />
        }
      >
        <ButtonDemoIcon />
      </TooltipTrigger>
      <TooltipContent>افزودن به کتابخانه</TooltipContent>
    </Tooltip>
  )
}

export function TooltipKeyboardDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="outline" size="icon-sm" aria-label="ذخیره" />}
      >
        <ButtonDemoIcon />
      </TooltipTrigger>
      <TooltipContent>
        ذخیره تغییرات <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}

export function TooltipDisabledDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-block w-fit" />}>
        <Button variant="outline" size="sm" disabled>
          غیرفعال
        </Button>
      </TooltipTrigger>
      <TooltipContent>این قابلیت فعلاً در دسترس نیست</TooltipContent>
    </Tooltip>
  )
}

export function TooltipDelayDemo() {
  return (
    <TooltipProvider delay={700}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          باز شدن با تأخیر
        </TooltipTrigger>
        <TooltipContent>بعد از ۷۰۰ میلی‌ثانیه باز می‌شود</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}