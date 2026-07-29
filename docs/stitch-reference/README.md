# Pre-transformation reference

The repository state immediately before the July 2026 transformation is preserved by immutable Git commit `0c4776297f7fee29b7cf56e368a6f758aa78dd1d`.

Key source objects can be recovered exactly with `git show <object-id>`:

| Original source | Git object |
| --- | --- |
| `layouts/home.html` | `5342da2ed23361e2d358c24506ce689f78af3d5a` |
| `layouts/about.html` | `66036643afc127b2a2020c2e30c448a459a03d1f` |
| `layouts/contact.html` | `aa25fb954c3a4a7a22a651d1c5405850e494789d` |
| `assets/css/_custom.scss` | `adb7c54378496d09ac0a77c137f3619c7096975f` |

This records the exact pre-change templates rather than relying on mutable working-tree copies. Existing portrait, article, and company-mark image assets were retained in place as the visual reference set.

The redesign carries forward the warm paper-and-ink palette, editorial typography, generous spacing, portrait photography, company marks, and restrained transit-like dots and rules. The LoveIt theme remains vendored for compatibility, while the visitor-facing experience is project-owned.
