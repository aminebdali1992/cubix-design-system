import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  DrawerDemo,
  DrawerLayoutsDemo,
  DrawerNestedDemo,
  DrawerNonModalDemo,
  DrawerPositionDemo,
  DrawerResponsiveDemo,
  DrawerSnapPointsDemo,
  DrawerSwipeHandleDemo,
} from "@/components/examples/drawer-examples"

import {
  contentPropRows,
  drawerPropRows,
  subcomponentRows,
  triggerClosePropRows,
} from "./drawer-table-data"

const description = "A drawer component for React."

export const metadata: Metadata = {
  title: "Drawer",
  description,
}

const heroSnippet = `<Drawer
  open={open}
  onOpenChange={setOpen}
  showSwipeHandle={isMobile}
  swipeDirection={isMobile ? "down" : "right"}
>
  <DrawerTrigger render={<Button variant="outline" />}>
    Open Drawer
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Pick a delivery time</DrawerTitle>
      <DrawerDescription>
        We'll prepare your order as soon as possible.
      </DrawerDescription>
    </DrawerHeader>
    <div className="flex-1 overflow-y-auto p-4">
      <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime}>
        {/* delivery time options */}
      </RadioGroup>
    </div>
    <DrawerFooter>
      <Button onClick={handleConfirm}>Confirm Delivery Time</Button>
      <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`

const usageImport = `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/cubix/drawer"`

const usageSnippet = `<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">{/* Content here */}</div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`

const compositionSnippet = `Drawer
├── DrawerTrigger
└── DrawerContent
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── DrawerDescription
    └── DrawerFooter`

const bodySnippet = `body {
  position: relative;
}`

const heightSnippet = `<DrawerContent className="h-[50vh]">`

const widthSnippet = `<DrawerContent className="w-96">`

const axisSnippet = `<DrawerContent className="data-[swipe-axis=y]:max-h-[50vh] data-[swipe-axis=x]:w-96">`

const scrollSnippet = `<DrawerContent>
  <DrawerHeader>...</DrawerHeader>
  <div className="flex-1 overflow-y-auto p-4">{/* Scrollable content */}</div>
  <DrawerFooter>...</DrawerFooter>
</DrawerContent>`

const layoutsSnippet = `<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Header</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit profile</DrawerTitle>
      <DrawerDescription>
        Make changes to your profile here.
      </DrawerDescription>
    </DrawerHeader>
    <div className="p-4">{/* Content */}</div>
  </DrawerContent>
</Drawer>`

const positionSnippet = `<Drawer swipeDirection="right">
  <DrawerTrigger render={<Button variant="outline" />}>right</DrawerTrigger>
  <DrawerContent>
    {/* ... */}
  </DrawerContent>
</Drawer>`

const swipeHandleSnippet = `<Drawer swipeDirection="down" showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>down</DrawerTrigger>
  <DrawerContent>
    {/* ... */}
  </DrawerContent>
</Drawer>`

const nestedSnippet = `<Drawer showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerFooter>
      <Drawer>
        <DrawerTrigger render={<Button />}>Open nested drawer</DrawerTrigger>
        <DrawerContent>{/* ... */}</DrawerContent>
      </Drawer>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`

const nonModalSnippet = `<Drawer
  modal={false}
  disablePointerDismissal
  swipeDirection="right"
>
  <DrawerTrigger render={<Button variant="outline" />}>Non Modal</DrawerTrigger>
  <DrawerContent>{/* ... */}</DrawerContent>
</Drawer>`

const snapPointsSnippet = `<Drawer snapPoints={["31rem", 1]} showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>
    Open Snap Drawer
  </DrawerTrigger>
  <DrawerContent className="max-h-[calc(100dvh-1rem)]">
    {/* ... */}
  </DrawerContent>
</Drawer>`

const responsiveSnippet = `"use client"

import * as React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/cubix/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/cubix/drawer"

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" />}>
          Edit Profile
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          {/* form */}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button variant="outline" />}>
        Edit Profile
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here.
          </DrawerDescription>
        </DrawerHeader>
        {/* form */}
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`

