import type { Metadata } from "next"

import { BlockList } from "@/components/blocks/block-list"
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import { chatInterfaceBlocks } from "@/components/blocks/templates/chat/chat-agent"

export const metadata: Metadata = {
  title: "Chat Interfaces",
  description:
    "AI agent chat interface templates - built with Cubix Conversation, Thinking, Tool Call, and Prompt Input.",
}

export default function ChatInterfacesPage() {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title="Chat Interfaces"
        description="A Cursor-style agent workspace built entirely with Cubix AI components."
        actions={
          <p className="text-sm text-muted-foreground">
            {chatInterfaceBlocks.length} template
            {chatInterfaceBlocks.length === 1 ? "" : "s"}
          </p>
        }
      />

      <BlockList blocks={chatInterfaceBlocks} />
    </div>
  )
}
