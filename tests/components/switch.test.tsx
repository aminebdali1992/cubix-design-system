import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/switch"
import * as base from "@/components/cubix/base/switch"
import * as radix from "@/components/cubix/radix/switch"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"
import { isDisabledControl } from "@/tests/utils/dom"

describe.each(byBase({ base, aria, radix }))("Switch (%s)", (_base, { Switch }) => {
  it("exposes the switch slot and size", () => {
    const { container } = render(<Switch aria-label="Notifications" size="sm" />)
    const slot = container.querySelector('[data-slot="switch"]')

    expect(slot).toHaveAttribute("data-size", "sm")
    expect(screen.getByRole("switch", { name: "Notifications" })).not.toBeChecked()
  })

  it("toggles on click and reports a boolean", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />)
    const control = screen.getByRole("switch", { name: "Notifications" })

    await user.click(control)
    expect(control).toBeChecked()
    expect(onCheckedChange.mock.lastCall?.[0]).toBe(true)

    await user.click(control)
    expect(control).not.toBeChecked()
    expect(onCheckedChange.mock.lastCall?.[0]).toBe(false)
  })

  it("toggles with Space", async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Notifications" />)
    const control = screen.getByRole("switch", { name: "Notifications" })

    await user.tab()
    expect(control).toHaveFocus()
    await user.keyboard(" ")

    expect(control).toBeChecked()
  })

  it("stays controlled by checked", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Notifications" checked onCheckedChange={onCheckedChange} />)
    const control = screen.getByRole("switch", { name: "Notifications" })

    await user.click(control)

    expect(onCheckedChange.mock.lastCall?.[0]).toBe(false)
    expect(control).toBeChecked()
  })

  it("ignores interaction when disabled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Notifications" disabled onCheckedChange={onCheckedChange} />)
    const control = screen.getByRole("switch", { name: "Notifications" })

    await user.click(control)

    expect(isDisabledControl(control)).toBe(true)
    expect(control).not.toBeChecked()
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it("marks the control invalid from aria-invalid", () => {
    render(<Switch aria-label="Notifications" aria-invalid />)

    expect(screen.getByRole("switch", { name: "Notifications" })).toHaveAttribute(
      "aria-invalid",
      "true"
    )
  })

  it("is labelled by an external label through id", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Switch id="notifications" />
        <label htmlFor="notifications">Notifications</label>
      </>
    )

    await user.click(screen.getByText("Notifications"))

    expect(screen.getByRole("switch", { name: "Notifications" })).toBeChecked()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Switch id="a" defaultChecked />
        <label htmlFor="a">On</label>
        <Switch id="b" disabled />
        <label htmlFor="b">Disabled</label>
        <Switch id="c" aria-invalid />
        <label htmlFor="c">Invalid</label>
      </>
    )

    await expectNoAxeViolations(container)
  })
})
