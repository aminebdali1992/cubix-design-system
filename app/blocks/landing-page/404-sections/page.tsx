import type { Metadata } from "next"

import { BlockList } from "@/components/blocks/block-list"
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import { notFoundBlocks } from "@/components/blocks/templates/not-found-blocks"

export const metadata: Metadata = {
  title: "404 Sections",
  description: "Not found page templates for landing pages - built with Cubix.",
}

export default function NotFoundSectionsPage() {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title="404 Sections"
        description="Not found page templates for marketing and product sites. Drop one into app/not-found.tsx and adjust the copy."
        actions={
          <p className="text-sm text-muted-foreground">
            {notFoundBlocks.length} templates
          </p>
        }
      />

      <BlockList blocks={notFoundBlocks} />
    </div>
  )
}
