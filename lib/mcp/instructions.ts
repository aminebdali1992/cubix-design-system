import { siteConfig } from "@/lib/site";

/**
 * Server-level guidance returned from initialize.
 * Keep this tight: agents read it once per session.
 */
export const MCP_INSTRUCTIONS = `Cubix is a copy-paste React / Next.js component registry. Components are owned source files installed with the cubix-ui CLI from ${siteConfig.registryUrl} - never an npm component package, and never a hand-rolled stub for a name that already exists.

Public readiness contract: a name is installable only when it has Base UI, React Aria, and Radix UI sources, docs, and a registry entry. If list_components / search_components does not return it, it is on the roadmap - do not invent source.

Before building UI:
1. Prefer project context from cubix.json or \`npx cubix-ui@latest info --json\` (base, aliases.ui, aliases.utils, Tailwind CSS entry).
2. If there is no cubix.json, tell the user to run \`npx cubix-ui@latest init\` once (or init -t next / vite / … for a new app).
3. Discover with search_components or list_components, then get_component / get_component_demo before composing.
4. Install with the command from get_install_command or get_component.install - never paste incomplete registry source by hand when the CLI can add it.

Composition rules:
- Import named exports from the ui alias (usually @/components/cubix/...).
- One primitive base per project: base (Base UI), aria (React Aria), or radix (Radix UI). Pass base to tools when the user wants a non-default base.
- Use Cubix semantic tokens (background, foreground, muted, accent, primary, destructive, border, input, ring). Never hardcode hex/rgb colors.
- Prefer Text Field / Email Field / Phone Field / Password Field over a bare Input when those registry items fit.
- Keep interactive states: disabled, aria-invalid, focus-visible. Support dark mode and RTL with logical properties (ms/me/ps/pe, start/end) - never left/right for layout.
- Pair long-form or chat copy with Cubix Typeset presets when the project uses them.

Tools on this server wrap the live registry at ${siteConfig.registryUrl}. For project-aware writing rules, also install the Cubix Agent Skill: npx skills add ${siteConfig.githubRepo}.`;
