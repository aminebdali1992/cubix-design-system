"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Card, CardFooter, CardHeader, CardTitle } from "./card"

/*
  Cubix Error Display - React Aria version. A Card for surfacing API errors: a header
  with a warning icon and title, the raw error message in a monospace block, an
  optional children slot for troubleshooting content and a footer with a
  primary support Button that is always shown. The API is identical across
  Base UI, Radix and React Aria.
*/

type SupportFormParams = {
  projectRef?: string
  orgSlug?: string
  category?: string
  subject?: string
  message?: string
  error?: string
  sid?: string
}

function buildSupportHref(baseUrl: string, params?: SupportFormParams) {
  const search = new URLSearchParams()
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value) search.set(key, value)
  })
  const query = search.toString()
  return query ? `${baseUrl}?${query}` : baseUrl
}

function WarningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.15137 1.95117C9.30615 -0.0488281 12.1943 -0.0488281 13.3481 1.95117L20.7031 14.6992C21.8574 16.6992 20.4131 19.1992 18.104 19.1992H3.39502C1.08594 19.1992 -0.356933 16.6992 0.797364 14.6992L8.15137 1.95117ZM11.7666 16.0083C11.4971 16.2778 11.1313 16.4292 10.75 16.4292C10.3687 16.4292 10.0029 16.2778 9.7334 16.0083C9.46387 15.7388 9.3125 15.373 9.3125 14.9917C9.3125 14.9307 9.31641 14.8706 9.32373 14.811C9.33545 14.7197 9.35547 14.6304 9.38379 14.5439L9.41406 14.4609C9.48584 14.2803 9.59375 14.1147 9.7334 13.9751C10.0029 13.7056 10.3687 13.5542 10.75 13.5542C11.1313 13.5542 11.4971 13.7056 11.7666 13.9751C12.0361 14.2446 12.1875 14.6104 12.1875 14.9917C12.1875 15.373 12.0361 15.7388 11.7666 16.0083ZM10.75 4.69971C11.0317 4.69971 11.3022 4.81152 11.5015 5.01074C11.7007 5.20996 11.8125 5.48047 11.8125 5.76221V11.0747C11.8125 11.3564 11.7007 11.627 11.5015 11.8262C11.3022 12.0254 11.0317 12.1372 10.75 12.1372C10.4683 12.1372 10.1978 12.0254 9.99854 11.8262C9.79932 11.627 9.6875 11.3564 9.6875 11.0747V5.76221C9.6875 5.48047 9.79932 5.20996 9.99854 5.01074C10.1978 4.81152 10.4683 4.69971 10.75 4.69971Z"
      />
    </svg>
  )
}

type ErrorDisplayProps = {
  /** Color tone of the icon and error message. */
  variant?: "warning" | "destructive"
  /** Shown in the card header next to the icon. */
  title: React.ReactNode
  /** Raw error string rendered in a monospace block. */
  errorMessage: string
  /** Typed params for the support form URL. The component builds the URL. */
  supportFormParams?: SupportFormParams
  /** Base URL of the support form. */
  supportBaseUrl?: string
  /** Label of the support button. */
  supportLabel?: React.ReactNode
  /** Troubleshooting content rendered between the message and the footer. */
  children?: React.ReactNode
  /** Overrides the header icon. */
  icon?: React.ReactNode
  /** Fired once on mount, e.g. for telemetry. */
  onRender?: () => void
  /** Fired when the support button is clicked. */
  onSupportClick?: () => void
  className?: string
}

function ErrorDisplay({
  title,
  errorMessage,
  supportFormParams,
  supportBaseUrl = "/support/new",
  supportLabel = "\u062a\u0645\u0627\u0633 \u0628\u0627 \u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u06cc",
  variant = "warning",
  children,
  icon,
  onRender,
  onSupportClick,
  className,
}: ErrorDisplayProps) {
  const supportHref = buildSupportHref(supportBaseUrl, supportFormParams)
  const onRenderRef = React.useRef(onRender)
  React.useEffect(() => {
    onRenderRef.current?.()
  }, [])

  return (
    <Card data-slot="error-display" role="alert" className={cn("w-full gap-0 py-0", className)}>
      <CardHeader data-slot="error-display-header" className="flex items-center gap-2 border-b p-4">
        <div className={cn("shrink-0 rounded-sm p-1 text-background [&_svg]:size-3", variant === "destructive" ? "bg-destructive" : "bg-warning")}>{icon ?? <WarningIcon />}</div>
        <CardTitle className="text-label font-normal">{title}</CardTitle>
      </CardHeader>
      <div data-slot="error-display-message" className={cn("-mt-px border-y px-4 py-3", variant === "destructive" ? "border-destructive/40 bg-destructive/10" : "border-warning/40 bg-warning/10")}>
        <pre className={cn("max-h-32 overflow-auto whitespace-pre-wrap break-words font-sans text-caption font-normal", variant === "destructive" ? "text-destructive" : "text-warning-text")}>
          {errorMessage}
        </pre>
      </div>
      {children ? (
        <div data-slot="error-display-content" className="border-b">
          {children}
        </div>
      ) : null}
      <CardFooter data-slot="error-display-footer" className="border-t-0 p-4">
        {supportHref ? (
          <Button
            variant="default"
            size="sm"
            render={<a href={supportHref} target="_blank" rel="noreferrer" />}
            onClick={onSupportClick}
          >
            {supportLabel}
          </Button>
        ) : (
          <Button type="button" variant="default" size="sm" onClick={onSupportClick}>
            {supportLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export { ErrorDisplay }
export type { ErrorDisplayProps, SupportFormParams }
