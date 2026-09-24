import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import {
  aiAgentCategories,
  getAiAgentCategory,
} from "@/app/blocks/blocks-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return aiAgentCategories
    .filter(
      (category) => category.href !== "/blocks/ai-agent/chat-interfaces"
    )
    .map((category) => ({
      slug: category.href.replace("/blocks/ai-agent/", ""),
    }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getAiAgentCategory(slug)

  if (!category) {
    return { title: "Not found" }
  }

  return {
    title: category.title,
    description: `${category.title} blocks for AI agents - built with Cubix.`,
  }
}

export default async function AiAgentCategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = getAiAgentCategory(slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title={category.title}
        description={`AI agent templates for ${category.title.toLowerCase()}. Previews and source land soon.`}
        actions={
          <p className="text-sm text-muted-foreground">
            Template previews - source landing soon.
          </p>
        }
      />
    </div>
  )
}
