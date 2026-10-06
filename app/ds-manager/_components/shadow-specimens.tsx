"use client";

import * as React from "react";

import { Badge } from "@/components/cubix/badge";
import { Button } from "@/components/cubix/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card";
import { cn } from "@/lib/utils";

import {
  SHADOW_STEPS,
  shadowSource,
  type ShadowSource,
  type ShadowState,
  type ShadowStep,
} from "../_lib/shadow";
import { SpecimenCard, SpecimenPage, SpecimenSection } from "./specimen";

const SHADOW_CLASSES: Readonly<Record<ShadowStep, string>> = {
  "2xs": "shadow-2xs",
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

const SOURCE_LABELS: Readonly<Record<ShadowSource, string>> = {
  tailwind: "Tailwind default",
  seed: "derived from the seed",
  pinned: "edited",
};

function ShadowChip({ className }: { className: string }) {
  return (
    <div className="flex flex-1 items-center justify-center px-3 py-21">
      <div aria-hidden className={cn("h-8 w-20 rounded-lg border bg-card", className)} />
    </div>
  );
}

function InContext({ label, detail, children }: { label: string; detail?: string; children: React.ReactNode }) {
  return (
    <SpecimenCard label={label} detail={detail} span="wide" surface="shell">
      <div dir="rtl" lang="fa" className="flex min-h-30 flex-1 items-center justify-center p-6">
        {children}
      </div>
    </SpecimenCard>
  );
}

function PopoverSpecimen() {
  return (
    <Card size="sm" className="w-full max-w-64 shadow-md">
      <CardHeader>
        <CardTitle>دعوت هم‌تیمی</CardTitle>
        <CardDescription>فقط به همین پروژه دسترسی پیدا می‌کند.</CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <Badge variant="secondary">ویرایش</Badge>
        <Badge variant="outline">مشاهده</Badge>
      </CardFooter>
    </Card>
  );
}

function ToastSpecimen() {
  return (
    <Card size="sm" className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle>استقرار انجام شد</CardTitle>
        <CardDescription>نسخهٔ جدید روی محیط عملیاتی منتشر شد.</CardDescription>
        <CardAction>
          <Button size="xs" variant="outline">
            مشاهده
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

function SheetSpecimen() {
  return (
    <Card size="sm" className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle>فیلتر استقرارها</CardTitle>
        <CardDescription>فقط استقرارهای شاخهٔ اصلی در هفتهٔ اخیر نمایش داده می‌شوند.</CardDescription>
      </CardHeader>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button size="sm" variant="outline">
          پاک کردن
        </Button>
        <Button size="sm">اعمال فیلتر</Button>
      </CardFooter>
    </Card>
  );
}

function DrawerSpecimen() {
  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader>
        <CardTitle>حذف این محیط؟</CardTitle>
        <CardDescription>استقرارها و گزارش‌های آن هم حذف می‌شوند.</CardDescription>
      </CardHeader>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline">انصراف</Button>
        <Button variant="destructive">حذف محیط</Button>
      </CardFooter>
    </Card>
  );
}

export function ShadowSpecimens({ shadow }: { shadow: ShadowState }) {
  return (
    <SpecimenPage>
      <SpecimenSection
        title="Elevation ramp"
        description="Every step, flat to deepest; until a seed is set, each one is the Tailwind default Cubix ships."
      >
        <SpecimenCard label="shadow-none" detail="no elevation" span="wide" surface="shell">
          <ShadowChip className="shadow-none" />
        </SpecimenCard>
        {SHADOW_STEPS.map((step) => (
          <SpecimenCard
            key={step}
            label={SHADOW_CLASSES[step]}
            detail={SOURCE_LABELS[shadowSource(shadow, step)]}
            span="wide"
            surface="shell"
          >
            <ShadowChip className={SHADOW_CLASSES[step]} />
          </SpecimenCard>
        ))}
      </SpecimenSection>
      <SpecimenSection
        title="In context"
        description="The surfaces the ramp lifts, each one carrying the step its Cubix component asks for."
      >
        <InContext label="Popover · shadow-md" detail="also Select, Combobox, Hover Card">
          <PopoverSpecimen />
        </InContext>
        <InContext label="Toast · shadow-lg" detail="also Dropdown Menu">
          <ToastSpecimen />
        </InContext>
        <InContext label="Sheet · shadow-lg">
          <SheetSpecimen />
        </InContext>
        <InContext label="Drawer · shadow-xl">
          <DrawerSpecimen />
        </InContext>
      </SpecimenSection>
    </SpecimenPage>
  );
}
