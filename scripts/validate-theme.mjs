import { readFileSync } from "node:fs";

const css = readFileSync("public/css/_custom.min.css", "utf8");
const requiredRules = [
  "--study-header-bg:",
  "--study-header-ink:",
  "--study-header-muted:",
  "--study-header-active:",
  "--study-header-border:",
  "--study-header-control:",
  "--study-heading-ink:",
  "--study-heading-deck:",
  ".terminal-header>nav a",
  ".terminal-page-hero h1",
  ".study-hero .study-title",
  "body[theme=dark] .terminal-header",
];

for (const rule of requiredRules) {
  if (!css.includes(rule)) throw new Error(`Theme contract is missing: ${rule}`);
}

const lightBlock = css.match(/:root\{([^}]*)\}/)?.[1] ?? "";
const darkBlock = css.match(/body\[theme=dark\]\{([^}]*)\}/)?.[1] ?? "";

function token(block, name) {
  const value = block.match(new RegExp(`${name}:(#[0-9a-f]{6})`, "i"))?.[1];
  if (!value) throw new Error(`Theme token is missing or is not a hex color: ${name}`);
  return value;
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const pairs = [
  ["light header brand", token(lightBlock, "--study-header-ink"), token(lightBlock, "--study-header-bg"), 7],
  ["light header navigation", token(lightBlock, "--study-header-muted"), token(lightBlock, "--study-header-bg"), 4.5],
  ["light header active", token(lightBlock, "--study-header-active"), token(lightBlock, "--study-header-bg"), 4.5],
  ["dark header brand", token(darkBlock, "--study-header-ink"), token(darkBlock, "--study-header-bg"), 7],
  ["dark header navigation", token(darkBlock, "--study-header-muted"), token(darkBlock, "--study-header-bg"), 7],
  ["dark header active", token(darkBlock, "--study-header-active"), token(darkBlock, "--study-header-bg"), 4.5],
  ["dark page heading", token(darkBlock, "--study-heading-ink"), token(darkBlock, "--study-canvas"), 7],
  ["dark page deck", token(darkBlock, "--study-heading-deck"), token(darkBlock, "--study-canvas"), 7],
];

for (const [label, foreground, background, minimum] of pairs) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) {
    throw new Error(
      `${label} contrast is ${ratio.toFixed(2)}:1; expected at least ${minimum}:1`,
    );
  }
  console.log(`${label}: ${ratio.toFixed(2)}:1`);
}

console.log("Theme contract passed.");
