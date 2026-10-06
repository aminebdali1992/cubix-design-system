"use client";

import * as React from "react";
import { CodeIcon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/cubix/code-block";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog";

import type { Palettes } from "../_lib/palette";
import { radiusCss, type RadiusState } from "../_lib/radius";
import { shadowCss, type ShadowState } from "../_lib/shadow";
import { spacingCss } from "../_lib/spacing";
import { typographyCss, type TypographyState } from "../_lib/typography";
import { resolvePalette } from "../_lib/use-palettes";
import type { Overrides } from "../_lib/use-design-editor";
import { ALL_TOKENS, COLOR_MODES, type ColorMode } from "../_lib/tokens";

const MODE_SELECTORS: Readonly<Record<ColorMode, string>> = {
  light: ":root",
  dark: ".dark",
};

function colorCss(palettes: Palettes, overrides: Overrides): string {
  return COLOR_MODES.map((mode) => {
    const palette = resolvePalette(palettes, overrides, mode);
    const lines = ALL_TOKENS.map((token) => `  --${token}: ${palette[token]};`);
    return `${MODE_SELECTORS[mode]} {\n${lines.join("\n")}\n}`;
  }).join("\n\n");
}

type GetCodeDialogProps = {
  palettes: Palettes | null;
  overrides: Overrides;
  typography: TypographyState;
  radius: RadiusState;
  spacing: number;
  shadow: ShadowState;
};

export function GetCodeDialog({
  palettes,
  overrides,
  typography,
  radius,
  spacing,
  shadow,
}: GetCodeDialogProps) {
  const code = React.useMemo(
    () =>
      palettes
        ? [
            typographyCss(typography),
            spacingCss(spacing),
            radiusCss(radius),
            shadowCss(shadow),
            colorCss(palettes, overrides),
          ]
            .filter((block) => block !== "")
            .join("\n\n")
        : "",
    [palettes, overrides, typography, radius, spacing, shadow]
  );

  return (
    <Dialog>
      <DialogTrigger render={<Button size="sm" disabled={!palettes} />}>
        <CodeIcon data-icon="inline-start" />
        Get code
      </DialogTrigger>
      <DialogContent dir="ltr" className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Get code</DialogTitle>
          <DialogDescription>
            Paste these tokens into your global stylesheet. Fonts, letter spacing, spacing, radius, shadows, and both
            color palettes carry every edit you made.
          </DialogDescription>
        </DialogHeader>
        <CodeBlock code={code} language="css">
          <CodeBlockHeader>
            <CodeBlockTitle>
              <CodeBlockFilename>app/globals.css</CodeBlockFilename>
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton />
            </CodeBlockActions>
          </CodeBlockHeader>
        </CodeBlock>
      </DialogContent>
    </Dialog>
  );
}
