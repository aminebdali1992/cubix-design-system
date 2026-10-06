import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/cubix/avatar";
import { Badge } from "@/components/cubix/badge";
import { Button } from "@/components/cubix/button";
import { Checkbox } from "@/components/cubix/checkbox";
import { Label } from "@/components/cubix/label";
import { Switch } from "@/components/cubix/switch";
import { TextField, TextFieldInput } from "@/components/cubix/text-field";

import { RADIUS_STEPS, radiusValue, type RadiusState } from "../_lib/radius";
import { formatPx } from "../_lib/units";
import { SpecimenCard, SpecimenPage, SpecimenSection } from "./specimen";

function Corner({ variable }: { variable: string }) {
  return (
    <div className="flex flex-1 items-end justify-end">
      <div
        aria-hidden
        className="h-14 w-1/2 border-s border-t border-foreground bg-muted"
        style={{ borderStartStartRadius: `var(--${variable})` }}
      />
    </div>
  );
}

function InContext({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <SpecimenCard label={label} span="wide" surface="shell">
      <div
        dir="rtl"
        lang="fa"
        className="flex min-h-30 flex-1 flex-wrap items-center justify-center gap-2 p-3"
      >
        {children}
      </div>
    </SpecimenCard>
  );
}

const SWITCH_ID = "ds-radius-specimen-switch";
const CHECKBOX_ID = "ds-radius-specimen-checkbox";

export function RadiusSpecimens({ radius }: { radius: RadiusState }) {
  return (
    <SpecimenPage>
      <SpecimenSection
        title="Base value"
        description="The one value the whole Cubix scale derives from, and the corner it rounds."
      >
        <SpecimenCard label={`radius · ${formatPx(radius.base)}`} span="wide" surface="shell">
          <Corner variable="radius" />
        </SpecimenCard>
      </SpecimenSection>
      <SpecimenSection
        title="Radius scale"
        description="Every step the base value derives, from the tightest corner to the roundest."
      >
        {RADIUS_STEPS.map((spec) => (
          <SpecimenCard
            key={spec.token}
            label={`${spec.token} · ${formatPx(radiusValue(radius, spec))}`}
            surface="shell"
          >
            <Corner variable={spec.token} />
          </SpecimenCard>
        ))}
      </SpecimenSection>
      <SpecimenSection
        title="In context"
        description="The Cubix components the scale rounds, each footer naming the step its style reaches for."
      >
        <InContext label="Button · rounded-lg">
          <Button>ذخیره تغییرات</Button>
          <Button variant="outline">انصراف</Button>
        </InContext>
        <InContext label="Text Field · rounded-lg">
          <TextField className="max-w-64">
            <TextFieldInput aria-label="جستجوی پروژه‌ها" placeholder="جستجوی پروژه‌ها" />
          </TextField>
        </InContext>
        <InContext label="Badge · rounded-4xl">
          <Badge>انتشار</Badge>
          <Badge variant="secondary">بتا</Badge>
          <Badge variant="outline">بایگانی</Badge>
        </InContext>
        <InContext label="Checkbox · rounded-[6px]">
          <Checkbox id={CHECKBOX_ID} defaultChecked />
          <Label htmlFor={CHECKBOX_ID}>اطلاع‌رسانی به من</Label>
        </InContext>
        <InContext label="Switch · rounded-full">
          <Switch id={SWITCH_ID} defaultChecked />
          <Label htmlFor={SWITCH_ID}>انتشار خودکار</Label>
        </InContext>
        <InContext label="Avatar · rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" alt="سارا کریمی" />
            <AvatarFallback>س‌ک</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="مریم رضایی" />
            <AvatarFallback>م‌ر</AvatarFallback>
          </Avatar>
        </InContext>
      </SpecimenSection>
    </SpecimenPage>
  );
}
