#!/usr/bin/env node
// PreToolUse guard for the Resend MCP tools.
// Reads the tool call as JSON on stdin. Exit 0 allows it. Exit 2 blocks it,
// and the message printed to stderr is shown to Claude.

const SEND_TOOLS = new Set(["send-email", "send-batch-emails"]);
const ALWAYS_BLOCKED = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

function block(reason) {
  process.stderr.write(`Blocked by send-guard: ${reason}\n`);
  process.exit(2);
}

// "Name <a@b.com>" -> "a@b.com", lower-cased.
function bareAddress(value) {
  const text = String(value).trim();
  const match = text.match(/<([^>]+)>/);
  return (match ? match[1] : text).trim().toLowerCase();
}

function addressesOf(field) {
  if (field === undefined || field === null || field === "") return [];
  return (Array.isArray(field) ? field : [field]).map(bareAddress);
}

function collectRecipients(input) {
  return ["to", "cc", "bcc"].flatMap((key) => addressesOf(input?.[key]));
}

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  block("could not read the tool call, so it was not allowed.");
}

// The tool name looks like mcp__resend__send-email.
const tool = String(call?.tool_name ?? "").replace(/^mcp__resend__/, "");
const input = call?.tool_input ?? {};

if (ALWAYS_BLOCKED.has(tool)) {
  block(`${tool} can reach whole lists of people, so it is never allowed in this studio.`);
}

if (SEND_TOOLS.has(tool)) {
  const myEmail = (process.env.MY_EMAIL ?? "").trim().toLowerCase();

  // send-batch-emails takes a list of emails (either the input itself or input.emails).
  const messages =
    tool === "send-batch-emails"
      ? Array.isArray(input) ? input : Array.isArray(input.emails) ? input.emails : [input]
      : [input];

  const recipients = messages.flatMap(collectRecipients);
  if (recipients.length === 0) {
    block(`${tool} has no recipients I can check, so it was not allowed.`);
  }

  for (const address of recipients) {
    const ok = address.endsWith("@resend.dev") || (myEmail !== "" && address === myEmail);
    if (!ok) {
      block(
        `${address} is not allowed. Only addresses ending in @resend.dev and the studio owner's own email (MY_EMAIL) can receive email.`
      );
    }
  }
}

process.exit(0);
