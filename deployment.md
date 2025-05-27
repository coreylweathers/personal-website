# Deployment Guide

This guide covers different ways to deploy your Hugo site, from local builds to automated GitHub Pages deployment.

## Local/Manual Deployment

To build the site for production:

```bash
hugo --minify --environment production
```

This will generate the site in the `public` directory using production configuration, which can be deployed to any static hosting service.

## GitHub Pages Deployment

This site can be automatically deployed to GitHub Pages using GitHub Actions. Here's how to set it up:

### 1. Repository Setup

**If deploying to `<username>.github.io`:**
- Create a repository named `<username>.github.io`
- Push your Hugo site code to the `main` branch

**If deploying to a project repository:**
- Use any repository name
- Enable GitHub Pages in repository Settings → Pages
- Set source to "GitHub Actions"

### 2. Configure Secrets

In your GitHub repository, go to **Settings → Secrets and variables → Actions** and add:

- `CONTACT_FORM_ID`: Your Un-static Forms ID (e.g., `abc123def456ghi789jkl012mno345pqr678stu901`)
- `GOOGLE_ANALYTICS_ID`: Your Google Analytics Measurement ID (e.g., `G-ABC123DEF4`)

### 3. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Hugo site to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.120.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Create production config
        run: |
          mkdir -p config/production
          cat > config/production/params.toml << EOF
          contact_form_id = "${{ secrets.CONTACT_FORM_ID }}"
          
          [analytics]
            [analytics.google]
              id = "${{ secrets.GOOGLE_ANALYTICS_ID }}"
              respectDoNotTrack = false
          EOF
      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

### 4. How It Works

1. **Trigger**: The workflow runs on every push to `main` branch
2. **Build**: Hugo builds the site using the production environment
3. **Configuration**: The workflow creates `config/production/params.toml` with your form ID and Google Analytics ID from GitHub Secrets
4. **Deploy**: The built site is deployed to GitHub Pages

### 5. Important Notes

- ✅ **Sensitive data stays secure**: Your form ID and Google Analytics ID are stored as GitHub Secrets, not in your code
- ✅ **Automatic deployment**: Every push to `main` triggers a new deployment
- ✅ **Production configuration**: The workflow automatically uses production settings
- ✅ **No manual config files needed**: The production config is created during the build process
- ✅ **Analytics tracking**: Google Analytics is automatically enabled in production builds

**Security:** Never commit your actual `config/production/params.toml` file to Git. The GitHub Actions workflow will create it automatically using your stored secrets.

## Other Hosting Providers

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `hugo --environment production`
3. Set publish directory: `public`
4. Add environment variables:
   - `CONTACT_FORM_ID` with your form ID value
   - `GOOGLE_ANALYTICS_ID` with your Google Analytics Measurement ID

### Vercel

1. Import your GitHub repository to Vercel
2. Set framework preset to "Hugo"
3. Set build command: `hugo --environment production`
4. Set output directory: `public`
5. Add environment variables:
   - `CONTACT_FORM_ID` with your form ID value
   - `GOOGLE_ANALYTICS_ID` with your Google Analytics Measurement ID

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `hugo --environment production`
3. Set build output directory: `public`
4. Add environment variables:
   - `CONTACT_FORM_ID` with your form ID value
   - `GOOGLE_ANALYTICS_ID` with your Google Analytics Measurement ID

## Manual Deployment via FTP/SFTP

1. Build the site locally: `hugo --environment production`
2. Create your production config file with the actual form ID and Google Analytics ID
3. Upload the contents of the `public/` directory to your web server
4. Remember to exclude the `config/` directory from uploads

## Security Best Practices

- ✅ Never commit sensitive configuration files to Git
- ✅ Use environment variables or secrets for sensitive data
- ✅ Keep the `config/` directory in `.gitignore`
- ✅ Use different form IDs for development and production if needed
- ✅ Regularly rotate API keys, form IDs, and analytics IDs
- ✅ Review deployment logs for any exposed sensitive information
- ✅ Keep Google Analytics IDs secure (though they're less sensitive than API keys)

## Troubleshooting

### Contact Form Not Working

1. **Check configuration**: Ensure your production config has the correct `contact_form_id`
2. **Verify environment**: Make sure you're building with `--environment production`
3. **Check secrets**: Verify GitHub Secrets are properly configured
4. **Inspect HTML**: Check the rendered form action URL in your browser's developer tools

### Build Failures

1. **Hugo version**: Ensure the Hugo version in your workflow matches your local version
2. **Theme submodules**: Make sure theme submodules are properly checked out
3. **Dependencies**: Check if any Node.js or other dependencies are missing
4. **Configuration syntax**: Verify your TOML configuration files are valid

### Deployment Issues

1. **Permissions**: Ensure GitHub Actions has proper permissions for Pages deployment
2. **Branch protection**: Check if branch protection rules are blocking the deployment
3. **Repository settings**: Verify GitHub Pages is enabled and configured correctly
4. **Custom domains**: If using a custom domain, ensure DNS is properly configured 