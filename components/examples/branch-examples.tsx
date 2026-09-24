"use client"

import * as React from "react"
import { BotIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/cubix/avatar"
import {
  Branch,
  BranchContent,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
  useBranch,
} from "@/components/cubix/branch"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/cubix/message"

const replyBranches = [
  "Start with the changelog, then run smoke tests before cutover.",
  "Ship behind a flag, migrate first, and keep rollback ready for an hour.",
  "Watch error rate and p95 for the first hour after the deploy window.",
]

const persianReplyBranches = [
  "اول changelog را بخوان، بعد قبل از cutover تست دود بزن.",
  "پشت پرچم منتشر کن، اول migrate کن، و یک ساعت rollback آماده نگه دار.",
  "در ساعت اول بعد از deploy، error rate و p95 را زیر نظر بگیر.",
]

const longBranches = [
  "Version A keeps the answer short and operational.",
  "Version B adds more detail about migrations, monitors, and rollback.",
  "Version C focuses on user-facing risk and communication.",
  "Version D is the most conservative path with staged rollout notes.",
  "Version E is a concise executive summary of the cutover plan.",
]

export function BranchDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Branch defaultBranch={0}>
        <BranchContent>
          {replyBranches.map((text) => (
            <Bubble key={text} variant="muted">
              <BubbleContent>{text}</BubbleContent>
            </Bubble>
          ))}
        </BranchContent>
        <BranchSelector>
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}

export function BranchSingleDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Branch>
        <BranchContent>
          <Bubble variant="muted">
            <BubbleContent>
              Only one reply version exists, so the selector stays hidden.
            </BubbleContent>
          </Bubble>
        </BranchContent>
        <BranchSelector>
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}

export function BranchForcedSelectorDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Branch>
        <BranchContent>
          <Bubble variant="muted">
            <BubbleContent>
              Force the selector even with a single branch for layout testing.
            </BubbleContent>
          </Bubble>
        </BranchContent>
        <BranchSelector force>
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}

export function BranchControlledDemo() {
  const [branch, setBranch] = React.useState(1)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-start gap-3">
      <div className="flex flex-wrap gap-2">
        {replyBranches.map((_, index) => (
          <Button
            key={index}
            size="xs"
            variant={branch === index ? "secondary" : "outline"}
            onClick={() => setBranch(index)}
          >
            Branch {index + 1}
          </Button>
        ))}
      </div>
      <Branch branch={branch} onBranchChange={setBranch}>
        <BranchContent>
          {replyBranches.map((text) => (
            <Bubble key={text} variant="muted">
              <BubbleContent>{text}</BubbleContent>
            </Bubble>
          ))}
        </BranchContent>
        <BranchSelector>
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}

export function BranchManyDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Branch defaultBranch={2}>
        <BranchContent>
          {longBranches.map((text) => (
            <Bubble key={text} variant="muted">
              <BubbleContent>{text}</BubbleContent>
            </Bubble>
          ))}
        </BranchContent>
        <BranchSelector>
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}

export function BranchSelectorEndDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Branch defaultBranch={0}>
        <BranchContent>
          {replyBranches.map((text) => (
            <Bubble key={text} variant="muted">
              <BubbleContent>{text}</BubbleContent>
            </Bubble>
          ))}
        </BranchContent>
        <div className="flex justify-end">
          <BranchSelector>
            <BranchPrevious />
            <BranchPage />
            <BranchNext />
          </BranchSelector>
        </div>
      </Branch>
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

export function BranchMessageDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Branch defaultBranch={0}>
            <BranchContent>
              {replyBranches.map((text) => (
                <Bubble key={text} variant="muted">
                  <BubbleContent>{text}</BubbleContent>
                </Bubble>
              ))}
            </BranchContent>
            <BranchSelector>
              <BranchPrevious />
              <BranchPage />
              <BranchNext />
            </BranchSelector>
          </Branch>
        </MessageContent>
      </Message>
    </div>
  )
}

export function BranchPageLabelDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Branch defaultBranch={0}>
        <BranchContent>
          {replyBranches.map((text) => (
            <Bubble key={text} variant="muted">
              <BubbleContent>{text}</BubbleContent>
            </Bubble>
          ))}
        </BranchContent>
        <BranchSelector>
          <BranchPrevious />
          <CustomBranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}

export function BranchRtlDemo() {
  return (
    <div dir="rtl" lang="fa" className="mx-auto w-full max-w-md">
      <Branch defaultBranch={0}>
        <BranchContent>
          {persianReplyBranches.map((text) => (
            <Bubble key={text} variant="muted">
              <BubbleContent>{text}</BubbleContent>
            </Bubble>
          ))}
        </BranchContent>
        <BranchSelector aria-label="نسخه‌ها">
          <BranchPrevious aria-label="نسخه قبلی" />
          <BranchPage />
          <BranchNext aria-label="نسخه بعدی" />
        </BranchSelector>
      </Branch>
    </div>
  )
}

function CustomBranchPage() {
  const { currentBranch, totalBranches } = useBranch()

  return (
    <BranchPage className="min-w-[4.75rem]">
      v{currentBranch + 1}/{totalBranches}
    </BranchPage>
  )
}
