"use client";
import * as LI from "lucide-react";

import * as React from "react";
import {
  Frame as FrameIcon,
  ChevronDown,
  Ellipsis,
  Folder,
  History,
  ImageIcon,
  LayoutPanelLeft,
  MessagesSquare,
  Play,
  Plus,
  Search,
  Share,
  Share2,
  SquareUserRound,
  Upload,
} from "lucide-react";

import { Button } from "@/components/cubix/button";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

import { ChatPanel } from "./chat-panel";
import { UIFrame } from "./ui-renderer";
import type { UITree } from "./ui-tree";

/*
  Every size below is in reference units: the design is a 1024 x 508 frame.
  The canvas layer scales by s = min(vw / 1024, vh / 508). The fixed chrome
  scales by k = max(s, MIN_TEXT / SMALLEST_TEXT) so no text drops below 11px.
*/
const REF_W = 1024;
const REF_H = 508;
const SMALLEST_TEXT = 7;
const MIN_TEXT = 11;

type ToolIcon = React.ComponentType<{ style?: React.CSSProperties; strokeWidth?: number }>;
type Tool = { icon: ToolIcon; label: string; badge?: "dot" | "beta" };

function svgIcon(children: React.ReactNode) {
  function Icon({ style, strokeWidth = 1.75 }: { style?: React.CSSProperties; strokeWidth?: number }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
        aria-hidden
      >
        {children}
      </svg>
    );
  }
  return Icon;
}

const TextToolIcon = svgIcon(<path d="M5 5h14M12 5v14" />);
const VideoToolIcon = svgIcon(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M10 8.8v6.4l5-3.2-5-3.2Z" fill="currentColor" />
  </>
);
const AudioToolIcon = svgIcon(<path d="M4 10.5v3M8 7.5v9M12 4v16M16 7.5v9M20 10.5v3" />);
const TimelineToolIcon = svgIcon(
  <>
    <rect x="3.5" y="4" width="17" height="16" rx="3" />
    <path d="M3.5 9h17M9 4v5M15 4v5" />
  </>
);
const ReelToolIcon = svgIcon(
  <>
    <circle cx="11" cy="12" r="8" />
    <path d="M19 20h3" />
    <circle cx="11" cy="8" r="1.1" fill="currentColor" />
    <circle cx="11" cy="16" r="1.1" fill="currentColor" />
    <circle cx="7" cy="12" r="1.1" fill="currentColor" />
    <circle cx="15" cy="12" r="1.1" fill="currentColor" />
  </>
);
const DirectorToolIcon = svgIcon(
  <>
    <path d="M12 3.5 16.5 6v5L12 13.5 7.5 11V6L12 3.5Z" />
    <path d="M7.5 6 12 8.5 16.5 6M12 8.5v5" />
    <path d="M5 13.5c-1.3.7-2 1.5-2 2.5 0 2.2 4 4 9 4s9-1.8 9-4c0-1-.7-1.8-2-2.5" />
    <path d="m10 18.5 2 1.5-2 1.5" />
  </>
);

const tools: Tool[] = [
  { icon: TextToolIcon, label: "Text" },
  { icon: ImageIcon, label: "Image" },
  { icon: VideoToolIcon, label: "Video" },
  { icon: LI.Shapes, label: "Shape" },
  { icon: FrameIcon, label: "Frame" },
  { icon: SquareUserRound, label: "Element" },
  { icon: ReelToolIcon, label: "Character Kit", badge: "dot" },
  { icon: DirectorToolIcon, label: "3D Director Console", badge: "beta" },
];

const assetTools: Tool[] = [
  { icon: Folder, label: "Select from Assets" },
  { icon: Upload, label: "Upload from device" },
];

/* Toolbar: measured from a 1:1 crop at 1920 x 1080 (k = 1.875), in reference units. */
const TB = 1.875;
const TB_ICON = 20 / TB;
const TB_STEP = 42 / TB;
const TB_WIDTH = 48 / TB;

const ICON = 8.5;

function useScale() {
  const [s, setS] = React.useState<number | null>(null);
  React.useLayoutEffect(() => {
    const update = () =>
      setS(Math.min(window.innerWidth / REF_W, window.innerHeight / REF_H));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return s;
}

function CursorIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={style} aria-hidden>
      <defs>
        <linearGradient id="cursor-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe14d" />
          <stop offset="1" stopColor="#ff9a1f" />
        </linearGradient>
      </defs>
      <path
        d="M2.5 2.5 22 11.6 5.2 21.5 6.4 12.2Z"
        fill="#078de9"
        stroke="url(#cursor-edge)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M2.5 2.5 22 11.6 6.4 12.2Z" fill="#2ea6ff" />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 13, height: 13 }} aria-hidden>
      <path d="M1 3.5 23 2l-8.2 8.3L12 22l-3.5-9.4L1 3.5Z" fill="#2E8BFF" />
      <path d="M8.5 12.6 23 2l-8.2 8.3-6.3 2.3Z" fill="#7CC0FF" />
    </svg>
  );
}

const chromeBtn =
  "h-[19px] min-w-0 rounded-[4px] border-0 bg-[#1a1a1a] font-normal text-[7px]! leading-none text-[#e0e0e0] shadow-none hover:bg-[#252525] hover:text-white dark:bg-[#1a1a1a] dark:hover:bg-[#252525]";

