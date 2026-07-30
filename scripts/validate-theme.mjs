import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync("public/css/style.min.css", "utf8");
const tokenCss = readFileSync(
  "assets/css/study-system/_tokens.scss",
  "utf8",
).replace(/\s+/g, "");
const themeSource = [
  "assets/css/_custom.scss",
  "assets/css/study-system/_tokens.scss",
  "assets/css/study-system/_components.scss",
  "assets/css/study-system/_content.scss",
  "assets/css/study-system/_experiences.scss",
].map((path) => readFileSync(path, "utf8")).join("\n");
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
  "--study-size-meta:",
  "--study-size-ui:",
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
  "--study-media-filter:",
  "--study-media-hover-filter:",
  "--study-hero-filter:",
  "--study-header-shadow:",
  ".terminal-header>nav a",
  "font-family:var(--study-font-body)",
  "font-weight:var(--study-weight-body)",
  "text-rendering:optimizeLegibility",
  ".terminal-brand{display:inline-flex;min-height:44px",
  ".terminal-header>nav a{display:flex;min-height:44px",
  ".terminal-menu-toggle{display:flex;width:44px;height:44px",
  ".terminal-header-cta,.terminal-button{display:inline-flex;min-height:44px",
  ".terminal-now-link{display:inline-flex;min-height:44px",
  ".study-chip{display:inline-flex;align-items:center;min-height:44px",
  ".terminal-menu-toggle.is-open span:nth-child(1)",
  ".terminal-page-hero h1",
  ".study-hero .study-title",
  "box-shadow:var(--study-header-shadow)",
  "filter:var(--study-media-filter)",
];

for (const rule of requiredRules) {
  if (!css.includes(rule)) throw new Error(`Theme contract is missing: ${rule}`);
}

const lightBlock = tokenCss.match(/:root\{([^}]*)\}/)?.[1] ?? "";
const forbiddenLegacyRules = [
  ".home-profile",
  ".section-hero",
  ".post-card",
  ".single-title",
  "--background-color",
  "--text-color-secondary",
  'body[theme="dark"]',
  "body[theme=dark]",
  ".study-theme-toggle",
  ".theme-light",
  ".theme-dark",
];

for (const rule of forbiddenLegacyRules) {
  if (themeSource.includes(rule)) {
    throw new Error(`Retired theme selector or token is still compiled: ${rule}`);
  }
}

if (/font(?:-weight)?:[^;}]*\b800\b/.test(css)) {
  throw new Error("Synthetic 800 font weight is compiled but no 800 font is loaded");
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
  "--study-size-meta",
  "--study-size-ui",
];

for (const name of typographyTokens) {
  if (!lightBlock.includes(`${name}:`)) {
    throw new Error(`Typography token is missing from the base theme: ${name}`);
  }
}

const fontHead = readFileSync("layouts/partials/head/link.html", "utf8");
for (const font of ["Geist", "IBM+Plex+Mono", "Newsreader"]) {
  if (!fontHead.includes(font)) throw new Error(`Font is not loaded: ${font}`);
}
if (!fontHead.includes("Geist:wght@400;500;600;700")) {
  throw new Error("Loaded Geist weights do not satisfy the typography contract");
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
  if (!html.includes("/css/style.min.css")) {
    throw new Error(`${label} route does not load the active stylesheet`);
  }
  if (html.includes("/css/_custom.min.css")) {
    throw new Error(`${label} route loads the custom stylesheet twice`);
  }
  const mainCount = (html.match(/<main(?:\s|>)/g) ?? []).length;
  const headingCount = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  if (mainCount !== 1) {
    throw new Error(`${label} route has ${mainCount} main landmarks; expected 1`);
  }
  if (headingCount !== 1) {
    throw new Error(`${label} route has ${headingCount} h1 headings; expected 1`);
  }
}

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

