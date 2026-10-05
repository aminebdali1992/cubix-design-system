import * as React from "react";

type IconProps = React.ComponentProps<"svg">;

function createIcon(paths: readonly string[]) {
  return function SectionIcon(props: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  };
}

export const OverviewIcon = createIcon([
  "M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1",
  "M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1",
  "M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1",
  "M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1",
]);

export const StyleIcon = createIcon([
  "M12 4l-8 4l8 4l8 -4l-8 -4",
  "M4 12l8 4l8 -4",
  "M4 16l8 4l8 -4",
]);

export const ColorIcon = createIcon([
  "M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546",
]);

export const TypographyIcon = createIcon([
  "M4 20l3 0",
  "M14 20l7 0",
  "M6.9 15l6.9 0",
  "M10.2 6.3l5.8 13.7",
  "M5 20l6 -16l2 0l7 16",
]);

export const RadiusIcon = createIcon(["M4 20v-10a6 6 0 0 1 6 -6h10"]);

export const CornerSquareIcon = createIcon(["M4 20v-16h16"]);

export const CornerSmallIcon = createIcon(["M4 20v-13a3 3 0 0 1 3 -3h13"]);

export const CornerLargeIcon = createIcon(["M4 20v-4a12 12 0 0 1 12 -12h4"]);

export const ShadowIcon = createIcon([
  "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
  "M13 12h5",
  "M13 15h4",
  "M13 18h1",
  "M13 9h4",
  "M13 6h1",
]);

export const SpacingIcon = createIcon([
  "M20 20h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h2",
  "M4 20h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2",
  "M12 8v8",
]);

export const IconsIcon = createIcon([
  "M3 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
  "M17 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
  "M3 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
  "M17 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
  "M5 7l0 10",
  "M7 5l10 0",
  "M7 19l10 0",
  "M19 7l0 10",
]);

export const BrandIcon = createIcon([
  "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245",
]);

export const BlocksIcon = createIcon([
  "M4 5a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1l0 -2",
  "M4 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6",
  "M14 12l6 0",
  "M14 16l6 0",
  "M14 20l6 0",
]);

export const ComponentsIcon = createIcon([
  "M3 12l3 3l3 -3l-3 -3l-3 3",
  "M15 12l3 3l3 -3l-3 -3l-3 3",
  "M9 6l3 3l3 -3l-3 -3l-3 3",
  "M9 18l3 3l3 -3l-3 -3l-3 3",
]);

export const CopyIcon = createIcon([
  "M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666",
  "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1",
]);

export const SunIcon = createIcon([
  "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
  "M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",
]);

export const MoonIcon = createIcon([
  "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008",
]);

export const LintIcon = createIcon([
  "M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8",
  "M14 19l2 2l4 -4",
  "M9 8h4",
  "M9 12h2",
]);
