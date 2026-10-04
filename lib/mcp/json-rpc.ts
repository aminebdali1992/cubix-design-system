import {
  JSON_RPC_INVALID_REQUEST,
  JSON_RPC_PARSE_ERROR,
  type JsonRpcFailure,
  type JsonRpcId,
  type JsonRpcMessage,
  type JsonRpcNotification,
  type JsonRpcRequest,
  type JsonRpcSuccess,
} from "./types";

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isJsonRpcId(value: unknown): value is JsonRpcId {
  return (
    value === null || typeof value === "string" || typeof value === "number"
  );
}

export function isJsonRpcRequest(value: unknown): value is JsonRpcRequest {
  return (
    isObject(value) &&
    value.jsonrpc === "2.0" &&
    typeof value.method === "string" &&
    isJsonRpcId(value.id)
  );
}

export function isJsonRpcNotification(
  value: unknown
): value is JsonRpcNotification {
  return (
    isObject(value) &&
    value.jsonrpc === "2.0" &&
    typeof value.method === "string" &&
    !("id" in value)
  );
}

export function isJsonRpcResponse(value: unknown): boolean {
  return (
    isObject(value) &&
    value.jsonrpc === "2.0" &&
    isJsonRpcId(value.id) &&
    ("result" in value || "error" in value)
  );
}

export function successResponse(
  id: JsonRpcId,
  result: unknown
): JsonRpcSuccess {
  return { jsonrpc: "2.0", id, result };
}

export function errorResponse(
  id: JsonRpcId,
  code: number,
  message: string,
  data?: unknown
): JsonRpcFailure {
  return {
    jsonrpc: "2.0",
    id,
    error: data === undefined ? { code, message } : { code, message, data },
  };
}

export function parseJsonRpcBody(raw: string):
  | { ok: true; messages: JsonRpcMessage[] }
  | { ok: false; error: JsonRpcFailure } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return {
      ok: false,
      error: errorResponse(null, JSON_RPC_PARSE_ERROR, "Parse error"),
    };
  }

  const candidates = Array.isArray(parsed) ? parsed : [parsed];
  if (candidates.length === 0) {
    return {
      ok: false,
      error: errorResponse(
        null,
        JSON_RPC_INVALID_REQUEST,
        "Invalid Request: empty batch"
      ),
    };
  }

  const messages: JsonRpcMessage[] = [];
  for (const candidate of candidates) {
    if (
      isJsonRpcRequest(candidate) ||
      isJsonRpcNotification(candidate) ||
      isJsonRpcResponse(candidate)
    ) {
      messages.push(candidate as JsonRpcMessage);
      continue;
    }
    return {
      ok: false,
      error: errorResponse(null, JSON_RPC_INVALID_REQUEST, "Invalid Request"),
    };
  }

  return { ok: true, messages };
}
