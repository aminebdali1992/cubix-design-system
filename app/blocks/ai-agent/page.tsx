import { redirect } from "next/navigation"

import { aiAgentCategories } from "@/app/blocks/blocks-data"

export default function AiAgentBlocksPage() {
  const first = aiAgentCategories[0]
  redirect(first?.href ?? "/blocks")
}
