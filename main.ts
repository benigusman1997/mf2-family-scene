// Make the AI Judge Feel Proud: A Family Scene — make.fun bounty
// u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2.
//
// Writes one short family scene to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Standard library only: no network, no clock, no randomness, so every run
// writes the same bytes. No trailing newline is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const MAX_CHARS = 280;

const ENTRY =
  "Dad burned the Sunday pancakes again, so Mum quietly made toast and my little " +
  "sister announced, 'Best ones yet, Dad.' He has made them every Sunday for " +
  "eleven years. Nobody has told him. Nobody ever will.";

function fail(message: string): never {
  console.error("entry.txt rejected: " + message);
  process.exit(1);
}

// The gate: UTF-8 text of 1 to MAX_CHARS characters, not only white space.
const chars = Array.from(ENTRY).length;
if (chars < 1 || chars > MAX_CHARS) fail(`${chars} characters, limit is 1 to ${MAX_CHARS}`);
if (ENTRY.trim().length === 0) fail("only white space");
// The scene is one line here: no line break, no tab, no stray edge space.
if (/[\r\n\t]/.test(ENTRY)) fail("holds a line break or a tab, the scene must be one line");
if (ENTRY !== ENTRY.trim()) fail("starts or ends with white space");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "entry.txt"), ENTRY, "utf8");
console.log(`entry.txt written: ${chars} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
