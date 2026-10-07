export const USER_PROMPT = "Set up Cubix in this project and add a button."

export const AGENT_INTRO =
  "I'll run npx cubix-ui@latest init to configure Cubix, then add Button from the registry."

export const CONFIG_PATH = "cubix.json"

export const CONFIG_JSON = `{
  "$schema": "https://cubixflow.ir/schema.json",
  "style": "cubix",
  "base": "base",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/cubix",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}`

export const AGENT_SUCCESS =
  "Cubix is ready. Design tokens and lib/utils.ts are in place, and Button lives in components/cubix/button.tsx."

export type DemoPhase =
  | "idle"
  | "typing"
  | "sending"
  | "user-sent"
  | "thinking"
  | "agent-intro"
  | "tool-open"
  | "tool-writing"
  | "tool-done"
  | "success"
  | "hold"

export const PHASE_AT = {
  typing: 900,
  charMs: 32,
  afterTyped: 600,
  sending: 260,
  thinking: 900,
  agentIntro: 1100,
  toolOpen: 700,
  toolWriting: 2600,
  toolDone: 900,
  success: 800,
  hold: 3200,
} as const

type TreeEntry = {
  name: string
  kind: "folder" | "file"
  depth: number
  open?: boolean
  highlight?: boolean
}

export const FILE_TREE: TreeEntry[] = [
  { name: ".next", kind: "folder", depth: 0 },
  { name: "app", kind: "folder", depth: 0, open: true },
  { name: "favicon.ico", kind: "file", depth: 1 },
  { name: "globals.css", kind: "file", depth: 1 },
  { name: "layout.tsx", kind: "file", depth: 1 },
  { name: "page.tsx", kind: "file", depth: 1 },
  { name: "components", kind: "folder", depth: 0 },
  { name: "lib", kind: "folder", depth: 0 },
  { name: "node_modules", kind: "folder", depth: 0 },
  { name: "public", kind: "folder", depth: 0 },
  { name: ".gitignore", kind: "file", depth: 0 },
  { name: "cubix.json", kind: "file", depth: 0, highlight: true },
  { name: "eslint.config.mjs", kind: "file", depth: 0 },
  { name: "next-env.d.ts", kind: "file", depth: 0 },
  { name: "next.config.ts", kind: "file", depth: 0 },
  { name: "package.json", kind: "file", depth: 0 },
  { name: "postcss.config.mjs", kind: "file", depth: 0 },
  { name: "README.md", kind: "file", depth: 0 },
  { name: "tsconfig.json", kind: "file", depth: 0 },
]