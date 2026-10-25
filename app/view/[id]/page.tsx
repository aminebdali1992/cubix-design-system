import type { Metadata } from "next"

import { BlockFullView } from "@/components/blocks/block-full-view"

export const metadata: Metadata = {
  title: "Block preview",
  robots: { index: false, follow: false },
}

export default async function BlockViewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ primary?: string | string[] }>
}) {
  const { id } = await params
  const { primary } = await searchParams

  return (
    <BlockFullView
      id={id}
      primary={Array.isArray(primary) ? primary[0] : primary}
    />
  )
}
