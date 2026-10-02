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
import { cardPropRows, subcomponentRows } from "./card-table-data"
import { CardActionDemo } from "./examples/card-action-demo"
import { CardDemo } from "./examples/card-demo"
import { CardFormDemo } from "./examples/card-form-demo"
import { CardIconDemo } from "./examples/card-icon-demo"
import { CardImageDemo } from "./examples/card-image-demo"
import { CardLoginDemo } from "./examples/card-login-demo"
import { CardSizeDemo } from "./examples/card-size-demo"
import { CardSpacingDemo } from "./examples/card-spacing-demo"

const description = "A flexible container with header, content, and footer."

export const metadata: Metadata = {
  title: "Card",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/card"
const EXAMPLES_DIR = "app/docs/components/card/examples"

function loadCardExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter`

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

export default function CardPage() {
  const demoSource = loadCardExample("card-demo.tsx")
  const formSource = loadCardExample("card-form-demo.tsx")
  const loginSource = loadCardExample("card-login-demo.tsx")
  const actionSource = loadCardExample("card-action-demo.tsx")
  const iconSource = loadCardExample("card-icon-demo.tsx")
  const sizeSource = loadCardExample("card-size-demo.tsx")
  const imageSource = loadCardExample("card-image-demo.tsx")
  const spacingSource = loadCardExample("card-spacing-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Card" description={description} slug="card" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <CardDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="card" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Build a card from these parts. <Code>CardAction</Code> is optional and sits at the
          inline-end of the header, so it moves to the left automatically in RTL layouts.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Card is a plain layout container with no implicit role. When a card represents a
          standalone region, render it as a <Code>section</Code> or pass{" "}
          <Code>role=&quot;region&quot;</Code> with <Code>aria-labelledby</Code> pointing at the
          title. Wrap form cards in a <Code>form</Code> element so Enter submits and the fields are
          grouped for assistive tech.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With form"
          description="Cards pair with Cubix fields and buttons for short forms."
          code={formSource}
        >
          <CardFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Login"
          description={
            <>
              A sign-in card with email and password fields. The header link uses{" "}
              <Code>CardAction</Code>.
            </>
          }
          code={loginSource}
        >
          <CardLoginDemo />
        </ExampleSection>

        <ExampleSection
          title="With action"
          description={
            <>
              Use <Code>CardAction</Code> for a control at the inline-end of the header.
            </>
          }
          code={actionSource}
        >
          <CardActionDemo />
        </ExampleSection>

        <ExampleSection
          title="With icon"
          description="Compose the header with any element - an icon bubble draws attention to the title."
          code={iconSource}
        >
          <CardIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Size"
          description={
            <>
              Set <Code>size=&quot;sm&quot;</Code> for tighter spacing and a smaller title.
            </>
          }
          code={sizeSource}
        >
          <CardSizeDemo />
        </ExampleSection>

        <ExampleSection
          title="Image"
          description="Place an image or media block as the first child. The card rounds the top edge, and pt-0 drops the top padding."
          code={imageSource}
        >
          <CardImageDemo />
        </ExampleSection>

        <ExampleSection
          title="Spacing"
          description={
            <>
              Override <Code>--card-spacing</Code> on the root for a larger inset. Use{" "}
              <Code>gap-0</Code> when the header uses a border so dividers sit flush.
            </>
          }
          code={spacingSource}
        >
          <CardSpacingDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>card</Code>, <Code>card-header</Code>, <Code>card-title</Code>,{" "}
            <Code>card-description</Code>, <Code>card-action</Code>, <Code>card-content</Code>,{" "}
            <Code>card-footer</Code>) for targeting in tests and parent selectors. Use the same
            props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Card</h3>
        <PropsTable data={cardPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardHeader</h3>
        <p className="leading-relaxed text-muted-foreground">
          Title, description, and optional action. With <Code>CardAction</Code> it becomes a
          two-column grid.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardTitle</h3>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardDescription</h3>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardAction</h3>
        <p className="leading-relaxed text-muted-foreground">
          Action slot at the inline-end of the header (button, badge, menu).
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardContent</h3>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardFooter</h3>
        <p className="leading-relaxed text-muted-foreground">
          Footer for primary and secondary actions.
        </p>
        <PropsTable data={subcomponentRows} />
      </section>
    </article>
  )
}
