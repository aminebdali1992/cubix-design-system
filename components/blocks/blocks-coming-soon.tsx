import Link from "next/link"

import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import { defaultBlocksHref } from "@/app/blocks/blocks-data"

export function BlocksComingSoon({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader title={title} description={description} />

      <section className="mt-8 space-y-4 rounded-xl border border-dashed bg-card p-6">
        <p className="text-sm font-medium text-foreground">Coming soon</p>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          Cubix does not ship placeholder block source. This category will open
          when each template has a real preview and copy-paste files ready for
          production use.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Browse available blocks today:{" "}
          <Link
            href={defaultBlocksHref}
            className="font-medium text-foreground underline decoration-dotted underline-offset-4"
          >
            404 Sections
          </Link>{" "}
          and{" "}
          <Link
            href="/blocks/ai-agent/chat-interfaces"
            className="font-medium text-foreground underline decoration-dotted underline-offset-4"
          >
            AI Agent chat interfaces
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