for (const path of htmlFiles("public")) {
  if (path.endsWith("substack.html")) continue;
  const html = readFileSync(path, "utf8");
  const stylesheetCount = (html.match(/\/css\/style\.min\.css/g) ?? []).length;
  if (stylesheetCount !== 1) {
    throw new Error(`${path} loads the site stylesheet ${stylesheetCount} times`);
  }
  if (html.includes("/css/_custom.min.css")) {
    throw new Error(`${path} still loads the duplicate custom stylesheet`);
  }

  if (!/http-equiv=["']refresh["']/i.test(html)) {
    const mainCount = (html.match(/<main(?:\s|>)/g) ?? []).length;
    const headingCount = (html.match(/<h1(?:\s|>)/g) ?? []).length;
    if (mainCount !== 1) {
      throw new Error(`${path} has ${mainCount} main landmarks; expected 1`);
    }
    if (headingCount !== 1) {
      throw new Error(`${path} has ${headingCount} h1 headings; expected 1`);
    }
  }

  for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attributes = match[1];
    const visibleText = match[2].replace(/<[^>]+>/g, "").trim();
    if (!/aria-label=["'][^"']+["']/i.test(attributes) && !visibleText) {
      throw new Error(`${path} contains a button without an accessible name`);
    }
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[1])) {
      throw new Error(`${path} contains an image without alt text`);
    }
  }
}

const home = readFileSync("public/index.html", "utf8");
for (const contract of [
  '<body theme="light"',
  'meta name="color-scheme" content="light"',
  'meta name="theme-color" content="#f7f3eb"',
]) {
  if (!home.includes(contract)) {
    throw new Error(`Theme UI contract is missing: ${contract}`);
  }
}

for (const forbidden of [
  "study-theme-toggle",
  "prefers-color-scheme",
  'theme="dark"',
  'cfg-theme=',
  "data-dark=",
]) {
  if (home.includes(forbidden)) {
    throw new Error(`The generated site still exposes dark mode: ${forbidden}`);
  }
}

const interactionScript = readFileSync("assets/js/custom.js", "utf8");
for (const contract of [
  'toggle.classList.toggle("is-open", open)',
  '"Close primary navigation"',
  '"Open primary navigation"',
]) {
  if (!interactionScript.includes(contract)) {
    throw new Error(`Menu interaction contract is missing: ${contract}`);
  }
}
if (interactionScript.includes("toggle.textContent")) {
  throw new Error("The menu toggle destroys its icon markup after interaction");
}
for (const forbidden of ["localStorage", "themeToggle", "site-theme-change"]) {
  if (interactionScript.includes(forbidden)) {
    throw new Error(`The interaction script still contains theme switching: ${forbidden}`);
  }
}

const siteConfig = readFileSync("hugo.toml", "utf8");
if (!/defaultTheme\s*=\s*"light"/.test(siteConfig)) {
  throw new Error("The site default theme is not fixed to light");
}

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
  ["light body", token(lightBlock, "--study-ink"), token(lightBlock, "--study-canvas"), 7],
  ["light secondary text", token(lightBlock, "--study-ink-soft"), token(lightBlock, "--study-canvas"), 7],
  ["light accent text", token(lightBlock, "--study-copper"), token(lightBlock, "--study-canvas"), 4.5],
  ["light header brand", token(lightBlock, "--study-header-ink"), token(lightBlock, "--study-header-bg"), 7],
  ["light header navigation", token(lightBlock, "--study-header-muted"), token(lightBlock, "--study-header-bg"), 4.5],
  ["light header active", token(lightBlock, "--study-header-active"), token(lightBlock, "--study-header-bg"), 4.5],
  ["inverse text", token(lightBlock, "--study-inverse-ink"), token(lightBlock, "--study-night"), 7],
  ["inverse secondary text", token(lightBlock, "--study-inverse-soft"), token(lightBlock, "--study-night"), 7],
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

console.log("Light-only theme contract passed.");