export function CustomizeCanvas() {
  const scale = useScale();
  const s = scale ?? 1.25;
  const k = Math.max(s, MIN_TEXT / SMALLEST_TEXT);

  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [chatOpen, setChatOpen] = React.useState(false);
  const [tree, setTree] = React.useState<UITree | null>(null);
  const [frames, setFrames] = React.useState<number[]>([]);
  const [shapes, setShapes] = React.useState<{ id: number; kind: ShapeKind }[]>([]);
  const addShape = (kind: ShapeKind) => { setTree(null); setShapes((l) => [...l, { id: (l.length ? Math.max(...l.map((x) => x.id)) : 0) + 1, kind }]); };
  const [rects, setRects] = React.useState<Rect[]>([]);
  const [selRect, setSelRect] = React.useState<number | null>(null);
  const [drawMode, setDrawMode] = React.useState(false);
  const [frameLays, setFrameLays] = React.useState<Record<number, FrameLayout>>({});
  const [drawBox, setDrawBox] = React.useState<{ l: number; t: number; w: number; h: number } | null>(null);
  const rid = React.useRef(0);
  const drawCancel = React.useRef(false);
  const panRef = React.useRef(pan);
  panRef.current = pan;
  const canvasLayer = React.useRef<HTMLDivElement>(null);
  const patchRect = (id: number, p: Partial<Rect>) => setRects((l) => l.map((r) => (r.id === id ? { ...r, ...p } : r)));
  // the frame body under a client point (stops at the top-most frame), ignoring `skip`
  const bodyAt = (x: number, y: number, skip?: Element | null) => {
    for (const el of document.elementsFromPoint(x, y)) {
      if (skip && skip.contains(el)) continue;
      // nearest container body: a frame body, or a rect with a layout (data-frame-body = -rectId)
      const b = el.closest<HTMLElement>("[data-frame-body]");
      if (b) return b;
      if (el.closest("[data-mock-frame]")) return null;
    }
    return null;
  };
  // ids of a rect and all rects nested in it
  const withKids = (l: Rect[], ids: number[]): Set<number> => {
    const out = new Set(ids);
    let grew = true;
    while (grew) { grew = false; for (const r of l) if (r.parent !== null && r.parent < 0 && out.has(-r.parent) && !out.has(r.id)) { out.add(r.id); grew = true; } }
    return out;
  };
  const removeRects = (ids: number[]) => setRects((l) => { const d = withKids(l, ids); return l.filter((r) => !d.has(r.id)); });
  // layout of a parent: frame id > 0, rect container id < 0
  const layOf = (p: number | null): FrameLayout | undefined => {
    if (p === null) return undefined;
    if (p > 0) return frameLays[p];
    const h = rects.find((x) => x.id === -p);
    return h ? fixRect(h).lay : undefined;
  };
  const toLocal = (b: HTMLElement | null, cx: number, cy: number) => {
    if (b) {
      const br = b.getBoundingClientRect();
      const k = br.width / (b.offsetWidth || 1);
      return { x: (cx - br.left) / k, y: (cy - br.top) / k };
    }
    const wr = canvasLayer.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    return { x: cx - wr.left - panRef.current.x, y: cy - wr.top - panRef.current.y };
  };
  const dropRect = (id: number, el: HTMLElement, cx: number, cy: number) => {
    const b = bodyAt(cx, cy, el);
    const np = b ? Number(b.dataset.frameBody) : null;
    const r = rects.find((x) => x.id === id);
    if (!r || r.parent === np) return;
    const br = el.getBoundingClientRect();
    const c = toLocal(b, br.left + br.width / 2, br.top + br.height / 2);
    patchRect(id, { parent: np, x: Math.round(c.x - r.w / 2), y: Math.round(c.y - r.h / 2) });
  };
  const resizeKids = (fid: number, ow: number, oh: number, nw: number, nh: number) =>
    setRects((l) =>
      l.map((r) => {
        if (r.parent !== fid) return r;
        const dw = nw - ow, dh = nh - oh, bw = Math.max(1, ow), bh = Math.max(1, oh - 28);
        let { x, y, w, h } = r;
        if (r.ch === "right") x += dw; else if (r.ch === "lr") w = Math.max(1, w + dw); else if (r.ch === "center") x += dw / 2; else if (r.ch === "scale") { const f = (bw + dw) / bw; x *= f; w *= f; }
        if (r.cv === "bottom") y += dh; else if (r.cv === "tb") h = Math.max(1, h + dh); else if (r.cv === "center") y += dh / 2; else if (r.cv === "scale") { const f = (bh + dh) / bh; y *= f; h *= f; }
        return { ...r, x, y, w, h };
      }),
    );
  function onDrawDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    e.preventDefault();
    drawCancel.current = false;
    const sx = e.clientX, sy = e.clientY;
    const body = bodyAt(sx, sy, e.currentTarget);
    let box = { l: sx, t: sy, w: 0, h: 0 };
    track(
      (ev) => {
        let dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (ev.shiftKey) { const m = Math.max(Math.abs(dx), Math.abs(dy)); dx = (dx < 0 ? -1 : 1) * m; dy = (dy < 0 ? -1 : 1) * m; }
        box = ev.altKey
          ? { l: sx - Math.abs(dx), t: sy - Math.abs(dy), w: 2 * Math.abs(dx), h: 2 * Math.abs(dy) }
          : { l: Math.min(sx, sx + dx), t: Math.min(sy, sy + dy), w: Math.abs(dx), h: Math.abs(dy) };
        setDrawBox(box);
      },
      () => {
        setDrawBox(null);
        if (drawCancel.current) return;
        setDrawMode(false);
        const k = body ? body.getBoundingClientRect().width / (body.offsetWidth || 1) : 1;
        const click = box.w < 3 && box.h < 3;
        const p = toLocal(body, box.l, box.t);
        const id = ++rid.current;
        setRects((l) => [...l, newRect(id, body ? Number(body.dataset.frameBody) : null, Math.round(p.x), Math.round(p.y), click ? 100 : Math.max(1, Math.round(box.w / k)), click ? 100 : Math.max(1, Math.round(box.h / k)))]);
        setSelRect(id);
      },
    );
  }
  React.useEffect(() => {
    if (!drawMode) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { drawCancel.current = true; setDrawMode(false); setDrawBox(null); } };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [drawMode]);
  React.useEffect(() => {
    if (selRect === null) return;
    const id = selRect;
    const off = (e: PointerEvent) => {
      const t = e.target as Element;
      if (e.button !== 2 && !t.closest?.(`[data-rect-id="${id}"]`) && !t.closest?.("[data-frame-panel]")) setSelRect(null);
    };
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeRects([id]);
        setSelRect(null);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        const nid = ++rid.current;
        setRects((l) => { const r = l.find((x) => x.id === id); return r ? [...l, { ...r, id: nid, x: r.x + 10, y: r.y + 10 }] : l; });
        setSelRect(nid);
      } else if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        const d = e.shiftKey ? 10 : 1;
        const dx = e.key === "ArrowLeft" ? -d : e.key === "ArrowRight" ? d : 0;
        const dy = e.key === "ArrowUp" ? -d : e.key === "ArrowDown" ? d : 0;
        setRects((l) => l.map((r) => (r.id === id ? { ...r, x: r.x + dx, y: r.y + dy } : r)));
      }
    };
    window.addEventListener("pointerdown", off, true);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("pointerdown", off, true); window.removeEventListener("keydown", key); };
  }, [selRect]);
  const renderRect = (r: Rect, flow: boolean, offset: { x: number; y: number }): React.ReactNode => (
    <RectItem key={"r" + r.id} r={fixRect(r)} kids={fixRect(r).lay.type !== "none" ? rects.filter((c) => c.parent === -r.id).map((c) => renderRect(c, true, { x: 0, y: 0 })) : null} lay={layOf(r.parent)} flow={flow} offset={offset} selected={selRect === r.id} onSelect={() => setSelRect(r.id)} onPatch={(p) => patchRect(r.id, p)} onDrop={(el, x, y) => dropRect(r.id, el, x, y)} />
  );
  const selR0 = rects.find((r) => r.id === selRect);
  const selR = selR0 ? fixRect(selR0) : null;
  const alignRect = (r: Rect, a: string) => {
    let x0 = 0, y0 = 0, W = 0, H = 0;
    const b = r.parent !== null ? document.querySelector<HTMLElement>(`[data-frame-body="${r.parent}"]`) : null;
    if (b) { W = b.offsetWidth; H = b.offsetHeight; }
    else { const wr = canvasLayer.current?.getBoundingClientRect(); W = wr?.width ?? 0; H = wr?.height ?? 0; x0 = -pan.x; y0 = -pan.y; }
    const p: Partial<Rect> = {};
    if (a === "left") p.x = Math.round(x0); else if (a === "hcenter") p.x = Math.round(x0 + W / 2 - r.w / 2); else if (a === "right") p.x = Math.round(x0 + W - r.w);
    else if (a === "top") p.y = Math.round(y0); else if (a === "vcenter") p.y = Math.round(y0 + H / 2 - r.h / 2); else if (a === "bottom") p.y = Math.round(y0 + H - r.h);
    patchRect(r.id, p);
  };
  const [panning, setPanning] = React.useState(false);
  const [wires, setWires] = React.useState<{ a: PortEnd; b: PortEnd }[]>([]);
  const [draft, setDraft] = React.useState<{ from: PortEnd; x: number; y: number } | null>(null);
  const wireLayer = React.useRef<SVGSVGElement>(null);
  const [, setTick] = React.useState(0);
  const wiring = draft !== null;

  // keep wires glued to their ports while frames move or resize
  React.useEffect(() => {
    if (!wires.length && !wiring) return;
    let raf = 0;
    const loop = () => {
      setTick((n) => n + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [wires.length, wiring]);

  function startWire(from: PortEnd, e: React.PointerEvent) {
    e.stopPropagation();
    e.preventDefault();
    setDraft({ from, x: e.clientX, y: e.clientY });
    const onMove = (ev: PointerEvent) => setDraft((d) => d && { ...d, x: ev.clientX, y: ev.clientY });
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setDraft(null);
      const hit = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      let to: PortEnd | null = null;
      const port = hit?.closest<HTMLElement>("[data-port]");
      if (port) to = { id: Number(port.dataset.frame), side: port.dataset.port as PortSide };
      else {
        const f = hit?.closest<HTMLElement>("[data-frame-id]");
        if (f) {
          const r = f.getBoundingClientRect();
          to = { id: Number(f.dataset.frameId), side: ev.clientX < r.left + r.width / 2 ? "left" : "right" };
        }
      }
      if (!to || to.id === from.id) return;
      const t2 = to;
      setWires((w) =>
        w.some((x) => (x.a.id === from.id && x.b.id === t2.id) || (x.a.id === t2.id && x.b.id === from.id))
          ? w
          : [...w, { a: from, b: t2 }],
      );
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  function portPoint(end: PortEnd) {
    const el = document.querySelector(`[data-frame="${end.id}"][data-port="${end.side}"]`);
    const pr = wireLayer.current?.parentElement?.getBoundingClientRect();
    if (!el || !pr) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - pr.left, y: r.top + r.height / 2 - pr.top };
  }
  const drag = React.useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  // pan with the right mouse button from anywhere on the canvas, frames and rects included:
  // caught in the capture phase so element handlers (which stopPropagation) never see it
  React.useEffect(() => {
    const skip = (t: EventTarget | null) => !!(t as Element | null)?.closest?.("[data-frame-panel],[data-rsel-menu],input,textarea,[contenteditable=true]");
    const down = (e: PointerEvent) => {
      if (e.button !== 2 || skip(e.target)) return;
      e.stopPropagation();
      e.preventDefault();
      const d = { x: e.clientX, y: e.clientY, px: panRef.current.x, py: panRef.current.y };
      setPanning(true);
      const mv = (ev: PointerEvent) => setPan({ x: d.px + ev.clientX - d.x, y: d.py + ev.clientY - d.y });
      const up = () => { setPanning(false); window.removeEventListener("pointermove", mv, true); window.removeEventListener("pointerup", up, true); window.removeEventListener("pointercancel", up, true); };
      window.addEventListener("pointermove", mv, true);
      window.addEventListener("pointerup", up, true);
      window.addEventListener("pointercancel", up, true);
    };
    const menu = (e: MouseEvent) => { if (!skip(e.target)) e.preventDefault(); };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("contextmenu", menu, true);
    return () => { window.removeEventListener("pointerdown", down, true); window.removeEventListener("contextmenu", menu, true); };
  }, []);
  // while panning, force the grabbing cursor everywhere (frames, rects, handles)
  React.useEffect(() => {
    if (!panning) return;
    const st = document.createElement("style");
    st.textContent = "*, *::before, *::after { cursor: grabbing !important; }";
    document.head.appendChild(st);
    return () => st.remove();
  }, [panning]);
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) { void e; }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) { void e; }
  function onPointerUp() {}

  // Overlay dots: identical size, spacing and pan as the base grid on the canvas.
  const dot = Math.round(10 * s);
  const dotMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${dot}' height='${dot}'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`;
  const glow = { rx: 265 * s, ry: 200 * s, dx: -8 * s, dy: -4 * s };

  return (
    <div
      dir="ltr"
      lang="en"
      className={cn(
        "fixed inset-0 overflow-hidden bg-[#0f0f0f] font-sans font-normal text-[#e0e0e0] select-none [color-scheme:dark]",
        scale === null && "opacity-0"
      )}
    >
      {/* Canvas */}
      <div
        className={cn("absolute inset-0", panning ? "cursor-grabbing" : "cursor-default")}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${Math.round(10 * s)}' height='${Math.round(10 * s)}'%3E%3Crect width='1' height='1' fill='%23383838'/%3E%3C/svg%3E")`,
          backgroundSize: `${Math.round(10 * s)}px ${Math.round(10 * s)}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
        onPointerDown={onPointerDown} onContextMenu={(e) => e.preventDefault()}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
      </div>

      {/* Latest generated design, panned with the canvas */}
      {tree && (
        <UIFrame
          tree={tree}
          style={{
            left: "50%",
            top: "50%",
            transformOrigin: "center",
            transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${Math.min(1, (508 * s - 40) / (tree.device === "mobile" ? 800 : 680))})`,
          }}
        />
      )}

      {/* canvas content layer: stays below the toolbar and the rest of the page UI */}
      <div ref={canvasLayer} className="pointer-events-none absolute inset-0 z-0">
      <svg ref={wireLayer} className="pointer-events-none absolute inset-0 size-full overflow-visible" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="wire-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4FA3FF" />
            <stop offset="70%" stopColor="#2F80FF" />
            <stop offset="100%" stopColor="#3DDC97" />
          </linearGradient>
          <filter id="wire-glow" filterUnits="userSpaceOnUse" x="-10000" y="-10000" width="20000" height="20000">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {wires.map((w, i) => {
          const flow = (performance.now() / 1600) % 1;
          const p1 = portPoint(w.a);
          const p2 = portPoint(w.b);
          if (!p1 || !p2) return null;
          const d = wirePath(p1, w.a.side, p2, w.b.side);
          // dim grey by default; lit when one of its frames is selected
          const lit = !!document.querySelector(`[data-frame-id="${w.a.id}"][data-selected], [data-frame-id="${w.b.id}"][data-selected]`);
          return (
            <g key={i}>
              {/* userSpaceOnUse: a perfectly straight wire has a zero-height box, which breaks bbox gradients */}
              <defs>
                {/* flowing gradient: repeat + shift the start along the wire every frame */}
                <linearGradient
                  id={`wire-grad-${i}`}
                  gradientUnits="userSpaceOnUse"
                  spreadMethod="repeat"
                  x1={p1.x + (p2.x - p1.x) * flow}
                  y1={p1.y + (p2.y - p1.y) * flow}
                  x2={p2.x + (p2.x - p1.x) * flow + 0.01}
                  y2={p2.y + (p2.y - p1.y) * flow + 0.01}
                >
                  <stop offset="0%" stopColor="#2F80FF" />
                  <stop offset="35%" stopColor="#4FA3FF" />
                  <stop offset="65%" stopColor="#3DDC97" />
                  <stop offset="100%" stopColor="#2F80FF" />
                </linearGradient>
              </defs>
              {lit && <path d={d} fill="none" stroke="#2F80FF" strokeWidth={6} opacity={0.35} filter="url(#wire-glow)" />}
              <path d={d} fill="none" stroke={lit ? `url(#wire-grad-${i})` : "#242426"} strokeWidth={2} strokeLinecap="round" style={{ transition: "stroke 150ms" }} />
              {/* wide invisible hit area: double-click a wire to remove it */}
              <path
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth={14}
                style={{ pointerEvents: "stroke", cursor: "pointer" }}
                onPointerDown={(e) => e.stopPropagation()}
                onDoubleClick={() => setWires((all) => all.filter((_, j) => j !== i))}
              />
            </g>
          );
        })}
        {draft &&
          (() => {
            const p1 = portPoint(draft.from);
            const pr = wireLayer.current?.parentElement?.getBoundingClientRect();
            if (!p1 || !pr) return null;
            const p2 = { x: draft.x - pr.left, y: draft.y - pr.top };
            const d = wirePath(p1, draft.from.side, p2, p2.x > p1.x ? "left" : "right");
            return <path d={d} fill="none" stroke="#4FA3FF" strokeWidth={2} strokeDasharray="6 5" strokeLinecap="round" />;
          })()}
      </svg>
      {frames.map((id, i) => (        <WindowFrame
          key={id}
          id={id}
          onPortDown={startWire}
          onLayout={(l) => setFrameLays((m) => ({ ...m, [id]: l }))}
          childCount={rects.filter((r) => r.parent === id).length}
          renderChildren={(flow) => rects.filter((r) => r.parent === id).map((r) => renderRect(r, flow, { x: 0, y: 0 }))}
          onResize={(ow, oh, nw, nh) => resizeKids(id, ow, oh, nw, nh)}
          onClose={() => {
            removeRects(rects.filter((r) => r.parent === id).map((r) => r.id));
            setFrames((f) => f.filter((x) => x !== id));
            setWires((w) => w.filter((x) => x.a.id !== id && x.b.id !== id));
          }}
          style={{
            left: "50%",
            top: "50%",
            transformOrigin: "center",
            transform: `translate(calc(-50% + ${pan.x + (i % 8) * 24}px), calc(-50% + ${pan.y + (i % 8) * 24}px)) scale(${Math.min(1, (508 * s - 40) / 680)})`,
          }}
        />
      ))}
      {shapes.map((sh, i) => (
        <ShapeItem key={"s" + sh.id} kind={sh.kind} offset={{ x: pan.x + (i % 8) * 24, y: pan.y + (i % 8) * 24 }} onDelete={() => setShapes((l) => l.filter((x) => x.id !== sh.id))} />
      ))}
      {rects.filter((r) => r.parent === null).map((r) => renderRect(r, false, pan))}
      </div>
      {drawMode && <div className="absolute inset-0 cursor-crosshair" onPointerDown={onDrawDown} onContextMenu={(e) => e.preventDefault()} />}
      {drawBox && (
        <div className="pointer-events-none fixed z-[59] border border-[#0A84FF] bg-[#B1B2B5]" style={{ left: drawBox.l, top: drawBox.t, width: drawBox.w, height: drawBox.h }}>
          <div className="absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 rounded-[4px] bg-[#0A84FF] px-1.5 py-0.5 text-[11px] leading-none font-normal whitespace-nowrap text-white">{Math.round(drawBox.w)} {"\u00d7"} {Math.round(drawBox.h)}</div>
        </div>
      )}
      {selR &&
        createPortal(
          <RectPanel r={selR} inFrame={selR.parent !== null} lay={layOf(selR.parent)} onAlign={(a) => alignRect(selR, a)} onPatch={(p) => patchRect(selR.id, p)} onDelete={() => { removeRects([selR.id]); setSelRect(null); }} />,
          document.body,
        )}

      {!tree && frames.length === 0 && rects.length === 0 && !drawMode && (
        <>
          {/* Empty state: the same dot grid, brightened and tinted around the prompt */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(170deg, rgb(196,170,24) calc(50% - ${glow.ry - glow.dy}px), rgb(150,190,40) calc(50% - ${glow.ry * 0.45 - glow.dy}px), rgb(95,210,230) calc(50% + ${glow.dy}px), rgb(60,180,225) calc(50% + ${glow.ry * 0.5 + glow.dy}px), rgb(46,166,219) calc(50% + ${glow.ry + glow.dy}px))`,
              maskImage: `${dotMask}, radial-gradient(${glow.rx}px ${glow.ry}px at calc(50% + ${glow.dx}px) calc(50% + ${glow.dy}px), #000 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.55) 72%, transparent 100%)`,
              WebkitMaskImage: `${dotMask}, radial-gradient(${glow.rx}px ${glow.ry}px at calc(50% + ${glow.dx}px) calc(50% + ${glow.dy}px), #000 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.55) 72%, transparent 100%)`,
              maskSize: `${dot}px ${dot}px, 100% 100%`,
              WebkitMaskSize: `${dot}px ${dot}px, 100% 100%`,
              maskPosition: `${pan.x}px ${pan.y}px, 0 0`,
              WebkitMaskPosition: `${pan.x}px ${pan.y}px, 0 0`,
              maskRepeat: "repeat, no-repeat",
              WebkitMaskRepeat: "repeat, no-repeat",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <div
            className="pointer-events-none fixed inset-0 flex items-center justify-center text-[#bdbdbd] font-normal"
            style={{ fontSize: 15 * s, lineHeight: 1 }}
          >
            <span>Double-click</span>
            <CursorIcon size={22 * s} style={{ marginLeft: 35 * s, marginRight: 25 * s }} />
            <span>to start creating</span>
          </div>
        </>
      )}

      {/* Top left */}
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `scale(${k})` }}
      >
        <div className="flex items-center" style={{ paddingLeft: 10, paddingTop: 9, height: 22 }}>
          <LogoMark />
          <button
            type="button"
            className="flex items-center font-medium text-white"
            style={{ marginLeft: 9, gap: 5, fontSize: 8 }}
          >
            Untitled canvas
            <ChevronDown style={{ width: 7, height: 7 }} className="text-[#9a9a9a]" strokeWidth={2} />
          </button>
          <span className="text-[#8a8a8a]" style={{ marginLeft: 11, fontSize: SMALLEST_TEXT }}>
            3 nodes
          </span>
          <span className="text-[#8a8a8a]" style={{ marginLeft: 9, fontSize: SMALLEST_TEXT }}>
            Auto saved
          </span>
        </div>
      </div>

      {/* Top right */}
      <div
        className="absolute top-0 right-0 origin-top-right"
        style={{ transform: `scale(${k})` }}
      >
        <div className="flex items-center" style={{ paddingRight: 17, paddingTop: 6, gap: 4.5 }}>
          <div className="flex h-[19px] items-center rounded-[4px] bg-[#1a1a1a]" style={{ padding: "0 3px", gap: 1 }}>
            {[
              { icon: Search, label: "Search" },
              { icon: History, label: "History" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={label}
                className="size-[15px] min-w-0 rounded-[3px] p-0 text-[#e0e0e0] hover:bg-[#252525] hover:text-white"
              >
                <Icon style={{ width: ICON, height: ICON }} strokeWidth={1.75} />
              </Button>
            ))}
          </div>
          <Button type="button" variant="ghost" className={cn(chromeBtn, "w-[43px] gap-[3.5px] px-0")}>
            <Share style={{ width: 7, height: 7 }} strokeWidth={1.75} />
            Share
          </Button>
          <Button
            type="button"
            variant="ghost"
            aria-label="More"
            className={cn(chromeBtn, "w-[19px] px-0")}
          >
            <Ellipsis style={{ width: 7, height: 7 }} strokeWidth={1.75} />
          </Button>
          <Button type="button" variant="ghost" className={cn(chromeBtn, "w-[60px] gap-[5px] px-0")}>
            <span className="flex items-center gap-[2px]">
              <Plus style={{ width: 6, height: 6 }} strokeWidth={2.25} />0
            </span>
            Upgrade
          </Button>
          <span
            aria-label="Account"
            className="rounded-full bg-[radial-gradient(circle_at_40%_32%,#e2ddd5,#7a7067_50%,#2b2622)]"
            style={{ width: 14, height: 14, marginLeft: 2 }}
          />
        </div>
      </div>

      {/* Left toolbar */}
      <div
        className="group absolute top-1/2 left-0 origin-left"
        style={{ transform: `translateY(-50%) scale(${k})` }}
      >
        <div
          className="flex flex-col items-center bg-[#202022]"
          style={{
            marginLeft: 11 / TB,
            width: TB_WIDTH,
            borderRadius: 12 / TB,
            padding: `${3 / TB}px 0 ${7 / TB}px`,
            boxShadow: `inset 0 0 0 ${1 / TB}px #28282a`,
          }}
        >
          {tools.map((tool) => tool.label === "Shape" ? <ShapeTool key={tool.label} tool={tool} onPick={(kd) => (kd === "rect" ? (setTree(null), setDrawMode(true)) : addShape(kd))} /> : (
            <ToolButton key={tool.label} tool={tool} onClick={tool.label === "Frame" ? () => { setTree(null); setFrames((f) => [...f, (f.length ? Math.max(...f) : 0) + 1]); } : undefined} />
          ))}
          <div
            className="bg-[#2c2c2e]"
            style={{ height: 1 / TB, width: 26 / TB, margin: `${6 / TB}px 0 ${6 / TB}px` }}
          />
          {assetTools.map((tool) => (
            <ToolButton key={tool.label} tool={tool} onClick={tool.label === "Frame" ? () => { setTree(null); setFrames((f) => [...f, (f.length ? Math.max(...f) : 0) + 1]); } : undefined} />
          ))}
        </div>
      </div>

      {/* Bottom left */}
      <div
        className="absolute bottom-0 left-0 origin-bottom-left"
        style={{ transform: `scale(${k})` }}
      >
        <div className="flex items-center text-[#bdbdbd]" style={{ paddingLeft: 10, paddingBottom: 13, gap: 5 }}>
          <button
            type="button"
            aria-label="Run"
            className="flex items-center justify-center rounded-[3px] bg-[#1f1f1f] text-white"
            style={{ width: 12, height: 12 }}
          >
            <Play style={{ width: 6, height: 6 }} strokeWidth={2} />
          </button>
          {[
            { icon: LayoutPanelLeft, label: "Layout" },
            { icon: Share2, label: "Connections" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex items-center justify-center rounded-[3px] hover:bg-[#1f1f1f]"
              style={{ width: 12, height: 12 }}
            >
              <Icon style={{ width: 6, height: 6 }} strokeWidth={1.75} />
            </button>
          ))}
          <span className="tabular-nums text-[#9a9a9a]" style={{ marginLeft: 12, fontSize: SMALLEST_TEXT }}>
            100%
          </span>
        </div>
      </div>

      {/* Bottom right */}
      <div
        className="absolute right-0 bottom-0 origin-bottom-right"
        style={{ transform: `scale(${k})` }}
      >
        <div style={{ paddingRight: 15, paddingBottom: 7 }}>
          <Button
            type="button"
            onClick={() => setChatOpen((o) => !o)}
            variant="ghost"
            className="h-[19px] w-[64px] min-w-0 gap-[5px] rounded-[6px] border-[0.75px] border-[#2a2a2a] bg-[#1a1a1a] px-0 font-normal text-[7px]! leading-none text-[#e0e0e0] shadow-none hover:bg-[#252525] hover:text-white dark:bg-[#1a1a1a] dark:hover:bg-[#252525]"
          >
            <MessagesSquare style={{ width: 7.5, height: 7.5 }} className="text-[#4c9bff]" strokeWidth={1.75} />
            Chats
          </Button>
        </div>
      </div>
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} onTree={setTree} />}
    </div>
  );
}

