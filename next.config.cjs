import { quote } from "shell-quote";
import { ESLint } from "eslint";

const eslint = new ESLint();

module.exports = {
  "**/*.{ts,tsx,css}": (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => escape([filename]))
      .join(" ");
    return [
      `prettier --ignore-path --write ${escapedFileNames}`,
      `next lint --no-ignore --fix ${filenames
        .filter((file) => !eslint.isPathIgnored(file))
        .map((f) => `"${f}"`)
        .join(" ")}`,
    ];
  },
  "**/*.ts?(x)": () => {
    return [`tsc -p tsconfig.json --noEmit`];
  },
};

function escape(str) {
  const escaped = quote(str);
  return escaped.replace(/\\@/g, "@");
}
