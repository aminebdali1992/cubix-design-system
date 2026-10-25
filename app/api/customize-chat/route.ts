import { NextResponse } from "next/server";

import { parseTree, UI_TREE_PROMPT } from "@/app/customize/ui-tree";

/* Keyless OpenAI-compatible endpoint (Pollinations, anonymous tier = GPT-OSS 20B only).
   Higher reasoning effort hits the anonymous 1500-token cap, so keep it low. */
const ENDPOINT = process.env.UI_CHAT_ENDPOINT ?? "https://text.pollinations.ai/openai";
const MODELS: Record<string, { model: string; effort: "low" | "high" }> = {
  fast: { model: "openai-fast", effort: "low" },
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { model?: string; prompt?: string } | null;
  const model = MODELS[body?.model ?? ""];
  const prompt = body?.prompt?.trim().slice(0, 2000);
  if (!model || !prompt) {
    return NextResponse.json({ error: "مدل یا متن درخواست نامعتبر است." }, { status: 400 });
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model.model,
        reasoning_effort: model.effort,
        messages: [
          { role: "system", content: UI_TREE_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(120_000),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = data?.error?.message ?? `HTTP ${res.status}`;
      return NextResponse.json({ error: `خطای سرویس مدل: ${msg}` }, { status: 502 });
    }
    const tree = parseTree(String(data?.choices?.[0]?.message?.content ?? ""));
    if (!tree) {
      return NextResponse.json({ error: "پاسخ مدل قابل تبدیل به طرح نبود. دوباره امتحان کنید." }, { status: 502 });
    }
    return NextResponse.json({ tree });
  } catch {
    return NextResponse.json({ error: "اتصال به سرویس مدل برقرار نشد." }, { status: 504 });
  }
}
