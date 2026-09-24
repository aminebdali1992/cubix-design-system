export const catalogSnippet = `{
  "$schema": "https://cubix.design/schema/registry.json",
  "name": "cubix",
  "homepage": "https://cubix.design",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "Displays a button or a component that looks like a button.",
      "files": [
        {
          "path": "public/r/button.json",
          "type": "registry:ui"
        }
      ]
    }
  ]
}`;

export const itemSnippet = `{
  "$schema": "https://cubix.design/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Displays a button or a component that looks like a button.",
  "dependencies": ["@base-ui/react"],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/cubix/button.tsx",
      "type": "registry:ui",
      "target": "components/cubix/button.tsx"
    }
  ]
}`;

export const itemWithDepsSnippet = `{
  "$schema": "https://cubix.design/schema/registry-item.json",
  "name": "date-picker",
  "type": "registry:ui",
  "title": "Date Picker",
  "description": "A date picker component with range and presets.",
  "dependencies": ["date-fns", "chrono-node"],
  "registryDependencies": [
    "button",
    "calendar",
    "popover",
    "input",
    "input-group"
  ],
  "files": [
    {
      "path": "components/cubix/date-picker.tsx",
      "type": "registry:ui",
      "target": "components/cubix/date-picker.tsx"
    }
  ]
}`;

export const authorCatalogSnippet = `{
  "$schema": "https://cubix.design/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A simple button component.",
      "files": [
        {
          "path": "components/cubix/button.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}`;

export const namespaceCubixSnippet = `{
  "registries": {
    "@cubix": "https://cubix.design/r/{name}.json"
  }
}`;

export const namespaceCustomSnippet = `{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}`;

export const itemTypes = [
  {
    type: "registry:ui",
    description: "Reusable UI primitives under components/cubix.",
  },
  {
    type: "registry:component",
    description: "Composed components that are not core primitives.",
  },
  {
    type: "registry:block",
    description: "Larger page or section templates (chat shells, 404s).",
  },
  {
    type: "registry:hook",
    description: "Shared React hooks.",
  },
  {
    type: "registry:lib",
    description: "Utilities and helpers (for example path aliases under lib).",
  },
  {
    type: "registry:style",
    description: "CSS tokens or style fragments for the design system.",
  },
] as const;

export const itemFields = [
  {
    name: "name",
    required: true,
    description: "Stable id used by the CLI (button, prompt-input).",
  },
  {
    name: "type",
    required: true,
    description: "Item kind, usually registry:ui for Cubix components.",
  },
  {
    name: "title",
    required: false,
    description: "Human-readable label shown in docs and search.",
  },
  {
    name: "description",
    required: false,
    description: "Short summary for humans and AI assistants.",
  },
  {
    name: "dependencies",
    required: false,
    description: "npm packages to install (for example @base-ui/react).",
  },
  {
    name: "registryDependencies",
    required: false,
    description: "Other registry items that must be installed first.",
  },
  {
    name: "files",
    required: true,
    description: "Source files with path, type, and optional target.",
  },
] as const;
