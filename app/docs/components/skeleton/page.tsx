import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { SkeletonCardDemo } from "./examples/skeleton-card-demo"
import { SkeletonDemo } from "./examples/skeleton-demo"
import { SkeletonTextDemo } from "./examples/skeleton-text-demo"
import { skeletonColorRows, skeletonPropRows } from "./skeleton-table-data"

const description = "Use to show a placeholder while content is loading."

export const metadata: Metadata = {
  title: "Skeleton",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/skeleton"
const EXAMPLES_DIR = "app/docs/components/skeleton/examples"

function loadSkeletonExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function SkeletonDocsPage() {
  const demoSource = loadSkeletonExample("skeleton-demo.tsx")
  const cardSource = loadSkeletonExample("skeleton-card-demo.tsx")
  const textSource = loadSkeletonExample("skeleton-text-demo.tsx")

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Skeleton" description={description} slug="skeleton" />

      <ComponentPreview code={demoSource} previewClassName="min-h-32">
        <PreviewShell>
          <SkeletonDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="skeleton" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={extractDemoImports(demoSource)} title="Import" />
        <CodeBlock code={`<Skeleton className="h-4 w-[100px]" />`} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Card</h3>
          <ComponentPreview code={cardSource} previewClassName="min-h-40">
            <PreviewShell>
              <SkeletonCardDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Text</h3>
          <ComponentPreview code={textSource} previewClassName="min-h-32">
            <PreviewShell>
              <SkeletonTextDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Skeleton</h3>
        <PropsTable data={skeletonPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={skeletonColorRows} />
      </section>
    </article>
  )
}