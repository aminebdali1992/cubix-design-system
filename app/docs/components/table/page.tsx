import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  TableActionsDemo,
  TableDemo,
  TableFooterDemo,
} from "@/components/examples/table-examples"
import { rowPropRows, tablePropRows } from "./table-table-data"

const description = "A responsive table component."

export const metadata: Metadata = {
  title: "Table",
  description,
}

const usageImport = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/cubix/table"`

const usageSnippet = `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`

const compositionSnippet = `Table
├── TableCaption
├── TableHeader
│   └── TableRow
│       ├── TableHead
│       ├── TableHead
│       ├── TableHead
│       └── TableHead
├── TableBody
│   ├── TableRow
│   │   ├── TableCell
│   │   ├── TableCell
│   │   ├── TableCell
│   │   └── TableCell
│   └── TableRow
│       ├── TableCell
│       ├── TableCell
│       ├── TableCell
│       └── TableCell
└── TableFooter`

const footerSnippet = `<TableFooter>
  <TableRow>
    <TableCell colSpan={3}>Total</TableCell>
    <TableCell className="text-right">$2,500.00</TableCell>
  </TableRow>
</TableFooter>`

const actionsSnippet = `<TableCell className="text-right">
  <DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
      <MoreHorizontalIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>`

export default function TableDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Table"
        description={description}
        slug="table"
      />

      <ComponentPreview code={usageSnippet} previewClassName="h-[30rem]">
        <TableDemo />
      </ComponentPreview>

      <ComponentInstall name="table" />

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
          <code className="font-mono text-sm">Table</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Footer</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the{" "}
            <code className="font-mono text-sm">TableFooter</code> component to
            add a footer to the table.
          </p>
          <ComponentPreview code={footerSnippet}>
            <TableFooterDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Actions</h3>
          <p className="leading-relaxed text-muted-foreground">
            A table showing actions for each row using a{" "}
            <code className="font-mono text-sm">DropdownMenu</code> component.
          </p>
          <ComponentPreview code={actionsSnippet}>
            <TableActionsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Data Table
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            You can use the{" "}
            <code className="font-mono text-sm">Table</code> component to build
            more complex data tables. Combine it with{" "}
            <a
              href="https://tanstack.com/table/latest"
              className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
              rel="noreferrer"
              target="_blank"
            >
              @tanstack/react-table
            </a>{" "}
            to create tables with sorting, filtering and pagination.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            See the{" "}
            <Link
              href="/docs/components/data-table"
              className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            >
              Data Table
            </Link>{" "}
            documentation for more information.
          </p>
        </div>
      </section>

      <section id="api-reference" className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Table</h3>
          <p className="leading-relaxed text-muted-foreground">
            The scroll container and native table element.
          </p>
          <PropsTable data={tablePropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            TableRow
          </h3>
          <PropsTable data={rowPropRows} />
        </div>
      </section>
    </article>
  )
}
