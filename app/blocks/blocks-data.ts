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
