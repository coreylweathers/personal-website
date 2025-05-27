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

### Configuration Setup

This site uses environment-specific configuration files for sensitive data like form IDs. You'll need to create configuration files for both development and production environments.

#### Development Configuration

Copy the example configuration and add your actual values:

```bash
# Copy the example file
cp config/development/params.toml.example config/development/params.toml

# Edit the file and add your actual form ID
# config/development/params.toml
contact_form_id = "your_actual_form_id_here"

# Analytics is disabled in development (empty ID)
[analytics]
  [analytics.google]
    id = ""  # Empty to disable tracking in development
    respectDoNotTrack = true
```

#### Production Configuration

For production deployments, create:

```bash
# config/production/params.toml
contact_form_id = "your_production_form_id_here"

# Google Analytics configuration for production
[analytics]
  [analytics.google]
    id = "G-XXXXXXXXXX"  # Replace with your actual Google Analytics Measurement ID
    respectDoNotTrack = false
```

**Security Note:** The `config/` directory is ignored by Git to keep sensitive configuration out of version control. The `.example` files show what configuration is needed without exposing actual values.

#### Getting Your Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website (if you haven't already)
3. Navigate to Admin → Property → Data Streams
4. Select your web data stream
5. Copy your **Measurement ID** (looks like `G-ABC123DEF4`)
6. Replace `G-XXXXXXXXXX` in your production config with this ID

### Local Development

Run the Hugo development server:

```bash
hugo server -D
```

This will start a local development server at http://localhost:1313/ with hot-reloading enabled. The development environment will automatically use your `config/development/params.toml` settings.

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
├── config/            # Environment-specific configuration (ignored by Git)
│   ├── development/   # Development environment config
│   │   ├── params.toml.example  # Example development config
│   │   └── params.toml          # Actual development config (not in Git)
│   └── production/    # Production environment config
│       └── params.toml          # Production config (not in Git)
├── content/           # Site content (Markdown files)
│   ├── posts/         # Blog posts
│   ├── about/         # About page
│   ├── media/         # Media page
│   └── contact/       # Contact page
├── data/              # Configuration data files
├── layouts/           # Custom layout templates (overrides theme)
│   └── shortcodes/    # Custom shortcodes
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

### Environment-Specific Configuration

Environment-specific settings (like API keys, form IDs, analytics IDs) are stored in:
- `config/development/params.toml` - for local development (analytics disabled)
- `config/production/params.toml` - for production builds (with Google Analytics)

### Theme Customization

To override theme templates or styles:

1. Create a file with the same path in your project's `layouts` or `assets` directory
2. Modify your copy of the file
3. Hugo will use your version instead of the theme's version

## Deployment

For detailed deployment instructions including GitHub Pages, Netlify, Vercel, and other hosting providers, see the [Deployment Guide](deployment.md).

Quick local build:
```bash
hugo --minify --environment production
```

## Git Workflow

This project uses a standard Git workflow. The following directories/files are ignored in Git:
- `public/` - Generated files that should not be committed
- `config/` - Environment-specific configuration with sensitive data
- `.env*` - Environment variable files

## License

This blog is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/).

This means:
- You must give appropriate credit if you share the content
- You may not use the material for commercial purposes
- You may not distribute modified versions of the content
- See the [LICENSE](LICENSE) file for details