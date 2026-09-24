import type { BlockSourceFile } from "@/components/blocks/block-code-panel"
import {
  cubixButtonFile,
  cubixUtilsFile,
} from "@/components/blocks/templates/block-source-deps"

const conversationStub: BlockSourceFile = {
  path: "components/cubix/conversation.tsx",
  content: `export {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/cubix/base/conversation"
`,
}

const promptInputStub: BlockSourceFile = {
  path: "components/cubix/prompt-input.tsx",
  content: `export * from "@/components/cubix/base/prompt-input"
`,
}

const thinkingStub: BlockSourceFile = {
  path: "components/cubix/thinking.tsx",
  content: `export {
  Thinking,
  ThinkingContent,
  ThinkingTrigger,
} from "@/components/cubix/base/thinking"
`,
}

const toolCallStub: BlockSourceFile = {
  path: "components/cubix/tool-call.tsx",
  content: `export {
  ToolCall,
  ToolCallContent,
  ToolCallHeader,
  ToolCallInput,
  ToolCallOutput,
} from "@/components/cubix/base/tool-call"
`,
}

const codeBlockStub: BlockSourceFile = {
  path: "components/cubix/code-block.tsx",
  content: `export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/cubix/base/code-block"
`,
}

const messageStub: BlockSourceFile = {
  path: "components/cubix/message.tsx",
  content: `export * from "@/components/cubix/base/message"
`,
}

const bubbleStub: BlockSourceFile = {
  path: "components/cubix/bubble.tsx",
  content: `export * from "@/components/cubix/base/bubble"
`,
}

const badgeStub: BlockSourceFile = {
  path: "components/cubix/badge.tsx",
  content: `export * from "@/components/cubix/base/badge"
`,
}

const sidebarStub: BlockSourceFile = {
  path: "components/cubix/scroll-area.tsx",
  content: `export * from "@/components/cubix/base/scroll-area"
`,
}

const avatarStub: BlockSourceFile = {
  path: "components/cubix/avatar.tsx",
  content: `export * from "@/components/cubix/base/avatar"
`,
}

const inputGroupStub: BlockSourceFile = {
  path: "components/cubix/input-group.tsx",
  content: `export * from "@/components/cubix/base/input-group"
`,
}

const emptyStub: BlockSourceFile = {
  path: "components/cubix/empty.tsx",
  content: `export * from "@/components/cubix/base/empty"
`,
}

export function buildChatInterfaceFiles(
  pageContent: string,
  options?: { includeSidebar?: boolean }
): BlockSourceFile[] {
  const files: BlockSourceFile[] = [
    {
      path: "app/chat/page.tsx",
      content: pageContent,
    },
    cubixButtonFile,
    badgeStub,
    messageStub,
    bubbleStub,
    conversationStub,
    promptInputStub,
    thinkingStub,
    toolCallStub,
    codeBlockStub,
  ]

  if (options?.includeSidebar) {
    files.push(sidebarStub, avatarStub, inputGroupStub, emptyStub)
  }

  files.push(cubixUtilsFile)
  return files
}
