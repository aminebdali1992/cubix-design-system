"use client";

import * as React from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  FileCodeIcon,
  FileJsonIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  GitBranchIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/cubix/button";
import { cn } from "@/lib/utils";

/* -------------------------------- types -------------------------------- */

export type FileState = "U" | "M";
export type LineKind = "plain" | "command" | "info" | "success" | "dim" | "spinner";
export type TreeRow = { id: string; name: string; depth: number; folder?: boolean };

type Line = { id: number; kind: LineKind; text: string };

export type MockupApi = {
  cancelled: () => boolean;
  wait: (ms: number) => Promise<void>;
  type: (command: string) => Promise<void>;
  push: (kind: LineKind, text: string) => number;
  update: (id: number, kind: LineKind, text: string) => void;
  write: (file: string, text: string, state?: FileState) => void;
  open: (file: string) => void;
  typeInEditor: (file: string, from: string, to: string, step?: number) => Promise<void>;
  showPreview: (url: string, node: React.ReactNode, width?: number) => void;
};

export type MockupPreview = { url: string; node: React.ReactNode; width?: number };

/** Tab id for the pinned preview tab (see `previewTab`). */
export const PREVIEW_TAB = "__preview__";

export type MockupPanelTab = { id: string; label: string; aside?: React.ReactNode; content: React.ReactNode };

export type EditorMockupProps = {
  project: string;
  tree: TreeRow[];
  startFiles: string[];
  initialContents: Record<string, string>;
  initialTabs: string[];
  /** Tab to focus first (defaults to the last initial tab). */
  initialActive?: string;
  /** Scripted demo. Leave it out for an interactive, prop-driven editor. */
  script?: (api: MockupApi) => Promise<void>;
  /** Live file contents that override the internal ones. */
  contents?: Record<string, string>;
  /** Always-on preview window (can be closed and reopened). */
  livePreview?: MockupPreview;
  /** Shows the preview in a pinned editor tab instead of a floating window. */
  previewTab?: MockupPreview & { label?: string };
  /** Extra classes for the preview window position. */
  previewClassName?: string;
  /** Replaces the terminal with your own panel tabs. */
  panel?: MockupPanelTab[];
  /** Rendered on the right of the title bar. */
  titleEnd?: React.ReactNode;
  /** Rendered on the right of the tab strip for the active file. */
  tabActions?: (active: string | null) => React.ReactNode;
  /** Rendered at the end of the status bar. */
  statusEnd?: React.ReactNode;
  /** Per-line highlighted code for a file. */
  renderLines?: (file: string, code: string) => React.ReactNode[];
  /** Status bar language label. */
  language?: (file: string) => string;
  /** Classes for the editor body (height). */
  bodyClassName?: string;
};

/* ------------------------------- helpers ------------------------------- */

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const keywords =
  "import|from|export|default|function|return|const|type|extends|as|async|await";
