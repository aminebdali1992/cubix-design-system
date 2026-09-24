import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  PaginationDemo,
  PaginationIconsOnlyDemo,
  PaginationSimpleDemo,
} from "@/components/examples/pagination-examples"

import {
  contentPropRows,
  ellipsisPropRows,
  itemPropRows,
  linkPropRows,
  paginationPropRows,
  previousNextPropRows,
} from "./pagination-table-data"

const description =
  "Pagination with page navigation, next and previous links."

export const metadata: Metadata = {
  title: "Pagination",
  description,
}

const usageImport = `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/cubix/pagination"`

const usageSnippet = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`

const compositionSnippet = `Pagination
└── PaginationContent
    ├── PaginationItem
    │   └── PaginationPrevious
    ├── PaginationItem
    │   └── PaginationLink
    ├── PaginationItem
    │   └── PaginationEllipsis
    └── PaginationItem
        └── PaginationNext`

const demoSnippet = usageSnippet

const simpleSnippet = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">5</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`

const iconsOnlySnippet = `<div className="flex items-center justify-between gap-4">
  <Field orientation="horizontal" className="w-fit">
    <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
    <Select defaultValue="25">
      <SelectTrigger className="w-20" id="select-rows-per-page">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </Field>
  <Pagination className="mx-0 w-auto">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>`

const nextjsSnippet = `import Link from "next/link"

// Base UI: compose PaginationLink onto Next.js Link via Button render
// Radix UI: use asChild on Button with a Link child

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<typeof Link>

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <Link
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}`

export default function PaginationDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Pagination"
        description={description}
        slug="pagination"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-24">
        <PaginationDemo />
      </ComponentPreview>

      <ComponentInstall name="pagination" />

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
          Use the following composition to build a{" "}
          <code className="font-mono text-sm">Pagination</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Simple</h2>
        <p className="leading-relaxed text-muted-foreground">
          A simple pagination with only page numbers.
        </p>
        <ComponentPreview code={simpleSnippet} previewClassName="min-h-24">
          <PaginationSimpleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Icons Only
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use just the previous and next buttons without page numbers. This is
          useful for data tables with a rows per page selector.
        </p>
        <ComponentPreview code={iconsOnlySnippet} previewClassName="min-h-24">
          <PaginationIconsOnlyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Next.js</h2>
        <p className="leading-relaxed text-muted-foreground">
          By default{" "}
          <code className="font-mono text-sm">PaginationLink</code> renders an{" "}
          <code className="font-mono text-sm">{"<a>"}</code> tag. To use the
          Next.js{" "}
          <code className="font-mono text-sm">Link</code> component, update{" "}
          <code className="font-mono text-sm">pagination.tsx</code> to compose
          onto{" "}
          <code className="font-mono text-sm">Link</code> (Base UI{" "}
          <code className="font-mono text-sm">render</code>, Radix UI{" "}
          <code className="font-mono text-sm">asChild</code>).
        </p>
        <CodeBlock code={nextjsSnippet} />
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Pagination
          </h3>
          <PropsTable data={paginationPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            PaginationContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            PaginationItem
          </h3>
          <PropsTable data={itemPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            PaginationLink
          </h3>
          <PropsTable data={linkPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            PaginationPrevious / PaginationNext
          </h3>
          <PropsTable data={previousNextPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            PaginationEllipsis
          </h3>
          <PropsTable data={ellipsisPropRows} />
        </div>
      </section>
    </article>
  )
}
