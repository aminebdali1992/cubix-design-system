import { MCP_INSTRUCTIONS } from "./instructions";
import {
  errorResponse,
  isJsonRpcNotification,
  isJsonRpcRequest,
  isObject,
  parseJsonRpcBody,
  successResponse,
} from "./json-rpc";
import { callMcpTool, MCP_TOOLS } from "./tools";
import {
  JSON_RPC_INTERNAL_ERROR,
  JSON_RPC_INVALID_PARAMS,
  JSON_RPC_METHOD_NOT_FOUND,
  MCP_PROTOCOL_VERSIONS,
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
  type JsonRpcMessage,
  type JsonRpcNotification,
  type JsonRpcRequest,
  type JsonRpcResponse,
  type McpProtocolVersion,
} from "./types";

function negotiateProtocolVersion(requested: unknown): McpProtocolVersion {
  if (
    typeof requested === "string" &&
    (MCP_PROTOCOL_VERSIONS as readonly string[]).includes(requested)
  ) {
    return requested as McpProtocolVersion;
  }
  return "2025-03-26";
}

async function handleRequest(
  message: JsonRpcRequest
): Promise<JsonRpcResponse> {
  const { id, method, params } = message;

  try {
    switch (method) {
      case "initialize": {
        const protocolVersion = negotiateProtocolVersion(
          isObject(params) ? params.protocolVersion : undefined
        );
        return successResponse(id, {
          protocolVersion,
          capabilities: {
            tools: {
              listChanged: false,
            },
          },
          serverInfo: {
            name: MCP_SERVER_NAME,
            version: MCP_SERVER_VERSION,
          },
          instructions: MCP_INSTRUCTIONS,
        });
      }

      case "ping":
        return successResponse(id, {});

      case "tools/list":
        return successResponse(id, { tools: MCP_TOOLS });

      case "tools/call": {
        if (!isObject(params) || typeof params.name !== "string") {
          return errorResponse(
            id,
            JSON_RPC_INVALID_PARAMS,
            'Invalid params: "name" is required'
          );
        }

        const known = MCP_TOOLS.some((tool) => tool.name === params.name);
        if (!known) {
          return errorResponse(
            id,
            JSON_RPC_INVALID_PARAMS,
            `Unknown tool: ${params.name}`
          );
        }

        const result = await callMcpTool(params.name, params.arguments);
        return successResponse(id, result);
      }

      default:
        return errorResponse(
          id,
          JSON_RPC_METHOD_NOT_FOUND,
          `Method not found: ${method}`
        );
    }
  } catch (error) {
    return errorResponse(
      id,
      JSON_RPC_INTERNAL_ERROR,
      error instanceof Error ? error.message : "Internal error"
    );
  }
}

function handleNotification(message: JsonRpcNotification): void {
  // Stateless server: initialized / cancelled / progress are acknowledged at HTTP layer.
  void message;
}

export type McpHandleResult =
  | { kind: "accepted" }
  | { kind: "responses"; responses: JsonRpcResponse[] }
  | { kind: "parse-error"; response: JsonRpcResponse };

export async function handleMcpBody(raw: string): Promise<McpHandleResult> {
  const parsed = parseJsonRpcBody(raw);
  if (!parsed.ok) {
    return { kind: "parse-error", response: parsed.error };
  }

  const responses: JsonRpcResponse[] = [];
  let sawRequest = false;

  for (const message of parsed.messages) {
    if (isJsonRpcRequest(message)) {
      sawRequest = true;
      responses.push(await handleRequest(message));
      continue;
    }

    if (isJsonRpcNotification(message)) {
      handleNotification(message);
      continue;
    }

    // Client-originated JSON-RPC responses are ignored by a tools-only server.
    void message as JsonRpcMessage;
  }

  if (!sawRequest) {
    return { kind: "accepted" };
  }

  return { kind: "responses", responses };
}

export function prefersEventStream(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;
  // Match Dig / Claude Code: when text/event-stream is accepted, prefer SSE
  // even if application/json is also listed.
  return acceptHeader.toLowerCase().includes("text/event-stream");
}

export function encodeSseResponses(responses: JsonRpcResponse[]): string {
  return responses
    .map((response) => `event: message\ndata: ${JSON.stringify(response)}\n\n`)
    .join("");
}

export function encodeJsonResponses(
  responses: JsonRpcResponse[]
): JsonRpcResponse | JsonRpcResponse[] {
  return responses.length === 1 ? responses[0]! : responses;
}
