import type { Metadata } from "next"

import { BlocksComingSoon } from "@/components/blocks/blocks-coming-soon"

export const metadata: Metadata = {
  title: "Bento Grids - Coming soon",
  description:
    "Bento grid blocks are on the Cubix roadmap and are not available yet.",
  robots: { index: false, follow: true },
}

export default function BentoGridsBlocksPage() {
  return (
    <BlocksComingSoon
      title="Bento Grids"
      description="Modular grid layouts for mixed content - stats, cards, and media in one composition."
    />
  )
}
