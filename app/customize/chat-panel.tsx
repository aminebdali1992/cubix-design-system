"use client";

import * as React from "react";
import { ArrowUp, Loader2, X } from "lucide-react";

import { Button } from "@/components/cubix/base/button";
import { cn } from "@/lib/utils";

import type { UITree } from "./ui-tree";

const MODELS = [
  { id: "fast", label: "GPT-OSS 20B · Free (Pollinations)" },
] as const;

type Msg = { role: "user" | "assistant"; text: string; error?: boolean };

export function ChatPanel({ onClose, onTree }: { onClose: () => void; onTree: (tree: UITree) => void }) {
  const [model, setModel] = React.useState<(typeof MODELS)[number]["id"]>("fast");
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: prompt }]);
    setLoading(true);
    try {
      const res = await fetch("/api/customize-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, prompt }),
      });
      const data = (await res.json()) as { tree?: UITree; error?: string };
      if (data.tree) {
        onTree(data.tree);
        setMessages((m) => [...m, { role: "assistant", text: `«${data.tree!.title}» روی بوم قرار گرفت.` }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", text: data.error ?? "خطای ناشناخته", error: true }]);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "ارسال درخواست ناموفق بود.", error: true }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      lang="fa"
      className="fixed right-4 bottom-16 z-20 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-[14px] border border-[#2a2a2a] bg-[#151515] text-[13px] text-[#e0e0e0] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-[#232323] px-3 py-2.5">
        <span>چت طراحی</span>
        <button type="button" onClick={onClose} aria-label="بستن" className="text-[#8a8a8a] hover:text-white">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex gap-1 p-2" dir="ltr">
        {MODELS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setModel(m.id)}
            className={cn(
              "flex-1 truncate rounded-[8px] px-2 py-1.5 text-[11px]",
              model === m.id ? "bg-[#2a2a2a] text-white" : "text-[#8a8a8a] hover:bg-[#1e1e1e]"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div ref={listRef} className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-2">
        {messages.length === 0 && (
          <p className="m-auto text-center text-[12px] text-[#7a7a7a]">مثلاً بنویسید: «یک صفحه لاگین طراحی کن»</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] rounded-[10px] px-3 py-2 leading-6",
              m.role === "user" ? "self-start bg-[#2a5bd7] text-white" : "self-end bg-[#222]",
              m.error && "text-[#ff8a8a]"
            )}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 self-end text-[12px] text-[#8a8a8a]">
            <Loader2 className="size-3.5 animate-spin" /> در حال طراحی…
          </div>
        )}
      </div>

      <form onSubmit={send} className="flex items-end gap-2 border-t border-[#232323] p-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) send(e);
          }}
          rows={2}
          placeholder="چه صفحه‌ای طراحی شود؟"
          className="flex-1 resize-none rounded-[8px] bg-[#1e1e1e] px-2.5 py-2 text-[13px] outline-none placeholder:text-[#666]"
        />
        <Button type="submit" size="icon-sm" disabled={loading || !input.trim()} aria-label="ارسال">
          <ArrowUp />
        </Button>
      </form>
    </div>
  );
}
