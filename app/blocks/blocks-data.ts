export type BlockNavLink = {
  title: string
  href: string
}

export type BlockCategory = {
  title: string
  href: string
  count: number
}

export type BlockItem = {
  id: string
  title: string
  description: string
  files?: {
    path: string
    content: string
  }[]
}

const emptyAppShellFiles = [
  {
    path: "app/dashboard/page.tsx",
    content: `export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      {/* Block content coming soon */}
    </div>
  )
}
`,
  },
  {
    path: "components/app-sidebar.tsx",
    content: `export function AppSidebar() {
  return null
}
`,
  },
  {
    path: "components/site-header.tsx",
    content: `export function SiteHeader() {
  return null
}
`,
  },
  {
    path: "components/data-table.tsx",
    content: `export function DataTable() {
  return null
}
`,
  },
]

export const blockNavigation: BlockNavLink[] = [
  { title: "Landing Page", href: "/blocks/landing-page" },
  { title: "AI Agent", href: "/blocks/ai-agent" },
]

export const blockCategories: BlockCategory[] = []

export const landingPageCategories: BlockCategory[] = [
  { title: "404 Sections", href: "/blocks/landing-page/404-sections", count: 6 },
]

export const eCommerceCategories: BlockCategory[] = []

export const aiAgentCategories: BlockCategory[] = [
  {
    title: "Chat Interfaces",
    href: "/blocks/ai-agent/chat-interfaces",
    count: 2,
  },
]

/** Default Blocks entry - first Landing Page category. */
export const defaultBlocksHref =
  landingPageCategories[0]?.href ?? "/blocks/landing-page"

export type BlocksSection =
  | "landing-page"
  | "application-ui"
  | "e-commerce"
  | "ai-agent"

export function getBlocksSection(pathname: string): BlocksSection {
  if (
    pathname === "/blocks" ||
    pathname === "/blocks/landing-page" ||
    pathname.startsWith("/blocks/landing-page/")
  ) {
    return "landing-page"
  }
  if (
    pathname === "/blocks/e-commerce" ||
    pathname.startsWith("/blocks/e-commerce/")
  ) {
    return "e-commerce"
  }
  if (
    pathname === "/blocks/ai-agent" ||
    pathname.startsWith("/blocks/ai-agent/")
  ) {
    return "ai-agent"
  }
  if (
    pathname === "/blocks/application-ui" ||
    pathname.startsWith("/blocks/application-ui/") ||
    pathname === "/blocks/app-shells" ||
    pathname.startsWith("/blocks/app-shells/") ||
    pathname === "/blocks/bento-grids" ||
    pathname.startsWith("/blocks/bento-grids/")
  ) {
    return "application-ui"
  }
  return "landing-page"
}

export function getCategoriesForSection(section: BlocksSection): BlockCategory[] {
  const categories = (() => {
    switch (section) {
      case "landing-page":
        return landingPageCategories
      case "e-commerce":
        return eCommerceCategories
      case "ai-agent":
        return aiAgentCategories
      default:
        return blockCategories
    }
  })()

  return categories.filter((category) => category.count > 0)
}

export function getLandingPageCategory(slug: string): BlockCategory | undefined {
  return landingPageCategories.find(
    (category) => category.href === `/blocks/landing-page/${slug}`
  )
}

export function getAiAgentCategory(slug: string): BlockCategory | undefined {
  return aiAgentCategories.find(
    (category) => category.href === `/blocks/ai-agent/${slug}`
  )
}

export const appShellBlocks: BlockItem[] = [
  {
    id: "app-shell-1",
    title: "Basic app shell with header and main content",
    description:
      "Top header with breadcrumbs, page title, and a main content area.",
    files: emptyAppShellFiles,
  },
  {
    id: "app-shell-2",
    title: "App shell with header, navigation and main content",
    description:
      "Header, tab navigation, and main content presented in a card.",
    files: emptyAppShellFiles,
  },
  {
    id: "app-shell-3",
    title: "App shell with header search and main content in card",
    description:
      "Breadcrumbs and search in the page header, with main content in a card.",
    files: emptyAppShellFiles,
  },
  {
    id: "app-shell-4",
    title: "App shell with sidebar, breadcrumbs and header",
    description:
      "Collapsible sidebar with breadcrumbs and header search.",
    files: emptyAppShellFiles,
  },
]

export const bentoGridBlocks: BlockItem[] = [
  {
    id: "bento-grid-1",
    title: "Bento grid with 4 cards",
    description:
      "A four-card bento that spotlights one hero feature with three supporting tiles.",
    files: emptyAppShellFiles,
  },
  {
    id: "bento-grid-2",
    title: "Bento grid with large images",
    description:
      "Edge-to-edge image tiles for visual feature highlights.",
    files: emptyAppShellFiles,
  },
  {
    id: "bento-grid-3",
    title: "Bento grid with 5 cards",
    description:
      "A denser five-tile layout for multiple product surfaces.",
    files: emptyAppShellFiles,
  },
  {
    id: "bento-grid-4",
    title: "Bento grid with feature title",
    description:
      "Text-led hero card with two supporting media tiles.",
    files: emptyAppShellFiles,
  },
  {
    id: "bento-grid-5",
    title: "Bento grid with horizontal hero",
    description:
      "A wide split hero card plus two supporting feature tiles.",
    files: emptyAppShellFiles,
  },
  {
    id: "bento-grid-6",
    title: "Bento grid with muted surface",
    description:
      "Soft muted tiles with a wide hero and three supporting cards.",
    files: emptyAppShellFiles,
  },
]

export const appShellFaqs = [
  {
    question: "What is an app shell?",
    answer:
      "A persistent layout with header, sidebar and content areas that stays consistent across pages.",
  },
  {
    question: "How do I handle responsive sidebars?",
    answer:
      "Collapse to icons or a drawer on smaller screens while keeping key actions reachable.",
  },
  {
    question: "Should the shell be sticky?",
    answer:
      "Headers often stay fixed so navigation and search remain available while scrolling.",
  },
  {
    question: "How do I manage page titles and breadcrumbs?",
    answer:
      "Place them in the content header area so routes are clear and scannable.",
  },
]
