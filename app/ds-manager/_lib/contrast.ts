type Oklch = { l: number; c: number; h: number; alpha: number };

const OKLCH_PATTERN =
  /^oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+%?))?\s*\)$/i;

const PERCENT = 100;
const CHROMA_AT_FULL_PERCENT = 0.4;
const DEGREES_TO_RADIANS = Math.PI / 180;

function parseChannel(raw: string, scaleAtFullPercent: number): number {
  return raw.endsWith("%")
    ? (Number.parseFloat(raw) / PERCENT) * scaleAtFullPercent
    : Number.parseFloat(raw);
}

export function parseOklch(value: string): Oklch | null {
  const match = OKLCH_PATTERN.exec(value.trim());
  if (!match) return null;
  const [, l, c, h, alpha] = match;
  return {
    l: parseChannel(l, 1),
    c: parseChannel(c, CHROMA_AT_FULL_PERCENT),
    h: Number.parseFloat(h),
    alpha: alpha === undefined ? 1 : parseChannel(alpha, 1),
  };
}

export function alphaPercent(value: string): number | null {
  const color = parseOklch(value);
  return color ? Math.round(color.alpha * PERCENT) : null;
}

const OKLAB_TO_LMS = [
  [1, 0.3963377774, 0.2158037573],
  [1, -0.1055613458, -0.0638541728],
  [1, -0.0894841775, -1.291485548],
] as const;

const LMS_TO_LINEAR_SRGB = [
  [4.0767416621, -3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, -0.3413193965],
  [-0.0041960863, -0.7034186147, 1.707614701],
] as const;

const LUMINANCE_WEIGHTS = [0.2126, 0.7152, 0.0722] as const;

type Vector3 = readonly [number, number, number];
type Matrix3 = readonly [Vector3, Vector3, Vector3];

function multiply(matrix: Matrix3, vector: Vector3): Vector3 {
  const row = (r: Vector3) => r[0] * vector[0] + r[1] * vector[1] + r[2] * vector[2];
  return [row(matrix[0]), row(matrix[1]), row(matrix[2])];
}

function relativeLuminance({ l, c, h }: Oklch): number {
  const radians = h * DEGREES_TO_RADIANS;
  const lab: Vector3 = [l, c * Math.cos(radians), c * Math.sin(radians)];
  const [lc, mc, sc] = multiply(OKLAB_TO_LMS, lab);
  const lms: Vector3 = [lc ** 3, mc ** 3, sc ** 3];
  const rgb = multiply(LMS_TO_LINEAR_SRGB, lms).map((channel) =>
    Math.min(1, Math.max(0, channel))
  );
  return rgb.reduce((sum, channel, index) => sum + channel * LUMINANCE_WEIGHTS[index], 0);
}

const LUMINANCE_FLARE = 0.05;

export type ContrastGrade = "AAA" | "AA" | "AA Large" | "Fail";

const GRADE_THRESHOLDS: readonly { min: number; grade: ContrastGrade }[] = [
  { min: 7, grade: "AAA" },
  { min: 4.5, grade: "AA" },
  { min: 3, grade: "AA Large" },
];

export type Contrast = { ratio: number; grade: ContrastGrade };

/** WCAG 2 contrast for two opaque oklch colors, or null when either can't be read. */
export function contrast(surface: string, text: string): Contrast | null {
  const a = parseOklch(surface);
  const b = parseOklch(text);
  if (!a || !b || a.alpha < 1 || b.alpha < 1) return null;
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x
  );
  const ratio = (lighter + LUMINANCE_FLARE) / (darker + LUMINANCE_FLARE);
  const grade = GRADE_THRESHOLDS.find((step) => ratio >= step.min)?.grade ?? "Fail";
  return { ratio, grade };
}
