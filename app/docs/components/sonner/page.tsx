import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  SonnerDemo,
  SonnerDescriptionDemo,
  SonnerPositionDemo,
  SonnerTypesDemo,
} from "@/components/examples/sonner-examples"

import { toasterPropRows } from "./sonner-table-data"

const description = "An opinionated toast component."

export const metadata: Metadata = {
  title: "Sonner",
  description,
}

const usageImport = `import { toast } from "sonner"`

const usageSnippet = `toast("Event has been created.")`

const demoSnippet = `"use client"

import { toast } from "sonner"

import { Button } from "@/components/cubix/button"

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}`

const layoutSnippet = `import { Toaster } from "@/components/cubix/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}`

const typesSnippet = `<div className="flex flex-wrap gap-2">
  <Button variant="outline" onClick={() => toast("Event has been created")}>
    Default
  </Button>
  <Button
    variant="outline"
    onClick={() => toast.success("Event has been created")}
  >
    Success
  </Button>
  <Button
    variant="outline"
    onClick={() =>
      toast.info("Be at the area 10 minutes before the event time")
    }
  >
    Info
  </Button>
  <Button
    variant="outline"
    onClick={() =>
      toast.warning("Event start time cannot be earlier than 8am")
    }
  >
    Warning
  </Button>
  <Button
    variant="outline"
    onClick={() => toast.error("Event has not been created")}
  >
    Error
  </Button>
  <Button
    variant="outline"
    onClick={() => {
      toast.promise<{ name: string }>(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ name: "Event" }), 2000)
          ),
        {
          loading: "Loading...",
          success: (data) => \`\${data.name} has been created\`,
          error: "Error",
        }
      )
    }}
  >
    Promise
  </Button>
</div>`

const descriptionSnippet = `<Button
  variant="outline"
  onClick={() =>
    toast("Event has been created", {
      description: "Monday, January 3rd at 6:00pm",
    })
  }
>
  Show Toast
</Button>`

const positionSnippet = `<Button
  variant="outline"
  onClick={() =>
    toast("Event has been created", { position: "top-left" })
  }
>
  Top Left
</Button>`

export default function SonnerDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Sonner"
        description={description}
        slug="sonner"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-32">
        <SonnerDemo />
      </ComponentPreview>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">About</h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix Sonner wraps the{" "}
          <a
            href="https://sonner.emilkowal.ski"
            className="font-medium text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Sonner
          </a>{" "}
          toast library by Emil Kowalski, themed with Cubix tokens.
        </p>
      </section>

      <ComponentInstall name="sonner" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Add the Toaster
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Place{" "}
          <code className="font-mono text-sm">Toaster</code> in your root
          layout so toasts can render from anywhere.
        </p>
        <CodeBlock code={layoutSnippet} title="app/layout.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Types</h2>
        <ComponentPreview code={typesSnippet} previewClassName="min-h-32">
          <SonnerTypesDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Description
        </h2>
        <ComponentPreview
          code={descriptionSnippet}
          previewClassName="min-h-32"
        >
          <SonnerDescriptionDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Position</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="font-mono text-sm">position</code> prop to change
          where the toast appears.
        </p>
        <ComponentPreview code={positionSnippet} previewClassName="min-h-32">
          <SonnerPositionDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the{" "}
          <a
            href="https://sonner.emilkowal.ski/getting-started"
            className="font-medium text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Sonner API Reference
          </a>{" "}
          for toast helpers and options.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Toaster</h3>
          <PropsTable data={toasterPropRows} />
        </div>
      </section>
    </article>
  )
}
