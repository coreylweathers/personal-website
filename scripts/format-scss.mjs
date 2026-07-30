import { readFileSync, writeFileSync } from "node:fs";

const sourcePath = process.argv[2];
if (!sourcePath) {
  throw new Error("Usage: node scripts/format-scss.mjs <stylesheet>");
}

const source = readFileSync(sourcePath, "utf8");
let output = "";
let indentation = 0;
let parentheses = 0;
let brackets = 0;
let pendingSpace = false;
let lineStart = true;

function append(text) {
  if (lineStart && text !== "\n") {
    output += "  ".repeat(indentation);
    lineStart = false;
  }
  output += text;
}

function trimLineEnd() {
  output = output.replace(/[ \t]+$/u, "");
}

function newline() {
  trimLineEnd();
  if (!output.endsWith("\n")) output += "\n";
  lineStart = true;
  pendingSpace = false;
}

function flushSpace(nextCharacter) {
  if (
    pendingSpace &&
    !lineStart &&
    !output.endsWith(" ") &&
    !"{(:,;".includes(nextCharacter)
  ) {
    output += " ";
  }
  pendingSpace = false;
}

function nextBoundary(start) {
  let localParentheses = 0;
  let localBrackets = 0;
  let quote = "";

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = "";
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === "/" && next === "*") {
      const end = source.indexOf("*/", index + 2);
      return end === -1 ? null : nextBoundary(end + 2);
    }

    if (character === "(") localParentheses += 1;
    else if (character === ")") localParentheses -= 1;
    else if (character === "[") localBrackets += 1;
    else if (character === "]") localBrackets -= 1;
    else if (
      localParentheses === 0 &&
      localBrackets === 0 &&
      ["{", ";", "}"].includes(character)
    ) {
      return character;
    }
  }

  return null;
}

for (let index = 0; index < source.length; index += 1) {
  const character = source[index];
  const next = source[index + 1];

  if (character === "/" && next === "*") {
    flushSpace(character);
    const end = source.indexOf("*/", index + 2);
    if (end === -1) throw new Error("Unclosed block comment");
    append(source.slice(index, end + 2));
    index = end + 1;
    newline();
    continue;
  }

  if (character === "/" && next === "/") {
    flushSpace(character);
    const end = source.indexOf("\n", index + 2);
    append(source.slice(index, end === -1 ? source.length : end));
    index = end === -1 ? source.length : end;
    newline();
    continue;
  }

  if (character === '"' || character === "'") {
    flushSpace(character);
    const quote = character;
    let end = index + 1;
    for (; end < source.length; end += 1) {
      if (source[end] === "\\") end += 1;
      else if (source[end] === quote) break;
    }
    if (end >= source.length) throw new Error("Unclosed string");
    append(source.slice(index, end + 1));
    index = end;
    continue;
  }

  if (/\s/u.test(character)) {
    pendingSpace = true;
    continue;
  }

  if (character === "(") parentheses += 1;
  else if (character === ")") parentheses -= 1;
  else if (character === "[") brackets += 1;
  else if (character === "]") brackets -= 1;

  if (parentheses === 0 && brackets === 0 && character === "{") {
    trimLineEnd();
    if (!output.endsWith(" ")) output += " ";
    append("{");
    indentation += 1;
    newline();
    continue;
  }

  if (parentheses === 0 && brackets === 0 && character === "}") {
    if (!lineStart) newline();
    indentation = Math.max(0, indentation - 1);
    append("}");
    newline();
    continue;
  }

  if (parentheses === 0 && brackets === 0 && character === ";") {
    append(";");
    newline();
    continue;
  }

  if (
    parentheses === 0 &&
    brackets === 0 &&
    character === "," &&
    nextBoundary(index + 1) === "{"
  ) {
    append(",");
    newline();
    continue;
  }

  flushSpace(character);
  append(character);
}

newline();
writeFileSync(sourcePath, output);
