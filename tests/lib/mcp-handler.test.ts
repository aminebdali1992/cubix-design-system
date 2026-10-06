// @vitest-environment node
import { describe, expect, it } from "vitest"

import { handleMcpBody } from "@/lib/mcp/handler"
import {
  JSON_RPC_METHOD_NOT_FOUND,
  JSON_RPC_PARSE_ERROR,
  MCP_SERVER_NAME,
} from "@/lib/mcp/types"

const request = (id: number, method: string, params?: unknown) =>
  JSON.stringify({ jsonrpc: "2.0", id, method, ...(params === undefined ? {} : { params }) })

describe("handleMcpBody", () => {
  it("answers initialize with the server identity", async () => {
    const result = await handleMcpBody(
      request(1, "initialize", { protocolVersion: "2025-03-26" })
    )

    expect(result.kind).toBe("responses")
    if (result.kind !== "responses") return
    expect(result.responses).toHaveLength(1)
    expect(result.responses[0]).toMatchObject({
      jsonrpc: "2.0",
      id: 1,
      result: { protocolVersion: "2025-03-26", serverInfo: { name: MCP_SERVER_NAME } },
    })
  })

  it("accepts a notification without a response", async () => {
    const result = await handleMcpBody(
      JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" })
    )

    expect(result).toEqual({ kind: "accepted" })
  })

  it("ignores client responses and answers only the requests in a batch", async () => {
    const result = await handleMcpBody(
      JSON.stringify([
        { jsonrpc: "2.0", id: 7, result: {} },
        { jsonrpc: "2.0", method: "notifications/initialized" },
        { jsonrpc: "2.0", id: 2, method: "ping" },
      ])
    )

    expect(result).toEqual({
      kind: "responses",
      responses: [{ jsonrpc: "2.0", id: 2, result: {} }],
    })
  })

  it("accepts a batch made only of client responses", async () => {
    const result = await handleMcpBody(JSON.stringify([{ jsonrpc: "2.0", id: 7, result: {} }]))

    expect(result).toEqual({ kind: "accepted" })
  })

  it("reports unknown methods as JSON-RPC errors", async () => {
    const result = await handleMcpBody(request(3, "does/not-exist"))

    expect(result.kind).toBe("responses")
    if (result.kind !== "responses") return
    expect(result.responses[0]).toMatchObject({
      id: 3,
      error: { code: JSON_RPC_METHOD_NOT_FOUND },
    })
  })

  it("reports malformed JSON as a parse error", async () => {
    const result = await handleMcpBody("{ not json")

    expect(result.kind).toBe("parse-error")
    if (result.kind !== "parse-error") return
    expect(result.response).toMatchObject({ error: { code: JSON_RPC_PARSE_ERROR } })
  })
})
