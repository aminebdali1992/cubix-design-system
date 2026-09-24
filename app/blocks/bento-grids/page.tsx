import type { Metadata } from "next"

import { BlockList } from "@/components/blocks/block-list"
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import { bentoGridBlocks } from "@/app/blocks/blocks-data"

export const metadata: Metadata = {
  title: "Bento Grids",
  description:
    "Modular grid layouts for mixed content - stats, cards, and media in one composition.",
}

export default function BentoGridsBlocksPage() {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title="Bento Grids"
        description="Modular grid layouts for mixed content - stats, cards, and media in one composition."
        actions={
          <p className="text-sm text-muted-foreground">
            Template previews - source landing soon.
          </p>
        }
      />

      <BlockList blocks={bentoGridBlocks} />
    </div>
  )
}
