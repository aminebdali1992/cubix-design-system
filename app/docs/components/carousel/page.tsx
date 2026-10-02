import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { KeyboardTable } from "@/components/docs/keyboard-table"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import {
  carouselKeyboardRows,
  carouselPropRows,
  itemPropRows,
  navPropRows,
} from "./carousel-table-data"
import { CarouselApiDemo } from "./examples/carousel-api-demo"
import { CarouselDemo } from "./examples/carousel-demo"
import { CarouselOrientationDemo } from "./examples/carousel-orientation-demo"
import { CarouselSizesDemo } from "./examples/carousel-sizes-demo"
import { CarouselSpacingDemo } from "./examples/carousel-spacing-demo"

const description = "A carousel with motion and swipe built on Embla."

export const metadata: Metadata = {
  title: "Carousel",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/carousel"
const EXAMPLES_DIR = "app/docs/components/carousel/examples"

function loadCarouselExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Carousel
├── CarouselContent
│   ├── CarouselItem
│   └── CarouselItem
├── CarouselPrevious
└── CarouselNext`

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

export default function CarouselPage() {
  const demoSource = loadCarouselExample("carousel-demo.tsx")
  const sizesSource = loadCarouselExample("carousel-sizes-demo.tsx")
  const spacingSource = loadCarouselExample("carousel-spacing-demo.tsx")
  const orientationSource = loadCarouselExample("carousel-orientation-demo.tsx")
  const apiSource = loadCarouselExample("carousel-api-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Carousel" description={description} slug="carousel" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <CarouselDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="carousel" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Leave room for the previous and next buttons with horizontal padding on the wrapper. The
          carousel reads <Code>dir</Code> from the closest ancestor and defaults to rtl.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The root is a focusable region with <Code>aria-roledescription=&quot;carousel&quot;</Code>
          . Each item is a group with <Code>aria-roledescription=&quot;slide&quot;</Code>. Nav
          buttons expose Persian screen-reader labels and disable at the ends unless looping.
        </p>
        <KeyboardTable data={carouselKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Set slide width with basis utilities such as <Code>md:basis-1/2</Code> and{" "}
              <Code>lg:basis-1/3</Code>.
            </>
          }
          code={sizesSource}
        >
          <CarouselSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Spacing"
          description={
            <>
              Override the default gap by changing the negative margin on{" "}
              <Code>CarouselContent</Code> and the matching padding on <Code>CarouselItem</Code>.
            </>
          }
          code={spacingSource}
        >
          <CarouselSpacingDemo />
        </ExampleSection>

        <ExampleSection
          title="Orientation"
          description={
            <>
              Set <Code>orientation=&quot;vertical&quot;</Code> and give the content a fixed height
              so slides stack and scroll on the y axis.
            </>
          }
          code={orientationSource}
        >
          <CarouselOrientationDemo />
        </ExampleSection>

        <ExampleSection
          title="API"
          description={
            <>
              Pass <Code>setApi</Code> to read the Embla instance and show the current slide index.
            </>
          }
          code={apiSource}
        >
          <CarouselApiDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>carousel</Code>, <Code>carousel-content</Code>,{" "}
            <Code>carousel-item</Code>, <Code>carousel-previous</Code>, <Code>carousel-next</Code>)
            for targeting in tests and parent selectors. Use the same props on Base UI, React Aria,
            and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Carousel</h3>
        <PropsTable data={carouselPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CarouselItem</h3>
        <PropsTable data={itemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CarouselPrevious / CarouselNext
        </h3>
        <PropsTable data={navPropRows} />
      </section>
    </article>
  )
}
