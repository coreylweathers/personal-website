# Corey L Weathers site transformation

## Audit summary

- **Stack:** Hugo static site using the vendored LoveIt theme, project-owned layout overrides, SCSS assets, and Markdown content.
- **Strengths:** warm editorial palette, large type, portrait and article art, subtle route details, company marks, and a long-form Markdown archive.
- **Problems:** old “Syntax & Stories” identity in configuration; incomplete navigation; Speak and Live combined; Work With Me routed through Contact; duplicated homepage features; hard-coded current content; prominent sparse taxonomies; stale article promises.
- **Decision:** retain Hugo and historical URLs. Move repeatable content into `data/site.yaml`; use semantic project-owned layouts and one editorial design system.

## Plan

1. Preserve this reference manifest and the original work in Git history.
2. Centralize identity, navigation, experience, Now, services, and footer content.
3. Replace shared layout, navigation, tokens, components, and responsive rules.
4. Rebuild Home, About, Contact, Read, Build, Speak, Live, Now, and Work With Me.
5. Add editorial updates to foundational articles.
6. Update metadata, structured data, RSS discovery, focus states, reduced motion, and mobile navigation.
7. Build and validate internal routes.

