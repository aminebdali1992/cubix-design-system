import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { FilterBarActionsDemo } from "./examples/filter-bar-actions-demo"
import { FilterBarDemo } from "./examples/filter-bar-demo"
import { FilterBarPillDemo } from "./examples/filter-bar-pill-demo"
import { FilterBarSegmentedDemo } from "./examples/filter-bar-segmented-demo"
import { FilterBarSizesDemo } from "./examples/filter-bar-sizes-demo"
import { filterBarColorRows, filterBarRows, filterBarTypographyRows } from "./filter-bar-table-data"

const description = "An advanced filtering component with support for multiple conditions and operators."

export const metadata: Metadata = {
  title: "Filter Bar",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/filter-bar"
const EXAMPLES_DIR = "app/docs/components/filter-bar/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, { publicImport: PUBLIC_IMPORT })
}

const usageSnippet = `const filterProperties = [
  {
    label: "نام",
    name: "name",
    type: "string",
    operators: ["=", "!=", "CONTAINS", "STARTS WITH", "ENDS WITH"],
  },
  {
    label: "وضعیت",
    name: "status",
    type: "string",
    options: ["فعال", "غیرفعال", "در انتظار"],
    operators: ["=", "!="],
  },
]

export function FilterDemo() {
  const [filters, setFilters] = useState<FilterGroup>({ logicalOperator: "AND", conditions: [] })
  const [freeformText, setFreeformText] = useState("")

  return (
    <FilterBar
      filterProperties={filterProperties}
      freeformText={freeformText}
      onFreeformTextChange={setFreeformText}
      filters={filters}
      onFilterChange={setFilters}
    />
  )
}`

const pillSnippet = `<FilterBar variant="pill" className="overflow-visible border-0 bg-transparent" {...props} />`

const sizeSnippet = `<FilterBar size="sm" {...props} />`

const filterPropertyType = `interface FilterProperty {
  label: string
  name: string
  type: "string" | "number" | "date" | "boolean"
  operators?: (string | { value: string; label: string })[]
  formatValue?: (value: FilterCondition["value"]) => string
  options?: FilterOption[] | ((search?: string) => Promise<FilterOption[]> | FilterOption[]) | CustomOptionObject
  isAvailable?: boolean
}`

const filterGroupType = `interface FilterGroup {
  logicalOperator: "AND" | "OR"
  conditions: (FilterCondition | FilterGroup)[]
}`

const filterConditionType = `interface FilterCondition {
  propertyName: string
  value: string | number | boolean | Date | null
  operator: string
}`

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

export default function FilterBarPage() {
  const demoSource = loadExample("filter-bar-demo.tsx")
  const usageImport = extractDemoImports(loadExample("filter-bar-segmented-demo.tsx"))

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Filter Bar" description={description} slug="filter-bar" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <FilterBarDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="filter-bar" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <p className="leading-relaxed text-muted-foreground">
          The <Code>FilterBar</Code> component provides advanced filtering capabilities with support for
          multiple conditions, operators, and different field types. It can be used with both static and
          async options.
        </p>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Variants</h2>
        <p className="leading-relaxed text-muted-foreground">
          The default variant joins filters into a segmented bar. Use the pill variant to show each filter
          as a separate rounded chip.
        </p>

        <ExampleSection
          title="Segmented"
          description="The default variant. Conditions sit side by side, separated by dividers."
          code={loadExample("filter-bar-segmented-demo.tsx")}
        >
          <FilterBarSegmentedDemo />
        </ExampleSection>

        <ExampleSection
          title="Pill"
          description="Each condition is a separate bordered chip. Remove the bar border and background with className."
          code={loadExample("filter-bar-pill-demo.tsx")}
        >
          <FilterBarPillDemo />
        </ExampleSection>
        <CodeBlock code={pillSnippet} title="Pill" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Sizes</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <Code>size</Code> prop to match surrounding fields. <Code>md</Code> is the default 40px
          height; <Code>sm</Code> is 32px with a smaller search icon and tighter padding. Both sizes keep a
          fixed height and scroll conditions horizontally.
        </p>
        <ExampleSection
          title="Small and medium"
          description="An invoices filter at sm and md."
          code={loadExample("filter-bar-sizes-demo.tsx")}
        >
          <FilterBarSizesDemo />
        </ExampleSection>
        <CodeBlock code={sizeSnippet} title="Size" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Custom actions</h2>
        <ExampleSection
          title="AI filter"
          description="Append custom actions to the property menu. Each action receives the current free-form input value and the active group's path, so you can plug in AI, saved queries, and more."
          code={loadExample("filter-bar-actions-demo.tsx")}
        >
          <FilterBarActionsDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">FilterProperty</h3>
        <CodeBlock code={filterPropertyType} title="FilterProperty" />

        <h3 className="scroll-m-20 font-semibold tracking-tight">FilterGroup</h3>
        <CodeBlock code={filterGroupType} title="FilterGroup" />

        <h3 className="scroll-m-20 font-semibold tracking-tight">FilterCondition</h3>
        <CodeBlock code={filterConditionType} title="FilterCondition" />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Component Props</h3>
        <PropsTable data={filterBarRows} />
      </section>

      <section className="space-y-4">
        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={filterBarTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={filterBarColorRows} />
      </section>
    </article>
  )
}
