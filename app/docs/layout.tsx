import { DocsMobileNav, DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";
import { DocsPager } from "@/components/docs/docs-pager";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DocsMobileNav>
      <div className="flex w-full">
        <DocsSidebar />
        <main className="min-w-0 flex-1">
          <div className="docs-prose mx-auto max-w-3xl px-4 py-8 font-sans text-body leading-prose sm:px-6 lg:px-8 lg:py-12 [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading">
            {children}
            <DocsPager />
          </div>
        </main>
        <div className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 min-w-0 shrink-0 overflow-hidden xl:block">
          <DocsToc />
        </div>
      </div>
    </DocsMobileNav>
  );
}
