import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/toggle"
import * as base from "@/components/cubix/base/toggle"
import * as radix from "@/components/cubix/radix/toggle"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"
import { isDisabledControl } from "@/tests/utils/dom"

describe.each(byBase({ base, aria, radix }))("Toggle (%s)", (_base, { Toggle }) => {
  it("exposes the toggle slot and variant classes", () => {
    render(
      <Toggle aria-label="Bold" variant="outline" size="sm" className="custom-toggle">
        B
      </Toggle>
    )
    const toggle = screen.getByRole("button", { name: "Bold" })

    expect(toggle).toHaveAttribute("data-slot", "toggle")
    expect(toggle).toHaveClass("border-input", "h-7", "custom-toggle")
    expect(toggle).toHaveAttribute("aria-pressed", "false")
  })

  it("toggles on click and reports the pressed state", async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    render(
      <Toggle aria-label="Bold" onPressedChange={onPressedChange}>
        B
      </Toggle>
    )
    const toggle = screen.getByRole("button", { name: "Bold" })

    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-pressed", "true")
    expect(onPressedChange.mock.lastCall?.[0]).toBe(true)

    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-pressed", "false")
    expect(onPressedChange.mock.lastCall?.[0]).toBe(false)
  })

  it("toggles with Enter and Space", async () => {
    const user = userEvent.setup()
    render(<Toggle aria-label="Bold">B</Toggle>)
    const toggle = screen.getByRole("button", { name: "Bold" })

    await user.tab()
    expect(toggle).toHaveFocus()
    await user.keyboard("{Enter}")
    expect(toggle).toHaveAttribute("aria-pressed", "true")
    await user.keyboard(" ")
    expect(toggle).toHaveAttribute("aria-pressed", "false")
  })

  it("starts from defaultPressed and stays controlled by pressed", async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    const { unmount } = render(
      <Toggle aria-label="Italic" defaultPressed>
        I
      </Toggle>
    )
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    unmount()

    render(
      <Toggle aria-label="Bold" pressed onPressedChange={onPressedChange}>
        B
      </Toggle>
    )
    const toggle = screen.getByRole("button", { name: "Bold" })
    await user.click(toggle)

    expect(onPressedChange.mock.lastCall?.[0]).toBe(false)
    expect(toggle).toHaveAttribute("aria-pressed", "true")
  })

  it("ignores interaction when disabled", async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    render(
      <Toggle aria-label="Bold" disabled onPressedChange={onPressedChange}>
        B
      </Toggle>
    )
    const toggle = screen.getByRole("button", { name: "Bold" })

    await user.click(toggle)

    expect(isDisabledControl(toggle)).toBe(true)
    expect(toggle).toHaveAttribute("aria-pressed", "false")
    expect(onPressedChange).not.toHaveBeenCalled()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Toggle aria-label="Bold">B</Toggle>
        <Toggle aria-label="Italic" defaultPressed variant="outline">
          I
        </Toggle>
        <Toggle aria-label="Underline" disabled>
          U
        </Toggle>
      </>
    )

    await expectNoAxeViolations(container)
  })
})
