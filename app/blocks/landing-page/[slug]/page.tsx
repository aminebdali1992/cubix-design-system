import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import {
  getLandingPageCategory,
  landingPageCategories,
} from "@/app/blocks/blocks-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

const categoriesWithDedicatedPages = new Set([
  "/blocks/landing-page/404-sections",
  "/blocks/landing-page/login",
  "/blocks/landing-page/signup",
])

export function generateStaticParams() {
  return landingPageCategories
    .filter((category) => !categoriesWithDedicatedPages.has(category.href))
    .map((category) => ({
      slug: category.href.replace("/blocks/landing-page/", ""),
    }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getLandingPageCategory(slug)

  if (!category) {
    return { title: "Not found" }
  }

  return {
    title: category.title,
    description: `${category.title} blocks for landing pages - built with Cubix.`,
  }
}

export default async function LandingPageCategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = getLandingPageCategory(slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title={category.title}
        description={`Templates for ${category.title.toLowerCase()}. Previews and source land soon.`}
        actions={
          <p className="text-sm text-muted-foreground">
            Template previews - source landing soon.
          </p>
        }
      />
    </div>
  )
}
