import type { Metadata } from "next"

import { BlocksComingSoon } from "@/components/blocks/blocks-coming-soon"

export const metadata: Metadata = {
  title: "Application UI - Coming soon",
  description:
    "Application UI blocks are on the Cubix roadmap and are not available yet.",
  robots: { index: false, follow: true },
}

export default function ApplicationUiBlocksPage() {
  return (
    <BlocksComingSoon
      title="Application UI"
      description="Dashboard and product application layouts - available here when app shells and related templates ship without placeholders."
    />
  )
}
