import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  SpinnerBadgeDemo,
  SpinnerButtonDemo,
  SpinnerCustomDemo,
  SpinnerDemo,
  SpinnerEmptyDemo,
  SpinnerInputGroupDemo,
  SpinnerRtlDemo,
  SpinnerSizeDemo,
} from "@/components/examples/spinner-examples"

import { spinnerPropRows } from "./spinner-table-data"

const description = "An indicator that can be used to show a loading state."

export const metadata: Metadata = {
  title: "Spinner",
  description,
}

const usageImport = `import { Spinner } from "@/components/cubix/spinner"`

const usageSnippet = `<Spinner />`

const demoSnippet = `<div className="flex w-full max-w-xs items-center gap-3 rounded-xl bg-muted p-3">
  <Spinner />
  <span className="min-w-0 flex-1 truncate text-sm font-medium">
    Processing payment...
  </span>
  <span className="text-sm tabular-nums text-muted-foreground">$100.00</span>
</div>`

const customSnippet = `import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}`

const sizeSnippet = `<div className="flex items-center gap-6">
  <Spinner className="size-3" />
  <Spinner className="size-4" />
  <Spinner className="size-6" />
  <Spinner className="size-8" />
</div>`

const buttonSnippet = `<Button disabled size="sm">
  <Spinner data-icon="inline-start" />
  Loading...
</Button>`

const badgeSnippet = `<Badge>
  <Spinner data-icon="inline-start" />
  Syncing
</Badge>`

const inputGroupSnippet = `<InputGroup>
  <InputGroupInput placeholder="Send a message..." disabled />
  <InputGroupAddon align="inline-end">
    <Spinner />
  </InputGroupAddon>
</InputGroup>`

const emptySnippet = `<Empty className="w-full">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Spinner />
    </EmptyMedia>
    <EmptyTitle>Processing your request</EmptyTitle>
    <EmptyDescription>
      Please wait while we process your request. Do not refresh the page.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">
      Cancel
    </Button>
  </EmptyContent>
</Empty>`

const rtlSnippet = `<div dir="rtl" className="flex w-full max-w-xs items-center gap-3 rounded-xl bg-muted p-3">
  <Spinner />
  <span className="min-w-0 flex-1 truncate text-sm font-medium">
    Processing payment...
  </span>
  <span className="text-sm tabular-nums text-muted-foreground">$100.00</span>
</div>`

export default function SpinnerDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Spinner"
        description={description}
        slug="spinner"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-32">
        <SpinnerDemo />
      </ComponentPreview>

      <ComponentInstall name="spinner" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Customization
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          You can replace the default spinner icon with any other icon by
          editing the{" "}
          <code className="font-mono text-sm">Spinner</code> component.
        </p>
        <ComponentPreview code={customSnippet} previewClassName="min-h-32">
          <SpinnerCustomDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Size</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="font-mono text-sm">size-*</code> utility class to
          change the size of the spinner.
        </p>
        <ComponentPreview code={sizeSnippet} previewClassName="min-h-32">
          <SpinnerSizeDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Button</h2>
        <p className="leading-relaxed text-muted-foreground">
          Add a spinner to a button to indicate a loading state. Place the{" "}
          <code className="font-mono text-sm">{"<Spinner />"}</code> before the
          label with{" "}
          <code className="font-mono text-sm">data-icon=&quot;inline-start&quot;</code>{" "}
          for a start position, or after the label with{" "}
          <code className="font-mono text-sm">data-icon=&quot;inline-end&quot;</code>{" "}
          for an end position.
        </p>
        <ComponentPreview code={buttonSnippet} previewClassName="min-h-40">
          <SpinnerButtonDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Badge</h2>
        <p className="leading-relaxed text-muted-foreground">
          Add a spinner to a badge to indicate a loading state.
        </p>
        <ComponentPreview code={badgeSnippet} previewClassName="min-h-32">
          <SpinnerBadgeDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Input Group
        </h2>
        <ComponentPreview code={inputGroupSnippet} previewClassName="min-h-40">
          <SpinnerInputGroupDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Empty</h2>
        <ComponentPreview code={emptySnippet} previewClassName="min-h-56">
          <SpinnerEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap content in a container with{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> to
          mirror direction.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="min-h-32">
          <SpinnerRtlDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Spinner</h3>
          <PropsTable data={spinnerPropRows} />
        </div>
      </section>
    </article>
  )
}
