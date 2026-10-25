"use client"

import { useState, type FormEvent } from "react"
import { CircleHelpIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  TextField,
  TextFieldControl,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from "@/app/docs/components/text-field/docs-text-field"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/docs/components/tooltip/docs-tooltip"

function InfoTooltip({ children }: { children: string }) {
  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex rounded-sm text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-primary/20">
        <CircleHelpIcon aria-label="اطلاعات بیشتر" className="size-4" />
      </TooltipTrigger>
      <TooltipContent side="top">{children}</TooltipContent>
    </Tooltip>
  )
}

export function FormItemLayoutAfterLabel() {
  const [functionName, setFunctionName] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log({ functionName })
  }

  return (
    <form className="flex w-full max-w-96 flex-col gap-6" onSubmit={onSubmit}>
      <TextField>
        <TextFieldLabel>
          <span className="flex items-center gap-1.5">
            نام تابع
            <InfoTooltip>پس از برچسب افزوده شده</InfoTooltip>
          </span>
        </TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput
            placeholder="نام تابع"
            value={functionName}
            onChange={(event) => setFunctionName(event.target.value)}
          />
        </TextFieldControl>
        <TextFieldDescription>این نام برای تابع در Postgres هم استفاده می‌شود.</TextFieldDescription>
      </TextField>
      <Button type="submit">
        ارسال
      </Button>
    </form>
  )
}
