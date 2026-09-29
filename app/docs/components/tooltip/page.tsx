import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  TooltipDelayDemo,
  TooltipDemo,
  TooltipDisabledDemo,
  TooltipIconDemo,
  TooltipKeyboardDemo,
  TooltipSidesDemo,
} from "@/components/examples/tooltip-examples"

import {
  contentPropRows,
  providerPropRows,
  tooltipPropRows,
  triggerPropRows,
} from "./tooltip-table-data"

const description =
  "A popup that displays information related to an element when it receives keyboard focus or hover."

export const metadata: Metadata = {
  title: "Tooltip",
  description,
}

const usageImport = `import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/cubix/tooltip"`

const usageSnippet = `<Tooltip>
  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
    نگه دارید
  </TooltipTrigger>
  <TooltipContent>افزودن به کتابخانه</TooltipContent>
</Tooltip>`

const layoutSnippet = `import { TooltipProvider } from "@/components/cubix/tooltip"

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}`

const compositionSnippet = `Tooltip
├── TooltipTrigger
└── TooltipContent`

const sidesSnippet = `<div className="flex flex-wrap gap-2">
  {(["top", "bottom", "inline-start", "inline-end"] as const).map((side) => (
    <Tooltip key={side}>
      <TooltipTrigger render={<Button variant="outline" size="sm" />}>
        {side}
      </TooltipTrigger>
      <TooltipContent side={side}>افزودن به کتابخانه</TooltipContent>
    </Tooltip>
  ))}
</div>`

const iconSnippet = `<Tooltip>
  <TooltipTrigger
    render={<Button variant="outline" size="icon-sm" aria-label="افزودن به کتابخانه" />}
  >
    <Icon />
  </TooltipTrigger>
  <TooltipContent>افزودن به کتابخانه</TooltipContent>
</Tooltip>`

const keyboardSnippet = `<Tooltip>
  <TooltipTrigger
    render={<Button variant="outline" size="icon-sm" aria-label="ذخیره" />}
  >
    <Icon />
  </TooltipTrigger>
  <TooltipContent>
    ذخیره تغییرات <Kbd>S</Kbd>
  </TooltipContent>
</Tooltip>`

const disabledSnippet = `<Tooltip>
  <TooltipTrigger render={<span className="inline-block w-fit" />}>
    <Button variant="outline" size="sm" disabled>
      غیرفعال
    </Button>
  </TooltipTrigger>
  <TooltipContent>این قابلیت فعلاً در دسترس نیست</TooltipContent>
</Tooltip>`

const delaySnippet = `<TooltipProvider delay={700}>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" size="sm" />}>
      باز شدن با تأخیر
    </TooltipTrigger>
    <TooltipContent>بعد از ۷۰۰ میلی‌ثانیه باز می‌شود</TooltipContent>
  </Tooltip>
</TooltipProvider>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex min-h-32 w-full items-center justify-center"
    >
      {children}
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

function ExampleSection({
  title,
  description,
  code,
  children,
}: {
  title: string
  description?: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {description ? (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

export default function TooltipDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Tooltip"
        description={description}
        slug="tooltip"
      />

      <ComponentPreview code={usageSnippet}>
        <PreviewShell>
          <TooltipDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="tooltip" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Add the Provider
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Place <Code>TooltipProvider</Code> near the root of your app so
          tooltips share one open delay. It is optional: without it every
          tooltip opens immediately.
        </p>
        <CodeBlock code={layoutSnippet} title="app/layout.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The tooltip opens on hover and on keyboard focus, and closes on
          Escape. It starts right-to-left and follows the closest{" "}
          <Code>dir</Code> on the page; pass <Code>dir</Code> to{" "}
          <Code>Tooltip</Code> to override it.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Side"
          description={
            <>
              Use <Code>side</Code> to choose where the tooltip appears. Prefer
              the logical values <Code>inline-start</Code> and{" "}
              <Code>inline-end</Code>: in RTL, <Code>inline-start</Code> is the
              right side of the trigger.
            </>
          }
          code={sidesSnippet}
        >
          <TooltipSidesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icon button"
          description={
            <>
              Give an icon-only trigger an <Code>aria-label</Code> so the
              tooltip text is also available to screen readers.
            </>
          }
          code={iconSnippet}
        >
          <TooltipIconDemo />
        </ExampleSection>

        <ExampleSection
          title="With Keyboard Shortcut"
          code={keyboardSnippet}
        >
          <TooltipKeyboardDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled Button"
          description={
            <>
              A disabled button can&apos;t be hovered or focused, so wrap it in
              a <Code>span</Code> trigger.
            </>
          }
          code={disabledSnippet}
        >
          <TooltipDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Delay"
          description={
            <>
              Wrap tooltips in <Code>TooltipProvider</Code> to set a shared open
              delay, or pass <Code>delay</Code> to a single <Code>Tooltip</Code>.
            </>
          }
          code={delaySnippet}
        >
          <TooltipDelayDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            TooltipProvider
          </h3>
          <PropsTable data={providerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Tooltip</h3>
          <PropsTable data={tooltipPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            TooltipTrigger
          </h3>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            TooltipContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>
      </section>
    </article>
  )
}