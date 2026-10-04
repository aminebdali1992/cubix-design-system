import {
  encodeJsonResponses,
  encodeSseResponses,
  handleMcpBody,
  prefersEventStream,
} from "@/lib/mcp/handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, MCP-Protocol-Version",
} as const;

function withCors(init?: ResponseInit): ResponseInit {
  return {
    ...init,
    headers: {
      ...CORS_HEADERS,
      ...(init?.headers ?? {}),
    },
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    ...withCors({
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }),
  });
}

function sseResponse(body: string, status = 200): Response {
  return new Response(body, {
    ...withCors({
      status,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    }),
  });
}

/** Stateless Streamable HTTP: no long-lived GET SSE stream. */
export function GET() {
  return new Response(null, {
    ...withCors({
      status: 405,
      headers: {
        Allow: "POST, OPTIONS, DELETE",
        "Cache-Control": "no-store",
      },
    }),
  });
}

/** Sessions are not used; DELETE is allowed but a no-op. */
export function DELETE() {
  return new Response(null, {
    ...withCors({
      status: 405,
      headers: {
        Allow: "POST, OPTIONS",
        "Cache-Control": "no-store",
      },
    }),
  });
}

export function OPTIONS() {
  return new Response(null, {
    ...withCors({
      status: 204,
      headers: {
        "Access-Control-Max-Age": "86400",
      },
    }),
  });
}

export async function POST(request: Request): Promise<Response> {
  const accept = request.headers.get("accept");
  const useSse = prefersEventStream(accept);

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return jsonResponse(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" },
      },
      400
    );
  }

  if (!raw.trim()) {
    return jsonResponse(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32600, message: "Invalid Request: empty body" },
      },
      400
    );
  }

  const result = await handleMcpBody(raw);

  if (result.kind === "accepted") {
    return new Response(null, {
      ...withCors({
        status: 202,
        headers: { "Cache-Control": "no-store" },
      }),
    });
  }

  if (result.kind === "parse-error") {
    return useSse
      ? sseResponse(encodeSseResponses([result.response]), 400)
      : jsonResponse(result.response, 400);
  }

  if (useSse) {
    return sseResponse(encodeSseResponses(result.responses));
  }

  return jsonResponse(encodeJsonResponses(result.responses));
}