type ShapeKind = "rect" | "ellipse" | "line" | "arrow";
const SHAPE_ITEMS: { kind: ShapeKind; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { kind: "rect", label: "Rectangle", icon: LI.Square },
  { kind: "ellipse", label: "Ellipse", icon: LI.Circle },
  { kind: "line", label: "Line", icon: LI.Minus },
  { kind: "arrow", label: "Arrow", icon: LI.MoveUpRight },
];

function ShapeTool({ tool, onPick }: { tool: Tool; onPick: (k: ShapeKind) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [box, setBox] = React.useState<DOMRect | null>(null);
  React.useEffect(() => {
    if (!box) return;
    const close = (e: PointerEvent) => { if (!(e.target as Element).closest?.("[data-shape-menu]") && !ref.current?.contains(e.target as Node)) setBox(null); };
    window.addEventListener("pointerdown", close, true);
    return () => window.removeEventListener("pointerdown", close, true);
  }, [box]);
  return (
    <div ref={ref}>
      <ToolButton tool={tool} onClick={() => setBox(box ? null : ref.current!.getBoundingClientRect())} />
      {box &&
        createPortal(
          <div data-shape-menu="" className="fixed z-[70] w-44 rounded-[12px] border border-[#2c2c2e] bg-[#1a1a1b] p-1 text-[13px] font-normal text-[#f2f2f2] shadow-[0_12px_32px_rgba(0,0,0,0.5)]" style={{ left: box.right + 10, top: box.top }}>
            {SHAPE_ITEMS.map((it) => (
              <button key={it.kind} type="button" onClick={() => { onPick(it.kind); setBox(null); }} className="flex h-8 w-full items-center gap-2.5 rounded-[8px] px-2.5 hover:bg-[#2c2c2e]">
                <it.icon className="size-4 text-[#8e8e93]" />
                {it.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

type ShapeStyle = { fill: string; stroke: string; strokeW: number; radius: number; opacity: number };

function ShapePanel({ kind, w, h, x, y, p, onSize, onPos, onProp, onDelete }: { kind: ShapeKind; w: number; h: number; x: number; y: number; p: ShapeStyle; onSize: (w: number, h: number) => void; onPos: (x: number, y: number) => void; onProp: <K extends keyof ShapeStyle>(k: K, v: ShapeStyle[K]) => void; onDelete: () => void }) {
  const num = (label: string, value: number, set: (v: number) => void, suffix?: string) => (
    <label className="flex h-8 flex-1 items-center gap-2 rounded-[8px] bg-[#232325] px-2.5 focus-within:ring-1 focus-within:ring-[#0A84FF]">
      <span className="text-[#6a6a6a]">{label}</span>
      <input type="number" value={Math.round(value)} onChange={(e) => set(Number(e.target.value) || 0)} className="w-full min-w-0 bg-transparent text-[#f2f2f2] tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
      {suffix && <span className="text-[#6a6a6a]">{suffix}</span>}
    </label>
  );
  const color = (value: string, set: (v: string) => void) => (
    <label className="flex h-8 flex-1 items-center gap-2 rounded-[8px] bg-[#232325] px-2">
      <span className="relative size-4 overflow-hidden rounded-[4px] border border-[#3a3a3c]" style={{ background: value }}>
        <input type="color" value={value} onChange={(e) => set(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
      </span>
      <span className="text-[#f2f2f2] uppercase tabular-nums">{value.replace("#", "")}</span>
    </label>
  );
  const title = (t: string) => <div className="mt-3 mb-1.5 text-[11px] text-[#8e8e93]">{t}</div>;
  const line = kind === "line" || kind === "arrow";
  return (
    <div data-frame-panel="" className="fixed top-16 right-3 z-[60] w-64 rounded-[12px] border border-[#2c2c2e] bg-[#1a1a1b] p-3 text-[12px] font-normal text-[#f2f2f2] shadow-[0_12px_32px_rgba(0,0,0,0.5)] select-none">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-white">{SHAPE_ITEMS.find((i) => i.kind === kind)!.label}</span>
        <button type="button" title="Delete" onClick={onDelete} className="flex size-6 items-center justify-center rounded-[6px] text-[#8e8e93] hover:bg-[#2c2c2e] hover:text-[#EE5353]">
          <LI.Trash2 className="size-3.5" />
        </button>
      </div>
      {title("Size")}
      <div className="flex gap-2">
        {num("W", w, (v) => onSize(Math.max(8, v), h))}
        {num(line ? "Θ" : "H", h, (v) => onSize(w, line ? v : Math.max(8, v)))}
      </div>
      {title("Position")}
      <div className="flex gap-2">
        {num("X", x, (v) => onPos(v, y))}
        {num("Y", y, (v) => onPos(x, v))}
      </div>
      <div className="flex gap-2">
        {kind === "rect" && <div className="flex-1">{title("Radius")}{num("R", p.radius, (v) => onProp("radius", Math.max(0, v)))}</div>}
        <div className="flex-1">{title("Opacity")}{num("", p.opacity, (v) => onProp("opacity", Math.min(100, Math.max(0, v))), "%")}</div>
      </div>
      {!line && (
        <>
          {title("Fill")}
          <div className="flex">{color(p.fill, (v) => onProp("fill", v))}</div>
        </>
      )}
      {title("Stroke")}
      <div className="flex gap-2">
        {color(p.stroke, (v) => onProp("stroke", v))}
        <div className="w-20">{num("", p.strokeW, (v) => onProp("strokeW", Math.max(0, v)), "px")}</div>
      </div>
    </div>
  );
}

function ShapeItem({ kind, offset, onDelete }: { kind: ShapeKind; offset: { x: number; y: number }; onDelete: () => void }) {
  const line = kind === "line" || kind === "arrow";
  // for line/arrow: w = length, h = angle in degrees
  const [size, setSize] = React.useState(line ? { w: 200, h: 0 } : { w: 160, h: 120 });
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [st, setSt] = React.useState<ShapeStyle>({ fill: "#6F87EE", stroke: line ? "#f2f2f2" : "#00000000", strokeW: line ? 2 : 0, radius: kind === "rect" ? 8 : 0, opacity: 100 });
  const [selected, setSelected] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{ x: number; y: number; px: number; py: number; mode: "move" | "resize" } | null>(null);
  React.useEffect(() => {
    if (!selected) return;
    const off = (e: PointerEvent) => { const t = e.target as Element; if (e.button !== 2 && !ref.current?.contains(t) && !t.closest?.("[data-frame-panel]")) setSelected(false); };
    const del = (e: KeyboardEvent) => { const t = e.target as HTMLElement; if ((e.key === "Delete" || e.key === "Backspace") && !/INPUT|TEXTAREA/.test(t.tagName)) onDelete(); };
    window.addEventListener("pointerdown", off, true);
    window.addEventListener("keydown", del);
    return () => { window.removeEventListener("pointerdown", off, true); window.removeEventListener("keydown", del); };
  }, [selected, onDelete]);
  const down = (mode: "move" | "resize") => (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setSelected(true);
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    drag.current = mode === "move" ? { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y, mode } : { x: e.clientX, y: e.clientY, px: size.w, py: size.h, mode };
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (d.mode === "move") setPos({ x: d.px + dx, y: d.py + dy });
    else if (line) {
      const rad = (d.py * Math.PI) / 180;
      const ex = Math.cos(rad) * d.px + dx, ey = Math.sin(rad) * d.px + dy;
      setSize({ w: Math.max(8, Math.hypot(ex, ey)), h: Math.round((Math.atan2(ey, ex) * 180) / Math.PI) });
    } else setSize({ w: Math.max(8, d.px + dx), h: Math.max(8, d.py + dy) });
  };
  const up = () => { drag.current = null; };
  const sw = st.strokeW;
  const handle = "pointer-events-auto absolute size-2.5 rounded-[2px] border border-[#0A84FF] bg-white";
  return (
    <div
      ref={ref}
      className="pointer-events-auto absolute"
      style={{ left: "50%", top: "50%", zIndex: 1, transform: `translate(${offset.x + pos.x}px, ${offset.y + pos.y}px)`, opacity: st.opacity / 100 }}
    >
      {line ? (
        <div className="absolute top-0 left-0 origin-left" style={{ width: size.w, rotate: `${size.h}deg` }}>
          <div onPointerDown={down("move")} onPointerMove={move} onPointerUp={up} className="relative -top-2 h-4 cursor-move touch-none">
            <svg className="absolute inset-0 overflow-visible" width={size.w} height={16}>
              <line x1={0} y1={8} x2={size.w - (kind === "arrow" ? sw * 2 : 0)} y2={8} stroke={st.stroke} strokeWidth={sw} strokeLinecap="round" />
              {kind === "arrow" && <path d={`M${size.w - 6 - sw * 3} ${2 - sw} L${size.w} 8 L${size.w - 6 - sw * 3} ${14 + sw}`} fill="none" stroke={st.stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />}
            </svg>
            {selected && <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#0A84FF]/60" />}
          </div>
          {selected && <div onPointerDown={down("resize")} onPointerMove={move} onPointerUp={up} className={cn(handle, "-top-[5px] -right-[5px] cursor-crosshair touch-none")} />}
        </div>
      ) : (
        <div onPointerDown={down("move")} onPointerMove={move} onPointerUp={up} className={cn("relative cursor-move touch-none", selected && "outline outline-1 outline-[#0A84FF]")} style={{ width: size.w, height: size.h }}>
          <svg className="absolute inset-0 overflow-visible" width={size.w} height={size.h}>
            {kind === "rect" ? (
              <rect x={sw / 2} y={sw / 2} width={Math.max(0, size.w - sw)} height={Math.max(0, size.h - sw)} rx={st.radius} fill={st.fill} stroke={st.stroke} strokeWidth={sw} />
            ) : (
              <ellipse cx={size.w / 2} cy={size.h / 2} rx={Math.max(0, (size.w - sw) / 2)} ry={Math.max(0, (size.h - sw) / 2)} fill={st.fill} stroke={st.stroke} strokeWidth={sw} />
            )}
          </svg>
          {selected && <div onPointerDown={down("resize")} onPointerMove={move} onPointerUp={up} className={cn(handle, "-right-[5px] -bottom-[5px] cursor-nwse-resize touch-none")} />}
        </div>
      )}
      {selected &&
        createPortal(
          <ShapePanel kind={kind} w={size.w} h={size.h} x={pos.x} y={pos.y} p={st} onSize={(w, h) => setSize({ w, h })} onPos={(x, y) => setPos({ x, y })} onProp={(k, v) => setSt((p) => ({ ...p, [k]: v }))} onDelete={onDelete} />,
          document.body,
        )}
    </div>
  );
}

function ToolButton({ tool, onClick }: { tool: Tool; onClick?: () => void }) {
  const Icon = tool.icon;
  return (
    <button
      type="button"
      aria-label={tool.label}
      onClick={onClick}
      className="group/item relative flex items-center justify-center text-[#f2f2f2] hover:text-white"
      style={{ width: TB_WIDTH, height: TB_STEP }}
    >
      <span
        className="flex items-center justify-center transition-colors hover:bg-[#3B3B3C]"
        style={{ width: 40 / TB, height: 40 / TB, borderRadius: 8 / TB }}
      >
        <Icon style={{ width: TB_ICON, height: TB_ICON }} strokeWidth={1.75} />
      </span>
      {tool.badge === "dot" ? (
        <span
          className="absolute rounded-full bg-[#009EFA]"
          style={{
            left: TB_WIDTH / 2 + 5 / TB,
            top: TB_STEP / 2 - 10 / TB,
            width: 5 / TB,
            height: 5 / TB,
          }}
        />
      ) : null}
      {tool.badge === "beta" ? (
        <span
          className="pointer-events-none absolute flex items-center justify-center bg-[#29292a] leading-none text-[#6b6b6b]"
          style={{
            left: TB_WIDTH / 2 - 1.5 / TB,
            top: TB_STEP / 2 - 21 / TB,
            width: 22 / TB,
            height: 13 / TB,
            borderRadius: 3 / TB,
            fontSize: 9 / TB,
          }}
        >
          Beta
        </span>
      ) : null}
      <span
        className="pointer-events-none absolute whitespace-nowrap text-[#6a6a6a] opacity-0 -translate-x-[6px] transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover/item:text-white"
        style={{ left: TB_WIDTH + 14 / TB, fontSize: 7 }}
      >
        {tool.label}
      </span>
    </button>
  );
}

type PortSide = "left" | "right";
type PortEnd = { id: number; side: PortSide };

// smooth horizontal bezier between two ports (like node editors)
function wirePath(p1: { x: number; y: number }, s1: PortSide, p2: { x: number; y: number }, s2: PortSide) {
  const d = Math.max(60, Math.abs(p2.x - p1.x) / 2);
  const c1 = p1.x + (s1 === "right" ? d : -d);
  const c2 = p2.x + (s2 === "right" ? d : -d);
  return `M${p1.x},${p1.y} C${c1},${p1.y} ${c2},${p2.y} ${p2.x},${p2.y}`;
}

type FrameStyle = { radius: number; opacity: number; fill: string; stroke: string; strokeW: number; shadow: boolean; clip: boolean; rotate: number; blend: string; blur: number; shadowColor: string; shadowY: number; shadowBlur: number; hidden: boolean };

// Penpot-style board settings panel
function FramePanel({ w, h, x, y, p, onSize, onPos, onProp, children }: { w: number; h: number; x: number; y: number; p: FrameStyle; onSize: (w: number, h: number) => void; onPos: (x: number, y: number) => void; onProp: <K extends keyof FrameStyle>(k: K, v: FrameStyle[K]) => void; children?: React.ReactNode }) {
  const num = (label: string, value: number, set: (v: number) => void, suffix?: string) => (
    <label className="flex h-8 items-center gap-2 rounded-[8px] bg-[#232325] px-2.5 focus-within:ring-1 focus-within:ring-[#0A84FF]">
      <span className="text-[#6a6a6a]">{label}</span>
      <input type="number" value={Math.round(value)} onChange={(e) => set(Number(e.target.value) || 0)} className="w-full min-w-0 bg-transparent text-[#f2f2f2] tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
      {suffix && <span className="text-[#6a6a6a]">{suffix}</span>}
    </label>
  );
  const color = (value: string, set: (v: string) => void) => (
    <label className="flex h-8 flex-1 items-center gap-2 rounded-[8px] bg-[#232325] px-2">
      <span className="relative size-4 overflow-hidden rounded-[4px] border border-[#3a3a3c]" style={{ background: value }}>
        <input type="color" value={value} onChange={(e) => set(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
      </span>
      <span className="text-[#f2f2f2] uppercase tabular-nums">{value.replace("#", "")}</span>
    </label>
  );
  const toggle = (label: string, on: boolean, set: (v: boolean) => void) => (
    <div className="flex h-8 items-center justify-between">
      <span>{label}</span>
      <button type="button" onClick={() => set(!on)} className={cn("relative h-[18px] w-8 rounded-full transition-colors", on ? "bg-[#0A84FF]" : "bg-[#3a3a3c]")}>
        <span className={cn("absolute top-[2px] size-[14px] rounded-full bg-white transition-all", on ? "left-[16px]" : "left-[2px]")} />
      </button>
    </div>
  );
  const title = (t: string) => <div className="mt-3 mb-1.5 text-[11px] text-[#8e8e93]">{t}</div>;
  return (
    <div data-frame-panel="" className="fixed top-16 right-3 z-[60] max-h-[calc(100vh-5rem)] w-64 overflow-y-auto rounded-[12px] border border-[#2c2c2e] bg-[#1a1a1b] p-3 text-[12px] font-normal text-[#f2f2f2] shadow-[0_12px_32px_rgba(0,0,0,0.5)] select-none">
      <div className="text-[13px] text-white">Board</div>
      {title("Size")}
      <div className="grid grid-cols-2 gap-2">
        {num("W", w, (v) => onSize(Math.max(200, v), h))}
        {num("H", h, (v) => onSize(w, Math.max(150, v)))}
      </div>
      {title("Position")}
      <div className="grid grid-cols-2 gap-2">
        {num("X", x, (v) => onPos(v, y))}
        {num("Y", y, (v) => onPos(x, v))}
      </div>
      {toggle("Clip content", p.clip, (v) => onProp("clip", v))}
      {toggle("Hide in view mode", p.hidden, (v) => onProp("hidden", v))}
      {children}
      {title("Fill")}
      <div className="flex">{color(p.fill, (v) => onProp("fill", v))}</div>
      <div className="mt-3">{toggle("Shadow", p.shadow, (v) => onProp("shadow", v))}</div>
    </div>
  );
}

type FrameLayout = { type: "none" | "flex" | "grid"; dir: "row" | "row-reverse" | "column" | "column-reverse"; wrap: boolean; align: "start" | "center" | "end" | "stretch"; justify: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly"; gapR: number; gapC: number; pad: number; cols: number; rows: number };

// Penpot-style board Layout panel (flex / grid)
function LayoutPanel({ l, onChange, flush }: { flush?: boolean; l: FrameLayout; onChange: <K extends keyof FrameLayout>(k: K, v: FrameLayout[K]) => void }) {
  type Opt<T> = { v: T; t: string; i: React.ComponentType<{ className?: string }> };
  const seg = <T extends string>(opts: Opt<T>[], cur: T | "", set: (v: T) => void) => (
    <div className="flex h-8 flex-1 gap-0.5 rounded-[8px] bg-[#232325] p-0.5">
      {opts.map((o) => (
        <button key={o.v} type="button" title={o.t} onClick={() => set(o.v)} className={cn("flex flex-1 items-center justify-center rounded-[6px] transition-colors", cur === o.v ? "bg-[#3a3a3c] text-white" : "text-[#8e8e93] hover:bg-[#2c2c2e] hover:text-white")}>
          <o.i className="size-4" />
        </button>
      ))}
    </div>
  );
  const num = (Icon: React.ComponentType<{ className?: string }>, tip: string, value: number, set: (v: number) => void, min = 0) => (
    <label title={tip} className="flex h-8 flex-1 items-center gap-2 rounded-[8px] bg-[#232325] px-2.5 focus-within:ring-1 focus-within:ring-[#0A84FF]">
      <Icon className="size-3.5 shrink-0 text-[#6a6a6a]" />
      <input type="number" min={min} value={value} onChange={(e) => set(Math.max(min, Number(e.target.value) || 0))} className="w-full min-w-0 bg-transparent text-[#f2f2f2] tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
    </label>
  );
  const row = (label: string, child: React.ReactNode) => (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 text-[11px] text-[#8e8e93]">{label}</span>
      {child}
    </div>
  );
  const col = l.type === "flex" && l.dir.startsWith("column");
  return (
    <div className={cn("-mx-3 border-t border-[#2c2c2e] px-3 py-3", !flush && "mt-3")}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] text-[#8e8e93]">Layout</span>
      </div>
      {seg<FrameLayout["type"]>([{ v: "none", t: "No layout", i: LI.Ban }, { v: "flex", t: "Flex layout", i: LI.Columns3 }, { v: "grid", t: "Grid layout", i: LI.LayoutGrid }], l.type, (v) => onChange("type", v))}
      {l.type !== "none" && (
        <div className="mt-3 flex flex-col gap-2">
          {l.type === "flex" && (
            <>
              {row("Direction", (
                <>
                  {seg<FrameLayout["dir"]>([{ v: "row", t: "Row", i: LI.ArrowRight }, { v: "row-reverse", t: "Row reverse", i: LI.ArrowLeft }, { v: "column", t: "Column", i: LI.ArrowDown }, { v: "column-reverse", t: "Column reverse", i: LI.ArrowUp }], l.dir, (v) => onChange("dir", v))}
                  <button type="button" title="Wrap" onClick={() => onChange("wrap", !l.wrap)} className={cn("flex size-8 shrink-0 items-center justify-center rounded-[8px] transition-colors", l.wrap ? "bg-[#0A84FF] text-white" : "bg-[#232325] text-[#8e8e93] hover:text-white")}>
                    <LI.WrapText className="size-4" />
                  </button>
                </>
              ))}
              {row("Justify", seg<FrameLayout["justify"]>(col
                ? [{ v: "start", t: "Start", i: LI.AlignVerticalJustifyStart }, { v: "center", t: "Center", i: LI.AlignVerticalJustifyCenter }, { v: "end", t: "End", i: LI.AlignVerticalJustifyEnd }, { v: "space-between", t: "Space between", i: LI.AlignVerticalSpaceBetween }, { v: "space-around", t: "Space around", i: LI.AlignVerticalSpaceAround }, { v: "space-evenly", t: "Space evenly", i: LI.AlignVerticalDistributeCenter }]
                : [{ v: "start", t: "Start", i: LI.AlignHorizontalJustifyStart }, { v: "center", t: "Center", i: LI.AlignHorizontalJustifyCenter }, { v: "end", t: "End", i: LI.AlignHorizontalJustifyEnd }, { v: "space-between", t: "Space between", i: LI.AlignHorizontalSpaceBetween }, { v: "space-around", t: "Space around", i: LI.AlignHorizontalSpaceAround }, { v: "space-evenly", t: "Space evenly", i: LI.AlignHorizontalDistributeCenter }], l.justify, (v) => onChange("justify", v)))}
            </>
          )}
          {l.type === "grid" && row("Tracks", (
            <>
              {num(LI.Columns3, "Columns", l.cols, (v) => onChange("cols", v), 1)}
              {num(LI.Rows3, "Rows", l.rows, (v) => onChange("rows", v), 1)}
            </>
          ))}
          {row("Align", seg<FrameLayout["align"]>(col
            ? [{ v: "start", t: "Start", i: LI.AlignStartVertical }, { v: "center", t: "Center", i: LI.AlignCenterVertical }, { v: "end", t: "End", i: LI.AlignEndVertical }, { v: "stretch", t: "Stretch", i: LI.StretchVertical }]
            : [{ v: "start", t: "Start", i: LI.AlignStartHorizontal }, { v: "center", t: "Center", i: LI.AlignCenterHorizontal }, { v: "end", t: "End", i: LI.AlignEndHorizontal }, { v: "stretch", t: "Stretch", i: LI.StretchHorizontal }], l.align, (v) => onChange("align", v)))}
          {row("Gap", (
            <>
              {num(LI.SeparatorVertical, "Column gap", l.gapC, (v) => onChange("gapC", v))}
              {num(LI.SeparatorHorizontal, "Row gap", l.gapR, (v) => onChange("gapR", v))}
            </>
          ))}
          {row("Padding", num(LI.Scan, "Padding", l.pad, (v) => onChange("pad", v)))}
        </div>
      )}
    </div>
  );
}

const FRAME_PRESETS = [
  { label: "Desktop", w: 1440, h: 1024 },
  { label: "MacBook Air", w: 1280, h: 832 },
  { label: "iPad", w: 834, h: 1194 },
  { label: "iPhone 16", w: 393, h: 852 },
  { label: "iPhone 16 Pro Max", w: 440, h: 956 },
  { label: "Android", w: 412, h: 915 },
  { label: "Android Small", w: 360, h: 800 },
];

function WindowFrame({
  id,
  onPortDown,
  style,
  onClose,
  childCount = 0,
  renderChildren,
  onResize,
  onLayout,
}: {
  id: number;
  onPortDown: (from: PortEnd, e: React.PointerEvent) => void;
  style?: React.CSSProperties;
  onClose: () => void;
  childCount?: number;
  renderChildren?: (flow: boolean) => React.ReactNode;
  onResize?: (ow: number, oh: number, nw: number, nh: number) => void;
  onLayout?: (l: FrameLayout) => void;
}) {  const [size, setSize] = React.useState({ w: 300, h: 350 });
  const prevSize = React.useRef(size);
  React.useEffect(() => {
    const p = prevSize.current;
    if (p.w !== size.w || p.h !== size.h) { onResize?.(p.w, p.h, size.w, size.h); prevSize.current = size; }
  }, [size]); // eslint-disable-line react-hooks/exhaustive-deps
  const resize = React.useRef<{ x: number; y: number; w: number; h: number; ax: "both" | "x" | "y" } | null>(null);
  const [selected, setSelected] = React.useState(false);
  const [lay, setLay] = React.useState<FrameLayout>({ type: "none", dir: "row", wrap: false, align: "start", justify: "start", gapR: 8, gapC: 8, pad: 12, cols: 2, rows: 2 });
  React.useEffect(() => { onLayout?.(lay); }, [lay]); // eslint-disable-line react-hooks/exhaustive-deps
  const [fs, setFs] = React.useState<FrameStyle>({ radius: 10, opacity: 100, fill: "#1e1e1e", stroke: "#3a3a3c", strokeW: 1, shadow: true, clip: true, rotate: 0, blend: "normal", blur: 0, shadowColor: "#000000", shadowY: 20, shadowBlur: 50, hidden: false });
  const [presetOpen, setPresetOpen] = React.useState(false);
  const [promptOpen, setPromptOpen] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  // close the size menu whenever the frame loses selection
  React.useEffect(() => {
    if (!selected) {
      setPresetOpen(false);
      setPromptOpen(false);
    }
  }, [selected]);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const move = React.useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [guides, setGuides] = React.useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  function onHeaderDown(e: React.PointerEvent<HTMLDivElement>) {
    setSelected(true);
    if ((e.target as HTMLElement).closest("button")) return;
    // drag only while selected
    e.currentTarget.setPointerCapture(e.pointerId);
    move.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
  }
  function onHeaderMove(e: React.PointerEvent<HTMLDivElement>) {
    const m = move.current;
    if (!m) return;
    let nx = m.px + e.clientX - m.x;
    let ny = m.py + e.clientY - m.y;
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const el = frameRef.current;
    if (el) {
      // Figma-style smart guides: snap to and show edges/centres of the other frames
      const r = el.getBoundingClientRect();
      const k = r.width / el.offsetWidth || 1;
      const me = { l: r.left + (nx - pos.x) * k, t: r.top + (ny - pos.y) * k, w: r.width, h: r.height };
      const others = Array.from(document.querySelectorAll<HTMLElement>("[data-mock-frame]"))
        .filter((o) => o !== el)
        .map((o) => o.getBoundingClientRect());
      const T = 5;
      let bx: number | null = null;
      let by: number | null = null;
      for (const o of others) {
        for (const a of [0, me.w / 2, me.w])
          for (const b of [o.left, o.left + o.width / 2, o.right]) {
            const d = b - (me.l + a);
            if (Math.abs(d) < T && (bx === null || Math.abs(d) < Math.abs(bx))) bx = d;
          }
        for (const a of [0, me.h / 2, me.h])
          for (const b of [o.top, o.top + o.height / 2, o.bottom]) {
            const d = b - (me.t + a);
            if (Math.abs(d) < T && (by === null || Math.abs(d) < Math.abs(by))) by = d;
          }
      }
      if (bx !== null) { nx += bx / k; me.l += bx; }
      if (by !== null) { ny += by / k; me.t += by; }
      // the guide spans both frames, edge to edge (drawn underneath them)
      const gap = (s1: number, e1: number, s2: number, e2: number) => {
        const [lo, hi] = [Math.min(s1, s2), Math.max(e1, e2)];
        return [lo, hi] as const;
      };
      for (const o of others) {
        for (const a of [me.l, me.l + me.w / 2, me.l + me.w])
          for (const b of [o.left, o.left + o.width / 2, o.right])
            if (Math.abs(a - b) < 0.5)
              { const [lo, hi] = gap(me.t, me.t + me.h, o.top, o.bottom); lines.push({ x1: b, x2: b, y1: lo, y2: hi }); }
        for (const a of [me.t, me.t + me.h / 2, me.t + me.h])
          for (const b of [o.top, o.top + o.height / 2, o.bottom])
            if (Math.abs(a - b) < 0.5)
              { const [lo, hi] = gap(me.l, me.l + me.w, o.left, o.right); lines.push({ y1: b, y2: b, x1: lo, x2: hi }); }
      }
    }
    setPos({ x: nx, y: ny });
    const pr = el?.parentElement?.getBoundingClientRect();
    setGuides(pr ? lines.map((g) => ({ x1: g.x1 - pr.left, x2: g.x2 - pr.left, y1: g.y1 - pr.top, y2: g.y2 - pr.top })) : []);
  }
  function onHeaderUp() {
    move.current = null;
    setGuides([]);
  }
  const frameRef = React.useRef<HTMLDivElement>(null);

  // clicking anywhere outside the window clears the selection
  React.useEffect(() => {
    if (!selected) return;
    function onDown(e: PointerEvent) {
      // right-click (pan) keeps the selection; only a left/primary click outside clears it
      const tg = e.target as Element;
      if (e.button !== 2 && (!frameRef.current?.contains(tg) || tg.closest?.("[data-rect-id]")) && !tg.closest?.("[data-frame-panel]")) setSelected(false);
    }
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [selected]);

  function onResizeDown(e: React.PointerEvent<HTMLDivElement>, ax: "both" | "x" | "y" = "both") {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    resize.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h, ax };
  }
  function onResizeMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = resize.current;
    if (!r) return;
    let w = r.ax === "y" ? r.w : Math.max(200, r.w + e.clientX - r.x);
    let h = r.ax === "x" ? r.h : Math.max(150, r.h + e.clientY - r.y);
    const el = frameRef.current;
    if (el) {
      // snap the right/bottom edges to other frames and show the same guides as dragging
      const rc = el.getBoundingClientRect();
      const k = rc.width / el.offsetWidth || 1;
      const me = { l: rc.left, t: rc.top, w: w * k, h: h * k };
      const others = Array.from(document.querySelectorAll<HTMLElement>("[data-mock-frame]"))
        .filter((o) => o !== el)
        .map((o) => o.getBoundingClientRect());
      let bx: number | null = null;
      let by: number | null = null;
      for (const o of others) {
        for (const b of [o.left, o.left + o.width / 2, o.right]) {
          const d = b - (me.l + me.w);
          if (Math.abs(d) < 5 && (bx === null || Math.abs(d) < Math.abs(bx))) bx = d;
        }
        for (const b of [o.top, o.top + o.height / 2, o.bottom]) {
          const d = b - (me.t + me.h);
          if (Math.abs(d) < 5 && (by === null || Math.abs(d) < Math.abs(by))) by = d;
        }
      }
      if (bx !== null && r.ax !== "y" && w + bx / k >= 200) { w += bx / k; me.w += bx; }
      if (by !== null && r.ax !== "x" && h + by / k >= 150) { h += by / k; me.h += by; }
      const pr = el.parentElement?.getBoundingClientRect();
      const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
      for (const o of others) {
        for (const a of [me.l, me.l + me.w / 2, me.l + me.w])
          for (const b of [o.left, o.left + o.width / 2, o.right])
            if (Math.abs(a - b) < 0.5)
              lines.push({ x1: b, x2: b, y1: Math.min(me.t, o.top), y2: Math.max(me.t + me.h, o.bottom) });
        for (const a of [me.t, me.t + me.h / 2, me.t + me.h])
          for (const b of [o.top, o.top + o.height / 2, o.bottom])
            if (Math.abs(a - b) < 0.5)
              lines.push({ y1: b, y2: b, x1: Math.min(me.l, o.left), x2: Math.max(me.l + me.w, o.right) });
      }
      setGuides(pr ? lines.map((g) => ({ x1: g.x1 - pr.left, x2: g.x2 - pr.left, y1: g.y1 - pr.top, y2: g.y2 - pr.top })) : []);
    }
    setSize({ w, h });
  }
  function onResizeUp() {
    resize.current = null;
    setGuides([]);
  }

  return (
    <>
    {guides.length > 0 &&
      createPortal(
        guides.map((g, i) => (
          <div
            key={i}
            className="pointer-events-none absolute z-0"
            style={{
              left: g.x1,
              top: g.y1,
              width: g.x2 - g.x1 || 0,
              height: g.y2 - g.y1 || 0,
              borderLeft: g.x1 === g.x2 ? "1px dashed #0A84FF" : undefined,
              borderTop: g.y1 === g.y2 ? "1px dashed #0A84FF" : undefined,
              opacity: 0.7,
            }}
          />
        )),
        frameRef.current?.parentElement ?? document.body,
      )}
    <div
      ref={frameRef}
      data-mock-frame=""
      data-frame-id={id}
      data-selected={selected ? "true" : undefined}
      className="group/frame pointer-events-auto absolute"
      style={{
        width: size.w,
        height: size.h,
        // keep the top-left corner fixed while resizing from the bottom-right
        marginLeft: (size.w - 300) / 2 + pos.x,
        marginTop: (size.h - 350) / 2 + pos.y,
        cursor: "auto",
        borderRadius: fs.radius,
        border: `${fs.strokeW}px solid ${fs.stroke}`,
        background: fs.fill,
        opacity: fs.opacity / 100,
        mixBlendMode: fs.blend as React.CSSProperties["mixBlendMode"],
        filter: fs.blur ? `blur(${fs.blur}px)` : undefined,
        rotate: fs.rotate ? `${fs.rotate}deg` : undefined,
        outline: selected ? "2px solid #0A84FF" : "none",
        outlineOffset: 3,
        zIndex: 1,
        ...style,
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div style={{ borderTopLeftRadius: Math.max(0, fs.radius - 1), borderTopRightRadius: Math.max(0, fs.radius - 1) }} onPointerDown={onHeaderDown} onPointerMove={onHeaderMove} onPointerUp={onHeaderUp} onPointerCancel={onHeaderUp} className={cn("relative z-[2] flex h-7 touch-none items-center rounded-t-[9px] border-b border-[#2c2c2e] bg-[#2a2a2c] px-3 select-none", selected && "cursor-move")}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="size-3 rounded-full bg-[#FF5F57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
          />
          <span className="size-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
          <span className="size-3 rounded-full bg-[#28C840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
        </div>
        <span className="pointer-events-none absolute inset-x-0 text-center text-[12px] font-normal text-[#a1a1a6]">
          Frame
        </span>
      </div>
      <div data-frame-body={id} className={cn("relative isolate z-[1] h-[calc(100%-1.75rem)]", fs.clip && "overflow-hidden")} style={{ background: fs.fill, borderBottomLeftRadius: Math.max(0, fs.radius - 1), borderBottomRightRadius: Math.max(0, fs.radius - 1) , ...(lay.type !== "none" ? { display: lay.type, padding: lay.pad, rowGap: lay.gapR, columnGap: lay.gapC, alignItems: lay.align, ...(lay.type === "flex" ? { flexDirection: lay.dir, flexWrap: lay.wrap ? "wrap" : "nowrap", justifyContent: lay.justify } : { gridTemplateColumns: `repeat(${lay.cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${lay.rows}, minmax(0, 1fr))`, justifyItems: lay.align }) } : {}) }}>
            {renderChildren?.(lay.type !== "none")}
            {lay.type !== "none" && !childCount && [0, 1, 2].map((k) => <div key={k} className="min-h-12 min-w-12 rounded-[6px] border border-dashed border-[#0A84FF]/50 bg-[#0A84FF]/10" />)}
          </div>
      {/* prompt box, 20px to the right of the frame's top edge */}
      {promptOpen && (
        <div
          className="absolute top-0 z-[3] w-72 rounded-[12px] bg-[#232325] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
          style={{ left: "calc(100% + 20px)" }}
        >
          <textarea
            autoFocus
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what to design in this frame"
            rows={4}
            className="w-full resize-none bg-transparent px-1.5 py-1 text-[13px] font-normal text-[#f2f2f2] outline-none placeholder:text-[#6a6a6a]"
          />
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setPromptOpen(false)}
              className="h-7 rounded-[6px] px-2 text-[12px] font-normal text-[#8e8e93] hover:bg-[#3B3B3C] hover:text-white"
            >
              Close
            </button>
            <button
              type="button"
              aria-label="Send"
              disabled={!prompt.trim()}
              className="flex size-7 items-center justify-center rounded-full bg-white text-black disabled:bg-[#3a3a3c] disabled:text-[#6a6a6a]"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {selected &&
        createPortal(
          <FramePanel w={size.w} h={size.h} x={pos.x} y={pos.y} p={fs} onSize={(w, h) => setSize({ w, h })} onPos={(x, y) => setPos({ x, y })} onProp={(k, v) => setFs((s) => ({ ...s, [k]: v }))}>
            <LayoutPanel l={lay} onChange={(k, v) => setLay((p) => ({ ...p, [k]: v }))} />
          </FramePanel>,
          document.body,
        )}
      {/* floating toolbar above the selected frame */}
      {selected && (
        <div
          className="absolute left-1/2 z-[3] flex h-10 -translate-x-1/2 items-center gap-1 rounded-[12px] bg-[#232325] px-1 text-[13px] font-normal whitespace-nowrap text-[#f2f2f2] shadow-[0_8px_24px_rgba(0,0,0,0.45)] select-none"
          style={{ bottom: "calc(100% + 30px)" }}
        >
          {/* preset size picker */}
          <div className="relative mr-1">
            <button
              type="button"
              onClick={() => setPresetOpen((o) => !o)}
              className="flex h-8 items-center gap-1.5 rounded-[8px] px-2.5 text-[#f2f2f2] hover:bg-[#3B3B3C] hover:text-white"
            >
              {FRAME_PRESETS.find((f) => f.w === Math.round(size.w) && f.h === Math.round(size.h))?.label ?? "Custom"}
              <svg viewBox="0 0 12 12" className={cn("size-3 transition-transform", presetOpen && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 4.5L6 7.5 9 4.5" />
              </svg>
            </button>
            {presetOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-[10px] bg-[#232325] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
                {FRAME_PRESETS.map((f) => {
                  const active = f.w === Math.round(size.w) && f.h === Math.round(size.h);
                  return (
                    <button
                      key={f.label}
                      type="button"
                      onClick={() => {
                        setSize({ w: f.w, h: f.h });
                        setPresetOpen(false);
                      }}
                      className={cn(
                        "flex h-8 w-full items-center justify-between rounded-[6px] px-2.5 text-[13px] font-normal hover:bg-[#3B3B3C]",
                        active ? "text-white" : "text-[#d1d1d6]",
                      )}
                    >
                      <span>{f.label}</span>
                      <span className="text-[12px] text-[#8e8e93] tabular-nums">
                        {f.w} × {f.h}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="Prompt"
            onClick={() => setPromptOpen((o) => !o)}
            className={cn(
              "flex size-8 items-center justify-center rounded-[8px] hover:bg-[#3B3B3C] hover:text-white",
              promptOpen ? "bg-[#3B3B3C] text-white" : "text-[#f2f2f2]",
            )}
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 2.5l1.2 3.3 3.3 1.2-3.3 1.2L7 11.5 5.8 8.2 2.5 7l3.3-1.2zM12 10.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
            </svg>
          </button>
          <button type="button" aria-label="Expand" className="flex size-8 items-center justify-center rounded-[8px] text-[#f2f2f2] hover:bg-[#3B3B3C] hover:text-white">
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2.5h4v4M13.5 2.5L9 7M6.5 13.5h-4v-4M2.5 13.5L7 9" />
            </svg>
          </button>
          <button type="button" aria-label="Download" className="flex size-8 items-center justify-center rounded-[8px] text-[#f2f2f2] hover:bg-[#3B3B3C] hover:text-white">
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2.5v8M4.5 7L8 10.5 11.5 7M3 13.5h10" />
            </svg>
          </button>
        </div>
      )}
      {/* the frame shadow lives on its own layer so it falls on top of the size badge */}
      {fs.shadow && <div className="pointer-events-none absolute -inset-px z-[2]" style={{ borderRadius: fs.radius, boxShadow: `0 ${fs.shadowY}px ${fs.shadowBlur}px ${fs.shadowColor}8c` }} />}
      {/* size badge under the frame */}
      <div
        className="pointer-events-none absolute z-[1] left-1/2 flex h-[30px] -translate-x-1/2 items-center rounded-[6px] bg-[#1a1a1b] px-2.5 text-[12px] font-normal whitespace-nowrap text-[#a1a1a6] tabular-nums select-none"
        style={{ top: "calc(100% + 16px)" }}
      >
        {Math.round(size.w)} × {Math.round(size.h)}
      </div>
      {(["left", "right"] as const).map((side) => (
        <button
          key={side}
          type="button"
          aria-label={`Connect ${side}`}
          data-port={side}
          data-frame={id}
          onPointerDown={(e) => onPortDown({ id, side }, e)}
          className="absolute top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border border-[#8e8e93] bg-[#1e1e1e] text-[#d1d1d6] opacity-0 transition-[opacity,border-color,color] duration-150 group-hover/frame:opacity-100 hover:border-white hover:text-white"
          style={{ [side]: -34, cursor: "crosshair" }}
        >
          <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
            <path d="M6 2.5v7M2.5 6h7" />
          </svg>
        </button>
      ))}
      {/* edge handles: right = width only, bottom = height only */}
      <div
        aria-label="Resize width"
        className="absolute top-0 right-0 bottom-4 z-[4] w-1.5 cursor-ew-resize touch-none"
        onPointerDown={(e) => onResizeDown(e, "x")}
        onPointerMove={onResizeMove}
        onPointerUp={onResizeUp}
        onPointerCancel={onResizeUp}
      />
      <div
        aria-label="Resize height"
        className="absolute right-4 bottom-0 left-0 z-[4] h-1.5 cursor-ns-resize touch-none"
        onPointerDown={(e) => onResizeDown(e, "y")}
        onPointerMove={onResizeMove}
        onPointerUp={onResizeUp}
        onPointerCancel={onResizeUp}
      />
      <div
        aria-label="Resize"        className="absolute right-0 bottom-0 size-4 cursor-nwse-resize touch-none"
        onPointerDown={onResizeDown}
        onPointerMove={onResizeMove}
        onPointerUp={onResizeUp}
        onPointerCancel={onResizeUp}
      />
    </div>
    </>
  );
}

// ---------- Penpot-style rectangle ----------
type RFill = { color: string; op: number };
type RStroke = { color: string; op: number; w: number; pos: "inside" | "center" | "outside"; style: "solid" | "dashed" | "dotted" };
type RShadow = { kind: "drop" | "inner"; x: number; y: number; blur: number; spread: number; color: string; op: number; hidden: boolean };
type Rect = {
  id: number; parent: number | null; x: number; y: number; w: number; h: number; rot: number;
  r: [number, number, number, number]; indep: boolean; hidden: boolean; blend: string; op: number;
  fills: RFill[]; strokes: RStroke[]; shadows: RShadow[]; blur: number | null;
  ch: "left" | "right" | "lr" | "center" | "scale"; cv: "top" | "bottom" | "tb" | "center" | "scale";
  lock: boolean; margin: [number, number, number, number]; mIndep: boolean; sw: "fix" | "fill" | "auto"; sh: "fix" | "fill" | "auto";
  self: "auto" | "start" | "center" | "end" | "stretch"; abs: boolean; z: number; colStart: number; colSpan: number; rowStart: number; rowSpan: number;
  exports: { scale: number; suffix: string; fmt: "png" | "jpg" | "svg" | "pdf" }[];
  lay: FrameLayout;
};
type Guide = { x1: number; y1: number; x2: number; y2: number };

function newRect(id: number, parent: number | null, x: number, y: number, w: number, h: number): Rect {
  return { id, parent, x, y, w, h, rot: 0, r: [0, 0, 0, 0], indep: false, hidden: false, blend: "normal", op: 100, fills: [{ color: "#B1B2B5", op: 100 }], strokes: [], shadows: [], blur: null, ch: "left", cv: "top", ...RECT_EXTRA };
}

function rgba(hex: string, op: number) {
  const h = hex.replace("#", "");
  const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6);
  const n = parseInt(f, 16) || 0;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${op / 100})`;
}

function track(mv: (e: PointerEvent) => void, up?: (e: PointerEvent) => void) {
  const end = (e: PointerEvent) => {
    window.removeEventListener("pointermove", mv);
    window.removeEventListener("pointerup", end);
    window.removeEventListener("pointercancel", end);
    up?.(e);
  };
  window.addEventListener("pointermove", mv);
  window.addEventListener("pointerup", end);
  window.addEventListener("pointercancel", end);
}

// snap client-space x/y lines to the edges and centres of frames and other rectangles
function snapTo(mx: number[], my: number[], self: Element) {
  const others = Array.from(document.querySelectorAll<HTMLElement>("[data-mock-frame],[data-rect-id]"))
    .filter((o) => o !== self && !self.contains(o))
    // for the frame that contains this element, snap to its body (below the header), not its outer box
    .map((o) => (o.hasAttribute("data-mock-frame") && o.contains(self) ? (o.querySelector<HTMLElement>("[data-frame-body]") ?? o) : o).getBoundingClientRect());
  const T = 5;
  let bx: number | null = null;
  let by: number | null = null;
  for (const o of others) {
    for (const a of mx) for (const b of [o.left, o.left + o.width / 2, o.right]) { const d = b - a; if (Math.abs(d) < T && (bx === null || Math.abs(d) < Math.abs(bx))) bx = d; }
    for (const a of my) for (const b of [o.top, o.top + o.height / 2, o.bottom]) { const d = b - a; if (Math.abs(d) < T && (by === null || Math.abs(d) < Math.abs(by))) by = d; }
  }
  const dx = bx ?? 0, dy = by ?? 0;
  const sr = self.getBoundingClientRect();
  const T0 = my.length > 1 ? Math.min(...my) + dy : sr.top, B0 = my.length > 1 ? Math.max(...my) + dy : sr.bottom;
  const L0 = mx.length > 1 ? Math.min(...mx) + dx : sr.left, R0 = mx.length > 1 ? Math.max(...mx) + dx : sr.right;
  const lines: Guide[] = [];
  if (bx !== null) for (const a of mx) { const x = a + dx; for (const o of others) if ([o.left, o.left + o.width / 2, o.right].some((v) => Math.abs(v - x) < 0.5)) lines.push({ x1: x, x2: x, y1: Math.min(T0, o.top), y2: Math.max(B0, o.bottom) }); }
  if (by !== null) for (const a of my) { const y = a + dy; for (const o of others) if ([o.top, o.top + o.height / 2, o.bottom].some((v) => Math.abs(v - y) < 0.5)) lines.push({ y1: y, y2: y, x1: Math.min(L0, o.left), x2: Math.max(R0, o.right) }); }
  return { dx, dy, lines };
}

function GuideLines({ lines }: { lines: Guide[] }) {
  if (!lines.length) return null;
  return createPortal(
    <>
      {lines.map((g, i) => (
        <div key={i} className="pointer-events-none fixed z-[59]" style={{ left: g.x1, top: g.y1, width: g.x2 - g.x1 || 0, height: g.y2 - g.y1 || 0, borderLeft: g.x1 === g.x2 ? "1px dashed #0A84FF" : undefined, borderTop: g.y1 === g.y2 ? "1px dashed #0A84FF" : undefined, opacity: 0.7 }} />
      ))}
    </>,
    document.body,
  );
}

const ROT_CURSOR = `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke-linecap='round' stroke-linejoin='round'><g stroke='black' stroke-width='4'><path d='M20 12a8 8 0 1 1-2.6-5.9L20 8.5'/><path d='M20 3.5v5h-5'/></g><g stroke='white' stroke-width='2'><path d='M20 12a8 8 0 1 1-2.6-5.9L20 8.5'/><path d='M20 3.5v5h-5'/></g></svg>")}") 12 12, crosshair`;
const HANDLES: [number, number, string][] = [[-1, -1, "nwse-resize"], [0, -1, "ns-resize"], [1, -1, "nesw-resize"], [1, 0, "ew-resize"], [1, 1, "nwse-resize"], [0, 1, "ns-resize"], [-1, 1, "nesw-resize"], [-1, 0, "ew-resize"]];

function RectItem({ r, kids, lay, flow, offset, selected, onSelect, onPatch, onDrop }: { r: Rect; kids?: React.ReactNode; lay?: FrameLayout; flow: boolean; offset: { x: number; y: number }; selected: boolean; onSelect: () => void; onPatch: (p: Partial<Rect>) => void; onDrop: (el: HTMLElement, x: number, y: number) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [guides, setGuides] = React.useState<Guide[]>([]);
  const [fly, setFly] = React.useState<{ x: number; y: number } | null>(null);
  const inFlow = flow && !r.abs;
  const kOf = () => {
    const p = ref.current?.parentElement;
    return p && p.hasAttribute("data-frame-body") ? p.getBoundingClientRect().width / (p.offsetWidth || 1) : 1;
  };
  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    onSelect();
    const el = ref.current!;
    const k = kOf();
    const b0 = el.getBoundingClientRect();
    const s = { cx: e.clientX, cy: e.clientY, x: r.x, y: r.y };
    let moved = false;
    track(
      (ev) => {
        const dx = ev.clientX - s.cx, dy = ev.clientY - s.cy;
        if (!moved && Math.hypot(dx, dy) < 3) return;
        moved = true;
        if (inFlow) { setFly({ x: dx / k, y: dy / k }); return; }
        const l = b0.left + dx, t = b0.top + dy;
        const sn = snapTo([l, l + b0.width / 2, l + b0.width], [t, t + b0.height / 2, t + b0.height], el);
        setGuides(sn.lines);
        onPatch({ x: Math.round(s.x + (dx + sn.dx) / k), y: Math.round(s.y + (dy + sn.dy) / k) });
      },
      (ev) => {
        setGuides([]);
        setFly(null);
        if (moved) onDrop(el, ev.clientX, ev.clientY);
      },
    );
  };
  const onResizeDown = (sx: number, sy: number) => (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    const el = ref.current!;
    const k = kOf();
    const b0 = el.getBoundingClientRect();
    const s = { cx: e.clientX, cy: e.clientY, x: r.x, y: r.y, w: r.w, h: r.h };
    const rad = (r.rot * Math.PI) / 180, cos = Math.cos(rad), sin = Math.sin(rad);
    track(
      (ev) => {
        const dx = (ev.clientX - s.cx) / k, dy = (ev.clientY - s.cy) / k;
        let lx = dx * cos + dy * sin, ly = -dx * sin + dy * cos;
        let lines: Guide[] = [];
        if (!r.rot && !ev.shiftKey && !r.lock && !inFlow) {
          const ex = sx ? [b0.left + ((sx > 0 ? s.w : 0) + lx) * k] : [];
          const ey = sy ? [b0.top + ((sy > 0 ? s.h : 0) + ly) * k] : [];
          const sn = snapTo(ex, ey, el);
          lx += sn.dx / k;
          ly += sn.dy / k;
          lines = sn.lines;
        }
        let w = sx ? Math.max(1, s.w + sx * lx) : s.w;
        let h = sy ? Math.max(1, s.h + sy * ly) : s.h;
        if (ev.shiftKey || r.lock) {
          const ar = s.w / s.h;
          if (sx && sy) { if (w / s.w > h / s.h) h = w / ar; else w = h * ar; } else if (sx) h = w / ar; else w = h * ar;
        }
        const ox = (sx * (w - s.w)) / 2, oy = (sy * (h - s.h)) / 2;
        const cx = s.x + s.w / 2 + ox * cos - oy * sin, cy = s.y + s.h / 2 + ox * sin + oy * cos;
        setGuides(lines);
        onPatch({ w: Math.round(w), h: Math.round(h), x: Math.round(cx - w / 2), y: Math.round(cy - h / 2) });
      },
      () => setGuides([]),
    );
  };
  const onRotDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    const b = ref.current!.getBoundingClientRect();
    const c = { x: b.left + b.width / 2, y: b.top + b.height / 2 };
    const a0 = Math.atan2(e.clientY - c.y, e.clientX - c.x);
    const r0 = r.rot;
    track((ev) => {
      let a = r0 + ((Math.atan2(ev.clientY - c.y, ev.clientX - c.x) - a0) * 180) / Math.PI;
      if (ev.shiftKey) a = Math.round(a / 15) * 15;
      a = ((a % 360) + 360) % 360;
      onPatch({ rot: Math.round(a * 10) / 10 });
    });
  };
  const rad = r.r.map((v) => Math.max(0, v));
  const row = !lay || lay.dir.startsWith("row");
  const self = r.self === "auto" ? undefined : r.self;
  const fillMain = row ? r.sw === "fill" : r.sh === "fill";
  const fillCross = row ? r.sh === "fill" : r.sw === "fill";
  const box: React.CSSProperties = inFlow
    ? {
        position: "relative", flexShrink: 0, minWidth: 0, minHeight: 0,
        width: r.sw === "fill" ? "auto" : r.w, height: r.sh === "fill" ? "auto" : r.h,
        margin: r.margin.map((v) => v + "px").join(" "),
        ...(lay?.type === "grid"
          ? { gridColumn: `${r.colStart || "auto"} / span ${Math.max(1, r.colSpan)}`, gridRow: `${r.rowStart || "auto"} / span ${Math.max(1, r.rowSpan)}`, justifySelf: r.sw === "fill" ? "stretch" : undefined, alignSelf: r.sh === "fill" ? "stretch" : self }
          : { flexGrow: fillMain ? 1 : 0, flexBasis: fillMain ? 0 : "auto", alignSelf: fillCross ? "stretch" : self }),
        transform: fly ? `translate(${fly.x}px, ${fly.y}px)` : undefined,
        zIndex: fly ? 10 : r.z || undefined,
      }
    : { position: "absolute", left: r.x + offset.x, top: r.y + offset.y, width: r.w, height: r.h, zIndex: r.z || undefined };
  return (
    <div ref={ref} data-rect-id={r.id} className="pointer-events-auto touch-none" style={{ ...box, rotate: r.rot ? `${r.rot}deg` : undefined }} onPointerDown={onDown}>
      <div
        className="absolute inset-0"
        style={{
          visibility: r.hidden ? "hidden" : undefined,
          opacity: r.op / 100,
          mixBlendMode: r.blend as React.CSSProperties["mixBlendMode"],
          borderRadius: rad.map((v) => v + "px").join(" "),
          background: r.fills.map((f) => `linear-gradient(${rgba(f.color, f.op)}, ${rgba(f.color, f.op)})`).join(", ") || undefined,
          boxShadow: r.shadows.filter((x) => !x.hidden).map((x) => `${x.kind === "inner" ? "inset " : ""}${x.x}px ${x.y}px ${x.blur}px ${x.spread}px ${rgba(x.color, x.op)}`).join(", ") || undefined,
          filter: r.blur ? `blur(${r.blur}px)` : undefined,
        }}
      >
        {r.strokes.map((st, i) => {
          const g = st.pos === "inside" ? 0 : st.pos === "center" ? st.w / 2 : st.w;
          return <div key={i} className="pointer-events-none absolute" style={{ inset: -g, border: `${st.w}px ${st.style} ${rgba(st.color, st.op)}`, borderRadius: rad.map((v) => (v ? v + g : 0) + "px").join(" ") }} />;
        })}
      </div>
      {r.lay.type !== "none" && (
        <div data-frame-body={-r.id} className="absolute inset-0" style={{ borderRadius: rad.map((v) => v + "px").join(" "), display: r.lay.type, padding: r.lay.pad, rowGap: r.lay.gapR, columnGap: r.lay.gapC, alignItems: r.lay.align, ...(r.lay.type === "flex" ? { flexDirection: r.lay.dir, flexWrap: r.lay.wrap ? "wrap" : "nowrap", justifyContent: r.lay.justify } : { gridTemplateColumns: `repeat(${r.lay.cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${r.lay.rows}, minmax(0, 1fr))`, justifyItems: r.lay.align }) }}>
          {kids}
        </div>
      )}
      {selected && (
        <>
          <div className="pointer-events-none absolute -inset-px border border-[#0A84FF]" />
          {HANDLES.filter(([sx, sy]) => sx && sy).map(([sx, sy]) => (
            <div key={"rot" + sx + sy} onPointerDown={onRotDown} className="absolute size-4" style={{ left: `calc(${(sx + 1) * 50}% - 8px + ${sx * 10}px)`, top: `calc(${(sy + 1) * 50}% - 8px + ${sy * 10}px)`, cursor: ROT_CURSOR }} />
          ))}
          {HANDLES.map(([sx, sy, cur]) => (
            <div key={sx + "," + sy} onPointerDown={onResizeDown(sx, sy)} className="absolute size-2 rounded-[1px] border border-[#0A84FF] bg-white" style={{ left: `calc(${(sx + 1) * 50}% - 4px)`, top: `calc(${(sy + 1) * 50}% - 4px)`, cursor: cur }} />
          ))}
          <div className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 rounded-[4px] bg-[#0A84FF] px-1.5 py-0.5 text-[11px] leading-none font-normal whitespace-nowrap text-white">
            {Math.round(r.w)} {"\u00d7"} {Math.round(r.h)}
          </div>
        </>
      )}
      <GuideLines lines={guides} />
    </div>
  );
}

const RP_IN = "h-8 w-full min-w-0 appearance-none rounded-[8px] bg-[#232325] px-2 text-[12px] font-normal text-[#f2f2f2] outline-none focus:ring-1 focus:ring-[#0A84FF]";
const BLENDS = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
const capWords = (s: string) => s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
const CORNER_ICONS = [LI.ArrowUpLeft, LI.ArrowUpRight, LI.ArrowDownRight, LI.ArrowDownLeft];
type IconT = React.ComponentType<{ className?: string }>;

function RNum({ label, icon: Icon, value, onChange, suffix, min, className }: { label?: string; icon?: IconT; value: number; onChange: (v: number) => void; suffix?: string; min?: number; className?: string }) {
  return (
    <label className={cn("flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-[8px] bg-[#232325] px-2 focus-within:ring-1 focus-within:ring-[#0A84FF]", className)}>
      {Icon ? <Icon className="size-3.5 shrink-0 text-[#8e8e93]" /> : label ? <span className="shrink-0 text-[#8e8e93]">{label}</span> : null}
      <input
        type="number"
        value={Math.round(value * 100) / 100}
        onChange={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v)) onChange(min !== undefined ? Math.max(min, v) : v); }}
        className="w-full min-w-0 bg-transparent text-[12px] font-normal text-[#f2f2f2] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      {suffix && <span className="shrink-0 text-[#8e8e93]">{suffix}</span>}
    </label>
  );
}

function RBtn({ icon: Icon, label, onClick, active, disabled }: { icon: IconT; label: string; onClick: () => void; active?: boolean; disabled?: boolean }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className={cn("grid size-7 disabled:pointer-events-none disabled:opacity-40 shrink-0 place-items-center rounded-[6px] text-[#8e8e93] hover:bg-[#2c2c2e] hover:text-[#f2f2f2]", active && "text-[#0A84FF] hover:text-[#0A84FF]")}>
      <Icon className="size-3.5" />
    </button>
  );
}

function RSel({ value, options, onChange, className }: { value: string; options: [string, string][]; onChange: (v: string) => void; className?: string }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [box, setBox] = React.useState<DOMRect | null>(null);
  React.useEffect(() => {
    if (!box) return;
    const close = (e: PointerEvent) => { const t = e.target as Element; if (!t.closest?.("[data-rsel-menu]") && !ref.current?.contains(t)) setBox(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setBox(null); };
    window.addEventListener("pointerdown", close, true);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("pointerdown", close, true); window.removeEventListener("keydown", esc); };
  }, [box]);
  const label = options.find(([v]) => v === value)?.[1] ?? value;
  return (
    <div className={cn("relative flex min-w-0 flex-1", className)}>
      <button ref={ref} type="button" onClick={() => setBox(box ? null : ref.current!.getBoundingClientRect())} className={cn(RP_IN, "flex cursor-pointer items-center pr-7 text-left", box && "ring-1 ring-[#0A84FF]")}>
        <span className="truncate">{label}</span>
      </button>
      <LI.ChevronDown className={cn("pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-[#8e8e93] transition-transform", box && "rotate-180")} />
      {box &&
        createPortal(
          <div data-rsel-menu="" data-frame-panel="" className="dark fixed z-[80] max-h-72 min-w-[150px] overflow-y-auto rounded-lg bg-popover p-1 text-start font-normal text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2" style={{ left: box.left, top: box.bottom + 4, minWidth: Math.max(150, box.width) }}>
            {options.map(([v, l]) => (
              <button key={v} type="button" onClick={() => { onChange(v); setBox(null); }} className="relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-hidden select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <LI.Check className={cn("size-3.5 shrink-0", v !== value && "invisible")} />
                {l}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

function RColor({ color, op, onColor, onOp }: { color: string; op: number; onColor: (c: string) => void; onOp: (o: number) => void }) {
  const hex = color.replace("#", "").toUpperCase();
  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5">
      <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-[8px] bg-[#232325] px-2 focus-within:ring-1 focus-within:ring-[#0A84FF]">
        <label className="relative size-4 shrink-0 cursor-pointer overflow-hidden rounded-[4px] border border-[#3a3a3c]" style={{ background: rgba(color, op) }}>
          <input type="color" value={color.slice(0, 7)} onChange={(e) => onColor(e.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0" />
        </label>
        <input
          key={hex}
          defaultValue={hex}
          onBlur={(e) => {
            const v = e.target.value.replace(/[^0-9a-f]/gi, "");
            if (v.length === 6 || v.length === 3) onColor("#" + (v.length === 3 ? v.split("").map((c) => c + c).join("") : v).toLowerCase());
            else e.target.value = hex;
          }}
          onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
          className="w-full min-w-0 bg-transparent text-[12px] font-normal text-[#f2f2f2] uppercase outline-none"
        />
      </div>
      <RNum value={op} min={0} suffix="%" onChange={(v) => onOp(Math.min(100, v))} className="w-[4.5rem] flex-none" />
    </div>
  );
}

function RSection({ title, onAdd, children }: { title: string; onAdd?: () => void; children?: React.ReactNode }) {
  return (
    <div className="-mx-3 border-t border-[#2c2c2e] px-3 py-2">
      <div className="flex h-7 items-center justify-between">
        <span className="text-[12px] font-normal text-[#f2f2f2]">{title}</span>
        {onAdd && <RBtn icon={LI.Plus} label={"Add " + title.toLowerCase()} onClick={onAdd} />}
      </div>
      <div className="mt-1 flex flex-col gap-1.5 empty:hidden">{children}</div>
    </div>
  );
}

function RectPanel({ r, inFrame, lay, onAlign, onPatch, onDelete }: { r: Rect; inFrame: boolean; lay?: FrameLayout; onAlign: (a: string) => void; onPatch: (p: Partial<Rect>) => void; onDelete: () => void }) {
  const upd = (key: "fills" | "strokes" | "shadows", i: number, p: object) => onPatch({ [key]: (r[key] as object[]).map((x, j) => (j === i ? { ...x, ...p } : x)) } as Partial<Rect>);
  const rm = (key: "fills" | "strokes" | "shadows", i: number) => onPatch({ [key]: (r[key] as object[]).filter((_, j) => j !== i) } as Partial<Rect>);
  const updEx = (i: number, p: object) => onPatch({ exports: r.exports.map((x, j) => (j === i ? { ...x, ...p } : x)) });
  return (
    <div data-frame-panel="" onPointerDown={(e) => e.stopPropagation()} className="fixed top-16 right-3 z-[61] max-h-[calc(100vh-5rem)] w-64 overflow-y-auto rounded-[12px] border border-[#2c2c2e] bg-[#1a1a1b] px-3 pb-1 text-[12px] font-normal text-[#f2f2f2] shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
      <div className="flex h-11 items-center gap-2">
        <LI.Square className="size-4 text-[#8e8e93]" />
        <span className="flex-1 text-[13px] font-normal">Rectangle</span>
        <RBtn icon={LI.Trash2} label="Delete" onClick={onDelete} />
      </div>
      <div className="-mx-3 flex h-10 items-center justify-between border-t border-[#2c2c2e] px-2">
        {([["left", LI.AlignStartVertical, "Align left"], ["hcenter", LI.AlignCenterVertical, "Align horizontal center"], ["right", LI.AlignEndVertical, "Align right"], ["top", LI.AlignStartHorizontal, "Align top"], ["vcenter", LI.AlignCenterHorizontal, "Align vertical center"], ["bottom", LI.AlignEndHorizontal, "Align bottom"]] as [string, IconT, string][]).map(([a, I, l]) => (
          <RBtn key={a} icon={I} label={l} onClick={() => onAlign(a)} />
        ))}
        <RBtn icon={LI.AlignHorizontalDistributeCenter} label="Distribute horizontally" disabled onClick={() => {}} />
        <RBtn icon={LI.AlignVerticalDistributeCenter} label="Distribute vertically" disabled onClick={() => {}} />
      </div>
      <RSection title="Measures">
        <div className="grid grid-cols-2 gap-1.5">
          <RNum label="X" value={r.x} onChange={(v) => onPatch({ x: v })} />
          <RNum label="Y" value={r.y} onChange={(v) => onPatch({ y: v })} />
          <RNum icon={LI.RotateCw} value={r.rot} suffix={"\u00b0"} onChange={(v) => onPatch({ rot: ((v % 360) + 360) % 360 })} />
        </div>
        <div className="flex items-start gap-1.5">
          {r.indep ? (
            <div className="grid flex-1 grid-cols-2 gap-1.5">
              {r.r.map((v, i) => (
                <RNum key={i} icon={CORNER_ICONS[i]} value={v} min={0} onChange={(nv) => { const n = [...r.r] as Rect["r"]; n[i] = nv; onPatch({ r: n }); }} />
              ))}
            </div>
          ) : (
            <RNum label="Radius" value={r.r[0]} min={0} onChange={(v) => onPatch({ r: [v, v, v, v] })} />
          )}
          <RBtn icon={LI.Maximize2} label="Independent corners" active={r.indep} onClick={() => onPatch({ indep: !r.indep, r: r.indep ? [r.r[0], r.r[0], r.r[0], r.r[0]] : r.r })} />
        </div>
      </RSection>
      {inFrame && (
        <RSection title="Constraints">
          <div className="flex items-center gap-1.5">
            <LI.MoveHorizontal className="size-3.5 shrink-0 text-[#8e8e93]" />
            <RSel value={r.ch} options={[["left", "Left"], ["right", "Right"], ["lr", "Left & Right"], ["center", "Center"], ["scale", "Scale"]]} onChange={(v) => onPatch({ ch: v as Rect["ch"] })} />
          </div>
          <div className="flex items-center gap-1.5">
            <LI.MoveVertical className="size-3.5 shrink-0 text-[#8e8e93]" />
            <RSel value={r.cv} options={[["top", "Top"], ["bottom", "Bottom"], ["tb", "Top & Bottom"], ["center", "Center"], ["scale", "Scale"]]} onChange={(v) => onPatch({ cv: v as Rect["cv"] })} />
          </div>
        </RSection>
      )}
      {lay && lay.type !== "none" && (
        <RSection title="Layout element">
          <div className="flex items-start gap-1.5">
            {r.mIndep ? (
              <div className="grid flex-1 grid-cols-2 gap-1.5">
                {r.margin.map((v, i) => (
                  <RNum key={i} icon={SIDE_ICONS[i]} value={v} onChange={(nv) => { const n = [...r.margin] as Rect["margin"]; n[i] = nv; onPatch({ margin: n }); }} />
                ))}
              </div>
            ) : (
              <RNum label="Margin" value={r.margin[0]} onChange={(v) => onPatch({ margin: [v, v, v, v] })} />
            )}
            <RBtn icon={LI.Maximize2} label="Margin per side" active={r.mIndep} onClick={() => onPatch({ mIndep: !r.mIndep, margin: r.mIndep ? [r.margin[0], r.margin[0], r.margin[0], r.margin[0]] : r.margin })} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-12 shrink-0 text-[#8e8e93]">Width</span>
            <RSeg value={r.sw} options={[["fix", "Fix"], ["fill", "Fill"], ["auto", "Auto"]]} onChange={(v) => onPatch({ sw: v as Rect["sw"] })} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-12 shrink-0 text-[#8e8e93]">Height</span>
            <RSeg value={r.sh} options={[["fix", "Fix"], ["fill", "Fill"], ["auto", "Auto"]]} onChange={(v) => onPatch({ sh: v as Rect["sh"] })} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-12 shrink-0 text-[#8e8e93]">Align</span>
            <RSeg value={r.self} options={[["start", LI.AlignVerticalJustifyStart], ["center", LI.AlignVerticalJustifyCenter], ["end", LI.AlignVerticalJustifyEnd], ["stretch", LI.StretchVertical]]} onChange={(v) => onPatch({ self: (v === r.self ? "auto" : v) as Rect["self"] })} />
          </div>
          <div className="flex h-7 items-center justify-between gap-1.5">
            <span className="text-[#8e8e93]">Absolute position</span>
            <button
              type="button"
              role="switch"
              aria-checked={r.abs}
              aria-label="Absolute position"
              onClick={() => {
                if (r.abs) return onPatch({ abs: false });
                // keep the child where it is: take its current box relative to the parent body
                const el = document.querySelector<HTMLElement>(`[data-rect-id="${r.id}"]`);
                const b = el?.parentElement;
                if (!el || !b) return onPatch({ abs: true });
                onPatch({ abs: true, x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth || r.w, h: el.offsetHeight || r.h });
              }}
              className={cn("relative h-[18px] w-8 shrink-0 rounded-full transition-colors", r.abs ? "bg-[#0A84FF]" : "bg-[#3a3a3c]")}
            >
              <span className={cn("absolute top-[2px] size-[14px] rounded-full bg-white transition-all", r.abs ? "left-[16px]" : "left-[2px]")} />
            </button>
          </div>
          <RNum label="Z-index" value={r.z} onChange={(v) => onPatch({ z: Math.round(v) })} />
          {lay.type === "grid" && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-12 shrink-0 text-[#8e8e93]">Column</span>
                <RNum label="Start" value={r.colStart} min={0} onChange={(v) => onPatch({ colStart: Math.round(v) })} />
                <RNum label="Span" value={r.colSpan} min={1} onChange={(v) => onPatch({ colSpan: Math.round(v) })} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-12 shrink-0 text-[#8e8e93]">Row</span>
                <RNum label="Start" value={r.rowStart} min={0} onChange={(v) => onPatch({ rowStart: Math.round(v) })} />
                <RNum label="Span" value={r.rowSpan} min={1} onChange={(v) => onPatch({ rowSpan: Math.round(v) })} />
              </div>
            </>
          )}
        </RSection>
      )}
      <LayoutPanel flush l={r.lay} onChange={(k, v) => onPatch({ lay: { ...r.lay, [k]: v } })} />
      <RSection title="Layer">
        <div className="flex items-center gap-1.5">
          <RNum label="W" value={r.w} min={1} onChange={(v) => onPatch(r.lock ? { w: v, h: Math.max(1, (v * r.h) / r.w) } : { w: v })} />
          <RNum label="H" value={r.h} min={1} onChange={(v) => onPatch(r.lock ? { h: v, w: Math.max(1, (v * r.w) / r.h) } : { h: v })} />
          <RBtn icon={r.lock ? LI.Link : LI.Unlink} label="Lock proportions" active={r.lock} onClick={() => onPatch({ lock: !r.lock })} />
        </div>
      </RSection>
      <RSection title="Appearance">
        <div className="flex items-center gap-1.5">
          <RSel value={r.blend} options={BLENDS.map((b) => [b, capWords(b)] as [string, string])} onChange={(v) => onPatch({ blend: v })} />
          <RNum value={r.op} min={0} suffix="%" onChange={(v) => onPatch({ op: Math.min(100, v) })} className="w-[4.5rem] flex-none" />
          <RBtn icon={r.hidden ? LI.EyeOff : LI.Eye} label={r.hidden ? "Show" : "Hide"} onClick={() => onPatch({ hidden: !r.hidden })} />
        </div>
      </RSection>
      <RSection title="Fill" onAdd={() => onPatch({ fills: [...r.fills, { color: "#B1B2B5", op: 100 }] })}>
        {r.fills.map((f, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <RColor color={f.color} op={f.op} onColor={(c) => upd("fills", i, { color: c })} onOp={(o) => upd("fills", i, { op: o })} />
            <RBtn icon={LI.Minus} label="Remove fill" onClick={() => rm("fills", i)} />
          </div>
        ))}
      </RSection>
      <RSection title="Stroke" onAdd={() => onPatch({ strokes: [...r.strokes, { color: "#000000", op: 100, w: 1, pos: "inside", style: "solid" }] })}>
        {r.strokes.map((st, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <RColor color={st.color} op={st.op} onColor={(c) => upd("strokes", i, { color: c })} onOp={(o) => upd("strokes", i, { op: o })} />
              <RBtn icon={LI.Minus} label="Remove stroke" onClick={() => rm("strokes", i)} />
            </div>
            <div className="flex items-center gap-1.5">
              <RNum icon={LI.PenLine} value={st.w} min={0} onChange={(v) => upd("strokes", i, { w: v })} className="w-16 flex-none" />
              <RSel value={st.pos} options={[["inside", "Inside"], ["center", "Center"], ["outside", "Outside"]]} onChange={(v) => upd("strokes", i, { pos: v })} />
              <RSel value={st.style} options={[["solid", "Solid"], ["dashed", "Dashed"], ["dotted", "Dotted"]]} onChange={(v) => upd("strokes", i, { style: v })} />
            </div>
          </div>
        ))}
      </RSection>
      <RSection title="Shadow" onAdd={() => onPatch({ shadows: [...r.shadows, { kind: "drop", x: 4, y: 4, blur: 4, spread: 0, color: "#000000", op: 20, hidden: false }] })}>
        {r.shadows.map((sh, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <RSel value={sh.kind} options={[["drop", "Drop shadow"], ["inner", "Inner shadow"]]} onChange={(v) => upd("shadows", i, { kind: v })} />
              <RBtn icon={sh.hidden ? LI.EyeOff : LI.Eye} label={sh.hidden ? "Show" : "Hide"} onClick={() => upd("shadows", i, { hidden: !sh.hidden })} />
              <RBtn icon={LI.Minus} label="Remove shadow" onClick={() => rm("shadows", i)} />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <RNum label="X" value={sh.x} onChange={(v) => upd("shadows", i, { x: v })} />
              <RNum label="Y" value={sh.y} onChange={(v) => upd("shadows", i, { y: v })} />
              <RNum label="Blur" value={sh.blur} min={0} onChange={(v) => upd("shadows", i, { blur: v })} />
              <RNum label="Spread" value={sh.spread} onChange={(v) => upd("shadows", i, { spread: v })} />
            </div>
            <RColor color={sh.color} op={sh.op} onColor={(c) => upd("shadows", i, { color: c })} onOp={(o) => upd("shadows", i, { op: o })} />
          </div>
        ))}
      </RSection>
      <RSection title="Blur" onAdd={r.blur === null ? () => onPatch({ blur: 4 }) : undefined}>
        {r.blur !== null && (
          <div className="flex items-center gap-1.5">
            <RNum label="Value" value={r.blur} min={0} onChange={(v) => onPatch({ blur: v })} />
            <RBtn icon={LI.Minus} label="Remove blur" onClick={() => onPatch({ blur: null })} />
          </div>
        )}
      </RSection>
      <RSection title="Export" onAdd={() => onPatch({ exports: [...r.exports, { scale: 1, suffix: "", fmt: "png" }] })}>
        {r.exports.map((ex, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <RSel value={String(ex.scale)} options={[["0.5", "0.5x"], ["1", "1x"], ["2", "2x"], ["3", "3x"], ["4", "4x"]]} onChange={(v) => updEx(i, { scale: Number(v) })} className="w-[4.25rem] flex-none" />
            <input value={ex.suffix} placeholder="Suffix" onChange={(e) => updEx(i, { suffix: e.target.value })} className={cn(RP_IN, "flex-1 placeholder:text-[#6a6a6a]")} />
            <RSel value={ex.fmt} options={[["png", "PNG"], ["jpg", "JPG"], ["svg", "SVG"], ["pdf", "PDF"]]} onChange={(v) => updEx(i, { fmt: v as Rect["exports"][number]["fmt"] })} className="w-[4.25rem] flex-none" />
            <RBtn icon={LI.Minus} label="Remove export" onClick={() => onPatch({ exports: r.exports.filter((_, j) => j !== i) })} />
          </div>
        ))}
        {r.exports.length > 0 && (
          <button type="button" onClick={() => r.exports.forEach((ex) => void exportRect(r, ex))} className="h-8 rounded-[8px] bg-[#0A84FF] text-[12px] font-normal text-white hover:bg-[#0A84FF]/90">
            Export
          </button>
        )}
      </RSection>
    </div>
  );
}

const RECT_EXTRA: Pick<Rect, "lock" | "margin" | "mIndep" | "sw" | "sh" | "self" | "abs" | "z" | "colStart" | "colSpan" | "rowStart" | "rowSpan" | "exports" | "lay"> = {
  lay: { type: "none", dir: "row", wrap: false, align: "start", justify: "start", gapR: 8, gapC: 8, pad: 12, cols: 2, rows: 2 },
  lock: false, margin: [0, 0, 0, 0], mIndep: false, sw: "fix", sh: "fix", self: "auto", abs: false, z: 0, colStart: 0, colSpan: 1, rowStart: 0, rowSpan: 1, exports: [],
};
const fixRect = (r: Rect): Rect => ({ ...RECT_EXTRA, ...r });
const SIDE_ICONS = [LI.ArrowUpToLine, LI.ArrowRightToLine, LI.ArrowDownToLine, LI.ArrowLeftToLine];

function RSeg({ value, options, onChange }: { value: string; options: [string, string | IconT][]; onChange: (v: string) => void }) {
  return (
    <div className="flex h-8 min-w-0 flex-1 items-center gap-0.5 rounded-[8px] bg-[#232325] p-0.5">
      {options.map(([v, l]) => {
        const I = typeof l === "string" ? null : l;
        return (
          <button key={v} type="button" aria-label={v} onClick={() => onChange(v)} className={cn("grid h-full min-w-0 flex-1 place-items-center rounded-[6px] text-[12px] font-normal text-[#8e8e93] hover:text-[#f2f2f2]", value === v && "bg-[#3a3a3c] text-[#f2f2f2]")}>
            {I ? <I className="size-3.5" /> : (l as string)}
          </button>
        );
      })}
    </div>
  );
}

function roundPath(x: number, y: number, w: number, h: number, rr: number[]) {
  const m = Math.max(0, Math.min(w, h) / 2);
  const [a, b, c, d] = rr.map((v) => Math.max(0, Math.min(v, m)));
  return `M${x + a},${y}H${x + w - b}A${b},${b} 0 0 1 ${x + w},${y + b}V${y + h - c}A${c},${c} 0 0 1 ${x + w - c},${y + h}H${x + d}A${d},${d} 0 0 1 ${x},${y + h - d}V${y + a}A${a},${a} 0 0 1 ${x + a},${y}Z`;
}

// standalone SVG of a rectangle (fills, strokes, drop shadows, layer blur and opacity; unrotated)
function rectSvg(r: Rect) {
  const sh = r.shadows.filter((s) => !s.hidden && s.kind === "drop");
  const pad = Math.ceil(Math.max(0, ...r.strokes.map((s) => (s.pos === "outside" ? s.w : s.pos === "center" ? s.w / 2 : 0)), ...sh.map((s) => Math.max(Math.abs(s.x), Math.abs(s.y)) + s.blur * 2 + Math.max(0, s.spread)), (r.blur ?? 0) * 3));
  const W = r.w + pad * 2, H = r.h + pad * 2;
  const d = roundPath(pad, pad, r.w, r.h, r.r);
  const fills = r.fills.slice().reverse().map((f) => `<path d="${d}" fill="${f.color}" fill-opacity="${f.op / 100}"/>`).join("");
  const strokes = r.strokes.map((s) => {
    const o = s.pos === "outside" ? s.w / 2 : s.pos === "center" ? 0 : -s.w / 2;
    const dash = s.style === "dashed" ? ` stroke-dasharray="${s.w * 3} ${s.w * 2}"` : s.style === "dotted" ? ` stroke-dasharray="0 ${s.w * 2}" stroke-linecap="round"` : "";
    return `<path d="${roundPath(pad - o, pad - o, r.w + 2 * o, r.h + 2 * o, r.r.map((v) => (v ? Math.max(0, v + o) : 0)))}" fill="none" stroke="${s.color}" stroke-opacity="${s.op / 100}" stroke-width="${s.w}"${dash}/>`;
  }).join("");
  const filt = sh.length
    ? `<filter id="sh" x="-50%" y="-50%" width="200%" height="200%">${sh.map((s, i) => `<feDropShadow in="SourceGraphic" dx="${s.x}" dy="${s.y}" stdDeviation="${s.blur / 2}" flood-color="${s.color}" flood-opacity="${s.op / 100}" result="s${i}"/>`).join("")}<feMerge>${sh.map((_, i) => `<feMergeNode in="s${i}"/>`).join("")}</feMerge></filter>`
    : "";
  const bl = r.blur ? `<filter id="bl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${r.blur / 2}"/></filter>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${filt}${bl}</defs><g opacity="${r.op / 100}"${r.blur ? ' filter="url(#bl)"' : ""}><g${sh.length ? ' filter="url(#sh)"' : ""}>${fills}</g>${strokes}</g></svg>`;
}

function downloadBlob(blob: Blob, name: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

async function exportRect(r: Rect, e: Rect["exports"][number]) {
  const svg = rectSvg(r);
  const name = `Rectangle${e.suffix}`;
  if (e.fmt === "svg") return downloadBlob(new Blob([svg], { type: "image/svg+xml" }), name + ".svg");
  const win = e.fmt === "pdf" ? window.open("", "_blank") : null;
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  await img.decode();
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.ceil(img.width * e.scale));
  c.height = Math.max(1, Math.ceil(img.height * e.scale));
  const x = c.getContext("2d")!;
  if (e.fmt === "jpg") { x.fillStyle = "#ffffff"; x.fillRect(0, 0, c.width, c.height); }
  x.drawImage(img, 0, 0, c.width, c.height);
  if (e.fmt === "pdf") {
    // no PDF library: open the image in a print view so it can be saved as PDF
    if (win) { win.document.write(`<title>${name}</title><style>@page{margin:0}body{margin:0}</style><img src="${c.toDataURL("image/png")}" style="width:${img.width}px" onload="print()">`); win.document.close(); }
    return;
  }
  c.toBlob((b) => b && downloadBlob(b, `${name}.${e.fmt}`), e.fmt === "jpg" ? "image/jpeg" : "image/png", 0.92);
}
