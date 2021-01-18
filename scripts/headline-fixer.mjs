import { promises as fs } from "fs";

const [, , ...files] = process.argv;

Promise.all(
  files.map(async (s) => {
    const rst = await fs.readFile(s, "utf-8");
    const lines = rst.split("\n");
    lines.forEach((line, n) => {
      const m = /^[#\*=-]+$/.exec(line);
      if (m) {
        lines[n] = m[0][0].repeat(lines[n - 1].length);
      }
    });
    const updated = lines.join("\n");
    if (updated.localeCompare(rst) !== 0) {
      console.error(`Rewritten ${s}`);
      await fs.writeFile(s, updated, "utf-8");
    }
  })
);