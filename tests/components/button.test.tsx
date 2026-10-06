import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/button"
import * as base from "@/components/cubix/base/button"
import * as radix from "@/components/cubix/radix/button"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"

describe.each(byBase({ base, aria, radix }))("Button (%s)", (_base, { Button }) => {
  it("renders a native button with slot, variant and size data", () => {
    render(
      <Button variant="outline" size="sm">
        Save
      </Button>
    )
    const button = screen.getByRole("button", { name: "Save" })

    expect(button.tagName).toBe("BUTTON")
    expect(button).toHaveAttribute("data-slot", "button")
    expect(button).toHaveAttribute("data-variant", "outline")
    expect(button).toHaveAttribute("data-size", "sm")
  })

  it("defaults to the default variant and size", () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })

    expect(button).toHaveAttribute("data-variant", "default")
    expect(button).toHaveAttribute("data-size", "default")
  })

  it("does not submit a surrounding form", async () => {
    const onSubmit = vi.fn()
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <Button>Save</Button>
      </form>
    )

    await userEvent.click(screen.getByRole("button", { name: "Save" }))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("activates on click, Enter and Space", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })

    await user.click(button)
    button.focus()
    await user.keyboard("{Enter}")
    await user.keyboard(" ")

    expect(onClick).toHaveBeenCalledTimes(3)
  })

  it("is not activated or focusable by Tab when disabled", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    )
    const button = screen.getByRole("button", { name: "Save" })

    await user.click(button)
    await user.tab()

    expect(button).toBeDisabled()
    expect(button).not.toHaveFocus()
    expect(onClick).not.toHaveBeenCalled()
  })

  it("forwards aria-invalid for the destructive ring", () => {
    render(<Button aria-invalid>Save</Button>)

    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("aria-invalid", "true")
  })

  it("merges a consumer className with the variant classes", () => {
    render(<Button className="w-full">Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })

    expect(button).toHaveClass("w-full")
    expect(button).toHaveClass("bg-primary")
  })

  it("composes onto a link through render", () => {
    render(
      <Button render={<a href="/docs" />} nativeButton={false} variant="outline">
        Docs
      </Button>
    )
    const link = screen.getByRole("link", { name: "Docs" })

    expect(link).toHaveAttribute("href", "/docs")
    expect(link).toHaveAttribute("data-slot", "button")
    expect(link).toHaveAttribute("data-variant", "outline")
  })

  it("marks Latin-only labels so they keep the Latin baseline", () => {
    render(
      <>
        <Button>Save</Button>
        <Button>ذخیره</Button>
      </>
    )

    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("data-script", "latn")
    expect(screen.getByRole("button", { name: "ذخیره" })).not.toHaveAttribute("data-script")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Button>Save</Button>
        <Button size="icon" aria-label="Close">
          <svg aria-hidden="true" />
        </Button>
        <Button disabled>Disabled</Button>
      </>
    )

    await expectNoAxeViolations(container)
  })
})
