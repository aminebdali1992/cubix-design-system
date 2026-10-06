import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import * as aria from "@/components/cubix/aria/progress"
import * as base from "@/components/cubix/base/progress"
import * as radix from "@/components/cubix/radix/progress"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"

function indicatorWidth(container: HTMLElement) {
  const indicator = container.querySelector<HTMLElement>('[data-slot="progress-indicator"]')
  return indicator?.style.width
}

describe.each(byBase({ base, aria, radix }))(
  "Progress (%s)",
  (_base, { Progress, ProgressLabel, ProgressValue }) => {
    it("exposes the value on a progressbar and fills the indicator", () => {
      const { container } = render(<Progress value={40} aria-label="Upload" />)
      const progressbar = screen.getByRole("progressbar", { name: "Upload" })

      expect(progressbar).toHaveAttribute("aria-valuenow", "40")
      expect(progressbar).toHaveAttribute("aria-valuemin", "0")
      expect(progressbar).toHaveAttribute("aria-valuemax", "100")
      expect(container.querySelector('[data-slot="progress"]')).toBeInTheDocument()
      expect(container.querySelector('[data-slot="progress-track"]')).toBeInTheDocument()
      expect(indicatorWidth(container)).toBe("40%")
    })

    it("is named by ProgressLabel and shows the percentage", () => {
      render(
        <Progress value={56}>
          <ProgressLabel>Upload progress</ProgressLabel>
          <ProgressValue />
        </Progress>
      )

      expect(screen.getByRole("progressbar", { name: "Upload progress" })).toBeInTheDocument()
      expect(screen.getByText("56%")).toHaveAttribute("data-slot", "progress-value")
    })

    it("scales the indicator against max", () => {
      const { container } = render(<Progress value={5} max={20} aria-label="Steps" />)

      expect(screen.getByRole("progressbar", { name: "Steps" })).toHaveAttribute(
        "aria-valuemax",
        "20"
      )
      expect(indicatorWidth(container)).toBe("25%")
    })

    it("is indeterminate without a value", () => {
      render(<Progress value={null} aria-label="Loading" />)

      expect(screen.getByRole("progressbar", { name: "Loading" })).not.toHaveAttribute(
        "aria-valuenow"
      )
    })

    it("has no accessibility violations", async () => {
      const { container } = render(
        <>
          <Progress value={30} aria-label="Download" />
          <Progress value={80}>
            <ProgressLabel>Upload</ProgressLabel>
            <ProgressValue />
          </Progress>
        </>
      )

      await expectNoAxeViolations(container)
    })
  }
)
