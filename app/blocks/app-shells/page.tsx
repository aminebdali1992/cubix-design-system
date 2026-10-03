import type { Metadata } from "next"

import { BlocksComingSoon } from "@/components/blocks/blocks-coming-soon"

export const metadata: Metadata = {
  title: "App Shells - Coming soon",
  description:
    "App shell blocks are on the Cubix roadmap and are not available yet.",
  robots: { index: false, follow: true },
}

export default function AppShellsBlocksPage() {
  return (
    <BlocksComingSoon
      title="App Shells"
      description="Persistent application chrome for dashboards and product UI - header, sidebar, and content areas that stay consistent across pages."
    />
  )
}
