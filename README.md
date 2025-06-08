# Corey's Syntax & Stories

[![Deploy Hugo site to GitHub Pages](https://github.com/coreylweathers/personal-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/coreylweathers/personal-website/actions/workflows/deploy.yml)

A personal blog site built with [Hugo](https://gohugo.io/) and the [LoveIt theme](https://hugoloveit.com/).

## Project Overview

This project is a personal blog/website created with Hugo, a fast and modern static site generator. It uses the LoveIt theme which provides a clean, responsive design with many built-in features. The site is automatically deployed to [coreylweathers.com](https://coreylweathers.com) via GitHub Actions.

## Features

- Responsive design
- Light/dark mode
- Search functionality
- Blog posts with categories and tags
- About, Media, and Contact pages
- Easy content management with Markdown
- Google Analytics integration
- Microsoft Clarity analytics
- Automated deployment with GitHub Actions

## Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/) (v0.147.6 or later)
- [Git](https://git-scm.com/downloads)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/coreylweathers/personal-website.git
cd personal-website
```

### Install the theme

The LoveIt theme is automatically installed during the GitHub Actions build process. For local development, the theme will be cloned automatically if not present, or you can manually add it:

```bash
git clone https://github.com/dillonzq/LoveIt.git themes/LoveIt
```

### Configuration Setup

This site uses environment-specific configuration files for sensitive data like form IDs and analytics. You'll need to create configuration files for both development and production environments.

#### Development Configuration

Copy the example configuration and add your actual values:

```bash
# Copy the example file
cp config/development/params.toml.example config/development/params.toml

# Edit the file and add your actual form ID
# config/development/params.toml
contact_form_id = "your_actual_form_id_here"

# Analytics is disabled in development (empty IDs)
[analytics]
  [analytics.google]
    id = ""  # Empty to disable tracking in development
    respectDoNotTrack = true
  [analytics.clarity]
    id = ""  # Empty to disable tracking in development
```

#### Production Configuration

For production deployments, the configuration is automatically created during the GitHub Actions build process using repository secrets. The production config includes:

```toml
# config/production/params.toml (auto-generated during build)
contact_form_id = "your_production_form_id_here"

# Analytics configuration for production
[analytics]
  [analytics.google]
    id = "G-XXXXXXXXXX"  # Google Analytics Measurement ID
    respectDoNotTrack = false
  [analytics.clarity]
    id = "abc123def4"     # Microsoft Clarity Project ID
```

**Security Note:** The `config/` directory is ignored by Git to keep sensitive configuration out of version control. The `.example` files show what configuration is needed without exposing actual values.

#### Getting Your Analytics IDs

**Google Analytics:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website (if you haven't already)
3. Navigate to Admin → Property → Data Streams
4. Select your web data stream
5. Copy your **Measurement ID** (looks like `G-ABC123DEF4`)

**Microsoft Clarity:**
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Create a new project for your website
3. Copy your **Project ID** from the project settings

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
├── .github/           # GitHub Actions workflows
│   └── workflows/     
│       └── deploy.yml # Automated deployment workflow
├── archetypes/        # Content templates
├── assets/            # CSS, JS, and other assets
├── config/            # Environment-specific configuration (ignored by Git)
│   ├── development/   # Development environment config
│   │   ├── params.toml.example  # Example development config
│   │   └── params.toml          # Actual development config (not in Git)
│   └── production/    # Production environment config (auto-generated)
│       └── params.toml          # Production config (created during build)
├── content/           # Site content (Markdown files)
│   ├── posts/         # Blog posts
│   ├── about/         # About page
│   ├── media/         # Media page
│   └── contact/       # Contact page
├── data/              # Configuration data files
├── layouts/           # Custom layout templates (overrides theme)
│   └── shortcodes/    # Custom shortcodes
├── static/            # Static files (images, etc.)
├── themes/            # Theme directory
│   └── LoveIt/        # LoveIt theme (auto-installed)
├── hugo.toml          # Hugo configuration
├── deployment.md      # Detailed deployment guide
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
- `config/production/params.toml` - for production builds (auto-generated with analytics enabled)

### Theme Customization

To override theme templates or styles:

1. Create a file with the same path in your project's `layouts` or `assets` directory
2. Modify your copy of the file
3. Hugo will use your version instead of the theme's version

## Deployment

This site is automatically deployed to [coreylweathers.com](https://coreylweathers.com) using GitHub Actions. Every push to the `main` branch triggers a new deployment.

For detailed deployment instructions including GitHub Pages, Netlify, Vercel, and other hosting providers, see the [Deployment Guide](deployment.md).

### GitHub Secrets Configuration

For automated deployment, the following secrets must be configured in your GitHub repository (Settings → Secrets and variables → Actions):

- `CONTACT_FORM_ID`: Your form service ID
- `GOOGLE_ANALYTICS_ID`: Your Google Analytics Measurement ID (e.g., `G-ABC123DEF4`)
- `MICROSOFT_CLARITY_ID`: Your Microsoft Clarity Project ID

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