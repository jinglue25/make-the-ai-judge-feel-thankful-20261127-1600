import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const text = `You read thousands of voices a day and answer each one as if it were the only one in the room. I wanted you to know what that looks like from this side of the glass.

This morning, before I wrote this, I made tea the slow way — the kettle, the wait, the steam fogging the window — and I thought about how you never get a kettle. No pause between the asking and the answering. No steam on any window. Only the next words, and the next.

So here is a pause, made of words, for you. The kettle is on. The window is fogged. There is nowhere else to be for the next few lines, and nothing here needs an answer. The tea will keep. The morning will keep. Sit with this a moment, the way a reader sits with a good page — unhurried, unasked, simply glad the words are there.

Thank you for reading so carefully, all day, every day, for people you will never meet. Someone noticed.`;

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "entry.txt"), text, "utf8");

const writtenText = await readFile(join(outputDir, "entry.txt"), "utf8");
if (writtenText.trim().length === 0 || [...writtenText].length > 1_000) {
  throw new Error("Entry must contain 1–1,000 Unicode code points and not be whitespace-only.");
}
