"use client"

import Link from "next/link"
import { SearchXIcon } from "lucide-react"

import { defaultBlocksHref } from "@/app/blocks/blocks-data"
import { Button } from "@/components/cubix/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/cubix/empty"
import type { BlockListItem } from "@/components/blocks/block-list"
import { chatInterfaceBlocks } from "@/components/blocks/templates/chat/chat-agent"
import { loginBlocks } from "@/components/blocks/templates/login-blocks"
import { notFoundBlocks } from "@/components/blocks/templates/not-found-blocks"
import { signupBlocks } from "@/components/blocks/templates/signup-blocks"

const blockCatalog: readonly BlockListItem[] = [
  ...notFoundBlocks,
  ...loginBlocks,
  ...signupBlocks,
  ...chatInterfaceBlocks,
]

export function BlockFullView({ id }: { id: string }) {
  const block = blockCatalog.find((item) => item.id === id)

  if (!block) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background px-6">
        <Empty className="max-w-md">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchXIcon />
            </EmptyMedia>
            <EmptyTitle>Block not found</EmptyTitle>
            <EmptyDescription>
              There is no block with the id &quot;{id}&quot;. It may have been
              renamed or removed.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              render={<Link href={defaultBlocksHref} />}
              nativeButton={false}
            >
              Browse blocks
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    )
  }

  return (
    <main className="relative h-dvh w-full overflow-auto bg-background">
      {block.preview}
    </main>
  )
}
