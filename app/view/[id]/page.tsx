import type { Metadata } from "next"

import { BlockFullView } from "@/components/blocks/block-full-view"

export const metadata: Metadata = {
  title: "Block preview",
  robots: { index: false, follow: false },
}

export default async function BlockViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <BlockFullView id={id} />
}
