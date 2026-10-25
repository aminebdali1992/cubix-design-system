"use client";

import * as React from "react";

import { Avatar, AvatarFallback } from "@/components/cubix/base/avatar";
import { Badge } from "@/components/cubix/base/badge";
import { Button } from "@/components/cubix/base/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/cubix/base/card";
import { Checkbox } from "@/components/cubix/base/checkbox";
import { EmailField, EmailFieldInput, EmailFieldLabel } from "@/components/cubix/base/email-field";
import { Label } from "@/components/cubix/base/label";
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/base/password-field";
import { PhoneField, PhoneFieldInput, PhoneFieldLabel } from "@/components/cubix/base/phone-field";
import { Separator } from "@/components/cubix/base/separator";
import { Switch } from "@/components/cubix/base/switch";
import { TextField, TextFieldInput, TextFieldLabel } from "@/components/cubix/base/text-field";
import { cn } from "@/lib/utils";

import type { UINode, UITree } from "./ui-tree";

const JUSTIFY = { start: "justify-start", center: "justify-center", between: "justify-between", end: "justify-end" };
const ALIGN = { start: "items-start", center: "items-center", stretch: "items-stretch" };
const HEADING = { 1: "text-2xl font-semibold", 2: "text-xl font-semibold", 3: "text-base font-medium" };

function renderNode(n: UINode, key: React.Key): React.ReactNode {
  switch (n.type) {
    case "stack":
      return (
        <div key={key} className={cn("flex flex-col", ALIGN[n.align ?? "stretch"])} style={{ gap: (n.gap ?? 3) * 4 }}>
          {n.children.map(renderNode)}
        </div>
      );
    case "row":
      return (
        <div key={key} className={cn("flex flex-wrap items-center", JUSTIFY[n.justify ?? "start"])} style={{ gap: (n.gap ?? 3) * 4 }}>
          {n.children.map(renderNode)}
        </div>
      );
    case "heading":
      return <div key={key} className={cn("text-foreground", HEADING[n.level ?? 2])}>{n.text}</div>;
    case "text":
      return (
        <p key={key} className={cn("text-sm leading-6", n.tone === "muted" ? "text-muted-foreground" : "text-foreground")}>
          {n.text}
        </p>
      );
    case "card":
      return (
        <Card key={key}>
          {(n.title || n.description) && (
            <CardHeader>
              {n.title && <CardTitle>{n.title}</CardTitle>}
              {n.description && <CardDescription>{n.description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent className="flex flex-col gap-4">{n.children.map(renderNode)}</CardContent>
        </Card>
      );
    case "button":
      return (
        <Button key={key} type="button" variant={n.variant} className={cn(n.fullWidth && "w-full")}>
          {n.text}
        </Button>
      );
    case "textField":
      return (
        <TextField key={key}>
          <TextFieldLabel>{n.label}</TextFieldLabel>
          <TextFieldInput placeholder={n.placeholder} />
        </TextField>
      );
    case "emailField":
      return (
        <EmailField key={key}>
          <EmailFieldLabel>{n.label}</EmailFieldLabel>
          <EmailFieldInput placeholder={n.placeholder} />
        </EmailField>
      );
    case "phoneField":
      return (
        <PhoneField key={key}>
          <PhoneFieldLabel>{n.label}</PhoneFieldLabel>
          <PhoneFieldInput placeholder={n.placeholder} />
        </PhoneField>
      );
    case "passwordField":
      return (
        <PasswordField key={key}>
          <PasswordFieldLabel>{n.label}</PasswordFieldLabel>
          <PasswordFieldControl>
            <PasswordFieldInput placeholder={n.placeholder} />
            <PasswordFieldToggle />
          </PasswordFieldControl>
        </PasswordField>
      );
    case "checkbox":
      return (
        <Label key={key} className="flex items-center gap-2 text-sm">
          <Checkbox defaultChecked={n.checked} />
          {n.label}
        </Label>
      );
    case "switch":
      return (
        <Label key={key} className="flex items-center justify-between gap-3 text-sm">
          {n.label}
          <Switch defaultChecked={n.checked} />
        </Label>
      );
    case "badge":
      return <Badge key={key} variant={n.variant}>{n.text}</Badge>;
    case "separator":
      return <Separator key={key} />;
    case "avatar":
      return (
        <Avatar key={key}>
          <AvatarFallback>{n.fallback}</AvatarFallback>
        </Avatar>
      );
  }
}

/** A light Cubix surface (RTL) that renders a sanitized UI tree. */
export function UIFrame({ tree, style }: { tree: UITree; style?: React.CSSProperties }) {
  const mobile = tree.device === "mobile";
  return (
    <div className="absolute" style={style} onPointerDown={(e) => e.stopPropagation()}>
      <div className="mb-2 flex items-center gap-1.5 text-[12px] text-[#9a9a9a]" dir="ltr">
        <span className="size-1.5 rounded-full bg-[#4c9bff]" />
        {tree.title}
      </div>
      <div
        dir="rtl"
        lang="fa"
        className="cubix-light overflow-auto rounded-[20px] bg-background p-6 text-foreground shadow-[0_0_0_1px_#2a2a2a,0_20px_60px_rgba(0,0,0,0.5)] select-text"
        style={{ width: mobile ? 390 : 1024, height: mobile ? 760 : 640, cursor: "auto" }}
      >
        {renderNode(tree.root, "root")}
      </div>
    </div>
  );
}