export default function DrawerDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Drawer"
        description={description}
        slug="drawer"
      />

      <ComponentPreview code={heroSnippet}>
        <DrawerDemo />
      </ComponentPreview>

      <ComponentInstall name="drawer" />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Add the following to your global styles. On iOS Safari, the drawer
          overlay is absolutely positioned and requires a positioned{" "}
          <code className="font-mono text-sm">body</code> to cover the viewport
          after the page is scrolled. See the{" "}
          <a
            href="https://base-ui.com/react/overview/quick-start#ios-26-safari"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            Base UI docs
          </a>{" "}
          for details.
        </p>
        <CodeBlock code={bodySnippet} title="app/globals.css" />
      </section>

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
          <code className="font-mono text-sm">Drawer</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          <code className="font-mono text-sm">DrawerContent</code> composes the
          portal, overlay, viewport, and popup from Base UI. For lower-level
          control,{" "}
          <code className="font-mono text-sm">DrawerPortal</code>,{" "}
          <code className="font-mono text-sm">DrawerOverlay</code>, and{" "}
          <code className="font-mono text-sm">DrawerSwipeHandle</code> are also
          exported.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Custom Sizes
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          A vertical drawer sizes itself to its content and is capped at{" "}
          <code className="font-mono text-sm">calc(100dvh - 6rem)</code> by
          default. A side drawer spans{" "}
          <code className="font-mono text-sm">75%</code> of the viewport width,
          or <code className="font-mono text-sm">24rem</code> on larger screens.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          To customize the height of a vertical drawer, use the{" "}
          <code className="font-mono text-sm">h-*</code> and{" "}
          <code className="font-mono text-sm">max-h-*</code> utilities on{" "}
          <code className="font-mono text-sm">DrawerContent</code>.
        </p>
        <CodeBlock code={heightSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          To customize the width of a side drawer, use the{" "}
          <code className="font-mono text-sm">w-*</code> and{" "}
          <code className="font-mono text-sm">max-w-*</code> utilities on{" "}
          <code className="font-mono text-sm">DrawerContent</code>.
        </p>
        <CodeBlock code={widthSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          When the same component renders in multiple directions, scope an
          override to one axis using the{" "}
          <code className="font-mono text-sm">data-[swipe-axis=*]</code>{" "}
          variants.
        </p>
        <CodeBlock code={axisSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          To make a region of the drawer scrollable, make the scroll container a
          flex item. Avoid <code className="font-mono text-sm">h-full</code>,
          which does not resolve inside a content-sized drawer.
        </p>
        <CodeBlock code={scrollSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Layouts</h2>
        <p className="leading-relaxed text-muted-foreground">
          Compose drawers with a header, footer, both, or edge-to-edge content.
        </p>
        <ComponentPreview code={layoutsSnippet}>
          <DrawerLayoutsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Styling</h2>
        <p className="leading-relaxed text-muted-foreground">
          The drawer exposes CSS variables for style-level customization. Set
          the sizing variables on{" "}
          <code className="font-mono text-sm">DrawerContent</code>. Set the
          overlay variable on{" "}
          <code className="font-mono text-sm">[data-slot=drawer-overlay]</code>{" "}
          in your CSS.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">Variable</th>
                <th className="px-4 py-3 text-left font-semibold">Default</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  --drawer-inset
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  --spacing(2)
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  Floats the drawer from the viewport edges.
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  --drawer-bleed-background
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  var(--color-popover)
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  Fills the gap behind the drawer on swipe overshoot.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  --drawer-overlay-min-opacity
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  0
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  Minimum overlay opacity. Defaults to{" "}
                  <code className="font-mono text-xs">0.5</code> when snap points
                  are active.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="leading-relaxed text-muted-foreground">
          The drawer also sets data attributes you can target with variants such
          as{" "}
          <code className="font-mono text-sm">data-[swipe-direction=down]:</code>{" "}
          on <code className="font-mono text-sm">DrawerContent</code>, or{" "}
          <code className="font-mono text-sm">
            group-data-[swipe-axis=y]/drawer-popup:
          </code>{" "}
          on its descendants.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">Attribute</th>
                <th className="px-4 py-3 text-left font-semibold">Values</th>
                <th className="px-4 py-3 text-left font-semibold">Set when</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  data-swipe-direction
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  up, right, down, left
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  Always.
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  data-swipe-axis
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  x, y
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  Always.
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  data-snap-points
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  Present
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  The drawer has snap points.
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  data-expanded
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  Present
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  The drawer is at the full snap point.
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  data-swiping
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  Present
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  A swipe is in progress.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                  data-nested-drawer-open
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                  Present
                </td>
                <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                  A nested drawer is open on top.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Position</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">swipeDirection</code> prop
          to set the side of the drawer.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Available options are <code className="font-mono text-sm">up</code>,{" "}
          <code className="font-mono text-sm">right</code>,{" "}
          <code className="font-mono text-sm">down</code>, and{" "}
          <code className="font-mono text-sm">left</code>.
        </p>
        <ComponentPreview code={positionSnippet}>
          <DrawerPositionDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Swipe Handle
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">showSwipeHandle</code> on{" "}
          <code className="font-mono text-sm">Drawer</code> to render a swipe
          handle.
        </p>
        <ComponentPreview code={swipeHandleSnippet}>
          <DrawerSwipeHandleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Nested</h2>
        <p className="leading-relaxed text-muted-foreground">
          Open drawers from inside another drawer. Parent drawers stay mounted
          and stack behind the frontmost drawer.
        </p>
        <ComponentPreview code={nestedSnippet}>
          <DrawerNestedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Non Modal</h2>
        <p className="leading-relaxed text-muted-foreground">
          Set <code className="font-mono text-sm">modal={"{false}"}</code> to
          allow interaction with the rest of the page while the drawer is open.
          Combine with{" "}
          <code className="font-mono text-sm">disablePointerDismissal</code> to
          prevent the drawer from closing on outside presses. Use{" "}
          <code className="font-mono text-sm">modal=&quot;trap-focus&quot;</code>{" "}
          to keep focus inside the drawer while leaving scroll and pointer
          interaction unrestricted.
        </p>
        <ComponentPreview code={nonModalSnippet}>
          <DrawerNonModalDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Snap Points
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">snapPoints</code> to snap a
          drawer to preset heights. Numbers between{" "}
          <code className="font-mono text-sm">0</code> and{" "}
          <code className="font-mono text-sm">1</code> represent fractions of the
          viewport. Numbers greater than{" "}
          <code className="font-mono text-sm">1</code> are treated as pixel
          values. String values support{" "}
          <code className="font-mono text-sm">px</code> and{" "}
          <code className="font-mono text-sm">rem</code> units. Snap points apply
          to vertical drawers.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Track the active snap point with the controlled{" "}
          <code className="font-mono text-sm">snapPoint</code> and{" "}
          <code className="font-mono text-sm">onSnapPointChange</code> props. At
          the full snap point, the drawer gets a{" "}
          <code className="font-mono text-sm">data-expanded</code> attribute you
          can style with the{" "}
          <code className="font-mono text-sm">data-expanded:</code> variant.
        </p>
        <ComponentPreview code={snapPointsSnippet}>
          <DrawerSnapPointsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Responsive</h2>
        <p className="leading-relaxed text-muted-foreground">
          You can combine the <code className="font-mono text-sm">Dialog</code>{" "}
          and <code className="font-mono text-sm">Drawer</code> components to
          create a responsive dialog. This renders a{" "}
          <code className="font-mono text-sm">Dialog</code> component on desktop
          and a <code className="font-mono text-sm">Drawer</code> on mobile.
        </p>
        <ComponentPreview code={responsiveSnippet}>
          <DrawerResponsiveDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See the{" "}
          <a
            href="https://base-ui.com/react/components/drawer"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            Base UI documentation
          </a>{" "}
          for the full API reference.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Drawer</h3>
          <PropsTable data={drawerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            DrawerTrigger / DrawerClose
          </h3>
          <PropsTable data={triggerClosePropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            DrawerContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            DrawerHeader / DrawerFooter / DrawerTitle / DrawerDescription
          </h3>
          <PropsTable data={subcomponentRows} />
        </div>
      </section>
    </article>
  )
}
