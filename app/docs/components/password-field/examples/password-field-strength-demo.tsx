"use client"

import { useState } from "react"
import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

const COMMON_PASSWORDS = ["123456", "12345678", "123456789", "password", "qwerty", "111111", "abc123", "password1", "iloveyou", "admin"]

const RULES = [
  { label: "حداقل ۸ نویسه", test: (v: string) => v.length >= 8 },
  { label: "هم حرف کوچک و هم بزرگ لاتین (a-z و A-Z)", test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: "حداقل یک رقم (۰-۹) یا نماد", test: (v: string) => /[0-9۰-۹]|[^A-Za-z0-9۰-۹\s]/.test(v) },
  { label: "از رمزهای رایج نباشد", test: (v: string) => !COMMON_PASSWORDS.includes(v.toLowerCase()) },
]

const LEVELS = [
  { label: "", bar: "bg-muted", text: "text-muted-foreground" },
  { label: "ضعیف", bar: "bg-destructive", text: "text-destructive" },
  { label: "متوسط", bar: "bg-orange-500", text: "text-orange-500" },
  { label: "خوب", bar: "bg-emerald-500", text: "text-emerald-600" },
  { label: "قوی", bar: "bg-emerald-500", text: "text-emerald-600" },
]

export function PasswordFieldStrengthDemo() {
  const [password, setPassword] = useState("")
  const results = RULES.map((rule) => (password ? rule.test(password) : false))
  const strength = password ? Math.max(1, results.filter(Boolean).length) : 0
  const level = LEVELS[strength]

  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>
        رمز عبور <span className="text-destructive">*</span>
      </PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput
          placeholder="رمز عبور را وارد کنید"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <PasswordFieldToggle />
      </PasswordFieldControl>

      <div className="relative" aria-hidden="true">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((step) => (
            <span key={step} className="h-[3px] flex-1 rounded-full bg-muted" />
          ))}
        </div>
        {/* One continuous fill, clipped from the right (RTL), shown through the segment gaps */}
        <div
          className="absolute inset-0 flex gap-1 transition-[clip-path] duration-700 ease-out"
          style={{ clipPath: `inset(0 0 0 ${100 - strength * 25}%)` }}
        >
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className={cn("h-[3px] flex-1 rounded-full transition-colors duration-500", level.bar)}
            />
          ))}
        </div>
      </div>
      {password ? (
        <p className={cn("m-0 text-caption", level.text)} aria-live="polite">
          {level.label}
        </p>
      ) : null}

      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {RULES.map((rule, index) => {
          const passed = results[index]
          const Icon = passed ? CheckIcon : XIcon
          return (
            <li
              key={rule.label}
              className={cn(
                "flex items-center gap-1.5 text-caption transition-colors",
                passed ? "text-emerald-600" : "text-muted-foreground"
              )}
            >
              <Icon className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
              <span>{rule.label}</span>
              <span className="sr-only">{passed ? "رعایت شده" : "رعایت نشده"}</span>
            </li>
          )
        })}
      </ul>
    </PasswordField>
  )
}