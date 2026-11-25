import { mkdirSync, writeFileSync } from "node:fs";

// The entry: one funny line (two short sentences), exactly as written.
const LINE =
  "I bought noise-cancelling headphones. Now I can hear my own bad decisions in HD.";

// Validation guard: the gate requires UTF-8 text of 1-200 characters,
// not only whitespace, as one single line with no leading/trailing space.
// Note: this entry is two short sentences, so the guard below only asks
// for at least one sentence terminator, not exactly one.
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
// At least one sentence terminator, and the line must end with one.
const terminators = (LINE.match(/[.!?]/g) ?? []).length;
if (terminators < 1 || !/[.!?]$/.test(LINE)) {
  throw new Error("entry must end with a sentence terminator");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to ${outDir}/entry.txt`);
