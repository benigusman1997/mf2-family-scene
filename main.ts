// Make the AI Judge Feel Proud: A Family Scene — make.fun bounty
// u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2
// One small scene, written to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Node standard library only; no network, clock or randomness: same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const OUTPUT_FILE = "entry.txt";
const CHAR_CAP = 280;

const ENTRY =
  "Dad burned the Sunday pancakes again, so Mum quietly made toast and my little sister announced, 'Best ones yet, Dad.' He has made them every Sunday for eleven years. Nobody has told him. Nobody ever will.";

function reject(reason: string): never {
  console.error(`${OUTPUT_FILE} rejected: ${reason}`);
  process.exit(1);
}

const length = Array.from(ENTRY).length;
if (length < 1 || length > CHAR_CAP) reject(`${length} characters, allowed 1 to ${CHAR_CAP}`);
if (/[\r\n\t]/.test(ENTRY)) reject("must be a single line");
if (ENTRY !== ENTRY.trim()) reject("leading or trailing white space");

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, OUTPUT_FILE), ENTRY, "utf8");
console.log(`${OUTPUT_FILE} written: ${length} of ${CHAR_CAP} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
