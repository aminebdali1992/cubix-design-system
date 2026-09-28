import type { Metadata } from "next"
import type { ReactNode } from "react"
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
  ComboboxCustomStylingDemo,
  ComboboxDemo,
  ComboboxDisabledDemo,
  ComboboxDisabledItemsDemo,
  ComboboxGroupsDemo,
  ComboboxInputGroupDemo,
  ComboboxInvalidDemo,
  ComboboxMultipleDemo,
  ComboboxPopupDemo,
  ComboboxSizesDemo,
} from "@/components/examples/combobox-examples"

import {
  comboboxPropRows,
  contentPropRows,
  inputPropRows,
  itemPropRows,
} from "./combobox-table-data"

const description =
  "Autocomplete input and command palette with a list of suggestions."

export const metadata: Metadata = {
  title: "Combobox",
  description,
}

const usageImport = `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/cubix/combobox"`

const usageSnippet = `const cities = ["تهران", "مشهد", "اصفهان", "شیراز", "تبریز"]

export function ExampleCombobox() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
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
        └── ComboboxItem`

const chipsComposition = `Combobox
├── ComboboxChips
│   └── ComboboxValue
│       ├── ComboboxChip
│       └── ComboboxChipsInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        └── ComboboxItem`

const groupsComposition = `Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        └── ComboboxGroup
            ├── ComboboxLabel
            ├── ComboboxCollection
            │   └── ComboboxItem
            └── ComboboxSeparator`

const sizesSnippet = `<Combobox dir="rtl" lang="fa" items={cities}>
  <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
  <ComboboxContent>…</ComboboxContent>
</Combobox>

<Combobox dir="rtl" lang="fa" items={cities}>
  <ComboboxInput placeholder="انتخاب شهر" size="lg" className="w-56" />
  <ComboboxContent>…</ComboboxContent>
</Combobox>`

const multipleSnippet = `const anchor = useComboboxAnchor()

<Combobox
  dir="rtl"
  lang="fa"
  multiple
  autoHighlight
  items={cities}
  defaultValue={[cities[0]]}
>
  <ComboboxChips ref={anchor} className="w-64">
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
  <ComboboxContent anchor={anchor}>
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const clearSnippet = `<Combobox dir="rtl" lang="fa" items={cities} defaultValue={cities[0]}>
  <ComboboxInput placeholder="انتخاب شهر" showClear className="w-56" />
  <ComboboxContent>
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const groupsSnippet = `const foods = [
  { value: "میوه‌ها", items: ["سیب", "انار", "پرتقال"] },
  { value: "سبزیجات", items: ["هویج", "خیار", "کدو"] },
]

<Combobox dir="rtl" lang="fa" items={foods}>
  <ComboboxInput placeholder="انتخاب خوراکی" className="w-56" />
  <ComboboxContent>
    <ComboboxEmpty>موردی یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(group, index) => (
        <ComboboxGroup key={group.value} items={group.items}>
          <ComboboxLabel>{group.value}</ComboboxLabel>
          <ComboboxCollection>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxCollection>
          {index < foods.length - 1 && <ComboboxSeparator />}
        </ComboboxGroup>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const disabledItemsSnippet = `<Combobox dir="rtl" lang="fa" items={cities}>
  <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
  <ComboboxContent>
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item} disabled={item === "تبریز"}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const customItemsSnippet = `type City = {
  id: string
  name: string
  province: string
}

const cities: City[] = [
  { id: "tehran", name: "تهران", province: "استان تهران" },
  { id: "mashhad", name: "مشهد", province: "استان خراسان رضوی" },
  { id: "isfahan", name: "اصفهان", province: "استان اصفهان" },
  { id: "shiraz", name: "شیراز", province: "استان فارس" },
  { id: "tabriz", name: "تبریز", province: "استان آذربایجان شرقی" },
]

<Combobox
  dir="rtl"
  lang="fa"
  items={cities}
  itemToStringLabel={(city: City) => city.name}
>
  <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
  <ComboboxContent>
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(city: City) => (
        <ComboboxItem key={city.id} value={city}>
          <div className="flex min-w-0 flex-col">
            <span className="truncate">{city.name}</span>
            <span className="text-caption text-muted-foreground">
              {city.province}
            </span>
          </div>
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const invalidSnippet = `<Combobox dir="rtl" lang="fa" items={cities}>
  <ComboboxInput
    placeholder="انتخاب شهر"
    aria-invalid="true"
    className="w-56"
  />
  <ComboboxContent>
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const disabledSnippet = `<Combobox dir="rtl" lang="fa" items={cities} disabled>
  <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
  <ComboboxContent>
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const autoHighlightSnippet = `<Combobox dir="rtl" lang="fa" items={cities} autoHighlight>
  <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
  <ComboboxContent>
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const popupSnippet = `import { Button } from "@/components/cubix/button"

<Combobox dir="rtl" lang="fa" items={cities}>
  <ComboboxTrigger
    render={
      <Button
        variant="outline"
        className="w-56 justify-between px-3 font-normal"
      />
    }
  >
    <ComboboxValue placeholder="انتخاب شهر" />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="جستجو" />
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const inputGroupSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

import { InputGroupAddon } from "@/components/cubix/input-group"

<Combobox dir="rtl" lang="fa" items={cities}>
  <ComboboxInput placeholder="انتخاب شهر" className="w-56">
    <InputGroupAddon>
      <ButtonDemoIcon />
    </InputGroupAddon>
  </ComboboxInput>
  <ComboboxContent>
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

const customStylingSnippet = `<Combobox dir="rtl" lang="fa" items={cities}>
  <ComboboxInput
    placeholder="انتخاب شهر"
    className="w-56 border-border bg-muted has-[[data-slot=input-group-control]:focus-visible]:bg-background dark:bg-muted dark:has-[[data-slot=input-group-control]:focus-visible]:bg-background"
  />
  <ComboboxContent className="rounded-xl">
    <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item} className="rounded-md">
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

function PropsSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="space-y-3">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  code,
  children,
  description,
}: {
  title: string
  code: string
  children: ReactNode
  description?: ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="scroll-m-20 font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      <ComponentPreview code={code} previewClassName="min-h-56">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </section>
  )
}

export default function ComboboxDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Combobox"
        description={description}
        slug="combobox"
      />

      <ComponentPreview code={usageSnippet} previewClassName="min-h-56">
        <PreviewShell>
          <ComboboxDemo />
        </PreviewShell>
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
            Multi-select with <Code>multiple</Code>, chips, and a chips input.
          </p>
          <CodeBlock code={chipsComposition} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With groups
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Nested items per group using <Code>ComboboxCollection</Code> inside
            each <Code>ComboboxGroup</Code>.
          </p>
          <CodeBlock code={groupsComposition} />
        </div>
      </section>

      <ExampleSection
        title="Basic"
        code={usageSnippet}
        description={
          <>
            Type to filter the list, or press ArrowDown to open it. The popup
            is as wide as the input and aligned to its start edge (the right
            edge in RTL). The selected item shows a check at the end.
          </>
        }
      >
        <ComboboxDemo />
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        code={sizesSnippet}
        description={
          <>
            Set <Code>size</Code> to <Code>default</Code> (40px) or{" "}
            <Code>lg</Code> (48px), the same heights and inline padding as Text
            Field. <Code>ComboboxChips</Code> takes the same prop. The popup
            list is the same for both sizes.
          </>
        }
      >
        <ComboboxSizesDemo />
      </ExampleSection>

      <ExampleSection
        title="Multiple"
        code={multipleSnippet}
        description={
          <>
            Use <Code>multiple</Code> with <Code>ComboboxChips</Code> for
            multi-select. Pass the chips ref from{" "}
            <Code>useComboboxAnchor</Code> as the popup <Code>anchor</Code>.
          </>
        }
      >
        <ComboboxMultipleDemo />
      </ExampleSection>

      <ExampleSection
        title="Clear button"
        code={clearSnippet}
        description={
          <>
            Set <Code>showClear</Code> to show a clear button while a value is
            selected. It takes the place of the chevron.
          </>
        }
      >
        <ComboboxClearDemo />
      </ExampleSection>

      <ExampleSection
        title="Groups"
        code={groupsSnippet}
        description={
          <>
            Use <Code>ComboboxGroup</Code>, <Code>ComboboxLabel</Code> and{" "}
            <Code>ComboboxSeparator</Code> to group items.
          </>
        }
      >
        <ComboboxGroupsDemo />
      </ExampleSection>

      <ExampleSection
        title="Disabled items"
        code={disabledItemsSnippet}
        description={
          <>
            Set <Code>disabled</Code> on a <Code>ComboboxItem</Code> to keep it
            visible but not selectable. Keyboard navigation skips it.
          </>
        }
      >
        <ComboboxDisabledItemsDemo />
      </ExampleSection>

      <ExampleSection
        title="Custom items"
        code={customItemsSnippet}
        description={
          <>
            When items are objects, use <Code>itemToStringLabel</Code> to
            choose the text shown in the input and used for filtering, and
            render any content inside <Code>ComboboxItem</Code>.
          </>
        }
      >
        <ComboboxCustomDemo />
      </ExampleSection>

      <ExampleSection
        title="Invalid"
        code={invalidSnippet}
        description={
          <>
            Set <Code>aria-invalid</Code> on <Code>ComboboxInput</Code> to mark
            the combobox as invalid.
          </>
        }
      >
        <ComboboxInvalidDemo />
      </ExampleSection>

      <ExampleSection
        title="Disabled"
        code={disabledSnippet}
        description={
          <>
            Set <Code>disabled</Code> on <Code>Combobox</Code> to disable the
            input and its trigger.
          </>
        }
      >
        <ComboboxDisabledDemo />
      </ExampleSection>

      <ExampleSection
        title="Auto highlight"
        code={autoHighlightSnippet}
        description={
          <>
            Set <Code>autoHighlight</Code> to highlight the first match while
            typing, so Enter selects it.
          </>
        }
      >
        <ComboboxAutoHighlightDemo />
      </ExampleSection>

      <ExampleSection
        title="Popup"
        code={popupSnippet}
        description={
          <>
            Open the combobox from a button with <Code>ComboboxTrigger</Code>{" "}
            and move <Code>ComboboxInput</Code> inside{" "}
            <Code>ComboboxContent</Code>. The input there has no chevron.
          </>
        }
      >
        <ComboboxPopupDemo />
      </ExampleSection>

      <ExampleSection
        title="Input group"
        code={inputGroupSnippet}
        description={
          <>
            Add an <Code>InputGroupAddon</Code> inside{" "}
            <Code>ComboboxInput</Code>. The whole group is the popup anchor.
          </>
        }
      >
        <ComboboxInputGroupDemo />
      </ExampleSection>

      <ExampleSection
        title="Custom styling"
        code={customStylingSnippet}
        description={
          <>
            Every part accepts a <Code>className</Code> merged with the shipped{" "}
            <Code>cn</Code> helper. Here the field uses a filled surface instead
            of the default outline, and the popup and its items use larger
            rounding:
          </>
        }
      >
        <ComboboxCustomStylingDemo />
      </ExampleSection>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <code className="font-mono">data-slot</code> attributes (
            <code className="font-mono">combobox-trigger</code>,{" "}
            <code className="font-mono">combobox-content</code>,{" "}
            <code className="font-mono">combobox-list</code>,{" "}
            <code className="font-mono">combobox-item</code>,{" "}
            <code className="font-mono">combobox-group</code>,{" "}
            <code className="font-mono">combobox-label</code>,{" "}
            <code className="font-mono">combobox-empty</code>,{" "}
            <code className="font-mono">combobox-separator</code>,{" "}
            <code className="font-mono">combobox-clear</code>,{" "}
            <code className="font-mono">combobox-chips</code>,{" "}
            <code className="font-mono">combobox-chip</code>,{" "}
            <code className="font-mono">combobox-chip-remove</code>,{" "}
            <code className="font-mono">combobox-chip-input</code>) for targeting
            in tests and parent selectors. The field is an input group (
            <code className="font-mono">input-group</code>,{" "}
            <code className="font-mono">input-group-control</code>).
          </p>
        </div>

        <PropsSection title="Combobox">
          <PropsTable data={comboboxPropRows} />
        </PropsSection>

        <PropsSection title="ComboboxInput">
          <PropsTable data={inputPropRows} />
        </PropsSection>

        <PropsSection title="ComboboxContent">
          <PropsTable data={contentPropRows} />
        </PropsSection>

        <PropsSection title="ComboboxItem">
          <PropsTable data={itemPropRows} />
        </PropsSection>

        <p className="leading-relaxed text-muted-foreground">
          <Code>ComboboxList</Code>, <Code>ComboboxGroup</Code>,{" "}
          <Code>ComboboxLabel</Code>, <Code>ComboboxEmpty</Code> and{" "}
          <Code>ComboboxSeparator</Code> take <Code>className</Code> and{" "}
          <Code>children</Code> (<Code>ComboboxSeparator</Code> has no
          children).
        </p>
      </section>
    </article>
  )
}
