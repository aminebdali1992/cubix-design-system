import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  KbdArrowKeysDemo,
  KbdBasicDemo,
  KbdDemo,
  KbdGroupDemo,
  KbdIconsDemo,
  KbdIconsTextDemo,
  KbdInputGroupDemo,
  KbdModifiersDemo,
  KbdSampDemo,
  KbdTooltipDemo,
} from "@/components/examples/kbd-examples"

import { kbdGroupPropRows, kbdPropRows } from "./kbd-table-data"

const description = "A component to display keyboard shortcuts."

export const metadata: Metadata = {
  title: "Kbd",
  description,
}

const usageImport = `import { Kbd, KbdGroup } from "@/components/cubix/kbd"`

const usageSnippet = `<Kbd>Ctrl</Kbd>
<Kbd>⌘K</Kbd>`

const demoSnippet = `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>⌥</Kbd>
  <Kbd>⌃</Kbd>
</KbdGroup>
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>B</Kbd>
</KbdGroup>`

const basicSnippet = `<div className="flex items-center gap-2">
  <Kbd>Ctrl</Kbd>
  <Kbd>⌘K</Kbd>
  <Kbd>Ctrl + B</Kbd>
</div>`

const modifiersSnippet = `<div className="flex items-center gap-2">
  <Kbd>⌘</Kbd>
  <Kbd>C</Kbd>
</div>`

const groupSnippet = `<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>P</Kbd>
</KbdGroup>`

const arrowsSnippet = `<div className="flex items-center gap-2">
  <Kbd>↑</Kbd>
  <Kbd>↓</Kbd>
  <Kbd>←</Kbd>
  <Kbd>→</Kbd>
</div>`

const iconsSnippet = `<KbdGroup>
  <Kbd>
    <CircleDashedIcon />
  </Kbd>
  <Kbd>
    <ArrowLeftIcon />
  </Kbd>
  <Kbd>
    <ArrowRightIcon />
  </Kbd>
</KbdGroup>`

const iconsTextSnippet = `<KbdGroup>
  <Kbd>
    <ArrowLeftIcon />
    Left
  </Kbd>
  <Kbd>
    <CircleDashedIcon />
    Voice Enabled
  </Kbd>
</KbdGroup>`

const inputGroupSnippet = `<InputGroup className="max-w-xs">
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>`

const tooltipSnippet = `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button size="icon-sm" variant="outline" />}>
      <SaveIcon />
    </TooltipTrigger>
    <TooltipContent className="pr-1.5">
      <div className="flex items-center gap-2">
        Save Changes <Kbd>S</Kbd>
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`

const sampSnippet = `<Kbd>
  <samp>File</samp>
</Kbd>`

export default function KbdDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Kbd" description={description} slug="kbd" />

      <ComponentPreview code={demoSnippet}>
        <KbdDemo />
      </ComponentPreview>

      <ComponentInstall name="kbd" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Basic</h2>
        <ComponentPreview code={basicSnippet}>
          <KbdBasicDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Modifier Keys
        </h2>
        <ComponentPreview code={modifiersSnippet}>
          <KbdModifiersDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">KbdGroup</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">KbdGroup</code> to group
          related keys together.
        </p>
        <ComponentPreview code={groupSnippet}>
          <KbdGroupDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Arrow Keys</h2>
        <ComponentPreview code={arrowsSnippet}>
          <KbdArrowKeysDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">With Icons</h2>
        <ComponentPreview code={iconsSnippet}>
          <KbdIconsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Icons and Text
        </h2>
        <ComponentPreview code={iconsTextSnippet}>
          <KbdIconsTextDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Input Group
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Compose <code className="font-mono text-sm">Kbd</code> inside an{" "}
          <code className="font-mono text-sm">InputGroup</code> addon.
        </p>
        <ComponentPreview code={inputGroupSnippet}>
          <KbdInputGroupDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Tooltip</h2>
        <p className="leading-relaxed text-muted-foreground">
          Show keyboard shortcuts inside a tooltip.
        </p>
        <ComponentPreview code={tooltipSnippet}>
          <KbdTooltipDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">With samp</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap sample output in{" "}
          <code className="font-mono text-sm">{"<samp>"}</code> when the key
          represents a program or file name.
        </p>
        <ComponentPreview code={sampSnippet}>
          <KbdSampDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Kbd</h3>
          <PropsTable data={kbdPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            KbdGroup
          </h3>
          <PropsTable data={kbdGroupPropRows} />
        </div>
      </section>
    </article>
  )
}
