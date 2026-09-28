import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ChipsControlledDemo,
  ChipsDemo,
  ChipsDisabledDemo,
  ChipsDisabledItemDemo,
  ChipsIconDemo,
  ChipsMultipleDemo,
  ChipsAvatarDemo,
  ChipsRemovableDemo,
  ChipsSizesDemo,
  ChipsVariantsDemo,
} from "@/components/examples/chips-examples"

import {
  chipPropRows,
  chipsKeyboardRows,
  chipsPropRows,
} from "./chips-table-data"

const description =
  "A row of selectable pills for filtering, tagging, or picking one or more options."

export const metadata: Metadata = {
  title: "Chips",
  description,
}

const usageImport = `import { Chip, Chips } from "@/components/cubix/chips"`

const usageSnippet = `<Chips dir="rtl" lang="fa" defaultValue={["fashion"]}>
  <Chip value="electronics">لوازم دیجیتال</Chip>
  <Chip value="fashion">پوشاک</Chip>
  <Chip value="home">خانه و آشپزخانه</Chip>
  <Chip value="beauty">زیبایی و سلامت</Chip>
  <Chip value="books">کتاب</Chip>
</Chips>`

const composition = `Chips
└── Chip`

const multipleSnippet = `<Chips dir="rtl" lang="fa" multiple defaultValue={["design", "frontend"]}>
  <Chip value="design">طراحی</Chip>
  <Chip value="frontend">فرانت‌اند</Chip>
  <Chip value="backend">بک‌اند</Chip>
</Chips>`

const controlledSnippet = `const skills = [
  { value: "design", label: "طراحی" },
  { value: "frontend", label: "فرانت‌اند" },
  { value: "backend", label: "بک‌اند" },
]

export function ControlledChips() {
  const [value, setValue] = React.useState<string[]>(["design"])

  return (
    <div dir="rtl" lang="fa" className="flex flex-col items-center gap-4">
      <Chips multiple value={value} onValueChange={setValue}>
        {skills.map((item) => (
          <Chip key={item.value} value={item.value}>
            {item.label}
          </Chip>
        ))}
      </Chips>
      <p>انتخاب‌شده: {value.length ? value.join("، ") : "هیچ‌کدام"}</p>
    </div>
  )
}`

const variantsSnippet = `const [items, setItems] = React.useState(["default", "secondary", "gray", "outline"])

<Chips dir="rtl" lang="fa" multiple value={items} onValueChange={() => {}}>
  {items.map((variant) => (
    <Chip
      key={variant}
      value={variant}
      variant={variant}
      icon={<Icon />}
      onRemove={() => setItems((prev) => prev.filter((item) => item !== variant))}
    >
      {variant}
    </Chip>
  ))}
</Chips>`

const sizesSnippet = `const [items, setItems] = React.useState(["xs", "sm", "default", "lg"])

<Chips dir="rtl" lang="fa" multiple value={items} onValueChange={() => {}}>
  {items.map((size) => (
    <Chip
      key={size}
      value={size}
      size={size}
      icon={<Icon />}
      onRemove={() => setItems((prev) => prev.filter((item) => item !== size))}
    >
      {size}
    </Chip>
  ))}
</Chips>`

const avatarSnippet = `<Chips dir="rtl" lang="fa" multiple value={["reza"]} onValueChange={() => {}}>
  <Chip
    value="reza"
    variant="gray"
    avatar={
      <Avatar>
        <AvatarImage src="/avatars/reza.png" alt="رضا احمدی" />
        <AvatarFallback>ر</AvatarFallback>
      </Avatar>
    }
    onRemove={() => {}}
  >
    رضا احمدی
  </Chip>
</Chips>`

const removableSnippet = `const [items, setItems] = React.useState(["design", "frontend"])

<Chips dir="rtl" lang="fa" multiple value={items} onValueChange={() => {}}>
  {items.map((value) => (
    <Chip
      key={value}
      value={value}
      onRemove={() => {
        setItems((prev) => prev.filter((item) => item !== value))
      }}
    >
      {value}
    </Chip>
  ))}
</Chips>`

const disabledItemSnippet = `<Chips dir="rtl" lang="fa" defaultValue={["fashion"]}>
  <Chip value="electronics">لوازم دیجیتال</Chip>
  <Chip value="fashion">پوشاک</Chip>
  <Chip value="books" disabled>کتاب</Chip>
</Chips>`

const disabledSnippet = `<Chips dir="rtl" lang="fa" disabled defaultValue={["fashion"]}>
  <Chip value="electronics">لوازم دیجیتال</Chip>
  <Chip value="fashion">پوشاک</Chip>
</Chips>`

