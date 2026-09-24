"use client"

import * as React from "react"
import { BotIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/cubix/avatar"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/cubix/message"
import {
  Source,
  SourcePreview,
  Sources,
  SourcesContent,
  SourcesEmpty,
  SourcesTrigger,
} from "@/components/cubix/sources"

const sampleSources = [
  {
    href: "https://nextjs.org/docs/app/building-your-application/deploying",
    title: "Deploying Next.js applications",
    description: "Production checklist for builds, migrations, and cutover.",
  },
  {
    href: "https://developer.mozilla.org/en-US/docs/Web/API/Performance",
    title: "Performance API",
    description: "Browser timing signals useful for first-hour monitors.",
  },
  {
    href: "https://web.dev/articles/rail",
    title: "The RAIL performance model",
    description: "Response, Animation, Idle, and Load budgets for UX.",
  },
]

export function SourcesDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Sources count={sampleSources.length} defaultOpen>
        <SourcesTrigger />
        <SourcesContent>
          {sampleSources.map((source) => (
            <Source
              key={source.href}
              href={source.href}
              title={source.title}
              description={source.description}
            />
          ))}
        </SourcesContent>
      </Sources>
    </div>
  )
}

export function SourcesClosedDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Sources count={sampleSources.length}>
        <SourcesTrigger />
        <SourcesContent>
          {sampleSources.map((source) => (
            <Source
              key={source.href}
              href={source.href}
              title={source.title}
            />
          ))}
        </SourcesContent>
      </Sources>
    </div>
  )
}

export function SourcesSingleDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Sources count={1} defaultOpen>
        <SourcesTrigger />
        <SourcesContent>
          <Source
            href={sampleSources[0]!.href}
            title={sampleSources[0]!.title}
            description={sampleSources[0]!.description}
          />
        </SourcesContent>
      </Sources>
    </div>
  )
}

export function SourcesEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Sources count={0} defaultOpen>
        <SourcesTrigger label="0 sources" />
        <SourcesContent>
          <SourcesEmpty>
            This answer was not grounded in retrieved documents.
          </SourcesEmpty>
        </SourcesContent>
      </Sources>
    </div>
  )
}

export function SourcesNoFaviconDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Sources count={2} defaultOpen>
        <SourcesTrigger />
        <SourcesContent>
          <Source
            href="https://example.com/runbook"
            title="Internal cutover runbook"
            description="Private ops doc mirrored for the deploy window."
            showFavicon={false}
          />
          <Source
            href="https://example.com/rollback"
            title="Rollback decision tree"
            showFavicon={false}
          />
        </SourcesContent>
      </Sources>
    </div>
  )
}

export function SourcesPreviewDemo() {
  return (
    <div className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
      Keep rollback ready and watch p95 for the first hour.{" "}
      <SourcePreview
        href={sampleSources[1]!.href}
        title={sampleSources[1]!.title}
        description={sampleSources[1]!.description}
      >
        [1]
      </SourcePreview>{" "}
      The RAIL model still applies for deploy UX budgets.{" "}
      <SourcePreview
        href={sampleSources[2]!.href}
        title={sampleSources[2]!.title}
        description={sampleSources[2]!.description}
      >
        [2]
      </SourcePreview>
    </div>
  )
}

export function SourcesCustomLabelDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Sources count={3} defaultOpen>
        <SourcesTrigger label="Cited references" />
        <SourcesContent>
          {sampleSources.map((source) => (
            <Source
              key={source.href}
              href={source.href}
              title={source.title}
            />
          ))}
        </SourcesContent>
      </Sources>
    </div>
  )
}

export function SourcesControlledDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-start gap-3">
      <Button size="xs" variant="outline" onClick={() => setOpen((v) => !v)}>
        {open ? "Hide sources" : "Show sources"}
      </Button>
      <Sources count={sampleSources.length} open={open} onOpenChange={setOpen}>
        <SourcesTrigger />
        <SourcesContent>
          {sampleSources.map((source) => (
            <Source
              key={source.href}
              href={source.href}
              title={source.title}
            />
          ))}
        </SourcesContent>
      </Sources>
    </div>
  )
}

function AssistantAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="bg-foreground text-background">
        <BotIcon className="size-4" />
      </AvatarFallback>
    </Avatar>
  )
}

export function SourcesMessageDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              Start with the changelog, run smoke tests, migrate before cutover,
              then watch error rate and p95 for the first hour.{" "}
              <SourcePreview
                href={sampleSources[0]!.href}
                title={sampleSources[0]!.title}
                description={sampleSources[0]!.description}
              >
                [1]
              </SourcePreview>
            </BubbleContent>
          </Bubble>
          <Sources count={sampleSources.length} defaultOpen>
            <SourcesTrigger />
            <SourcesContent>
              {sampleSources.map((source) => (
                <Source
                  key={source.href}
                  href={source.href}
                  title={source.title}
                  description={source.description}
                />
              ))}
            </SourcesContent>
          </Sources>
        </MessageContent>
      </Message>
    </div>
  )
}
