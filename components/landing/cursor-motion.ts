export type Point = { x: number; y: number }
export type LineBox = { x: number; y: number; width: number; height: number }
export type FollowState = { value: number; velocity: number; catchingUp?: boolean }
export type MotionPath = {
  distanceAt: (progress: number) => number
  progressAt: (distance: number) => number
}

/** Arrow tip inside the 24px pointer artwork; also the rotate/scale origin. */
export const CURSOR_HOTSPOT = 4
/** Share of the scroll window during which the highlight sweeps. */
export const HIGHLIGHT_RANGE: readonly [number, number] = [0.2, 0.8]
export const RESTING_HEADING = 135

const MAX_SPEED_PX = 600
const FOLLOW_SUBSTEPS_PER_SECOND = 240
const FOLLOW_STIFFNESS = 4
const FOLLOW_ACCELERATE = 80
const FOLLOW_DECELERATE = 16
const PATH_SEGMENTS = 128
const PATH_MAX_DEPTH = 12
/** Pointer tip height within a line box, from the top. */
const LINE_TIP_RATIO = 0.65
const PRESS_DEPTH = 0.14
/** Distance over which the pointer presses down at the start of a sweep and releases at the end. */
const PRESS_RAMP_PX = 12
/** Upward bow of the glide between phrases or wrapped lines, relative to its length. */
const TRAVEL_BEND_RATIO = 0.12
const TRAVEL_BEND_MAX_PX = 16
const MIN_TRAVEL_PX = 1
const TURN_RATE = 12
const PRESS_EDGE = 0.1
const APPROACH = { offset: { x: -36, y: 48 }, bend: 18 }
const DEPART = { offset: { x: 64, y: -40 }, bend: 20 }

/** Share of the scroll window during which the pointer drags the word into place. */
export const MOVE_RANGE: readonly [number, number] = [0.12, 0.78]
const MOVE_OFFSET_MAX_PX = 110
const MOVE_OFFSET_VIEWPORT_RATIO = 0.18
const MOVE_DROP_PX = 24
const MOVE_BEND_PX = 32
const MOVE_TILT_DEG = 5
/** Where the pointer holds the word, as a fraction of its box (mirrored in RTL). */
const MOVE_GRIP = { x: 0.8, y: 0.4 }

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

export function angleDifference(from: number, to: number) {
  return ((((to - from + 540) % 360) + 360) % 360) - 180
}

/** Rotation that points the arrow tip along the direction of travel. */
export function cursorHeading(dx: number, dy: number) {
  return (Math.atan2(dy, dx) * 180) / Math.PI + RESTING_HEADING
}

export function turnToward(current: number, target: number, dt: number) {
  return current + angleDifference(current, target) * (1 - Math.exp(-TURN_RATE * Math.max(0, dt)))
}

/** Speed-capped follow, so fast scrolling makes the pointer glide instead of jump. */
export function followDistance(state: FollowState, target: number, dt: number, targetVelocity = 0): FollowState {
  if (dt <= 0) return state
  const gap = target - state.value
  if (!state.catchingUp && Math.abs(gap) <= MAX_SPEED_PX * dt) return { value: target, velocity: gap / dt }

  const lead = clamp(targetVelocity, -MAX_SPEED_PX, MAX_SPEED_PX)
  const steps = Math.max(1, Math.ceil(FOLLOW_SUBSTEPS_PER_SECOND * dt))
  const step = dt / steps
  let { value, velocity } = state
  for (let i = 0; i < steps; i++) {
    const desired = clamp(lead + (target - value) * FOLLOW_STIFFNESS, -MAX_SPEED_PX, MAX_SPEED_PX)
    const rate =
      Math.sign(desired) !== Math.sign(velocity) || Math.abs(desired) > Math.abs(velocity)
        ? FOLLOW_ACCELERATE
        : FOLLOW_DECELERATE
    const nextVelocity = desired + (velocity - desired) * Math.exp(-rate * step)
    const nextValue = value + ((velocity + nextVelocity) * step) / 2
    const crossed = (target - value) * (target - nextValue) < 0
    const settled = Math.abs(nextValue - target) < 0.01 && Math.abs(nextVelocity - lead) < 0.1
    if (crossed || settled) return { value: target, velocity: lead }
    value = nextValue
    velocity = nextVelocity
  }
  return { value, velocity, catchingUp: true }
}

