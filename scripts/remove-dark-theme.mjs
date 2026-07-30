import { readFileSync, writeFileSync } from "node:fs";

const stylesheetPath = process.argv[2] ?? "public/css/style.min.css";
const darkThemeSelector =
  /\[\s*theme\s*=\s*(?:"dark"|'dark'|dark)\s*(?:[is])?\s*\]/i;

let removedSelectorCount = 0;

function findBoundary(css, start) {
  let parentheses = 0;
  let brackets = 0;
  let quote = "";

  for (let index = start; index < css.length; index += 1) {
    const character = css[index];
    const next = css[index + 1];

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
      const commentEnd = css.indexOf("*/", index + 2);
      if (commentEnd === -1) throw new Error("Unclosed CSS comment");
      index = commentEnd + 1;
      continue;
    }

    if (character === "(") parentheses += 1;
    else if (character === ")") parentheses -= 1;
    else if (character === "[") brackets += 1;
    else if (character === "]") brackets -= 1;
    else if (parentheses === 0 && brackets === 0 && (character === "{" || character === ";")) {
      return { character, index };
    }
  }

  return null;
}

function findClosingBrace(css, openingBrace) {
  let depth = 1;
  let quote = "";

  for (let index = openingBrace + 1; index < css.length; index += 1) {
    const character = css[index];
    const next = css[index + 1];

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
      const commentEnd = css.indexOf("*/", index + 2);
      if (commentEnd === -1) throw new Error("Unclosed CSS comment");
      index = commentEnd + 1;
      continue;
    }

    if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  throw new Error("Unclosed CSS block");
}

function splitSelectors(selectorList) {
  const selectors = [];
  let start = 0;
  let parentheses = 0;
  let brackets = 0;
  let quote = "";

  for (let index = 0; index < selectorList.length; index += 1) {
    const character = selectorList[index];

    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = "";
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === "(") parentheses += 1;
    else if (character === ")") parentheses -= 1;
    else if (character === "[") brackets += 1;
    else if (character === "]") brackets -= 1;
    else if (character === "," && parentheses === 0 && brackets === 0) {
      selectors.push(selectorList.slice(start, index));
      start = index + 1;
    }
  }

  selectors.push(selectorList.slice(start));
  return selectors;
}

function removeDarkSelectors(css) {
  let output = "";
  let cursor = 0;

  while (cursor < css.length) {
    const boundary = findBoundary(css, cursor);
    if (!boundary) {
      output += css.slice(cursor);
      break;
    }

    const prelude = css.slice(cursor, boundary.index);
    if (boundary.character === ";") {
      output += `${prelude};`;
      cursor = boundary.index + 1;
      continue;
    }

    const closingBrace = findClosingBrace(css, boundary.index);
    const body = css.slice(boundary.index + 1, closingBrace);

    if (prelude.trimStart().startsWith("@")) {
      output += `${prelude}{${removeDarkSelectors(body)}}`;
    } else {
      const selectors = splitSelectors(prelude);
      const lightSelectors = selectors.filter((selector) => {
        const isDark = darkThemeSelector.test(selector);
        if (isDark) removedSelectorCount += 1;
        return !isDark;
      });

      if (lightSelectors.length > 0) {
        output += `${lightSelectors.join(",")}{${body}}`;
      }
    }

    cursor = closingBrace + 1;
  }

  return output;
}

const source = readFileSync(stylesheetPath, "utf8");
const lightOnlyCss = removeDarkSelectors(source);

if (darkThemeSelector.test(lightOnlyCss)) {
  throw new Error(`Dark theme selectors remain in ${stylesheetPath}`);
}

writeFileSync(stylesheetPath, lightOnlyCss);
console.log(`Removed ${removedSelectorCount} dark-theme selector branches.`);
