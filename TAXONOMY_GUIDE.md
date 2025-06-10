# Taxonomy Usage Guide

## Overview
Your Hugo site now has three taxonomies configured:
- **Categories**: Broad topic groupings
- **Tags**: Specific keywords and topics  
- **Series**: Multi-part content organization

## How to Use Taxonomies in Your Posts

### Front Matter Example
```yaml
---
title: "Your Post Title"
date: 2025-06-09
categories: ["DevRel", "Technology"]
tags: ["developer-advocacy", "community", "speaking"]
series: ["DevRel Insights"]
---
```

## Suggested Categories for Your Site

### DevRel
- Developer relations content
- Community building
- Developer advocacy strategies

### Technology  
- Technical tutorials
- Programming insights
- Tool reviews and guides

### Personal
- Life stories and reflections
- Personal journey posts
- Behind-the-scenes content

### Career
- Professional development
- Industry insights
- Workplace experiences

### Parenting
- Parenting in tech stories
- Work-life balance
- Family and career integration

## Suggested Tags

### Technical Tags
- `dotnet`, `csharp`, `asp.net-core`, `blazor`
- `debugging`, `performance`, `testing`
- `web-development`, `api-design`

### DevRel Tags
- `developer-advocacy`, `community-building`, `developer-experience`
- `technical-writing`, `speaking`, `content-creation`
- `developer-tools`, `documentation`

### Personal/Career Tags
- `work-life-balance`, `lessons-learned`, `reflections`
- `career-growth`, `leadership`, `mentoring`
- `parenting-in-tech`, `remote-work`

### Content Type Tags
- `tutorial`, `case-study`, `opinion`, `guide`
- `announcement`, `retrospective`, `tips`

## Series Examples

### DevRel-Focused Series
- "Building Better Developer Experiences"
- "DevRel Strategy Deep Dives"
- "Community Building Essentials"

### Technical Series
- "ASP.NET Core Mastery"
- "Debugging Like a Pro"
- "Modern C# Patterns"

### Personal Series
- "Parenting in Tech"
- "Career Transitions"
- "Lessons from the Field"

## Auto-Generated Pages

Your taxonomies automatically create these pages:

### Taxonomy List Pages
- `/categories/` - Lists all categories
- `/tags/` - Lists all tags  
- `/series/` - Lists all series

### Term Pages
- `/categories/devrel/` - All posts in DevRel category
- `/tags/csharp/` - All posts tagged with C#
- `/series/building-better-developer-experiences/` - All posts in the series

## Navigation

The taxonomies are now included in your main navigation:
- **Categories** button in the main menu
- **Tags** button in the main menu
- **Series** accessible via `/series/` URL

## Series Navigation

Posts that are part of a series will automatically show:
- A series navigation box at the bottom of the post
- Links to other posts in the same series
- Current post highlighted in the series list

## Best Practices

### Categories
- Use 1-3 categories per post
- Keep categories broad and consistent
- Think of categories as your main content buckets

### Tags
- Use 3-7 tags per post
- Be specific with tags
- Use consistent tag naming (lowercase, hyphenated)

### Series
- Plan multi-part content in advance
- Use descriptive series names
- Aim for 2-5 posts per series

## RSS Feeds

Each taxonomy automatically generates RSS feeds:
- `/categories/devrel/index.xml`
- `/tags/csharp/index.xml`
- `/series/building-better-developer-experiences/index.xml`
