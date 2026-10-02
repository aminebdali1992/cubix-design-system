import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpIcon,
  AudioLinesIcon,
  ChevronDownIcon,
  LoaderCircleIcon,
  MicIcon,
  PlusIcon,
  SquareIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { TypingCaret } from "./cursor-agent-caret"

type CursorAgentComposerProps = {
  draft: string
  typing: boolean
  sending: boolean
  busy: boolean
  hasMessages: boolean
  reduceMotion: boolean
}

type ComposerAction = "voice" | "send" | "stop"

function ActionIcon({ action }: { action: ComposerAction }) {
  if (action === "stop") {
    return <SquareIcon className="size-2.5 fill-current" strokeWidth={0} />
  }
  if (action === "send") {
    return <ArrowUpIcon className="size-4" strokeWidth={2.5} />
  }
  return <AudioLinesIcon className="size-4" strokeWidth={2.25} />
}

function FooterSelect({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1">
      {label}
      <ChevronDownIcon className="size-3.5" strokeWidth={2} />
    </span>
  )
}

export function CursorAgentComposer({
  draft,
  typing,
  sending,
  busy,
  hasMessages,
  reduceMotion,
}: CursorAgentComposerProps) {
  const hasDraft = draft.length > 0
  const action: ComposerAction = busy ? "stop" : hasDraft ? "send" : "voice"

  return (
    <div className="shrink-0 px-3 pt-2 pb-2.5 md:px-4" aria-hidden>
      <span className="mb-2 inline-flex items-center rounded-full bg-[#2a2a2a] px-2.5 py-1 text-[12px] leading-none text-[#d4d4d4]">
        Terminal
      </span>

      <div
        className={cn(
          "flex items-end gap-2.5 rounded-[20px] border bg-[#242424] p-1.5 transition-colors duration-200",
          typing ? "border-[#3d3d3d]" : "border-[#303030]"
        )}
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#383838] text-[#d4d4d4]">
          <PlusIcon className="size-4" strokeWidth={2} />
        </span>

        <p className="min-w-0 flex-1 py-1 text-[14px] leading-5 break-words">
          {hasDraft ? (
            <span className="text-[#f4f4f5]">{draft}</span>
          ) : typing ? null : (
            <span className="text-[#7a7a7a]">
              {hasMessages ? "Add a follow-up" : "Plan, search, build anything"}
            </span>
          )}
          {typing ? <TypingCaret /> : null}
        </p>

        <div className="flex h-7 shrink-0 items-center gap-2.5">
          <span className="text-[13px] text-[#b4b4b4]">Auto</span>
          <MicIcon className="size-4 text-[#8b8b8b]" strokeWidth={2} />
          <motion.span
            animate={sending && !reduceMotion ? { scale: [1, 0.84, 1] } : { scale: 1 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="relative flex size-7 items-center justify-center overflow-hidden rounded-full bg-[#f4f4f5] text-[#141414]"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={action}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <ActionIcon action={action} />
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between ps-1 pe-1 text-[13px] text-[#a1a1aa]">
        <div className="flex items-center gap-4">
          <FooterSelect label="main" />
          <FooterSelect label="This PC" />
        </div>
        {busy ? (
          <LoaderCircleIcon className="size-3.5 animate-spin text-[#8b8b8b]" strokeWidth={2} />
        ) : null}
      </div>
    </div>
  )
}
