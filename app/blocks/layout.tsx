import {
  BlocksMobileNav,
  BlocksSidebar,
} from "@/components/blocks/blocks-sidebar"

export default function BlocksLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <BlocksMobileNav>
      <div className="flex w-full min-h-[calc(100dvh-3.5rem)]">
        <BlocksSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </BlocksMobileNav>
  )
}
