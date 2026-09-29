import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  SwitchControlledDemo,
  SwitchCustomDemo,
  SwitchDemo,
  SwitchDescriptionDemo,
  SwitchInvalidDemo,
  SwitchSizesDemo,
  SwitchStatesDemo,
} from "@/components/examples/switch-examples"
import { propRows, stateRows } from "./switch-table-data"

const description =
  "A control that allows the user to toggle between checked and not checked."

export const metadata: Metadata = {
  title: "Switch",
  description,
}

const usageImport = `import { Switch } from "@/components/cubix/switch"
import { Label } from "@/components/cubix/label"`

const usageSnippet = `<div className="flex items-center gap-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">حالت هواپیما</Label>
</div>`

const compositionSnippet = `Switch
Label (htmlFor → Switch id)`

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

export default function SwitchPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Switch"
        description={description}
        slug="switch"
      />

      <ComponentPreview code={usageSnippet}>
        <PreviewShell>
          <SwitchDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="switch" />

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
          Switch is the control only. Pair it with <Code>Label</Code> using
          matching <Code>id</Code> and <Code>htmlFor</Code>. The thumb moves
          toward the inline end when on, so it follows the page direction.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="States"
          description="On, off, and disabled cover the common conditions."
          code={`<div className="grid gap-3">
  <div className="flex items-center gap-2">
    <Switch id="state-on" defaultChecked />
    <Label htmlFor="state-on">روشن</Label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="state-off" />
    <Label htmlFor="state-off">خاموش</Label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="state-disabled" disabled />
    <Label htmlFor="state-disabled">غیرفعال</Label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="state-disabled-on" disabled defaultChecked />
    <Label htmlFor="state-disabled-on">غیرفعال و روشن</Label>
  </div>
</div>`}
        >
          <SwitchStatesDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Use <Code>size</Code> to pick <Code>sm</Code> or{" "}
              <Code>default</Code>.
            </>
          }
          code={`<div className="grid gap-3">
  <div className="flex items-center gap-2">
    <Switch size="sm" id="size-sm" defaultChecked />
    <Label htmlFor="size-sm">کوچک</Label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="size-default" defaultChecked />
    <Label htmlFor="size-default">پیش‌فرض</Label>
  </div>
</div>`}
        >
          <SwitchSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="With description"
          description="Pair a switch with a title and helper line for settings rows."
          code={`<div className="flex w-full max-w-sm items-start justify-between gap-4 rounded-lg border p-4">
  <Label htmlFor="analytics" className="grid gap-1.5 leading-none">
    <span>اشتراک‌گذاری آمار</span>
    <span className="text-caption text-muted-foreground">
      با ارسال داده‌های ناشناس استفاده، به بهبود Cubix کمک کنید.
    </span>
  </Label>
  <Switch id="analytics" defaultChecked className="mt-0.5" />
</div>`}
        >
          <SwitchDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Pass <Code>checked</Code> and <Code>onCheckedChange</Code> to own
              the state from outside.
            </>
          }
          code={`const [checked, setChecked] = React.useState(false)

<div className="flex items-center gap-2">
  <Switch
    id="notify"
    checked={checked}
    onCheckedChange={setChecked}
  />
  <Label htmlFor="notify">اعلان‌ها</Label>
</div>`}
        >
          <SwitchControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>aria-invalid</Code> when the choice is required and
              missing. The switch itself stays visually unchanged; show the error in helper text.
            </>
          }
          code={`<div className="grid gap-2">
  <div className="flex items-center gap-2">
    <Switch id="terms" aria-invalid />
    <Label htmlFor="terms">پذیرش قوانین و شرایط</Label>
  </div>
  <p className="ps-11 text-caption text-destructive">
    برای ادامه باید این گزینه را روشن کنید.
  </p>
</div>`}
        >
          <SwitchInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Switch accepts a <Code>className</Code> merged with the shipped{" "}
              <Code>cn</Code> helper. Here the on state uses a green track and
              the off state a softer gray. Base UI marks the state with{" "}
              <Code>data-checked</Code> and <Code>data-unchecked</Code>, and
              Radix with <Code>data-[state=checked]</Code>, so target the
              attribute your version renders:
            </>
          }
          code={`<Switch
  id="custom-switch"
  defaultChecked
  className="data-checked:bg-emerald-600 data-[state=checked]:bg-emerald-600 data-unchecked:bg-muted-foreground/30 data-[state=unchecked]:bg-muted-foreground/30 dark:data-unchecked:bg-muted-foreground/30 dark:data-[state=unchecked]:bg-muted-foreground/30"
/>`}
        >
          <SwitchCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <code className="font-mono">data-slot</code> attributes (
            <code className="font-mono">switch</code>,{" "}
            <code className="font-mono">switch-thumb</code>) for targeting in
            tests and parent selectors. Use the same props on Base UI, React
            Aria, and Radix.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Switch</h3>
        <PropsTable data={propRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">States</h3>
        <PropsTable data={stateRows} />
      </section>
    </article>
  )
}