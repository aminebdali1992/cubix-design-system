import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import * as ariaEmpty from "@/components/cubix/aria/empty"
import * as ariaKbd from "@/components/cubix/aria/kbd"
import * as ariaLabel from "@/components/cubix/aria/label"
import * as ariaSkeleton from "@/components/cubix/aria/skeleton"
import * as ariaSpinner from "@/components/cubix/aria/spinner"
import * as baseEmpty from "@/components/cubix/base/empty"
import * as baseKbd from "@/components/cubix/base/kbd"
import * as baseLabel from "@/components/cubix/base/label"
import * as baseSkeleton from "@/components/cubix/base/skeleton"
import * as baseSpinner from "@/components/cubix/base/spinner"
import * as radixEmpty from "@/components/cubix/radix/empty"
import * as radixKbd from "@/components/cubix/radix/kbd"
import * as radixLabel from "@/components/cubix/radix/label"
import * as radixSkeleton from "@/components/cubix/radix/skeleton"
import * as radixSpinner from "@/components/cubix/radix/spinner"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"

describe.each(
  byBase({ base: baseEmpty, aria: ariaEmpty, radix: radixEmpty })
)("Empty (%s)", (_base, empty) => {
  const { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } = empty

  it("renders every part with its slot and the media variant", () => {
    const { container } = render(
      <Empty className="custom-empty">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <svg aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No projects</EmptyTitle>
          <EmptyDescription>Create a project to get started.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Actions</EmptyContent>
      </Empty>
    )

    for (const slot of [
      "empty",
      "empty-header",
      "empty-icon",
      "empty-title",
      "empty-description",
      "empty-content",
    ]) {
      expect(container.querySelector(`[data-slot="${slot}"]`)).toBeInTheDocument()
    }
    expect(container.querySelector('[data-slot="empty"]')).toHaveClass("custom-empty")
    expect(container.querySelector('[data-slot="empty-icon"]')).toHaveAttribute(
      "data-variant",
      "icon"
    )
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No projects</EmptyTitle>
          <EmptyDescription>Create a project to get started.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )

    await expectNoAxeViolations(container)
  })
})

describe.each(byBase({ base: baseKbd, aria: ariaKbd, radix: radixKbd }))(
  "Kbd (%s)",
  (_base, { Kbd, KbdGroup }) => {
    it("renders keys as kbd elements inside a group", () => {
      const { container } = render(
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd className="custom-key">K</Kbd>
        </KbdGroup>
      )

      const group = container.querySelector('[data-slot="kbd-group"]')
      expect(group?.tagName).toBe("KBD")
      expect(screen.getByText("K")).toHaveAttribute("data-slot", "kbd")
      expect(screen.getByText("K")).toHaveClass("custom-key")
    })
  }
)

describe.each(
  byBase({ base: baseSkeleton, aria: ariaSkeleton, radix: radixSkeleton })
)("Skeleton (%s)", (_base, { Skeleton }) => {
  it("renders a pulsing placeholder that merges className", () => {
    const { container } = render(<Skeleton className="h-4 w-24" />)
    const skeleton = container.querySelector('[data-slot="skeleton"]')

    expect(skeleton).toHaveClass("animate-pulse", "h-4", "w-24")
  })
})

describe.each(
  byBase({ base: baseSpinner, aria: ariaSpinner, radix: radixSpinner })
)("Spinner (%s)", (_base, { Spinner }) => {
  it("announces a loading status with a default and an overridable name", () => {
    const { rerender } = render(<Spinner />)
    expect(screen.getByRole("status")).toHaveAccessibleName("در حال بارگذاری")

    rerender(<Spinner aria-label="Loading results" />)
    expect(screen.getByRole("status")).toHaveAccessibleName("Loading results")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />)

    await expectNoAxeViolations(container)
  })
})

describe.each(byBase({ base: baseLabel, aria: ariaLabel, radix: radixLabel }))(
  "Label (%s)",
  (_base, { Label }) => {
    it("names and focuses its control through htmlFor", async () => {
      const user = userEvent.setup()
      render(
        <>
          <Label htmlFor="email" className="custom-label">
            Email
          </Label>
          <input id="email" type="email" />
        </>
      )

      const input = screen.getByRole("textbox", { name: "Email" })
      expect(screen.getByText("Email")).toHaveAttribute("data-slot", "label")
      expect(screen.getByText("Email")).toHaveClass("custom-label")

      await user.click(screen.getByText("Email"))
      expect(input).toHaveFocus()
    })

    it("has no accessibility violations", async () => {
      const { container } = render(
        <>
          <Label htmlFor="name">Name</Label>
          <input id="name" />
        </>
      )

      await expectNoAxeViolations(container)
    })
  }
)
