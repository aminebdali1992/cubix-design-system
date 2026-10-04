export type ChangelogEntry = {
  id: string;
  date: string;
  title: string;
  summary: string;
  sections: {
    heading: string;
    body: string[];
    bullets?: string[];
    code?: { title: string; lang?: string; content: string };
  }[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    id: "2026-10-mcp",
    date: "October 2026",
    title: "HTTP MCP server for the Cubix registry",
    summary:
      "Agents can connect over Streamable HTTP to list, search, and fetch install commands and demos from the live Cubix registry - the same catalog cubix-ui uses.",
    sections: [
      {
        heading: "What shipped",
        body: [
          "A public, read-only MCP endpoint at /api/mcp implements the 2025-03-26 Streamable HTTP transport (JSON or SSE). It exposes list_components, search_components, get_component, get_component_demo, and get_install_command against public/r.",
        ],
        bullets: [
          "One public Streamable HTTP URL for Cursor, Codex, Claude, and other MCP clients.",
          "Docs cover Cursor mcp.json, Codex CLI/config.toml, and Claude CLI.",
          "Landing Behind the scenes section points agents at MCP plus the Cubix Skill.",
        ],
        code: {
          title: "Terminal",
          lang: "shell",
          content: `# Cursor: .cursor/mcp.json → { "mcpServers": { "cubix": { "url": "https://cubixflow.ir/api/mcp" } } }
codex mcp add cubix --url https://cubixflow.ir/api/mcp
claude mcp add --transport http cubix https://cubixflow.ir/api/mcp
npx skills add aminebdali1992/cubix-design-system`,
        },
      },
    ],
  },
  {
    id: "2026-10-release",
    date: "October 2026",
    title: "Public readiness contract and cubix-ui@0.1.4",
    summary:
      "Only three-base, documented, registered components are installable. The cubix-ui CLI ships on npm at 0.1.4 with a registry packaging fix so add works for Base UI, React Aria, and Radix.",
    sections: [
      {
        heading: "What shipped",
        body: [
          "The site, registry, and CLI now share one readiness contract: a slug is public only with Base UI, React Aria, and Radix sources, docs, and a registry entry. Roadmap items stay Coming soon without a fake install path.",
        ],
        bullets: [
          "cubix-ui@0.1.4 on npm - init, add, search, view, build, and info against https://cubixflow.ir/r.",
          "Registry build rewrites base/aria/radix import paths, fills registryDependencies, resolves shared re-exports, and ships lib helpers such as aria-field-value.",
          "GitHub Actions CI verifies lint, typecheck, readiness sync, docs build, registry freshness, packaging contracts, and ready-component quality audits on main.",
          "Public registry lists ready components only (42 installable names, including direction and input).",
          "Upgrade docs explain how to refresh owned components with cubix-ui add --overwrite, bases, and pinned CLI versions.",
          "App Shells and Bento Grids block routes are honest Coming soon pages - no stub source files.",
        ],
        code: {
          title: "Terminal",
          lang: "shell",
          content: `npx cubix-ui@latest --version
npx cubix-ui@latest init
npx cubix-ui@latest add button`,
        },
      },
      {
        heading: "Still on the roadmap",
        body: [
          "Agent surfaces and other catalog items marked Coming soon stay off public install until each meets the same production bar. They are not stubbed in the registry.",
        ],
      },
    ],
  },
  {
    id: "2026-10-docs",
    date: "October 2026",
    title: "Get started docs finalized",
    summary:
      "Introduction through Changelog now share one docs system: lead headers, semantic tokens, next-step cards, accurate roadmap status, and framework logos aligned with supported hosts.",
    sections: [
      {
        heading: "What changed",
        body: [
          "The Get started path is production-ready for onboarding: clearer principles, live token previews, command overviews, and cards that link to the next page without inventing a second visual language.",
        ],
        bullets: [
          "Introduction - ownership model, three bases, agent surfaces, Typeset, RTL, and Skills.",
          "Components - available vs roadmap, with install command and base note.",
          "Installation - CLI and Manual setup, including Laravel (Inertia) and Manual React hosts.",
          "Theming, CLI, Upgrade, Typeset, Skills, Registry - consistent structure and next steps.",
        ],
      },
    ],
  },
  {
    id: "2026-09-docs",
    date: "September 2026",
    title: "Get started docs",
    summary:
      "A full Get started path for Cubix: Installation, Theming, CLI, Typeset, Skills, Registry, and Changelog - written for teams shipping production UI.",
    sections: [
      {
        heading: "What shipped",
        body: [
          "The docs sidebar now walks you from first install to publishing your own registry. Each page uses the same Cubix patterns as the component docs: clear sections, package-manager command tabs, and dotted inline links.",
        ],
        bullets: [
          "Installation - init, bases, and manual bootstrap.",
          "Theming - live token palette, radius scale, and default CSS from globals.css.",
          "CLI - init, add, view, search, build, and info.",
          "Typeset - fonts, type scale, and rhythm presets for docs and chat.",
          "Skills - Agent Skills install and project-aware Cubix guidance.",
          "Registry - catalog and item schemas, namespaces, and authoring rules.",
        ],
      },
      {
        heading: "Try it",
        body: [
          "Start from Installation, then pick a component from the catalog:",
        ],
        code: {
          title: "Terminal",
          lang: "shell",
          content: `npx cubix-ui@latest init
npx cubix-ui@latest add button`,
        },
      },
    ],
  },
  {
    id: "2026-09-agent",
    date: "September 2026",
    title: "Agent UI primitives",
    summary:
      "Dedicated building blocks for chat and agent products are advancing under the same readiness contract as the rest of Cubix - three bases, docs, and registry before public install.",
    sections: [
      {
        heading: "In progress",
        body: [
          "Agent surfaces follow the same ownership model as every other Cubix component: TypeScript source under components/cubix, three bases, and semantic tokens. They stay on the Components roadmap - without public docs or install - until each meets the production bar across Base UI, React Aria, and Radix.",
        ],
        bullets: [
          "Conversation - stick-to-bottom chat shell with empty and scroll controls.",
          "Prompt Input - composer patterns for agent turns.",
          "Thinking, Tool Call, Streaming Text, Code Block, Sources, and more.",
          "Message Scroller - Cubix-owned scroller with no third-party UI kit dependency.",
          "Blocks - agent chat workspace templates under /blocks/ai-agent.",
        ],
      },
      {
        heading: "Track readiness",
        body: [
          "When a surface meets the contract, it moves from On the roadmap to Available on the Components page, unlocks in the sidebar, and appears in the public registry.",
        ],
      },
    ],
  },
  {
    id: "2026-09-bases",
    date: "September 2026",
    title: "Three bases, one API",
    summary:
      "Install against Base UI, React Aria, or Radix UI while keeping the Cubix visual API aligned across docs, registry items, and CLI flags.",
    sections: [
      {
        heading: "How it works",
        body: [
          "Default base is Base UI. Pass --base aria or --base radix when you init or add a component. Docs pages expose a base switcher so you can compare the same control across backends without changing product copy or token usage.",
        ],
        bullets: [
          "Named exports, data-slot on every part, cn() for className.",
          "Semantic tokens only - background, foreground, muted, accent, primary, destructive, border, input, ring.",
          "asChild maps to the primitive compose API (render on Base UI, Slot on Radix).",
        ],
        code: {
          title: "Terminal",
          lang: "shell",
          content: `npx cubix-ui@latest add dialog --base radix
npx cubix-ui@latest add dialog --base aria`,
        },
      },
    ],
  },
  {
    id: "2026-09-foundation",
    date: "September 2026",
    title: "Design system foundation",
    summary:
      "Token-first theming in oklch, Tailwind CSS v4, Geist typography, Cubix scrollbar, and a production engineering bar for junior-to-senior teams.",
    sections: [
      {
        heading: "Highlights",
        body: [],
        bullets: [
          "Light and dark palettes as CSS variables in app/globals.css.",
          "Radius scale derived from a single --radius token.",
          "Geist Sans, Geist Mono, and IRANSans XV for Persian / RTL.",
          "cubix-scrollbar utility applied consistently across the docs site.",
          "Registry catalog at public/r with registry.json and per-component items.",
        ],
      },
      {
        heading: "Engineering standard",
        body: [
          "Cubix targets real production apps. Components and docs avoid placeholder code, keep the three bases in sync, and treat accessibility, TypeScript, and empty/loading/error states as required - not optional polish.",
        ],
      },
    ],
  },
];
