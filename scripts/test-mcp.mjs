/**
 * Smoke-test the Cubix Streamable HTTP MCP handler against a running server.
 *
 * Usage:
 *   node scripts/test-mcp.mjs
 *   node scripts/test-mcp.mjs http://localhost:3000/api/mcp
 */

const endpoint = process.argv[2] ?? "http://localhost:3000/api/mcp";

async function post(body, headers = {}) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, contentType: res.headers.get("content-type"), text };
}

function parsePayload({ contentType, text }) {
  if (contentType?.includes("text/event-stream")) {
    const dataLine = text
      .split("\n")
      .find((line) => line.startsWith("data: "));
    if (!dataLine) throw new Error(`No SSE data frame:\n${text.slice(0, 500)}`);
    return JSON.parse(dataLine.slice(6));
  }
  return JSON.parse(text);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const init = parsePayload(
  await post({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-03-26",
      capabilities: {},
      clientInfo: { name: "cubix-test-mcp", version: "1.0.0" },
    },
  })
);

assert(init.result?.serverInfo?.name === "cubix", "initialize serverInfo.name");
assert(
  init.result?.capabilities?.tools !== undefined,
  "initialize tools capability"
);
assert(typeof init.result?.instructions === "string", "initialize instructions");

const notified = await post({
  jsonrpc: "2.0",
  method: "notifications/initialized",
});
assert(notified.status === 202, `initialized notification expected 202, got ${notified.status}`);

const tools = parsePayload(
  await post({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list",
    params: {},
  })
);
const names = (tools.result?.tools ?? []).map((t) => t.name);
for (const required of [
  "list_components",
  "search_components",
  "get_component",
  "get_component_demo",
  "get_install_command",
]) {
  assert(names.includes(required), `missing tool ${required}`);
}

const search = parsePayload(
  await post({
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "search_components",
      arguments: { query: "button", limit: 5 },
    },
  })
);
const searchText = search.result?.content?.[0]?.text ?? "";
assert(searchText.includes("button"), "search_components should mention button");
assert(search.result?.isError !== true, "search_components should not error");

const install = parsePayload(
  await post({
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: {
      name: "get_install_command",
      arguments: { name: "button dialog", base: "radix" },
    },
  })
);
const installText = install.result?.content?.[0]?.text ?? "";
assert(
  installText.includes("add button dialog --base radix"),
  "get_install_command should include base flag"
);

const get = parsePayload(
  await post({
    jsonrpc: "2.0",
    id: 5,
    method: "tools/call",
    params: {
      name: "get_component",
      arguments: { name: "button", base: "base" },
    },
  })
);
const getText = get.result?.content?.[0]?.text ?? "";
assert(getText.includes('"install"'), "get_component should include install");
assert(!getText.includes('"content":'), "get_component should omit source by default");

const demo = parsePayload(
  await post({
    jsonrpc: "2.0",
    id: 6,
    method: "tools/call",
    params: {
      name: "get_component_demo",
      arguments: { name: "button" },
    },
  })
);
const demoText = demo.result?.content?.[0]?.text ?? "";
assert(
  demoText.includes("@/components/cubix/button"),
  "get_component_demo should rewrite imports"
);

const getRes = await fetch(endpoint, { method: "GET" });
assert(getRes.status === 405, `GET should be 405, got ${getRes.status}`);

console.log(`OK  MCP smoke passed against ${endpoint}`);
