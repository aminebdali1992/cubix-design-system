// @vitest-environment node
import { describe, expect, it, vi } from "vitest"

import { isValidColor } from "@/app/ds-manager/_lib/palette"

describe("isValidColor", () => {
  it("rejects blank input everywhere", () => {
    expect(isValidColor("")).toBe(false)
    expect(isValidColor("   ")).toBe(false)
  })

  it("accepts values during server rendering, where CSS is undefined", () => {
    vi.stubGlobal("CSS", undefined)

    expect(isValidColor("oklch(0.6 0.2 250)")).toBe(true)
  })

  it("accepts values when a polyfill defines CSS without supports", () => {
    vi.stubGlobal("CSS", { escape: (value: string) => value })

    expect(isValidColor("oklch(0.6 0.2 250)")).toBe(true)
  })

  it("defers to CSS.supports in the browser", () => {
    const supports = vi.fn((_property: string, value: string) => value === "red")
    vi.stubGlobal("CSS", { supports })

    expect(isValidColor("red")).toBe(true)
    expect(isValidColor("not-a-color")).toBe(false)
    expect(supports).toHaveBeenCalledWith("color", "not-a-color")
  })
})