const tokenRe = new RegExp(
  `("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`[^\`]*\`|\\/\\/.*$|\\/\\*.*?\\*\\/|\\b(?:${keywords})\\b|<\\/?[A-Za-z][\\w.]*|@[a-z-]+|--[\\w-]+)`,
  "g"
);
const keywordRe = new RegExp(`^(${keywords})$`);

function Highlight({ code }: { code: string }) {
  return (
    <>
      {code.split(tokenRe).map((part, i) => {
        if (!part) return null;
        let cls = "";
        if (/^["'`]/.test(part)) cls = "text-[#CE9178]";
        else if (part.startsWith("//") || part.startsWith("/*")) cls = "text-[#6A9955]";
        else if (part.startsWith("<")) cls = "text-[#4EC9B0]";
        else if (part.startsWith("@")) cls = "text-[#C586C0]";
        else if (part.startsWith("--")) cls = "text-[#9CDCFE]";
        else if (keywordRe.test(part)) cls = "text-[#C586C0]";
        return (
          <span key={i} className={cls}>
            {part}
          </span>
        );
      })}
    </>
  );
}

function FileGlyph({ id }: { id: string }) {
  if (id.endsWith(".json"))
    return <FileJsonIcon className="size-3.5 shrink-0 text-[#CBCB41]" />;
  if (id.endsWith(".css"))
    return <FileTextIcon className="size-3.5 shrink-0 text-[#519ABA]" />;
  if (id.endsWith(".mjs"))
    return <FileCodeIcon className="size-3.5 shrink-0 text-[#CBCB41]" />;
  return <FileCodeIcon className="size-3.5 shrink-0 text-[#519ABA]" />;
}

function languageOf(id: string) {
  if (id.endsWith(".json")) return "JSON";
  if (id.endsWith(".css")) return "CSS";
  if (id.endsWith(".mjs")) return "JavaScript";
  if (id.endsWith(".tsx")) return "TypeScript JSX";
  return "TypeScript";
}

/* ------------------------------ component ------------------------------ */

export function EditorMockup({
  project,
  tree,
  startFiles,
  initialContents,
  initialTabs,
  initialActive,
  script,
  contents: liveContents,
  livePreview,
  previewTab,
  previewClassName,
  panel,
  titleEnd,
  tabActions,
  statusEnd,
  renderLines,
  language,
  bodyClassName,
}: EditorMockupProps) {
  const live = !script;
  const [previewHidden, setPreviewHidden] = React.useState(false);
  const [panelTab, setPanelTab] = React.useState(panel?.[0]?.id ?? "");
  const [lines, setLines] = React.useState<Line[]>([]);
  const [typing, setTyping] = React.useState("");
  const [visible, setVisible] = React.useState<Set<string>>(new Set(startFiles));
  const [changed, setChanged] = React.useState<Record<string, FileState>>({});
  const [contents, setContents] = React.useState<Record<string, string>>(initialContents);
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set());
  const [tabs, setTabs] = React.useState<string[]>(initialTabs);
  const [active, setActive] = React.useState<string | null>(initialActive ?? initialTabs.at(-1) ?? null);
  const [preview, setPreview] = React.useState<{ url: string; node: React.ReactNode; width?: number } | null>(
    null
  );
  const [frame, setFrame] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [run, setRun] = React.useState(0);
  const termRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const scriptRef = React.useRef(script);
  scriptRef.current = script;
  const initialRef = React.useRef({ startFiles, initialContents, initialTabs, initialActive });
  initialRef.current = { startFiles, initialContents, initialTabs, initialActive };

  React.useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % spinnerFrames.length), 80);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, typing]);

  const openFile = React.useCallback((file: string) => {
    setTabs((t) => (t.includes(file) ? t : [...t, file]));
    setActive(file);
  }, []);

  const closeTab = (file: string) => {
    const i = tabs.indexOf(file);
    const next = tabs.filter((x) => x !== file);
    setTabs(next);
    if (active === file) setActive(next[Math.min(i, next.length - 1)] ?? (previewTab ? PREVIEW_TAB : null));
  };

  const toggleFolder = (id: string) =>
    setCollapsed((c) => {
      const next = new Set(c);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  React.useEffect(() => {
    let cancelled = false;
    let id = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = (ms: number) => (reduced || cancelled ? Promise.resolve() : sleep(ms));

    const push = (kind: LineKind, text: string) => {
      const n = ++id;
      if (!cancelled) setLines((l) => [...l, { id: n, kind, text }]);
      return n;
    };

    const api: MockupApi = {
      cancelled: () => cancelled,
      wait,
      push,
      update: (n, kind, text) => {
        if (cancelled) return;
        setLines((l) => l.map((x) => (x.id === n ? { ...x, kind, text } : x)));
      },
      write: (file, text, state) => {
        if (cancelled) return;
        const parts = file.split("/");
        const ids = parts.map((_, i) => parts.slice(0, i + 1).join("/"));
        setVisible((v) => new Set([...v, ...ids]));
        setContents((c) => ({ ...c, [file]: text }));
        if (state) setChanged((c) => ({ ...c, [file]: state }));
      },
      open: (file) => {
        if (!cancelled) openFile(file);
      },
      type: async (cmd) => {
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return;
          setTyping(cmd.slice(0, i));
          await wait(38);
        }
        await wait(400);
        if (cancelled) return;
        setTyping("");
        push("command", cmd);
      },
      typeInEditor: async (file, from, to, step = 1) => {
        let common = 0;
        while (common < from.length && from[common] === to[common]) common++;
        let tail = 0;
        while (
          tail < from.length - common &&
          from[from.length - 1 - tail] === to[to.length - 1 - tail]
        )
          tail++;
        const head = to.slice(0, common);
        const end = to.slice(to.length - tail);
        const insert = to.slice(common, to.length - tail);
        for (let i = 0; i <= insert.length + step - 1; i += step) {
          if (cancelled) return;
          setContents((c) => ({ ...c, [file]: head + insert.slice(0, i) + end }));
          await wait(28);
        }
        setChanged((c) => ({ ...c, [file]: c[file] ?? "M" }));
      },
      showPreview: (url, node, width) => {
        if (!cancelled) setPreview({ url, node, width });
      },
    };

    (async () => {
      const init = initialRef.current;
      setLines([]);
      setTyping("");
      setVisible(new Set(init.startFiles));
      setChanged({});
      setContents(init.initialContents);
      setCollapsed(new Set());
      setTabs(init.initialTabs);
      setActive(init.initialActive ?? init.initialTabs.at(-1) ?? null);
      setPreview(null);
      setDone(false);
      if (!scriptRef.current) return;
      await wait(700);
      await scriptRef.current(api);
      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [run, openFile]);

  const rows = tree.filter((row) => {
    if (!live && !visible.has(row.id)) return false;
    const parts = row.id.split("/");
    for (let i = 1; i < parts.length; i++) {
      if (collapsed.has(parts.slice(0, i).join("/"))) return false;
    }
    return true;
  });

  const shownContents = liveContents ? { ...contents, ...liveContents } : contents;
  const previewTabActive = Boolean(previewTab) && active === PREVIEW_TAB;
  const fileActive = active === PREVIEW_TAB ? null : active;
  const activeCode = fileActive ? (shownContents[fileActive] ?? "") : "";
  const codeLines = fileActive ? activeCode.split("\n") : [];
  const renderedLines = fileActive && renderLines ? renderLines(fileActive, activeCode) : null;
  const shownPreview = livePreview ? (previewHidden ? null : livePreview) : preview;
  const activePanel = panel?.find((tab) => tab.id === panelTab) ?? panel?.[0];

  return (
    <div
      ref={rootRef}
      dir="ltr"
      className="relative overflow-hidden rounded-xl border border-black/10 bg-[#1E1E1E] [color-scheme:dark] [scrollbar-color:rgb(255_255_255/0.22)_transparent] font-normal text-[#CCCCCC] shadow-xl dark:border-white/10"
    >
      {/* title bar */}
      <div className="relative flex h-9 items-center border-b border-black/40 bg-[#2D2D2D] px-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="pointer-events-none absolute inset-x-0 text-center text-xs text-[#999]">
          {project}
        </span>
        {titleEnd || (livePreview && previewHidden) ? (
          <div className="relative ms-auto flex items-center gap-1">
            {livePreview && previewHidden ? (
              <Button
                variant="ghost"
                size="xs"
                className="text-[#CCCCCC] hover:bg-white/10 hover:text-white"
                onClick={() => setPreviewHidden(false)}
              >
                <EyeIcon />
                Preview
              </Button>
            ) : null}
            {titleEnd}
          </div>
        ) : null}
        {script ? (
          <Button
            variant="ghost"
            size="xs"
            className="relative ms-auto text-[#CCCCCC] hover:bg-white/10 hover:text-white"
            onClick={() => setRun((r) => r + 1)}
            disabled={!done}
          >
            <RotateCcwIcon />
            Replay
          </Button>
        ) : null}
      </div>

      <div className={cn("grid h-[480px] grid-cols-1 sm:grid-cols-[210px_1fr]", bodyClassName)}>
        {/* explorer */}
        <aside className="hidden min-h-0 flex-col border-e border-black/40 bg-[#252526] sm:flex">
          <p className="px-4 py-2 text-[11px] tracking-wide text-[#BBBBBB]">EXPLORER</p>
          <p className="flex items-center gap-1 px-2 pb-1 text-[11px] text-[#CCCCCC]">
            <ChevronDownIcon className="size-3.5" />
            {project.toUpperCase()}
          </p>
          <ul className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin] pb-2 font-mono text-[12px]">
            {rows.map((row) => {
              const state = changed[row.id];
              const isOpen = !collapsed.has(row.id);
              return (
                <motion.li
                  key={`${run}-${row.id}`}
                  initial={startFiles.includes(row.id) ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    type="button"
                    onClick={() => (row.folder ? toggleFolder(row.id) : openFile(row.id))}
                    className={cn(
                      "flex h-[22px] w-full cursor-pointer items-center gap-1.5 pe-3 text-start outline-none hover:bg-[#2A2D2E] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#007FD4]",
                      row.id === active && "bg-[#37373D] hover:bg-[#37373D]"
                    )}
                    style={{ paddingInlineStart: `${row.depth * 12 + 10}px` }}
                  >
                    {row.folder ? (
                      <>
                        {isOpen ? (
                          <ChevronDownIcon className="size-3 shrink-0 text-[#999]" />
                        ) : (
                          <ChevronRightIcon className="size-3 shrink-0 text-[#999]" />
                        )}
                        {isOpen ? (
                          <FolderOpenIcon className="size-3.5 shrink-0 text-[#DCB67A]" />
                        ) : (
                          <FolderIcon className="size-3.5 shrink-0 text-[#DCB67A]" />
                        )}
                      </>
                    ) : (
                      <span className="ms-[18px] flex">
                        <FileGlyph id={row.id} />
                      </span>
                    )}
                    <span
                      className={cn(
                        "truncate",
                        state === "U" && "text-[#73C991]",
                        state === "M" && "text-[#E2C08D]"
                      )}
                    >
                      {row.name}
                    </span>
                    {state && !row.folder && (
                      <span
                        className={cn(
                          "ms-auto text-[11px]",
                          state === "U" ? "text-[#73C991]" : "text-[#E2C08D]"
                        )}
                      >
                        {state}
                      </span>
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </aside>

        {/* editor + terminal */}
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex h-9 shrink-0 overflow-x-auto bg-[#252526] [scrollbar-width:none]">
            {previewTab ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActive(PREVIEW_TAB)}
                onKeyDown={(e) => e.key === "Enter" && setActive(PREVIEW_TAB)}
                className={cn(
                  "flex shrink-0 cursor-pointer items-center gap-1.5 border-e border-black/40 px-3 text-[12px] outline-none",
                  previewTabActive
                    ? "border-t border-t-[#CCCCCC]/60 bg-[#1E1E1E] text-white"
                    : "bg-[#2D2D2D] text-[#969696] hover:text-[#CCCCCC]"
                )}
              >
                <EyeIcon className="size-3.5 shrink-0 text-[#75BEFF]" />
                <span className="whitespace-nowrap">{previewTab.label ?? "Preview"}</span>
              </div>
            ) : null}
            {tabs.map((tab) => (
              <div
                key={tab}
                role="button"
                tabIndex={0}
                onClick={() => setActive(tab)}
                onKeyDown={(e) => e.key === "Enter" && setActive(tab)}
                className={cn(
                  "group flex shrink-0 cursor-pointer items-center gap-1.5 border-e border-black/40 ps-3 pe-2 text-[12px] outline-none",
                  tab === active
                    ? "border-t border-t-[#CCCCCC]/60 bg-[#1E1E1E] text-white"
                    : "bg-[#2D2D2D] text-[#969696] hover:text-[#CCCCCC]"
                )}
              >
                <FileGlyph id={tab} />
                <span
                  className={cn(
                    "whitespace-nowrap",
                    changed[tab] === "U" && "text-[#73C991]",
                    changed[tab] === "M" && "text-[#E2C08D]"
                  )}
                >
                  {tab.split("/").pop()}
                </span>
                <button
                  type="button"
                  aria-label={`Close ${tab}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab);
                  }}
                  className={cn(
                    "flex size-5 cursor-pointer items-center justify-center rounded hover:bg-white/10",
                    tab !== active && "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <XIcon className="size-3" />
                </button>
              </div>
            ))}
            {tabActions ? (
              <div className="ms-auto flex shrink-0 items-center px-2">{tabActions(fileActive)}</div>
            ) : null}
          </div>

          {previewTab && previewTabActive ? (
            <>
              <p className="shrink-0 px-4 py-1 font-mono text-[11px] text-[#999]">{previewTab.url}</p>
              <div className="flex min-h-0 flex-1 overflow-auto [scrollbar-width:thin] bg-[#181818] bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:16px_16px] p-6">
                <div
                  style={{ width: previewTab.width ?? 320 }}
                  className="m-auto max-w-full shrink-0 text-foreground"
                >
                  {previewTab.node}
                </div>
              </div>
            </>
          ) : fileActive ? (
            <>
              <p className="shrink-0 px-4 py-1 font-mono text-[11px] text-[#999]">
                {fileActive.split("/").join("  ›  ")}
              </p>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={fileActive}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="min-h-0 flex-1 overflow-auto [scrollbar-width:thin] py-1 font-mono text-[12.5px] leading-[19px]"
                >
                  {codeLines.map((l, i) => (
                    <div key={i} className="flex">
                      <span className="sticky start-0 w-11 shrink-0 select-none bg-[#1E1E1E] pe-4 text-end text-[#858585]">
                        {i + 1}
                      </span>
                      <span className="whitespace-pre pe-4">
                        {renderedLines ? renderedLines[i] : <Highlight code={l} />}
                      </span>
                    </div>
                  ))}
                </motion.pre>
              </AnimatePresence>
            </>
          ) : (
            <div className="flex min-h-0 flex-1 items-center justify-center text-xs text-[#6B6B6B]">
              Open a file from the Explorer
            </div>
          )}

          {panel && activePanel ? (
            <div className="flex h-[180px] shrink-0 flex-col border-t border-[#3C3C3C]">
              <div className="flex items-center gap-4 px-4 pt-1.5 text-[11px] tracking-wide">
                {panel.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPanelTab(tab.id)}
                    className={cn(
                      "cursor-pointer pb-1 outline-none focus-visible:ring-1 focus-visible:ring-[#007FD4]",
                      tab.id === activePanel.id
                        ? "border-b border-[#CCCCCC] text-white"
                        : "border-b border-transparent text-[#777] hover:text-[#CCCCCC]"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
                {activePanel.aside ? <span className="ms-auto text-[#999]">{activePanel.aside}</span> : null}
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin] px-4 py-2 text-[12px] leading-5">
                {activePanel.content}
              </div>
            </div>
          ) : (
            <>
            {/* terminal */}
            <div className="flex h-[180px] shrink-0 flex-col border-t border-[#3C3C3C]">
              <div className="flex items-center gap-4 px-4 pt-1.5 text-[11px] tracking-wide">
                <span className="text-[#777]">PROBLEMS</span>
                <span className="text-[#777]">OUTPUT</span>
                <span className="border-b border-[#CCCCCC] pb-1 text-white">TERMINAL</span>
                <span className="ms-auto text-[#999]">bash</span>
              </div>
              <div
                ref={termRef}
                className="flex-1 overflow-y-auto [scrollbar-width:thin] px-4 py-2 font-mono text-[12.5px] leading-5"
              >
                {lines.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-pre-wrap"
                  >
                    <TerminalLine line={line} frame={frame} project={project} />
                  </motion.div>
                ))}
                <div>
                  <Prompt project={project} />
                  {typing}
                  <span className="ms-px inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse bg-[#CCCCCC]" />
                </div>
              </div>
            </div>
            </>
          )}
        </div>
      </div>

      {/* status bar */}
      <div className="flex h-6 items-center gap-4 border-t border-black/40 bg-[#181818] px-3 text-[11px] text-[#9D9D9D]">
        <span className="flex items-center gap-1">
          <GitBranchIcon className="size-3" />
          main
        </span>
        {fileActive && (
          <>
            <span className="ms-auto">Spaces: 2</span>
            <span>UTF-8</span>
            <span>{language ? language(fileActive) : languageOf(fileActive)}</span>
          </>
        )}
        {statusEnd ? <span className={cn("flex items-center", !fileActive && "ms-auto")}>{statusEnd}</span> : null}
      </div>

      {/* browser preview */}
      <AnimatePresence>
        {shownPreview && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            drag
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={rootRef}
            dragMomentum={false}
            dragElastic={0}
            style={{ width: shownPreview.width ?? 288 }}
            className={cn(
              "absolute bottom-10 end-4 z-10 max-w-[calc(100%-2rem)] overflow-hidden rounded-lg border bg-background text-foreground shadow-2xl",
              previewClassName
            )}
          >
            <div onPointerDown={(event) => dragControls.start(event)} className="flex cursor-grab touch-none items-center gap-2 border-b bg-muted px-3 py-2 select-none active:cursor-grabbing">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Close preview"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => (livePreview ? setPreviewHidden(true) : setPreview(null))}
                  className="size-2.5 cursor-pointer rounded-full bg-[#FF5F57]"
                />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span className="ms-2 flex-1 truncate rounded bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                {shownPreview.url}
              </span>
            </div>
            {shownPreview.node}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Prompt({ project }: { project: string }) {
  return (
    <>
      <span className="text-[#73C991]">~/{project}</span>
      <span> $ </span>
    </>
  );
}

function TerminalLine({
  line,
  frame,
  project,
}: {
  line: Line;
  frame: number;
  project: string;
}) {
  switch (line.kind) {
    case "command":
      return (
        <>
          <Prompt project={project} />
          {line.text}
        </>
      );
    case "spinner":
      return (
        <>
          <span className="text-[#29B8DB]">{spinnerFrames[frame]}</span> {line.text}
        </>
      );
    case "info":
      return (
        <>
          <span className="text-[#29B8DB]">ℹ</span> {line.text}
        </>
      );
    case "success":
      return (
        <>
          <span className="text-[#23D18B]">✔</span> {line.text}
        </>
      );
    case "dim":
      return <span className="text-[#808080]">{line.text}</span>;
    default:
      return <span>{line.text}</span>;
  }
}
