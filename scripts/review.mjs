// Automatic email review. Usage: node scripts/review.mjs <campaign folder>
// Runs Claude Code headless, saves the result to review/findings.json,
// prints a one-line summary and exits 1 if any finding is high severity.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign folder>");
  process.exit(2);
}

const schemaText = JSON.stringify(
  JSON.parse(readFileSync(join(root, "review", "findings.schema.json"), "utf8"))
);
const outFile = join(root, "review", "findings.json");

let prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

// If the last review was of the same folder, tell Claude so it does not repeat itself.
if (existsSync(outFile)) {
  try {
    const earlier = JSON.parse(readFileSync(outFile, "utf8"));
    if (earlier.folder === folder && Array.isArray(earlier.findings)) {
      prompt +=
        `\n\nLast review findings:\n${JSON.stringify(earlier.findings, null, 2)}\n\n` +
        "These are findings from the last review. Report only problems that are new or still not fixed. Don't repeat ones that have been fixed.";
    }
  } catch {
    // Unreadable earlier file: review from scratch.
  }
}

const run = spawnSync(
  "claude",
  ["-p", prompt, "--output-format", "json", "--json-schema", schemaText, "--allowedTools", "Read,Glob,Grep"],
  { cwd: root, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
);
let parsed;
try {
  parsed = JSON.parse(run.stdout);
} catch {
  console.error(run.stderr || run.error || "claude gave no readable output");
  process.exit(2);
}
if (run.status !== 0 || parsed?.is_error) {
  console.error(`claude failed: ${parsed?.result ?? run.stderr ?? "unknown error"}`);
  process.exit(2);
}
if (Array.isArray(parsed)) parsed = parsed[parsed.length - 1];
const findings = parsed?.structured_output?.findings;
if (!Array.isArray(findings)) {
  console.error("No structured_output.findings in Claude's reply.");
  process.exit(2);
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify({ folder, findings }, null, 2) + "\n");

const count = (s) => findings.filter((f) => f.severity === s).length;
const high = count("high");
console.log(`${folder}: ${findings.length} findings (${high} high, ${count("medium")} medium, ${count("low")} low)`);
process.exit(high > 0 ? 1 : 0);
