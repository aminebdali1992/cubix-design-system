import { describe, expect, it } from "vitest"

import { cn } from "@/lib/utils"

describe("cn", () => {
  it("joins conditional classes", () => {
    expect(cn("flex", false, undefined, null, "gap-2", { italic: false, "font-medium": true })).toBe(
      "flex gap-2 font-medium"
    )
  })

  it("lets the later Tailwind utility win a conflict", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
  })

  it("treats Typeset sizes as one group", () => {
    expect(cn("text-body", "text-caption")).toBe("text-caption")
  })

  it("keeps a text color next to a Typeset size", () => {
    expect(cn("text-primary", "text-body")).toBe("text-primary text-body")
    expect(cn("text-label", "text-muted-foreground")).toBe("text-label text-muted-foreground")
  })
})