/** Arc-length table so the follow runs at a constant on-screen speed. */
export function measureMotionPath(pointAt: (progress: number) => Point): MotionPath {
  const samples = [{ progress: 0, distance: 0 }]
  const subdivide = (p0: number, a: Point, p1: number, b: Point, depth: number) => {
    const mid = (p0 + p1) / 2
    const m = pointAt(mid)
    if (depth < PATH_MAX_DEPTH && Math.hypot(m.x - (a.x + b.x) / 2, m.y - (a.y + b.y) / 2) > 0.001) {
      subdivide(p0, a, mid, m, depth + 1)
      subdivide(mid, m, p1, b, depth + 1)
      return
    }
    const length = Math.hypot(b.x - a.x, b.y - a.y)
    samples.push({
      progress: p1,
      distance: samples[samples.length - 1].distance + (length || MAX_SPEED_PX * (p1 - p0)),
    })
  }
  let previous = pointAt(0)
  for (let i = 1; i <= PATH_SEGMENTS; i++) {
    const next = pointAt(i / PATH_SEGMENTS)
    subdivide((i - 1) / PATH_SEGMENTS, previous, i / PATH_SEGMENTS, next, 0)
    previous = next
  }

  const lookup = (value: number, from: "progress" | "distance", to: "progress" | "distance") => {
    const v = clamp(value, 0, samples[samples.length - 1][from])
    let low = 0
    let high = samples.length - 1
    while (high - low > 1) {
      const mid = (low + high) >> 1
      if (samples[mid][from] < v) low = mid
      else high = mid
    }
    const a = samples[low]
    const b = samples[high]
    const span = b[from] - a[from]
    return span ? a[to] + ((b[to] - a[to]) * (v - a[from])) / span : a[to]
  }

  return {
    distanceAt: (progress) => lookup(progress, "progress", "distance"),
    progressAt: (distance) => lookup(distance, "distance", "progress"),
  }
}

/** Quadratic arc from `offset` (progress 0) into the contact point (progress 1). */
function arcFrom(progress: number, offset: Point, bend: number): Point {
  const r = clamp(progress)
  const a = 1 - r
  const length = Math.hypot(offset.x, offset.y) || 1
  return {
    x: a * a * offset.x + 2 * a * r * (offset.x / 2 - (offset.y / length) * bend),
    y: a * a * offset.y + 2 * a * r * (offset.y / 2 + (offset.x / length) * bend),
  }
}

/** Arc in from below before the action; optionally arc away after it. */
function contactOffset(t: number, [start, end]: readonly [number, number], rtl: boolean, depart: boolean): Point {
  const dir = rtl ? -1 : 1
  if (t < start) {
    return arcFrom(t / start, { x: APPROACH.offset.x * dir, y: APPROACH.offset.y }, APPROACH.bend * dir)
  }
  if (!depart) return { x: 0, y: 0 }
  return arcFrom(
    1 - clamp((t - end) / (1 - end)),
    { x: DEPART.offset.x * dir, y: DEPART.offset.y },
    DEPART.bend * dir
  )
}

/** Pressed-down scale while the pointer holds what it is acting on. */
function contactScale(t: number, [start, end]: readonly [number, number]) {
  const within = clamp((t - start) / (end - start))
  return 1 - PRESS_DEPTH * smoothstep(clamp(Math.min(within, 1 - within) / PRESS_EDGE))
}

/** Point on `size` at relative grip (`gx`, `gy`) after rotating `angle` degrees about its center. */
function rotatedAnchor(origin: Point, size: { width: number; height: number }, angle: number, gx: number, gy: number) {
  const radians = (angle * Math.PI) / 180
  const dx = size.width * (gx - 0.5)
  const dy = size.height * (gy - 0.5)
  return {
    x: origin.x + size.width / 2 + dx * Math.cos(radians) - dy * Math.sin(radians),
    y: origin.y + size.height / 2 + dx * Math.sin(radians) + dy * Math.cos(radians),
  }
}

export type MoveFrame = { point: Point; scale: number; textTransform: string }

/** The word starts displaced and tilted; the pointer grabs it and drags it into place. */
export function createMoveMotion(
  size: { width: number; height: number },
  rtl: boolean,
  viewportWidth: number
): (t: number) => MoveFrame {
  const dir = rtl ? -1 : 1
  const offset = {
    x: Math.min(MOVE_OFFSET_MAX_PX, MOVE_OFFSET_VIEWPORT_RATIO * viewportWidth) * dir,
    y: MOVE_DROP_PX,
  }
  const [start, end] = MOVE_RANGE
  return (t) => {
    const placed = clamp((t - start) / (end - start))
    const shift = arcFrom(placed, offset, MOVE_BEND_PX * dir)
    const tilt = (1 - placed) * MOVE_TILT_DEG * dir
    const grip = rotatedAnchor(shift, size, tilt, rtl ? 1 - MOVE_GRIP.x : MOVE_GRIP.x, MOVE_GRIP.y)
    const contact = contactOffset(t, MOVE_RANGE, rtl, true)
    return {
      point: { x: grip.x + contact.x, y: grip.y + contact.y },
      scale: contactScale(t, MOVE_RANGE),
      textTransform: placed === 1 ? "" : `translate3d(${shift.x}px, ${shift.y}px, 0) rotate(${tilt}deg)`,
    }
  }
}

