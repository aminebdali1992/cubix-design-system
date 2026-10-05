"use client";

import * as React from "react";

function isEditableTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

export function useModifierLabel(): string {
  const [label, setLabel] = React.useState("Ctrl");

  React.useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setLabel("⌘");
  }, []);

  return label;
}

/** Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z, leaving native undo inside text fields alone. */
export function useUndoShortcuts(onUndo: () => void, onRedo: () => void) {
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "z") return;
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
      if (event.shiftKey) onRedo();
      else onUndo();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onUndo, onRedo]);
}
