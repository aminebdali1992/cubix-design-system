import * as React from "react";

import { cn } from "@/lib/utils";

import {
  FONT_SLOTS,
  FONT_SLOT_SPECIMEN_LABELS,
  LATIN_FACES,
  TRACKING_STEPS,
  formatEm,
  resolveFamily,
  trackingValue,
  typeRole,
  typeRoleTracking,
  typographyTokensCss,
  type FontSlot,
  type TypeRoleToken,
  type TypographyState,
} from "../_lib/typography";
import { SpecimenCard, SpecimenPage, SpecimenSection } from "./specimen";

const FONT_CLASSES: Readonly<Record<FontSlot, string>> = {
  sans: "font-(family-name:--ds-font-sans)",
  heading: "font-(family-name:--ds-font-heading)",
  mono: "font-(family-name:--ds-font-mono)",
};

const PERSIAN_GLYPHS = {
  pair: "آب",
  rows: [
    "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش",
    "ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی",
    "۰۱۲۳۴۵۶۷۸۹ ؟ ! ٪ ( ) « »",
  ],
} as const;

const LATIN_ROW = "Aa Bb Cc Gg Qq 0123456789";

const MONO_GLYPHS = {
  pair: "Ag",
  rows: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789 !@#$%^&*()"],
} as const;

const MONO_PERSIAN_ROW = "// توضیح فارسی داخل کد";

const TRACKING_SAMPLE = "سیستم طراحی کوبیکس برای محصول فارسی";

const ROLE_SAMPLES: Readonly<Record<TypeRoleToken, string>> = {
  "text-display": "طراحی که با محصول شما رشد می\u200cکند",
  "text-headline": "سیستم طراحی کوبیکس",
  "text-title": "رنگ، تایپوگرافی و فاصله\u200cگذاری",
  "text-lead":
    "کامپوننت\u200cهای کپی\u200cشدنی برای React، با پشتیبانی کامل از راست\u200cبه\u200cچپ و فونت فارسی از همان روز اول.",
  "text-body":
    "هر تغییری که در این صفحه می\u200cدهید به\u200cصورت تفاوتی نسبت به پیش\u200cفرض\u200cهای کوبیکس ذخیره می\u200cشود؛ پس پیش\u200cنمایشی که می\u200cبینید و کدی که خروجی می\u200cگیرید، دقیقاً از یک منبع ساخته می\u200cشوند.",
  "text-description": "این متن زیر عنوان کارت\u200cها و فیلدها می\u200cنشیند و توضیح را کوتاه نگه می\u200cدارد.",
  "text-label": "نام و نام خانوادگی",
  "text-caption": "حداقل ۸ کاراکتر، شامل عدد و حرف",
};

type RoleSection = {
  title: string;
  description: string;
  slot: FontSlot;
  tokens: readonly TypeRoleToken[];
};

const ROLE_SECTIONS: readonly RoleSection[] = [
  {
    title: "Headings",
    description:
      "The Cubix heading roles in the heading face. Persian resets their letter-spacing to 0, so the tracking listed applies to Latin.",
    slot: "heading",
    tokens: ["text-display", "text-headline", "text-title"],
  },
  {
    title: "Body",
    description: "The Cubix reading roles in the body face: intro copy, body copy and supporting text.",
    slot: "sans",
    tokens: ["text-lead", "text-body", "text-description"],
  },
  {
    title: "Label and caption",
    description: "The fixed-size roles Cubix uses for control chrome: field labels, hints, badges and kbd.",
    slot: "sans",
    tokens: ["text-label", "text-caption"],
  },
];

function GlyphRows({ rows, className }: { rows: readonly string[]; className?: string }) {
  return (
    <span className={cn("flex min-w-0 flex-col gap-0.5 text-xs", className)}>
      {rows.map((row) => (
        <span key={row} className="truncate">
          {row}
        </span>
      ))}
    </span>
  );
}

function FamilyName({ children }: { children: React.ReactNode }) {
  return (
    <span dir="ltr" className="truncate text-start font-sans text-caption text-muted-foreground">
      {children}
    </span>
  );
}

