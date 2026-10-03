import type { Metadata } from "next"

import { BlocksComingSoon } from "@/components/blocks/blocks-coming-soon"

export const metadata: Metadata = {
  title: "E-commerce - Coming soon",
  description:
    "E-commerce blocks are on the Cubix roadmap and are not available yet.",
  robots: { index: false, follow: true },
}

export default function EcommerceBlocksPage() {
  return (
    <BlocksComingSoon
      title="E-commerce"
      description="Storefront and product surfaces for shopping flows - built with Cubix when they meet the production bar."
    />
  )
}