/** Eased glide with a slight upward bow, like a hand moving the mouse to the next spot. */
function glide(from: Point, to: Point, progress: number, rtl: boolean): Point {
  const k = smoothstep(clamp(progress))
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1
  const bend = Math.min(TRAVEL_BEND_MAX_PX, length * TRAVEL_BEND_RATIO) * (rtl ? -1 : 1)
  const control = { x: (from.x + to.x) / 2 + (dy / length) * bend, y: (from.y + to.y) / 2 - (dx / length) * bend }
  const a = 1 - k
  return {
    x: a * a * from.x + 2 * a * k * control.x + k * k * to.x,
    y: a * a * from.y + 2 * a * k * control.y + k * k * to.y,
  }
}

type MotionStep =
  | { kind: "sweep"; line: LineBox; index: number; length: number }
  | { kind: "glide"; from: Point; to: Point; length: number }

export type HighlightFrame = {
  /** Covered share of each line, in `lines` order. */
  fills: number[]
  point: Point
  scale: number
  /** Unrolled path used to keep the follow speed constant along the whole route. */
  pathPoint: Point
}

/**
 * Sweeps each line in order and glides between them without hiding the pointer.
 * The pointer presses down while sweeping and releases while gliding.
 */
export function createHighlightMotion(lines: LineBox[], rtl: boolean): (t: number) => HighlightFrame {
  const tipOf = (line: LineBox, covered: number): Point => ({
    x: line.x + (rtl ? line.width - covered : covered),
    y: line.y + LINE_TIP_RATIO * line.height,
  })
  const steps: MotionStep[] = []
  lines.forEach((line, index) => {
    const previous = lines[index - 1]
    if (previous) {
      const from = tipOf(previous, previous.width)
      const to = tipOf(line, 0)
      steps.push({ kind: "glide", from, to, length: Math.max(MIN_TRAVEL_PX, Math.hypot(to.x - from.x, to.y - from.y)) })
    }
    steps.push({ kind: "sweep", line, index, length: line.width })
  })
  const total = steps.reduce((sum, step) => sum + step.length, 0)
  const [start, end] = HIGHLIGHT_RANGE

  return (t) => {
    const distance = clamp((t - start) / (end - start)) * total
    const fills = lines.map(() => 0)
    let point = lines.length ? tipOf(lines[0], 0) : { x: 0, y: 0 }
    let scale = 1
    let remaining = distance
    for (const step of steps) {
      if (remaining < 0) break
      if (step.kind === "sweep") {
        const covered = clamp(remaining, 0, step.length)
        fills[step.index] = step.length ? covered / step.length : 0
        point = tipOf(step.line, covered)
        const press = smoothstep(clamp(Math.min(covered, step.length - covered) / PRESS_RAMP_PX))
        scale = 1 - PRESS_DEPTH * press
      } else {
        point = glide(step.from, step.to, remaining / step.length, rtl)
        scale = 1
      }
      remaining -= step.length
    }

    const contact = contactOffset(t, HIGHLIGHT_RANGE, rtl, false)
    return {
      fills,
      scale,
      point: { x: point.x + contact.x, y: point.y + contact.y },
      pathPoint: { x: distance + contact.x * (rtl ? -1 : 1), y: contact.y },
    }
  }
}

/** One box per visual line of `el`'s text, relative to `origin`. */
export function measureTextLines(el: HTMLElement, origin: DOMRect): LineBox[] {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const rects: LineBox[] = []
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const range = document.createRange()
    range.selectNodeContents(node)
    for (const rect of Array.from(range.getClientRects())) {
      if (rect.width && rect.height) {
        rects.push({ x: rect.left - origin.left, y: rect.top - origin.top, width: rect.width, height: rect.height })
      }
    }
  }
  const lines: LineBox[] = []
  for (const rect of rects.sort((a, b) => a.y - b.y || a.x - b.x)) {
    const last = lines.at(-1)
    if (last && Math.abs(last.y - rect.y) < 0.5 * Math.min(last.height, rect.height)) {
      const right = Math.max(last.x + last.width, rect.x + rect.width)
      last.x = Math.min(last.x, rect.x)
      last.width = right - last.x
      last.height = Math.max(last.height, rect.height)
    } else {
      lines.push({ ...rect })
    }
  }
  return lines
}
