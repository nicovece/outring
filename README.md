# Outring - Voices from the Periphery

A Craft CMS project amplifying resident voices from G124 urban regeneration projects.

## Project Purpose

Portfolio project for Village One job application, demonstrating:

- Advanced Craft CMS content modeling
- Matrix fields for flexible editorial content
- Structured relationships between content types
- Modern frontend with Vite + Tailwind 4
- Accessibility-first approach

**Deadline:** December 15, 2025

## Local Development

### Prerequisites

- DDEV installed
- Docker running

### Setup

```bash
# Start DDEV
ddev start

# Install dependencies
ddev composer install
ddev npm install

# Start Vite dev server
ddev npm run dev
```

### URLs

- **Site:** https://outring.ddev.site
- **Admin:** https://outring.ddev.site/admin
- **Vite HMR:** https://outring.ddev.site:3000

## Tech Stack

- **CMS:** Craft CMS 5.8.21
- **PHP:** 8.3
- **Database:** MySQL 8.0
- **Node:** 20
- **Build Tool:** Vite 6.3.5
- **CSS:** Tailwind CSS 4.1.7
- **TypeScript:** Yes

## Content Structure

### Sections

1. **Experiences** (Channel) - Resident stories from regeneration projects
2. **Themes** (Structure) - Urban regeneration themes (hierarchical)
3. **Places** (Structure) - Neighborhoods and locations (hierarchical)

### Key Features

- **Matrix Fields:** Flexible content blocks (Rich Text, Pull Quote, Image Block, Callout, Before/After)
- **Relationships:** Experiences linked to Places and Themes
- **Accessibility:** Required alt text, semantic HTML
- **Structured Content:** Editorial platform for complex storytelling

## Commands

```bash
# Frontend development
ddev npm run dev          # Start dev server with HMR
ddev npm run build        # Production build

# Craft CLI
ddev craft                # List all commands
ddev craft up             # Run migrations
ddev craft project-config/apply

# Database
ddev mysql                # MySQL CLI
```