const iconSnippet = `<Chips dir="rtl" lang="fa" defaultValue={["design"]}>
  <Chip value="design" icon={<Icon />}>طراحی</Chip>
  <Chip value="frontend" icon={<Icon />}>فرانت‌اند</Chip>
</Chips>`

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
  description,
  children,
}: {
  title: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="space-y-3">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {description ? (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
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
      <ComponentPreview code={code} align="center" previewClassName="min-h-40">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </section>
  )
}

export default function ChipsDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Chips"
        description={description}
        slug="chips"
      />

      <ComponentPreview
        code={usageSnippet}
        align="center"
        previewClassName="min-h-40"
      >
        <PreviewShell>
          <ChipsDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="chips" />

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
          Every <Code>Chip</Code> is a toggle inside a <Code>Chips</Code>{" "}
          group. Selection is tracked by <Code>value</Code>, the same string
          each chip passes.
        </p>
        <CodeBlock code={composition} />
      </section>

      <ExampleSection
        title="Basic"
        code={usageSnippet}
        description={
          <>
            By default one chip is selected at a time. Selecting another chip
            deselects the selected one, and selecting the selected chip
            deselects it.
          </>
        }
      >
        <ChipsDemo />
      </ExampleSection>

      <ExampleSection
        title="Multiple"
        code={multipleSnippet}
        description={
          <>
            Set <Code>multiple</Code> to select any number of chips. Pass
            every selected value to <Code>defaultValue</Code>.
          </>
        }
      >
        <ChipsMultipleDemo />
      </ExampleSection>

      <ExampleSection
        title="Controlled"
        code={controlledSnippet}
        description={
          <>
            Pass <Code>value</Code> and <Code>onValueChange</Code> to own the
            selected chips, for example to read or set the selection from
            outside.
          </>
        }
      >
        <ChipsControlledDemo />
      </ExampleSection>

      <ExampleSection
        title="Variants"
        code={variantsSnippet}
        description={
          <>
            Set <Code>variant</Code> on a <Code>Chip</Code> to pick how it
            looks when selected, using the same colors as Button. Unselected
            chips stay outlined.
          </>
        }
      >
        <ChipsVariantsDemo />
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        code={sizesSnippet}
        description={
          <>
            Set <Code>size</Code> on a <Code>Chip</Code> to use the same
            heights as Button. The default is <Code>sm</Code>.
          </>
        }
      >
        <ChipsSizesDemo />
      </ExampleSection>

      <ExampleSection
        title="Removable"
        code={removableSnippet}
        description={
          <>
            Pass <Code>onRemove</Code> to a chip to show a remove button.
            Here every chip stays selected and clicking a chip does nothing;
            only the remove button takes it out of the list.
          </>
        }
      >
        <ChipsRemovableDemo />
      </ExampleSection>

      <ExampleSection
        title="Avatar"
        code={avatarSnippet}
        description={
          <>
            Pass an <Code>Avatar</Code> to <Code>avatar</Code> to show it in
            place of the icon. It sits 4px from the chip's edge and scales
            with <Code>size</Code>.
          </>
        }
      >
        <ChipsAvatarDemo />
      </ExampleSection>

      <ExampleSection
        title="Disabled item"
        code={disabledItemSnippet}
        description={
          <>
            Set <Code>disabled</Code> on a <Code>Chip</Code> to keep it
            visible but locked. Arrow key navigation skips it.
          </>
        }
      >
        <ChipsDisabledItemDemo />
      </ExampleSection>

      <ExampleSection
        title="Disabled"
        code={disabledSnippet}
        description={
          <>
            Set <Code>disabled</Code> on <Code>Chips</Code> to lock every chip
            in its current state.
          </>
        }
      >
        <ChipsDisabledDemo />
      </ExampleSection>

      <ExampleSection
        title="With icon"
        code={iconSnippet}
        description={
          <>
            Pass <Code>icon</Code> to a <Code>Chip</Code> to show an icon at
            the inline start, before the label, hidden from assistive
            technology.
          </>
        }
      >
        <ChipsIconDemo />
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
            <code className="font-mono">chips</code>,{" "}
            <code className="font-mono">chip</code>,{" "}
            <code className="font-mono">chip-icon</code>,{" "}
            <code className="font-mono">chip-remove</code>) for targeting in
            tests and parent selectors. Selected state is exposed as{" "}
            <code className="font-mono">aria-pressed</code> on the chip.
          </p>
        </div>

        <PropsSection
          title="Chips"
          description="The root that holds the selected chips and the mode."
        >
          <PropsTable data={chipsPropRows} />
        </PropsSection>

        <PropsSection
          title="Chip"
          description="One selectable pill in the group."
        >
          <PropsTable data={chipPropRows} />
        </PropsSection>

        <PropsSection title="Keyboard">
          <div className="my-6 overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-4 py-3 text-left font-semibold">Key</th>
                  <th className="px-4 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {chipsKeyboardRows.map((row) => (
                  <tr key={row.key} className="border-b last:border-0">
                    <td className="px-4 py-3 align-top font-mono text-xs font-medium text-foreground">
                      {row.key}
                    </td>
                    <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                      {row.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PropsSection>
      </section>
    </article>
  )
}
