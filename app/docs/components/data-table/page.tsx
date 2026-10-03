import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/docs/code-block"
import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentPreview } from "@/components/docs/component-preview"
import { DataTableDemo } from "@/components/examples/data-table-examples"

const description = "Powerful table and datagrids built using TanStack Table."

export const metadata: Metadata = {
  title: "Data Table",
  description,
}

const paymentTypeSnippet = `type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
]`

const projectStructureSnippet = `app
└── payments
    ├── columns.tsx
    ├── data-table-features.ts
    ├── data-table.tsx
    └── page.tsx`

const featuresSnippet = `import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table"

export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

export type DataTableFeatures = typeof features`

const columnsSnippet = `"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

export const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
])`

const dataTableSnippet = `"use client"

import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/cubix/table"

import { features, type DataTableFeatures } from "./data-table-features"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}`

const pageSnippet = `import { columns, type Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}`

const amountSnippet = `columnHelper.accessor("amount", {
  header: () => <div className="text-right">Amount</div>,
  cell: ({ row }) => {
    const amount = parseFloat(row.getValue("amount"))
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)

    return <div className="text-right font-medium">{formatted}</div>
  },
})`

const actionsSnippet = `columnHelper.display({
  id: "actions",
  cell: ({ row }) => {
    const payment = row.original

    return (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(payment.id)}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuItem>View customer</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
})`

const sortingSnippet = `const [sorting, setSorting] = React.useState<SortingState>([])

const table = useTable({
  features,
  data,
  columns,
  onSortingChange: setSorting,
  state: { sorting },
})`

const sortableHeaderSnippet = `columnHelper.accessor("email", {
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDownIcon />
      </Button>
    )
  },
})`

const filteringSnippet = `<Input
  placeholder="Filter emails..."
  value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  onChange={(event) =>
    table.getColumn("email")?.setFilterValue(event.target.value)
  }
  className="max-w-sm"
/>`

const paginationSnippet = `<div className="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Next
  </Button>
</div>`

const visibilitySnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Columns <ChevronDownIcon />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => (
        <DropdownMenuCheckboxItem
          key={column.id}
          checked={column.getIsVisible()}
          onCheckedChange={(value) => column.toggleVisibility(!!value)}
        >
          {column.id}
        </DropdownMenuCheckboxItem>
      ))}
  </DropdownMenuContent>
</DropdownMenu>`

const selectionSnippet = `columnHelper.display({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={
        table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
})`

export default function DataTableDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Data Table"
        description={description}
        slug="data-table"
      />

      <ComponentPreview
        code={`<DataTableDemo />`}
        previewClassName="items-start"
      >
        <DataTableDemo />
      </ComponentPreview>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Introduction
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Every data table or datagrid is unique. They behave differently, have
          specific sorting and filtering requirements, and work with different
          data sources.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          It does not make sense to combine all of these variations into a
          single component. Instead of a data-table component, this page is a
          guide for building your own with the{" "}
          <Link
            href="/docs/components/table"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
          >
            Table
          </Link>{" "}
          primitive and TanStack Table.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Table of Contents
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Set up Table Features</li>
          <li>Basic Table</li>
          <li>Row Actions</li>
          <li>Pagination</li>
          <li>Sorting</li>
          <li>Filtering</li>
          <li>Visibility</li>
          <li>Row Selection</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Installation
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          1. Add the{" "}
          <code className="font-mono text-sm">Table</code> component to your
          project:
        </p>
        <CodeBlockCommand
          commands={{
            pnpm: "pnpm dlx cubix-ui@latest add table",
            npm: "npx cubix-ui@latest add table",
            yarn: "yarn dlx cubix-ui@latest add table",
            bun: "bunx --bun cubix-ui@latest add table",
          }}
        />
        <p className="leading-relaxed text-muted-foreground">
          2. Add the{" "}
          <code className="font-mono text-sm">@tanstack/react-table</code>{" "}
          dependency. This guide uses TanStack Table v9:
        </p>
        <CodeBlockCommand
          commands={{
            pnpm: "pnpm add @tanstack/react-table",
            npm: "npm install @tanstack/react-table",
            yarn: "yarn add @tanstack/react-table",
            bun: "bun add @tanstack/react-table",
          }}
        />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Prerequisites
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          We are going to build a table to show recent payments. Here is what
          our data looks like:
        </p>
        <CodeBlock code={paymentTypeSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Project Structure
        </h2>
        <CodeBlock code={projectStructureSnippet} />
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <code className="font-mono text-sm">columns.tsx</code> - column
            definitions
          </li>
          <li>
            <code className="font-mono text-sm">data-table-features.ts</code> -
            shared features object
          </li>
          <li>
            <code className="font-mono text-sm">data-table.tsx</code> - table
            component
          </li>
          <li>
            <code className="font-mono text-sm">page.tsx</code> - fetch data and
            render
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Set up Table Features
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          TanStack Table v9 is feature-based: you opt into sorting, filtering,
          pagination, and more with{" "}
          <code className="font-mono text-sm">tableFeatures()</code>. Anything
          you do not list is tree-shaken out of your bundle.
        </p>
        <CodeBlock code={featuresSnippet} title="data-table-features.ts" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Basic Table
        </h2>
        <h3 className="scroll-m-20 font-semibold tracking-tight">
          Column Definitions
        </h3>
        <CodeBlock code={columnsSnippet} title="columns.tsx" />
        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DataTable component
        </h3>
        <CodeBlock code={dataTableSnippet} title="data-table.tsx" />
        <h3 className="scroll-m-20 font-semibold tracking-tight">
          Render the table
        </h3>
        <CodeBlock code={pageSnippet} title="page.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Cell Formatting
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Format the amount cell as currency and align it to the right.
        </p>
        <CodeBlock code={amountSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Row Actions
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Add row actions with a{" "}
          <code className="font-mono text-sm">DropdownMenu</code>. Access row
          data with <code className="font-mono text-sm">row.original</code>.
        </p>
        <CodeBlock code={actionsSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Pagination</h2>
        <p className="leading-relaxed text-muted-foreground">
          Because the features object includes{" "}
          <code className="font-mono text-sm">rowPaginationFeature</code> and{" "}
          <code className="font-mono text-sm">createPaginatedRowModel()</code>,
          the table paginates into pages of 10 by default. Add controls with{" "}
          <code className="font-mono text-sm">previousPage()</code> and{" "}
          <code className="font-mono text-sm">nextPage()</code>:
        </p>
        <CodeBlock code={paginationSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Sorting</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wire sorting state, then make a header cell sortable:
        </p>
        <CodeBlock code={sortingSnippet} />
        <CodeBlock code={sortableHeaderSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Filtering</h2>
        <p className="leading-relaxed text-muted-foreground">
          Add a search input to filter emails:
        </p>
        <CodeBlock code={filteringSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Visibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Let users toggle columns with a dropdown:
        </p>
        <CodeBlock code={visibilitySnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Row Selection
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Add a select column with checkboxes:
        </p>
        <CodeBlock code={selectionSnippet} />
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See the{" "}
          <a
            href="https://tanstack.com/table/latest"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            TanStack Table
          </a>{" "}
          documentation for more information.
        </p>
      </section>
    </article>
  )
}
