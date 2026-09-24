export const frameworks = [
  {
    name: "Next.js",
    status: "First-class",
    description:
      "Full App Router & React Server Components support. Cubix is developed and tested against Next.js - the docs site you are reading is a Next.js app.",
    logo: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/></svg>`,
  },
  {
    name: "React (Vite)",
    status: "Supported",
    description:
      "Add the tokens to your CSS entry, set up the @/* path alias and paste the components. Works with Vite 5+ out of the box.",
    logo: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="2.15" fill="currentColor"/><ellipse cx="12" cy="12" rx="10.5" ry="4.2" stroke="currentColor" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="10.5" ry="4.2" transform="rotate(60 12 12)" stroke="currentColor" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="10.5" ry="4.2" transform="rotate(120 12 12)" stroke="currentColor" stroke-width="1.4"/></svg>`,
  },
  {
    name: "Remix / React Router",
    status: "Supported",
    description:
      "Components are client-compatible React sources - drop them into your app directory and they render as-is, including streaming.",
    logo: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.5 3.75h9.2c2.86 0 4.8 1.78 4.8 4.42 0 1.86-1.08 3.28-2.86 3.86l3.56 5.22h-3.42l-3.18-4.86H7.7v4.86H4.5V3.75Zm3.2 2.48v3.54h5.56c1.22 0 1.96-.66 1.96-1.76s-.74-1.78-1.96-1.78H7.7Z"/></svg>`,
  },
  {
    name: "Astro",
    status: "Supported",
    description:
      "Use Cubix inside Astro islands with @astrojs/react. Interactive components ship the 'use client' directive React needs.",
    logo: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.45 14.67c0 1.86 1.14 2.7 2.7 2.7 1.02 0 1.8-.42 2.28-1.02l.9 1.08c-.72.9-1.86 1.56-3.24 1.56-2.58 0-4.32-1.68-4.32-4.32 0-2.64 1.74-4.32 4.32-4.32 1.38 0 2.52.66 3.24 1.56l-.9 1.08c-.48-.6-1.26-1.02-2.28-1.02-1.56 0-2.7.84-2.7 2.7Zm8.1 4.32c-2.16 0-3.6-1.5-3.6-3.78s1.44-3.78 3.6-3.78 3.6 1.5 3.6 3.78-1.44 3.78-3.6 3.78Zm0-1.62c1.14 0 1.86-.84 1.86-2.16s-.72-2.16-1.86-2.16-1.86.84-1.86 2.16.72 2.16 1.86 2.16ZM8.1 2.4 2.4 18.3l2.1.9L9.3 5.1 8.1 2.4Zm7.8 0 5.7 15.9-2.1.9L14.7 5.1l1.2-2.7Z"/></svg>`,
  },
  {
    name: "TanStack Start",
    status: "Supported",
    description:
      "Fully SSR-compatible components that work with TanStack Start's router and server functions.",
    logo: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2 3.6 6.6v10.8L12 21.8l8.4-4.4V6.6L12 2.2Zm0 2.16 6.24 3.24L12 10.84 5.76 7.6 12 4.36Zm-6.6 5.1 6 3.18v6.36l-6-3.12V9.46Zm13.2 0v6.42l-6 3.12v-6.36l6-3.18Z"/></svg>`,
  },
  {
    name: "Gatsby / any React SPA",
    status: "Supported",
    description:
      "Any environment that renders React 18+ with Tailwind CSS v4 can use Cubix - CRA, Electron, React Native Web (via Tailwind), you name it.",
    logo: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm6.6 13.86H8.14v-1.4h7.08L8.4 7.78A8.02 8.02 0 0 1 12 4a8 8 0 0 1 8 8c0 1.38-.36 2.68-.98 3.82l-1.42.04ZM4 12c0-2.04.76-3.9 2.02-5.32L17.34 18A8 8 0 0 1 4 12Z"/></svg>`,
  },
] as const
