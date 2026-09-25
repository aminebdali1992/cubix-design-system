import type { Metadata } from "next"
import Link from "next/link"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  CarouselApiDemo,
  CarouselBasicDemo,
  CarouselOrientationDemo,
  CarouselRtlDemo,
  CarouselSizesDemo,
  CarouselSpacingDemo,
} from "@/components/examples/carousel-examples"
import {
  carouselPropRows,
  itemPropRows,
  navPropRows,
} from "./carousel-table-data"

export const metadata: Metadata = {
  title: "Carousel",
  description: "A carousel with motion and swipe built on Embla.",
}

const usageImport = `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/cubix/carousel"`

const usageSnippet = `<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`

const compositionSnippet = `Carousel
├── CarouselContent
│   ├── CarouselItem
│   └── CarouselItem
├── CarouselPrevious
└── CarouselNext`

const sizesSnippet = `<Carousel opts={{ align: "start" }}>
  <CarouselContent>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`

const spacingSnippet = `<Carousel>
  <CarouselContent className="-ms-1">
    <CarouselItem className="ps-1 md:basis-1/2">...</CarouselItem>
    <CarouselItem className="ps-1 md:basis-1/2">...</CarouselItem>
    <CarouselItem className="ps-1 md:basis-1/2">...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`

const orientationSnippet = `<Carousel
  orientation="vertical"
  opts={{ align: "start" }}
  className="w-full max-w-xs"
>
  <CarouselContent className="-mt-1 h-[200px]">
    <CarouselItem className="pt-1 md:basis-1/2">...</CarouselItem>
    <CarouselItem className="pt-1 md:basis-1/2">...</CarouselItem>
    <CarouselItem className="pt-1 md:basis-1/2">...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`

const optsSnippet = `<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>`

const apiSnippet = `const [api, setApi] = React.useState<CarouselApi>()
const [current, setCurrent] = React.useState(0)
const [count, setCount] = React.useState(0)

React.useEffect(() => {
  if (!api) return

  const sync = () => {
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
  }

  sync()
  api.on("select", sync)
  api.on("reInit", sync)

  return () => {
    api.off("select", sync)
    api.off("reInit", sync)
  }
}, [api])

return (
  <Carousel setApi={setApi}>
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
)`

const pluginsSnippet = `import Autoplay from "embla-carousel-autoplay"

<Carousel
  plugins={[
    Autoplay({
      delay: 2000,
    }),
  ]}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>`

const rtlSnippet = `<div dir="rtl" lang="fa" className="mx-auto w-full max-w-xs px-12">
  <Carousel>
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>`

export default function CarouselDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Carousel"
        description="A carousel with motion and swipe built on Embla."
        slug="carousel"
      />

      <ComponentPreview code={usageSnippet}>
        <CarouselBasicDemo />
      </ComponentPreview>

      <ComponentInstall name="carousel" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">About</h2>
        <p className="leading-relaxed text-muted-foreground">
          Built on Embla Carousel. Slide gaps and nav buttons use logical
          properties so RTL stays correct. Under a{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code>{" "}
          ancestor, Embla{" "}
          <code className="font-mono text-sm">direction</code> resolves to{" "}
          <code className="font-mono text-sm">rtl</code> automatically.
        </p>
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
          <code className="font-mono text-sm">Carousel</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <p className="leading-relaxed text-muted-foreground">
            Set slide width with{" "}
            <code className="font-mono text-sm">basis</code> on{" "}
            <code className="font-mono text-sm">CarouselItem</code>.
          </p>
          <ComponentPreview code={sizesSnippet}>
            <CarouselSizesDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Spacing</h3>
          <p className="leading-relaxed text-muted-foreground">
            Space slides with a negative margin on{" "}
            <code className="font-mono text-sm">CarouselContent</code> and
            matching padding on each item. Prefer logical{" "}
            <code className="font-mono text-sm">-ms-*</code> /{" "}
            <code className="font-mono text-sm">ps-*</code> for RTL.
          </p>
          <ComponentPreview code={spacingSnippet}>
            <CarouselSpacingDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Orientation
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">orientation</code> prop
            to set the scroll axis.
          </p>
          <ComponentPreview code={orientationSnippet}>
            <CarouselOrientationDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Options</h3>
          <p className="leading-relaxed text-muted-foreground">
            Pass Embla options through the{" "}
            <code className="font-mono text-sm">opts</code> prop.
          </p>
          <CodeBlock code={optsSnippet} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">API</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">setApi</code> to keep an
            Embla instance and read the current slide.
          </p>
          <ComponentPreview code={apiSnippet}>
            <CarouselApiDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Plugins</h3>
          <p className="leading-relaxed text-muted-foreground">
            Add Embla plugins with the{" "}
            <code className="font-mono text-sm">plugins</code> prop. Autoplay
            needs the extra{" "}
            <code className="font-mono text-sm">embla-carousel-autoplay</code>{" "}
            package.
          </p>
          <CodeBlock code={pluginsSnippet} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap the carousel in{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code>. Gaps,
          chevrons, and Embla direction follow reading order. To enable RTL
          app-wide, see the{" "}
          <Link
            href="/docs/components/direction"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            Direction
          </Link>{" "}
          guide.
        </p>
        <ComponentPreview code={rtlSnippet}>
          <CarouselRtlDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> See the Embla
            Carousel docs for the full list of options, events, and plugins.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Carousel</h3>
        <p className="leading-relaxed text-muted-foreground">
          The root that provides the Embla instance to content and controls.
        </p>
        <PropsTable data={carouselPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CarouselItem
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          A single slide. Use basis classes to show more than one item.
        </p>
        <PropsTable data={itemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CarouselPrevious / CarouselNext
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Previous and next buttons. They disable at the ends unless loop is on.
        </p>
        <PropsTable data={navPropRows} />
      </section>
    </article>
  )
}
