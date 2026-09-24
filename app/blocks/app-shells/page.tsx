import type { Metadata } from "next"

import { BlockList } from "@/components/blocks/block-list"
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/cubix/accordion"
import { appShellBlocks, appShellFaqs } from "@/app/blocks/blocks-data"

export const metadata: Metadata = {
  title: "App Shells",
  description:
    "The main wrapper for your entire application layouts - built with Cubix.",
}

export default function AppShellsBlocksPage() {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title="App Shells"
        description="The main wrapper for your entire application layouts - header, sidebar, and content areas that stay consistent across pages."
        actions={
          <p className="text-sm text-muted-foreground">
            Template previews - source landing soon.
          </p>
        }
      />

      <BlockList blocks={appShellBlocks} />

      <section className="mt-16 border-t py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">App Shells</h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Persistent application chrome for dashboards and product UI. Use
              these shells as starting points, then compose Cubix components
              inside.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">FAQs</h2>
            <Accordion defaultValue={["item-0"]}>
              {appShellFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
