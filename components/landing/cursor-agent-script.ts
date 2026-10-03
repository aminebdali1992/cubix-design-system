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

export const FILE_TREE = [
  { name: "app", kind: "folder" as const, depth: 0 },
  { name: "page.tsx", kind: "file" as const, depth: 1 },
  { name: "components", kind: "folder" as const, depth: 0 },
  { name: "lib", kind: "folder" as const, depth: 0 },
  { name: "cubix.json", kind: "file" as const, depth: 0, highlight: true },
  { name: "package.json", kind: "file" as const, depth: 0 },
]
