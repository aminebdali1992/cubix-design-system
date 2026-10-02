import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { aspectRatioPropRows } from "./aspect-ratio-table-data"
import { AspectRatioDemo } from "./examples/aspect-ratio-demo"
import { AspectRatioImageDemo } from "./examples/aspect-ratio-image-demo"
import { AspectRatioPortraitDemo } from "./examples/aspect-ratio-portrait-demo"
import { AspectRatioSquareDemo } from "./examples/aspect-ratio-square-demo"

const description = "Displays content within a desired ratio."

export const metadata: Metadata = {
  title: "Aspect Ratio",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/aspect-ratio"
const EXAMPLES_DIR = "app/docs/components/aspect-ratio/examples"

function loadAspectRatioExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `AspectRatio (ratio)
└── children (absolute inset-0)`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function AspectRatioPage() {
  const demoSource = loadAspectRatioExample("aspect-ratio-demo.tsx")
  const squareSource = loadAspectRatioExample("aspect-ratio-square-demo.tsx")
  const portraitSource = loadAspectRatioExample("aspect-ratio-portrait-demo.tsx")
  const imageSource = loadAspectRatioExample("aspect-ratio-image-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Aspect Ratio" description={description} slug="aspect-ratio" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <AspectRatioDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="aspect-ratio" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Pass a numeric <Code>ratio</Code> (width divided by height). Position the inner shape with{" "}
          <Code>absolute inset-0</Code> so it fills the box. Overflow is clipped.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Aspect Ratio is a layout container, not an interactive control. Give meaningful images an{" "}
          <Code>alt</Code>, and mark decorative fills with <Code>aria-hidden</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Square"
          description={
            <>
              Use <Code>ratio=&#123;1&#125;</Code> for a square frame. This is useful for avatars
              and thumbnails.
            </>
          }
          code={squareSource}
        >
          <AspectRatioSquareDemo />
        </ExampleSection>

        <ExampleSection
          title="Portrait"
          description={
            <>
              Use <Code>ratio=&#123;9 / 16&#125;</Code> for a portrait frame. This is useful for
              stories and mobile previews.
            </>
          }
          code={portraitSource}
        >
          <AspectRatioPortraitDemo />
        </ExampleSection>

        <ExampleSection
          title="With media"
          description="Layer a decorative fill and a caption so media stays inside the ratio box."
          code={imageSource}
        >
          <AspectRatioImageDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The root renders a{" "}
            <Code>data-slot=&quot;aspect-ratio&quot;</Code> attribute for targeting in tests and
            parent selectors. Position the inner shape with <Code>absolute inset-0</Code> so it
            fills the ratio box. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">AspectRatio</h3>
        <PropsTable data={aspectRatioPropRows} />
      </section>
    </article>
  )
}
