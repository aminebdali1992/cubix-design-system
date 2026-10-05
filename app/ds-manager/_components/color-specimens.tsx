import * as React from "react";

import { contrast } from "../_lib/contrast";
import type { Palette } from "../_lib/palette";
import { CONTRAST_PAIRS, TOKEN_GROUPS, WIDE_SPECIMEN_TOKENS } from "../_lib/tokens";
import { SpecimenCard, SpecimenPage, SpecimenSection } from "./specimen";

function PairSpecimen({ surface, text, palette }: { surface: string; text: string; palette: Palette }) {
  const result = contrast(palette[surface], palette[text]);
  const detail = result ? `${result.grade} ${result.ratio.toFixed(2)}:1` : "Contrast unavailable";

  return (
    <SpecimenCard label={`${surface} / ${text}`} detail={detail}>
      <div
        className="flex flex-1 items-center justify-center p-3 text-title"
        style={{ backgroundColor: `var(--${surface})`, color: `var(--${text})` }}
      >
        Aa
      </div>
    </SpecimenCard>
  );
}

export function ColorSpecimens({ palette }: { palette: Palette }) {
  return (
    <SpecimenPage>
      <SpecimenSection
        title="Foreground on background"
        description="Every text-on-surface pair in the system, read against WCAG at the size body copy is set in."
      >
        {CONTRAST_PAIRS.map((pair) => (
          <PairSpecimen key={pair.surface} {...pair} palette={palette} />
        ))}
      </SpecimenSection>
      {TOKEN_GROUPS.map((group) => (
        <SpecimenSection key={group.id} title={group.title} description={group.description}>
          {group.tokens.map((token) => (
            <SpecimenCard
              key={token}
              label={token}
              detail={palette[token]}
              span={WIDE_SPECIMEN_TOKENS.has(token) ? "wide" : "single"}
            >
              <div className="flex-1" style={{ backgroundColor: `var(--${token})` }} />
            </SpecimenCard>
          ))}
        </SpecimenSection>
      ))}
    </SpecimenPage>
  );
}
