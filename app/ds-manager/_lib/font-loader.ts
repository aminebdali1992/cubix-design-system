"use client";

import * as React from "react";

import { findFont, googleFontsUrl, type FontOption } from "./typography";

export type FontStatus = "idle" | "loading" | "ready" | "error";

const PERSIAN_PROBE = "آب";
const LATIN_PROBE = "Ag";

const statuses = new Map<string, FontStatus>();
const links = new Map<string, HTMLLinkElement>();
const listeners = new Set<() => void>();

function setStatus(family: string, status: FontStatus) {
  statuses.set(family, status);
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

async function confirmLoaded(option: FontOption) {
  const probe = option.script === "persian" ? PERSIAN_PROBE : LATIN_PROBE;
  try {
    const faces = await document.fonts.load(`1em "${option.family}"`, probe);
    setStatus(option.family, faces.length > 0 ? "ready" : "error");
  } catch {
    setStatus(option.family, "error");
  }
}

/** Injects the face's stylesheet once; a failed face is retried on the next request. */
export function requestFont(option: FontOption) {
  const url = googleFontsUrl([option]);
  if (!url) return;
  const current = statuses.get(option.family);
  if (current === "loading" || current === "ready") return;

  links.get(option.family)?.remove();
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.addEventListener("load", () => void confirmLoaded(option));
  link.addEventListener("error", () => setStatus(option.family, "error"));
  links.set(option.family, link);
  setStatus(option.family, "loading");
  document.head.append(link);
}

export function useFontStatus(family: string | null): FontStatus {
  const remote = family !== null && findFont(family)?.googleAxis !== undefined ? family : null;
  return React.useSyncExternalStore(
    subscribe,
    () => (remote === null ? "ready" : (statuses.get(remote) ?? "idle")),
    () => (remote === null ? "ready" : "idle")
  );
}

export function useLoadFonts(options: readonly FontOption[]) {
  React.useEffect(() => {
    for (const option of options) requestFont(option);
  }, [options]);
}
