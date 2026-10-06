"use client";

import * as React from "react";

import { Badge } from "@/components/cubix/badge";
import { Button } from "@/components/cubix/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card";
import { Label } from "@/components/cubix/label";
import { Separator } from "@/components/cubix/separator";
import { Switch } from "@/components/cubix/switch";
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field";
import { ButtonDemoIcon } from "@/components/docs/demo-icon";

import { SPACING_SCALE, spacingRem } from "../_lib/spacing";
import { formatPx, formatRem } from "../_lib/units";
import { SpecimenCard, SpecimenPage, SpecimenSection } from "./specimen";

function SpacingBar({ rem }: { rem: number }) {
  return (
    <div className="flex flex-1 items-center justify-center px-3 py-15">
      <div
        aria-hidden
        className="h-2 max-w-full border-x border-primary bg-primary/15"
        style={{ width: formatRem(rem) }}
      />
    </div>
  );
}

type InContextProps = {
  label: string;
  /** `--spacing` the preview renders at; the specimen frame around it keeps the editor's own. */
  spacing: number;
  children: React.ReactNode;
};

function InContext({ label, spacing, children }: InContextProps) {
  return (
    <SpecimenCard label={label} span="wide" surface="shell">
      <div dir="rtl" lang="fa" className="flex min-h-30 flex-1 items-center justify-center p-3">
        <div
          className="w-full"
          style={{ "--spacing": formatRem(spacing) } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </SpecimenCard>
  );
}

const PREVIEW_SWITCH_ID = "ds-spacing-specimen-preview";
const FAILURE_SWITCH_ID = "ds-spacing-specimen-failure";

function SettingRow({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} defaultChecked />
    </div>
  );
}

function FormSpecimen() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات استقرار</CardTitle>
          <CardDescription>شاخه و دستور ساخت هر استقرار را تعیین کنید.</CardDescription>
          <CardAction>
            <Badge variant="secondary">عملیاتی</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TextField name="branch">
            <TextFieldLabel>شاخه</TextFieldLabel>
            <TextFieldControl>
              <ButtonDemoIcon data-icon="inline-start" />
              <TextFieldInput dir="ltr" defaultValue="main" />
            </TextFieldControl>
          </TextField>
          <TextField name="buildCommand">
            <TextFieldLabel>دستور ساخت</TextFieldLabel>
            <TextFieldControl>
              <ButtonDemoIcon data-icon="inline-start" />
              <TextFieldInput dir="ltr" defaultValue="pnpm build" />
            </TextFieldControl>
          </TextField>
          <Separator />
          <SettingRow id={PREVIEW_SWITCH_ID} label="استقرار شاخه‌های پیش‌نمایش" />
          <SettingRow id={FAILURE_SWITCH_ID} label="اعلان هنگام خطا" />
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline">
            انصراف
          </Button>
          <Button type="submit">ذخیره تغییرات</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function ToolbarRow({ size }: { size: "sm" | "default" }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size={size}>
        <ButtonDemoIcon data-icon="inline-start" />
        استقرار
      </Button>
      <Button size={size} variant="outline">
        <ButtonDemoIcon data-icon="inline-start" />
        بازگردانی
      </Button>
      <Button size={size === "sm" ? "icon-sm" : "icon"} variant="outline" aria-label="اقدامات بیشتر">
        <ButtonDemoIcon />
      </Button>
    </div>
  );
}

function ToolbarSpecimen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تراکم نوار ابزار</CardTitle>
        <CardDescription>دکمه‌ها و نشان‌ها در دو اندازه با فاصله‌گذاری فعلی.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ToolbarRow size="sm" />
        <ToolbarRow size="default" />
        <div className="flex flex-wrap items-center gap-2">
          <Badge>آماده</Badge>
          <Badge variant="secondary">در حال ساخت</Badge>
          <Badge variant="outline">در صف</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function SpacingSpecimens({ spacing }: { spacing: number }) {
  return (
    <SpecimenPage>
      <SpecimenSection
        title="Base unit"
        description="The one length every padding, gap, size and offset in Cubix is a multiple of."
      >
        <SpecimenCard label={`spacing · ${formatPx(spacing)}`} surface="shell">
          <SpacingBar rem={spacing} />
        </SpecimenCard>
      </SpecimenSection>
      <SpecimenSection
        title="Scale"
        description="The multiples Cubix components reach for, each bar exactly as wide as the step it names."
      >
        {SPACING_SCALE.map((multiple) => (
          <SpecimenCard
            key={multiple}
            label={`×${multiple} · ${formatPx(spacingRem(spacing, multiple))}`}
            surface="shell"
          >
            <SpacingBar rem={spacingRem(spacing, multiple)} />
          </SpecimenCard>
        ))}
      </SpecimenSection>
      <SpecimenSection
        title="In context"
        description="Two Cubix surfaces at the current density, where the unit reads as padding rather than as a number."
      >
        <InContext label="Form" spacing={spacing}>
          <FormSpecimen />
        </InContext>
        <InContext label="Toolbar" spacing={spacing}>
          <ToolbarSpecimen />
        </InContext>
      </SpecimenSection>
    </SpecimenPage>
  );
}
