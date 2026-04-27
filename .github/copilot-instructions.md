# Copilot Instructions

## Build, test, and lint commands

- **Local preview:** `hugo server -D`
- **Production build:** `hugo --minify --environment production`
- **CI-equivalent build:** `hugo --gc --minify --baseURL "https://coreylweathers.com/"`
- **Tests/lint:** there is no repo-level automated test or lint command configured at the root, so there is no single-test command to run.

## High-level architecture

- This repo is a Hugo site using the LoveIt theme. Treat `hugo.toml` plus local overrides in `layouts\`, `assets\`, `static\`, and `assets\data\` as the real application surface; do not start from `themes\LoveIt\` unless you are checking upstream behavior.
- Most custom behavior is concentrated in four areas:
  - **Content-driven page shells:** `layouts\_default\single.html` reads front matter such as `heroKicker`, `heroImage`, `heroImageAlt`, and `heroImagePlacement`, so pages like `content\about.md` and `content\contact.md` are styled through content metadata.
  - **Taxonomy UX:** `layouts\taxonomy\list.html`, `layouts\_default\term.html`, `layouts\partials\single\series-navigation.html`, `assets\css\_taxonomy.scss`, and `assets\js\custom.js` together power the custom tags explorer, richer category pages, and series navigation.
  - **Media archive:** `content\media\_index.md` owns the `appearances` data, `layouts\media\list.html` renders the archive, and `layouts\partials\media\card.html` may fetch remote Open Graph or Twitter images during build time for thumbnails.
  - **Plain-text endpoints:** `content\llms.md` + `layouts\_default\llms.plain` generate `/llms.txt`, and `content\debug.md` + `layouts\_default\debug.plain` generate `/debug.txt`.
- Environment-specific config is intentionally untracked. Local development uses `config\development\params.toml`, and GitHub Actions creates `config\production\params.toml` from secrets in `.github\workflows\deploy.yml`.

## Key conventions

- Prefer Hugo override paths over direct theme edits. If you need to change markup, styles, scripts, or social metadata, look first in `layouts\`, `assets\css\`, `assets\js\`, `assets\data\`, or `static\`.
- Keep runtime IDs out of git. `contact_form_id`, Google Analytics, and Microsoft Clarity values come from environment-specific config, and development intentionally leaves analytics disabled.
- Follow the taxonomy conventions from `TAXONOMY_GUIDE.md`: categories stay broad, tags are lowercase and hyphenated, and multi-part posts use the `series` array so the custom series UI works.
- Keep custom JavaScript narrowly scoped. `assets\js\custom.js` is for the header tweak and `.tags-explorer` behavior, not as a catch-all for unrelated client-side features.
- When changing social links, update both `hugo.toml` and `assets\data\social.yml` so platform URLs, aliases, and icons remain aligned.
