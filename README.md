# My Hugo Blog

A personal blog site built with [Hugo](https://gohugo.io/) and the [LoveIt theme](https://hugoloveit.com/).

## Project Overview

This project is a personal blog/website created with Hugo, a fast and modern static site generator. It uses the LoveIt theme which provides a clean, responsive design with many built-in features.

## Features

- Responsive design
- Light/dark mode
- Search functionality
- Blog posts with categories and tags
- About, Media, and Contact pages
- Easy content management with Markdown

## Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/) (v0.68.0 or later)
- [Git](https://git-scm.com/downloads)

## Getting Started

### Clone the repository

```bash
git clone <your-repo-url>
cd new-blog
```

### Install the theme

The LoveIt theme is included as a Git submodule. If it's not already present, you can add it with:

```bash
git submodule add https://github.com/dillonzq/LoveIt.git themes/LoveIt
```

### Local Development

Run the Hugo development server:

```bash
hugo server -D
```

This will start a local development server at http://localhost:1313/ with hot-reloading enabled.

## Creating Content

### New Blog Post

```bash
hugo new posts/my-new-post.md
```

### New Page

```bash
hugo new page/my-new-page.md
```

## Project Structure

```
.
├── archetypes/        # Content templates
├── assets/            # CSS, JS, and other assets
├── content/           # Site content (Markdown files)
│   ├── posts/         # Blog posts
│   ├── about/         # About page
│   ├── media/         # Media page
│   └── contact/       # Contact page
├── data/              # Configuration data files
├── layouts/           # Custom layout templates (overrides theme)
├── static/            # Static files (images, etc.)
├── themes/            # Theme submodules
│   └── LoveIt/        # LoveIt theme
├── hugo.toml          # Hugo configuration
└── README.md          # This file
```

## Customization

### Site Configuration

The main configuration file is `hugo.toml`. This is where you can:

- Change the site title, description, and other metadata
- Configure menus
- Set theme parameters
- Configure search functionality
- And much more

### Theme Customization

To override theme templates or styles:

1. Create a file with the same path in your project's `layouts` or `assets` directory
2. Modify your copy of the file
3. Hugo will use your version instead of the theme's version

## Deployment

To build the site for production:

```bash
hugo --minify
```

This will generate the site in the `public` directory, which can be deployed to any static hosting service.

## Git Workflow

This project uses a standard Git workflow. The `public` directory is ignored in Git as it contains generated files that should not be committed.

## License

[MIT License](LICENSE)