function FontFamilyCard({ slot, typography }: { slot: FontSlot; typography: TypographyState }) {
  const family = resolveFamily(typography, slot);

  if (slot === "mono") {
    return (
      <SpecimenCard label={FONT_SLOT_SPECIMEN_LABELS[slot]} surface="shell">
        <div dir="ltr" className={cn("flex min-w-0 flex-1 flex-col gap-2 p-3", FONT_CLASSES.mono)}>
          <FamilyName>{family}</FamilyName>
          <span className="text-3xl leading-none">{MONO_GLYPHS.pair}</span>
          <GlyphRows rows={[...MONO_GLYPHS.rows, MONO_PERSIAN_ROW]} />
        </div>
      </SpecimenCard>
    );
  }

  return (
    <SpecimenCard label={FONT_SLOT_SPECIMEN_LABELS[slot]} surface="shell">
      <div
        dir="rtl"
        lang="fa"
        className={cn("flex min-w-0 flex-1 flex-col gap-2 p-3", FONT_CLASSES[slot])}
      >
        <FamilyName>
          {family} · {LATIN_FACES[slot]}
        </FamilyName>
        <span className="text-3xl leading-none">{PERSIAN_GLYPHS.pair}</span>
        <GlyphRows rows={PERSIAN_GLYPHS.rows} />
        <span dir="ltr" className="truncate text-start text-xs">
          {LATIN_ROW}
        </span>
      </div>
    </SpecimenCard>
  );
}

function RoleCard({ token, slot }: { token: TypeRoleToken; slot: FontSlot }) {
  const role = typeRole(token);

  return (
    <SpecimenCard
      label={`${role.token} · ${role.px}`}
      detail={`${role.lh} / ${typeRoleTracking(role)} / ${role.weight} - ${role.usage}`}
      span="full"
      surface="shell"
    >
      <div dir="rtl" lang="fa" className="flex min-w-0 flex-1 items-center p-3">
        <p className={cn("min-w-0", FONT_CLASSES[slot], role.token)}>{ROLE_SAMPLES[token]}</p>
      </div>
    </SpecimenCard>
  );
}

export function TypographySpecimens({ typography }: { typography: TypographyState }) {
  return (
    <SpecimenPage>
      <SpecimenSection
        title="Font family"
        description="The three Cubix faces. Body and headings pair a Persian face with a Latin one; code keeps Persian on the body face."
        gridClassName="grid-cols-1 @2xl:grid-cols-3"
      >
        {FONT_SLOTS.map((slot) => (
          <FontFamilyCard key={slot} slot={slot} typography={typography} />
        ))}
      </SpecimenSection>
      {ROLE_SECTIONS.map((section) => (
        <SpecimenSection key={section.title} title={section.title} description={section.description}>
          {section.tokens.map((token) => (
            <RoleCard key={token} token={token} slot={section.slot} />
          ))}
        </SpecimenSection>
      ))}
      <SpecimenSection
        title="Mono"
        description="The code face, on the tokens block the CSS export writes into globals.css."
      >
        <SpecimenCard label="font-mono" span="full" surface="shell">
          <div dir="ltr" className="flex min-w-0 flex-1 items-center p-3">
            <pre className={cn("w-full overflow-x-auto text-xs", FONT_CLASSES.mono)}>
              {typographyTokensCss(typography)}
            </pre>
          </div>
        </SpecimenCard>
      </SpecimenSection>
      <SpecimenSection
        title="Tracking"
        description="The five Cubix tracking tokens on Persian text. Connected letters keep their joins, so the spacing shows between words and unjoined letters."
      >
        {TRACKING_STEPS.map((spec) => (
          <SpecimenCard
            key={spec.token}
            label={`${spec.token} · ${formatEm(trackingValue(typography, spec))}`}
            detail={spec.usage}
            span="full"
            surface="shell"
          >
            <div dir="rtl" lang="fa" className="flex min-w-0 flex-1 items-center p-3">
              <p className={cn("w-full truncate text-lg", FONT_CLASSES.sans, spec.token)}>
                {TRACKING_SAMPLE}
              </p>
            </div>
          </SpecimenCard>
        ))}
      </SpecimenSection>
    </SpecimenPage>
  );
}
