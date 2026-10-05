"use client";

import * as React from "react";

const SHELL_ATTRIBUTE = "data-ds-shell";

/**
 * Scopes the DS Manager surface tokens to the document root while the page is
 * mounted. It sits on `<html>` rather than the page wrapper so portalled
 * popups (popovers, tooltips, select menus) pick up the same surfaces.
 */
export function useShellScope() {
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute(SHELL_ATTRIBUTE, "");
    return () => root.removeAttribute(SHELL_ATTRIBUTE);
  }, []);
}
