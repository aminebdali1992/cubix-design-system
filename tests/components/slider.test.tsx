import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/slider"
import * as base from "@/components/cubix/base/slider"
import * as radix from "@/components/cubix/radix/slider"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"
import { isDisabledControl } from "@/tests/utils/dom"

const LAYOUT_SIZE = 100

/* Base UI reveals thumbs once it has measured them, a tick after render. */
function findThumbs() {
  return screen.findAllByRole("slider")
}

async function findThumb() {
  const [thumb] = await findThumbs()
  return thumb
}

/*
  Thumbs are native range inputs on Base UI and React Aria and ARIA sliders
  on Radix. A native input carries its range in value / min / max, which is
  what assistive technology reads when the aria-value attributes are absent.
*/
function rangeOf(thumb: HTMLElement) {
  const input = thumb instanceof HTMLInputElement ? thumb : null
  return {
    now: thumb.getAttribute("aria-valuenow") ?? input?.value,
    min: thumb.getAttribute("aria-valuemin") ?? input?.min,
    max: thumb.getAttribute("aria-valuemax") ?? input?.max,
  }
}

function valuesOf(thumbs: HTMLElement[]) {
  return thumbs.map((thumb) => rangeOf(thumb).now)
}

describe.each(byBase({ base, aria, radix }))("Slider (%s)", (_base, { Slider }) => {
  /* jsdom has no layout, and Base UI keeps unmeasured thumbs hidden. */
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      width: LAYOUT_SIZE,
      height: LAYOUT_SIZE,
      right: LAYOUT_SIZE,
      bottom: LAYOUT_SIZE,
      toJSON: () => ({}),
    })
  })

  it("renders one thumb per value with its range", async () => {
    const { container } = render(
      <Slider aria-label="Volume" defaultValue={[30]} min={0} max={50} />
    )

    const thumbs = await findThumbs()
    expect(thumbs).toHaveLength(1)
    expect(rangeOf(thumbs[0])).toEqual({ now: "30", min: "0", max: "50" })
    expect(thumbs[0]).toHaveAccessibleName("Volume")
    for (const slot of ["slider", "slider-track", "slider-range", "slider-thumb"]) {
      expect(container.querySelector(`[data-slot="${slot}"]`)).toBeInTheDocument()
    }
  })

  it("names every thumb from a visible label through aria-labelledby", async () => {
    render(
      <>
        <span id="temperature-label">Temperature</span>
        <Slider aria-labelledby="temperature-label" defaultValue={[20, 60]} />
      </>
    )

    for (const thumb of await findThumbs()) {
      expect(thumb).toHaveAccessibleName("Temperature")
    }
  })

  it("renders a thumb for each range value", async () => {
    render(<Slider aria-label="Price" defaultValue={[20, 80]} />)

    expect(valuesOf(await findThumbs())).toEqual(["20", "80"])
  })

  it("starts as a full range without a value", async () => {
    render(<Slider aria-label="Price" min={10} max={90} />)

    expect(valuesOf(await findThumbs())).toEqual(["10", "90"])
  })

  it("steps with the keyboard and reports the new value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <div dir="ltr">
        <Slider
          aria-label="Volume"
          defaultValue={[50]}
          step={5}
          onValueChange={onValueChange}
        />
      </div>
    )
    const thumb = await findThumb()

    await user.tab()
    expect(thumb).toHaveFocus()
    await user.keyboard("{ArrowUp}")
    expect(rangeOf(thumb).now).toBe("55")
    expect(onValueChange.mock.lastCall?.[0]).toEqual([55])

    await user.keyboard("{End}")
    expect(rangeOf(thumb).now).toBe("100")
    await user.keyboard("{Home}")
    expect(rangeOf(thumb).now).toBe("0")
  })

  it("stays controlled by value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Slider aria-label="Volume" value={[50]} onValueChange={onValueChange} />)
    const thumb = await findThumb()

    await user.tab()
    await user.keyboard("{ArrowUp}")

    expect(onValueChange.mock.lastCall?.[0]).toEqual([51])
    expect(rangeOf(thumb).now).toBe("50")
  })

  it("exposes the orientation", async () => {
    render(<Slider aria-label="Volume" defaultValue={[50]} orientation="vertical" />)

    expect(await findThumb()).toHaveAttribute("aria-orientation", "vertical")
  })

  it("ignores the keyboard when disabled", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Slider aria-label="Volume" defaultValue={[50]} disabled onValueChange={onValueChange} />
    )
    const thumb = await findThumb()

    await user.tab()
    await user.keyboard("{ArrowUp}")

    expect(isDisabledControl(thumb)).toBe(true)
    expect(rangeOf(thumb).now).toBe("50")
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Slider aria-label="Volume" defaultValue={[50]} />
        <Slider aria-label="Price" defaultValue={[20, 80]} />
        <Slider aria-label="Disabled" defaultValue={[10]} disabled />
      </>
    )
    await findThumbs()

    await expectNoAxeViolations(container)
  })
})
