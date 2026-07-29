import { readFileSync } from "node:fs";

const css = readFileSync("public/css/_custom.min.css", "utf8");
const requiredRules = [
  "--study-font-body:",
  "--study-font-heading:",
  "--study-font-ui:",
  "--study-font-meta:",
  "--study-weight-body:",
  "--study-weight-heading:",
  "--study-weight-display:",
  "--study-weight-ui:",
  "--study-leading-body:",
  "--study-leading-prose:",
  "--study-header-bg:",
  "--study-header-ink:",
  "--study-header-muted:",
  "--study-header-active:",
  "--study-header-border:",
  "--study-header-control:",
  "--study-heading-ink:",
  "--study-heading-deck:",
  "--study-rule-soft:",
  "--study-rule-strong:",
  ".terminal-header>nav a",
  "font-family:var(--study-font-body)",
  "font-weight:var(--study-weight-body)",
  "text-rendering:optimizeLegibility",
  ".terminal-page-hero h1",
  ".study-hero .study-title",
  "body[theme=dark] .terminal-header",
  "body[theme=dark] :is(.terminal-header,.terminal-current,.terminal-gateways>a",
];

for (const rule of requiredRules) {
  if (!css.includes(rule)) throw new Error(`Theme contract is missing: ${rule}`);
}

const lightBlock = css.match(/:root\{([^}]*)\}/)?.[1] ?? "";
const darkBlock = css.match(/body\[theme=dark\]\{([^}]*)\}/)?.[1] ?? "";

const forbiddenLegacyRules = [
  ".home-profile",
  ".section-hero",
  ".post-card",
  ".single-title",
  "--background-color",
  "--text-color-secondary",
];

for (const rule of forbiddenLegacyRules) {
  if (css.includes(rule)) {
    throw new Error(`Retired theme selector or token is still compiled: ${rule}`);
  }
}

const typographyTokens = [
  "--study-font-body",
  "--study-font-heading",
  "--study-font-ui",
  "--study-font-meta",
  "--study-weight-body",
  "--study-weight-heading",
  "--study-weight-display",
  "--study-weight-ui",
  "--study-weight-meta",
  "--study-leading-body",
  "--study-leading-prose",
];

for (const name of typographyTokens) {
  if (!lightBlock.includes(`${name}:`)) {
    throw new Error(`Typography token is missing from the base theme: ${name}`);
  }
  if (darkBlock.includes(`${name}:`)) {
    throw new Error(`Dark mode must not redefine typography: ${name}`);
  }
}

const fontHead = readFileSync("layouts/partials/head/link.html", "utf8");
for (const font of ["Geist", "IBM+Plex+Mono", "Newsreader"]) {
  if (!fontHead.includes(font)) throw new Error(`Font is not loaded: ${font}`);
}

const routeContracts = [
  ["home", "public/index.html", "terminal-home"],
  ["about", "public/about/index.html", "terminal-prose"],
  ["read", "public/read/index.html", "terminal-post-list"],
  ["build", "public/build/index.html", "terminal-page"],
  ["speak", "public/speak/index.html", "terminal-page"],
  ["live", "public/live/index.html", "terminal-prose"],
  ["now", "public/now/index.html", "terminal-card-grid"],
  ["contact", "public/contact/index.html", "terminal-contact-grid"],
  [
    "article",
    "public/posts/2025/05/welcome-to-syntax-and-stories/index.html",
    "study-prose",
  ],
];

for (const [label, path, marker] of routeContracts) {
  const html = readFileSync(path, "utf8");
  if (!html.includes(marker)) {
    throw new Error(`${label} route is missing its typography contract: ${marker}`);
  }
  if (!html.includes("/css/_custom.min.css")) {
    throw new Error(`${label} route does not load the active stylesheet`);
  }
}

function token(block, name) {
  const value = block.match(new RegExp(`${name}:(#[0-9a-f]{6})`, "i"))?.[1];
  if (!value) throw new Error(`Theme token is missing or is not a hex color: ${name}`);
  return value;
}

function alphaToken(block, name) {
  const alpha = block.match(
    new RegExp(`${name}:rgba\\([^,]+,[^,]+,[^,]+,\\s*([.0-9]+)\\)`, "i"),
  )?.[1];
  if (!alpha) throw new Error(`Theme alpha token is missing: ${name}`);
  return Number.parseFloat(alpha);
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

const darkBorders = [
  ["dark soft border", alphaToken(darkBlock, "--study-rule-soft"), 0.2],
  ["dark standard border", alphaToken(darkBlock, "--study-rule"), 0.35],
  ["dark strong border", alphaToken(darkBlock, "--study-rule-strong"), 0.5],
];

for (const [label, alpha, minimum] of darkBorders) {
  if (alpha < minimum) {
    throw new Error(
      `${label} alpha is ${alpha}; expected at least ${minimum}`,
    );
  }
  console.log(`${label}: ${(alpha * 100).toFixed(0)}%`);
}

console.log("Theme contract passed.");
