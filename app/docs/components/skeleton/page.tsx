import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  SkeletonCardDemo,
  SkeletonDemo,
  SkeletonTextDemo,
} from "@/components/examples/skeleton-examples"

import { skeletonPropRows } from "./skeleton-table-data"

const description = "Use to show a placeholder while content is loading."

export const metadata: Metadata = {
  title: "Skeleton",
  description,
}

const usageImport = `import { Skeleton } from "@/components/cubix/skeleton"`

const usageSnippet = `<Skeleton className="h-4 w-[100px]" />`

const demoSnippet = `<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`

const cardSnippet = `<div className="flex flex-col space-y-3">
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`

const textSnippet = `<div className="flex w-full max-w-sm flex-col gap-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
  <Skeleton className="h-4 w-4/6" />
</div>`

export default function SkeletonDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Skeleton"
        description={description}
        slug="skeleton"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-32">
        <SkeletonDemo />
      </ComponentPreview>

      <ComponentInstall name="skeleton" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Card</h2>
        <ComponentPreview code={cardSnippet} previewClassName="min-h-40">
          <SkeletonCardDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Text</h2>
        <ComponentPreview code={textSnippet} previewClassName="min-h-32">
          <SkeletonTextDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Skeleton
        </h3>
        <PropsTable data={skeletonPropRows} />
      </section>
    </article>
  )
}
