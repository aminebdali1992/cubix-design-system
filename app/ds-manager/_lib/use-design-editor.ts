"use client";

import * as React from "react";

import { DEFAULT_RADIUS, type RadiusState, type RadiusToken } from "./radius";
import type { ColorMode } from "./tokens";
import {
  DEFAULT_TYPOGRAPHY,
  type FontSlot,
  type TrackingToken,
  type TypographyState,
} from "./typography";
import { roundUnit } from "./units";

export type Overrides = Readonly<Record<ColorMode, Readonly<Record<string, string>>>>;

type DesignDocument = {
  colors: Overrides;
  typography: TypographyState;
  radius: RadiusState;
};

type History = {
  past: readonly DesignDocument[];
  present: DesignDocument;
  future: readonly DesignDocument[];
};

type Action =
  | { type: "set-color"; mode: ColorMode; token: string; value: string | null }
  | { type: "set-font"; slot: FontSlot; family: string | null }
  | { type: "set-tracking"; value: number }
  | { type: "set-tracking-step"; token: TrackingToken; value: number | null }
  | { type: "reset-tracking" }
  | { type: "set-radius"; value: number }
  | { type: "set-radius-step"; token: RadiusToken; value: number | null }
  | { type: "undo" }
  | { type: "redo" };

const HISTORY_LIMIT = 100;

const INITIAL_DOCUMENT: DesignDocument = {
  colors: { light: {}, dark: {} },
  typography: DEFAULT_TYPOGRAPHY,
  radius: DEFAULT_RADIUS,
};

function commit(history: History, next: DesignDocument): History {
  if (next === history.present) return history;
  return {
    past: [...history.past, history.present].slice(-HISTORY_LIMIT),
    present: next,
    future: [],
  };
}

function withColor(
  overrides: Overrides,
  mode: ColorMode,
  token: string,
  value: string | null
): Overrides {
  const current = overrides[mode];
  if ((current[token] ?? null) === value) return overrides;
  const next = { ...current };
  if (value === null) delete next[token];
  else next[token] = value;
  return { ...overrides, [mode]: next };
}

function withTypography(design: DesignDocument, next: TypographyState): DesignDocument {
  return next === design.typography ? design : { ...design, typography: next };
}

function withFont(typography: TypographyState, slot: FontSlot, family: string | null): TypographyState {
  const value = slot === "heading" ? family : (family ?? typography.fonts[slot]);
  if (typography.fonts[slot] === value) return typography;
  return { ...typography, fonts: { ...typography.fonts, [slot]: value } };
}

function withTrackingStep(
  typography: TypographyState,
  token: TrackingToken,
  value: number | null
): TypographyState {
  const current = typography.trackingOverrides[token] ?? null;
  const next = value === null ? null : roundUnit(value);
  if (current === next) return typography;
  const overrides = { ...typography.trackingOverrides };
  if (next === null) delete overrides[token];
  else overrides[token] = next;
  return { ...typography, trackingOverrides: overrides };
}

function withRadius(design: DesignDocument, next: RadiusState): DesignDocument {
  return next === design.radius ? design : { ...design, radius: next };
}

function withRadiusStep(radius: RadiusState, token: RadiusToken, value: number | null): RadiusState {
  const current = radius.overrides[token] ?? null;
  const next = value === null ? null : roundUnit(value);
  if (current === next) return radius;
  const overrides = { ...radius.overrides };
  if (next === null) delete overrides[token];
  else overrides[token] = next;
  return { ...radius, overrides };
}

function apply(
  design: DesignDocument,
  action: Exclude<Action, { type: "undo" | "redo" }>
): DesignDocument {
  switch (action.type) {
    case "set-color": {
      const colors = withColor(design.colors, action.mode, action.token, action.value);
      return colors === design.colors ? design : { ...design, colors };
    }
    case "set-font":
      return withTypography(design, withFont(design.typography, action.slot, action.family));
    case "set-tracking": {
      const value = roundUnit(action.value);
      if (value === design.typography.tracking) return design;
      return withTypography(design, { ...design.typography, tracking: value });
    }
    case "set-tracking-step":
      return withTypography(design, withTrackingStep(design.typography, action.token, action.value));
    case "reset-tracking": {
      const { tracking, trackingOverrides } = design.typography;
      if (tracking === DEFAULT_TYPOGRAPHY.tracking && Object.keys(trackingOverrides).length === 0) {
        return design;
      }
      return withTypography(design, {
        ...design.typography,
        tracking: DEFAULT_TYPOGRAPHY.tracking,
        trackingOverrides: DEFAULT_TYPOGRAPHY.trackingOverrides,
      });
    }
    case "set-radius": {
      const value = roundUnit(action.value);
      if (value === design.radius.base) return design;
      return withRadius(design, { ...design.radius, base: value });
    }
    case "set-radius-step":
      return withRadius(design, withRadiusStep(design.radius, action.token, action.value));
  }
}

function reducer(history: History, action: Action): History {
  switch (action.type) {
    case "undo": {
      const previous = history.past.at(-1);
      if (!previous) return history;
      return {
        past: history.past.slice(0, -1),
        present: previous,
        future: [history.present, ...history.future],
      };
    }
    case "redo": {
      const [next, ...rest] = history.future;
      if (!next) return history;
      return { past: [...history.past, history.present], present: next, future: rest };
    }
    default:
      return commit(history, apply(history.present, action));
  }
}

export function useDesignEditor() {
  const [history, dispatch] = React.useReducer(reducer, {
    past: [],
    present: INITIAL_DOCUMENT,
    future: [],
  });

  const setToken = React.useCallback(
    (mode: ColorMode, token: string, value: string) =>
      dispatch({ type: "set-color", mode, token, value }),
    []
  );
  const resetToken = React.useCallback(
    (mode: ColorMode, token: string) => dispatch({ type: "set-color", mode, token, value: null }),
    []
  );
  const setFont = React.useCallback(
    (slot: FontSlot, family: string | null) => dispatch({ type: "set-font", slot, family }),
    []
  );
  const setTracking = React.useCallback(
    (value: number) => dispatch({ type: "set-tracking", value }),
    []
  );
  const setTrackingStep = React.useCallback(
    (token: TrackingToken, value: number | null) =>
      dispatch({ type: "set-tracking-step", token, value }),
    []
  );
  const resetTracking = React.useCallback(() => dispatch({ type: "reset-tracking" }), []);
  const setRadius = React.useCallback(
    (value: number) => dispatch({ type: "set-radius", value }),
    []
  );
  const setRadiusStep = React.useCallback(
    (token: RadiusToken, value: number | null) =>
      dispatch({ type: "set-radius-step", token, value }),
    []
  );
  const undo = React.useCallback(() => dispatch({ type: "undo" }), []);
  const redo = React.useCallback(() => dispatch({ type: "redo" }), []);

  return React.useMemo(
    () => ({
      overrides: history.present.colors,
      typography: history.present.typography,
      radius: history.present.radius,
      canUndo: history.past.length > 0,
      canRedo: history.future.length > 0,
      setToken,
      resetToken,
      setFont,
      setTracking,
      setTrackingStep,
      resetTracking,
      setRadius,
      setRadiusStep,
      undo,
      redo,
    }),
    [
      history,
      setToken,
      resetToken,
      setFont,
      setTracking,
      setTrackingStep,
      resetTracking,
      setRadius,
      setRadiusStep,
      undo,
      redo,
    ]
  );
}

export type DesignEditor = ReturnType<typeof useDesignEditor>;
