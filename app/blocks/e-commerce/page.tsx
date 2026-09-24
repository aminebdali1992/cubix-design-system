import { redirect } from "next/navigation"

import { defaultBlocksHref } from "@/app/blocks/blocks-data"

export default function EcommerceBlocksPage() {
  redirect(defaultBlocksHref)
}
