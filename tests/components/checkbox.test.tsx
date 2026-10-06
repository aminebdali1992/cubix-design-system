import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/checkbox"
import * as base from "@/components/cubix/base/checkbox"
import * as radix from "@/components/cubix/radix/checkbox"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"
import { isDisabledControl } from "@/tests/utils/dom"

describe.each(byBase({ base, aria, radix }))("Checkbox (%s)", (_base, { Checkbox }) => {
  it("exposes the checkbox slot", () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />)

    expect(container.querySelector('[data-slot="checkbox"]')).toBeInTheDocument()
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).not.toBeChecked()
  })

  it("toggles on click and reports a boolean", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" onCheckedChange={onCheckedChange} />)
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" })

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(onCheckedChange.mock.lastCall?.[0]).toBe(true)

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(onCheckedChange.mock.lastCall?.[0]).toBe(false)
  })

  it("toggles with Space", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Accept terms" />)
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" })

    await user.tab()
    expect(checkbox).toHaveFocus()
    await user.keyboard(" ")

    expect(checkbox).toBeChecked()
  })

  it("starts from defaultChecked", () => {
    render(<Checkbox aria-label="Accept terms" defaultChecked />)

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeChecked()
  })

  it("stays controlled by checked", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" checked onCheckedChange={onCheckedChange} />)
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" })

    await user.click(checkbox)

    expect(onCheckedChange.mock.lastCall?.[0]).toBe(false)
    expect(checkbox).toBeChecked()
  })

  it("shows the indeterminate state as mixed", () => {
    render(<Checkbox aria-label="Select all" indeterminate />)

    expect(screen.getByRole("checkbox", { name: "Select all" })).toBePartiallyChecked()
  })

  it("ignores interaction when disabled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" disabled onCheckedChange={onCheckedChange} />)
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" })

    await user.click(checkbox)

    expect(isDisabledControl(checkbox)).toBe(true)
    expect(checkbox).not.toBeChecked()
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it("is busy and non-interactive while pending", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" pending onCheckedChange={onCheckedChange} />)
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" })

    await user.click(checkbox)

    expect(checkbox).toHaveAttribute("aria-busy", "true")
    expect(isDisabledControl(checkbox)).toBe(true)
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it("marks the control invalid from aria-invalid", () => {
    render(<Checkbox aria-label="Accept terms" aria-invalid />)

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toHaveAttribute(
      "aria-invalid",
      "true"
    )
  })

  it("is labelled by an external label through id", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Checkbox id="terms" />
        <label htmlFor="terms">Accept terms</label>
      </>
    )

    await user.click(screen.getByText("Accept terms"))

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeChecked()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Checkbox id="a" defaultChecked />
        <label htmlFor="a">Checked</label>
        <Checkbox id="b" indeterminate />
        <label htmlFor="b">Mixed</label>
        <Checkbox id="c" disabled />
        <label htmlFor="c">Disabled</label>
        <Checkbox id="d" aria-invalid />
        <label htmlFor="d">Invalid</label>
      </>
    )

    await expectNoAxeViolations(container)
  })
})
