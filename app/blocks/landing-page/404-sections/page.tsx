import type { Metadata } from "next"

import { BlockList } from "@/components/blocks/block-list"
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import {
  NotFound01,
  notFound01Files,
} from "@/components/blocks/templates/not-found-01"
import {
  NotFound02,
  notFound02Files,
} from "@/components/blocks/templates/not-found-02"
import {
  NotFound03,
  notFound03Files,
} from "@/components/blocks/templates/not-found-03"
import {
  NotFound04,
  notFound04Files,
} from "@/components/blocks/templates/not-found-04"
import {
  NotFound05,
  notFound05Files,
} from "@/components/blocks/templates/not-found-05"
import {
  NotFound06,
  notFound06Files,
} from "@/components/blocks/templates/not-found-06"

export const metadata: Metadata = {
  title: "404 Sections",
  description: "Not found page templates for landing pages - built with Cubix.",
}

const notFoundBlocks = [
  {
    id: "404-01",
    title: "Monumental centered 404",
    description:
      "Soft grid atmosphere, oversized watermark numeral, and a single clear path home.",
    files: notFound01Files,
    preview: <NotFound01 />,
  },
  {
    id: "404-02",
    title: "Editorial split with destinations",
    description:
      "Indexed link list, media panel, and a quiet header for product sites.",
    files: notFound02Files,
    preview: <NotFound02 />,
  },
  {
    id: "404-03",
    title: "Search-led recovery 404",
    description:
      "Horizon band atmosphere with an inline search field and quick text destinations.",
    files: notFound03Files,
    preview: <NotFound03 />,
  },
  {
    id: "404-04",
    title: "Route rail with media panel",
    description:
      "Vertical status rail, placeholder media panel, and paired home or docs actions.",
    files: notFound04Files,
    preview: <NotFound04 />,
  },
  {
    id: "404-05",
    title: "Frosted panel over media",
    description:
      "Full-bleed placeholder backdrop with a centered glass panel and dual actions.",
    files: notFound05Files,
    preview: <NotFound05 />,
  },
  {
    id: "404-06",
    title: "Product shell with status meta",
    description:
      "Site header, soft side wash, inline numeral, and a compact status footer row.",
    files: notFound06Files,
    preview: <NotFound06 />,
  },
]

export default function NotFoundSectionsPage() {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title="404 Sections"
        description="Not found page templates for marketing and product sites. Drop one into app/not-found.tsx and adjust the copy."
        actions={
          <p className="text-sm text-muted-foreground">
            {notFoundBlocks.length} templates
          </p>
        }
      />

      <BlockList blocks={notFoundBlocks} />
    </div>
  )
}
