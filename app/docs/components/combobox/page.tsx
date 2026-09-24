import type { Metadata } from "next"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ComboboxAutoHighlightDemo,
  ComboboxClearDemo,
  ComboboxCustomDemo,
  ComboboxDemo,
  ComboboxDisabledDemo,
  ComboboxGroupsDemo,
  ComboboxInputGroupDemo,
  ComboboxInvalidDemo,
  ComboboxMultipleDemo,
  ComboboxPopupDemo,
} from "@/components/examples/combobox-examples"
import {
  comboboxPropRows,
  contentPropRows,
  inputPropRows,
} from "./combobox-table-data"

export const metadata: Metadata = {
  title: "Combobox",
  description: "Autocomplete input and command palette with a list of suggestions.",
}

const usageImport = `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/cubix/combobox"`

const usageSnippet = `const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleCombobox() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`

const simpleComposition = `Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem`

const chipsComposition = `Combobox
├── ComboboxChips
│   ├── ComboboxValue
│   │   └── ComboboxChip
│   └── ComboboxChipsInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem`

const groupsComposition = `Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxGroup
        │   ├── ComboboxLabel
        │   └── ComboboxCollection
        │       ├── ComboboxItem
        │       └── ComboboxItem
        ├── ComboboxSeparator
        └── ComboboxGroup
            ├── ComboboxLabel
            └── ComboboxCollection
                ├── ComboboxItem
                └── ComboboxItem`

const customItemsSnippet = `type Framework = {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]

<Combobox
  items={frameworks}
  itemToStringValue={(framework) => framework.label}
>
  <ComboboxInput placeholder="Select a framework" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(framework) => (
        <ComboboxItem key={framework.value} value={framework}>
          {framework.label}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const multipleSnippet = `<Combobox items={frameworks} multiple autoHighlight>
  <ComboboxChips>
    <ComboboxValue>
      {(values) => (
        <>
          {values.map((value) => (
            <ComboboxChip key={value}>{value}</ComboboxChip>
          ))}
          <ComboboxChipsInput />
        </>
      )}
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const popupSnippet = `<Combobox items={countries} defaultValue={countries[0]}>
  <ComboboxTrigger
    render={
      <Button variant="outline" className="w-64 justify-between font-normal" />
    }
  >
    <ComboboxValue />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput showTrigger={false} placeholder="Search" />
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item.code} value={item}>
          {item.label}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const inputGroupSnippet = `<ComboboxInput placeholder="Select a timezone">
  <InputGroupAddon>
    <GlobeIcon />
  </InputGroupAddon>
</ComboboxInput>`

export default function ComboboxDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Combobox"
        description="Autocomplete input and command palette with a list of suggestions."
        slug="combobox"
      />

      <ComponentPreview code={usageSnippet}>
        <ComboboxDemo />
      </ComponentPreview>

      <ComponentInstall name="combobox" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Simple</h3>
          <p className="leading-relaxed text-muted-foreground">
            A single-line input and a flat list.
          </p>
          <CodeBlock code={simpleComposition} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With chips
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Multi-select with{" "}
            <code className="font-mono text-sm">multiple</code>, chips, and a
            chips input.
          </p>
          <CodeBlock code={chipsComposition} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With groups and collection
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Nested items per group using{" "}
            <code className="font-mono text-sm">ComboboxCollection</code>{" "}
            inside each <code className="font-mono text-sm">ComboboxGroup</code>
            .
          </p>
          <CodeBlock code={groupsComposition} />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Basic</h3>
          <p className="leading-relaxed text-muted-foreground">
            A simple combobox with a list of frameworks.
          </p>
          <ComponentPreview code={usageSnippet}>
            <ComboboxDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Multiple</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">multiple</code> with chips
            for multi-select behavior.
          </p>
          <ComponentPreview code={multipleSnippet}>
            <ComboboxMultipleDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Clear Button
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">showClear</code> prop
            to show a clear button.
          </p>
          <ComponentPreview code={`<ComboboxInput showClear />`}>
            <ComboboxClearDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Groups</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">ComboboxGroup</code> and{" "}
            <code className="font-mono text-sm">ComboboxSeparator</code> to
            group items.
          </p>
          <ComponentPreview code={groupsComposition}>
            <ComboboxGroupsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom Items
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">itemToStringValue</code>{" "}
            when your items are objects, and render custom item content.
          </p>
          <ComponentPreview code={customItemsSnippet}>
            <ComboboxCustomDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Invalid</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">aria-invalid</code>{" "}
            prop to mark the combobox as invalid.
          </p>
          <ComponentPreview code={`<ComboboxInput aria-invalid="true" />`}>
            <ComboboxInvalidDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Disabled</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">disabled</code> prop to
            disable the combobox.
          </p>
          <ComponentPreview code={`<ComboboxInput disabled />`}>
            <ComboboxDisabledDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Auto Highlight
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">autoHighlight</code>{" "}
            prop to automatically highlight the first item on filter.
          </p>
          <ComponentPreview code={`<Combobox items={frameworks} autoHighlight>`}>
            <ComboboxAutoHighlightDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Popup</h3>
          <p className="leading-relaxed text-muted-foreground">
            Trigger the combobox from a button. Move{" "}
            <code className="font-mono text-sm">ComboboxInput</code> inside{" "}
            <code className="font-mono text-sm">ComboboxContent</code>.
          </p>
          <ComponentPreview code={popupSnippet}>
            <ComboboxPopupDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Input Group
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Add an addon inside{" "}
            <code className="font-mono text-sm">ComboboxInput</code> with{" "}
            <code className="font-mono text-sm">InputGroupAddon</code>.
          </p>
          <ComponentPreview code={inputGroupSnippet}>
            <ComboboxInputGroupDemo />
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> See the Base UI
            Combobox docs for the full primitive API.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Combobox</h3>
          <p className="leading-relaxed text-muted-foreground">
            The root that holds items, value, and filter state.
          </p>
          <PropsTable data={comboboxPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ComboboxInput
          </h3>
          <PropsTable data={inputPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ComboboxContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>
      </section>
    </article>
  )
}
