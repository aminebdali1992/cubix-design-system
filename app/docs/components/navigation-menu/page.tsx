import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  NavigationMenuBasicDemo,
  NavigationMenuDemo,
  NavigationMenuIconsDemo,
} from "@/components/examples/navigation-menu-examples"

import {
  contentPropRows,
  linkPropRows,
  navigationMenuPropRows,
  triggerPropRows,
} from "./navigation-menu-table-data"

const description = "A collection of links for navigating websites."

export const metadata: Metadata = {
  title: "Navigation Menu",
  description,
}

const usageImport = `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/cubix/navigation-menu"`

const usageSnippet = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink render={<Link href="/docs" />}>
          Documentation
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`

const compositionSnippet = `NavigationMenu
├── NavigationMenuList
│   ├── NavigationMenuItem
│   │   ├── NavigationMenuTrigger
│   │   └── NavigationMenuContent
│   │       └── NavigationMenuLink
│   └── NavigationMenuItem
│       └── NavigationMenuLink`

const demoSnippet = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>...</NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>...</NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link href="/docs" />}
        className={navigationMenuTriggerStyle()}
      >
        Documentation
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`

const basicSnippet = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-96">
          <li>
            <NavigationMenuLink render={<Link href="/docs" />}>
              Introduction
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`

const iconsSnippet = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px]">
          <li>
            <NavigationMenuLink
              render={<Link href="#" className="flex-row items-center gap-2" />}
            >
              <CircleHelpIcon />
              Backlog
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`

const linkSnippet = `<NavigationMenuItem>
  <NavigationMenuLink
    render={<Link href="/docs" />}
    className={navigationMenuTriggerStyle()}
  >
    Documentation
  </NavigationMenuLink>
</NavigationMenuItem>`

export default function NavigationMenuDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Navigation Menu"
        description={description}
        slug="navigation-menu"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-64">
        <NavigationMenuDemo />
      </ComponentPreview>

      <ComponentInstall name="navigation-menu" />

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
          <code className="font-mono text-sm">NavigationMenu</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Basic</h2>
        <ComponentPreview code={basicSnippet} previewClassName="min-h-56">
          <NavigationMenuBasicDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Link</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">navigationMenuTriggerStyle()</code>{" "}
          on{" "}
          <code className="font-mono text-sm">NavigationMenuLink</code> for a
          top-level link that matches trigger styling. On Base UI, compose with{" "}
          <code className="font-mono text-sm">render</code>; on Radix UI, use{" "}
          <code className="font-mono text-sm">asChild</code>.
        </p>
        <CodeBlock code={linkSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">With Icon</h2>
        <ComponentPreview code={iconsSnippet} previewClassName="min-h-48">
          <NavigationMenuIconsDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            NavigationMenu
          </h3>
          <PropsTable data={navigationMenuPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            NavigationMenuTrigger
          </h3>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            NavigationMenuContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            NavigationMenuLink
          </h3>
          <PropsTable data={linkPropRows} />
        </div>
      </section>
    </article>
  )
}
