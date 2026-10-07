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
import { DrawerDemo } from "./examples/drawer-demo"
import { DrawerCustomSizesDemo } from "./examples/drawer-custom-sizes-demo"
import { DrawerPositionDemo } from "./examples/drawer-position-demo"
import { DrawerSwipeHandleDemo } from "./examples/drawer-swipe-handle-demo"
import { DrawerNestedDemo } from "./examples/drawer-nested-demo"
import { DrawerNonModalDemo } from "./examples/drawer-non-modal-demo"
import { DrawerSnapPointsDemo } from "./examples/drawer-snap-points-demo"
import {
  contentPropRows,
  drawerPropRows,
  headerFooterPropRows,
  titleDescriptionPropRows,
  triggerClosePropRows,
} from "./drawer-table-data"

const description =
  "A panel that slides in from an edge of the screen — typically the bottom — with dim overlay chrome."

export const metadata: Metadata = {
  title: "Drawer",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/drawer"
const EXAMPLES_DIR = "app/docs/components/drawer/examples"

function loadDrawerExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Drawer
├── DrawerTrigger
└── DrawerContent
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── DrawerDescription
    └── DrawerFooter`

const bodyRelativeSnippet = `body {
  position: relative;
}`

/*
  Persian trigger buttons need lang="fa" so .group/button:lang(fa)
  picks the IRANSans Cubix Button face. Docs chrome only.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex items-center justify-center">
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
      <ComponentPreview code={code} previewClassName="min-h-40">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function DrawerPage() {
  const drawerDemoSource = loadDrawerExample("drawer-demo.tsx")
  const drawerCustomSizesSource = loadDrawerExample("drawer-custom-sizes-demo.tsx")
  const drawerPositionSource = loadDrawerExample("drawer-position-demo.tsx")
  const drawerSwipeHandleSource = loadDrawerExample("drawer-swipe-handle-demo.tsx")
  const drawerNestedSource = loadDrawerExample("drawer-nested-demo.tsx")
  const drawerNonModalSource = loadDrawerExample("drawer-non-modal-demo.tsx")
  const drawerSnapPointsSource = loadDrawerExample("drawer-snap-points-demo.tsx")
  const usageImport = extractDemoImports(drawerDemoSource)
  const usageSnippet = extractDemoJsx(drawerDemoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Drawer" description={description} slug="drawer" />

      <ComponentPreview code={drawerDemoSource} previewClassName="min-h-40">
        <PreviewShell>
          <DrawerDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="drawer" />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Add the following to your global styles. On iOS Safari, the drawer overlay is
          absolutely positioned and requires a positioned <Code>body</Code> to cover the
          viewport after the page is scrolled.
        </p>
        <CodeBlock code={bodyRelativeSnippet} title="globals.css" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a Drawer:
        </p>
        <CodeBlock code={compositionSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          <Code>DrawerContent</Code> composes the portal, overlay, viewport, and popup. For
          lower-level control, <Code>DrawerPortal</Code>, <Code>DrawerOverlay</Code>, and{" "}
          <Code>DrawerSwipeHandle</Code> are also exported from the Base variant.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Custom Sizes"
          description={
            <>
              A vertical drawer sizes itself to its content and is capped at{" "}
              <Code>calc(100dvh - 6rem)</Code> by default. Override height with{" "}
              <Code>h-*</Code> / <Code>max-h-*</Code> or width with <Code>w-*</Code> /{" "}
              <Code>max-w-*</Code> on <Code>DrawerContent</Code>.
            </>
          }
          code={drawerCustomSizesSource}
        >
          <DrawerCustomSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Position"
          description={
            <>
              Use the <Code>swipeDirection</Code> prop to set the side of the drawer.
              Options are <Code>up</Code>, <Code>right</Code>, <Code>down</Code>, and{" "}
              <Code>left</Code>. Default is <Code>down</Code>.
            </>
          }
          code={drawerPositionSource}
        >
          <DrawerPositionDemo />
        </ExampleSection>

        <ExampleSection
          title="Swipe Handle"
          description={
            <>
              Use <Code>showSwipeHandle</Code> on <Code>Drawer</Code> to render a swipe
              handle (Base UI).
            </>
          }
          code={drawerSwipeHandleSource}
        >
          <DrawerSwipeHandleDemo />
        </ExampleSection>

        <ExampleSection
          title="Nested"
          description={
            <>
              Open drawers from inside another drawer. Parent drawers stay mounted and stack
              behind the frontmost drawer.
            </>
          }
          code={drawerNestedSource}
        >
          <DrawerNestedDemo />
        </ExampleSection>

        <ExampleSection
          title="Non Modal"
          description={
            <>
              Set <Code>modal={"{false}"}</Code> to allow interaction with the rest of the
              page. Combine with <Code>disablePointerDismissal</Code> to prevent closing on
              outside presses.
            </>
          }
          code={drawerNonModalSource}
        >
          <DrawerNonModalDemo />
        </ExampleSection>

        <ExampleSection
          title="Snap Points"
          description={
            <>
              Use <Code>snapPoints</Code> to snap a vertical drawer to preset heights.
              Numbers between <Code>0</Code> and <Code>1</Code> are viewport fractions;
              values greater than <Code>1</Code> are pixels. Strings support{" "}
              <Code>px</Code> and <Code>rem</Code>.
            </>
          }
          code={drawerSnapPointsSource}
        >
          <DrawerSnapPointsDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Base UI supports swipe,
            snap points, nested drawers, and <Code>showSwipeHandle</Code>. Radix (vaul)
            supports swipe/snap with a <Code>direction</Code> / <Code>swipeDirection</Code>{" "}
            alias. React Aria is a solid modal drawer with matching chrome (no swipe/snap).
            Overlay uses <Code>bg-overlay-strong</Code> (dim, not blur).
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Drawer</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open state.
        </p>
        <PropsTable data={drawerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DrawerTrigger / DrawerClose</h3>
        <p className="leading-relaxed text-muted-foreground">
          The elements that open and close the drawer. Compose both with Cubix{" "}
          <Code>Button</Code> via <Code>render</Code>.
        </p>
        <PropsTable data={triggerClosePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DrawerContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The sliding panel rendered with a backdrop.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DrawerHeader / DrawerFooter</h3>
        <p className="leading-relaxed text-muted-foreground">
          Layout regions of the drawer content. Footer places actions side by side with equal widths.
        </p>
        <PropsTable data={headerFooterPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DrawerTitle / DrawerDescription</h3>
        <p className="leading-relaxed text-muted-foreground">
          The title and supporting text of the drawer.
        </p>
        <PropsTable data={titleDescriptionPropRows} />
      </section>
    </article>
  )
}
