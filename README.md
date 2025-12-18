# Outring - Voices from the Periphery

An editorial platform amplifying resident voices from G124 urban regeneration projects. Inspired by Renzo Piano's participatory approach, Outring documents how urban interventions are lived by the people in the peripheries.

**Live Site:** https://www.outring.org

## Tech Stack

- **CMS:** Craft CMS 5.8
- **PHP:** 8.3
- **Database:** MySQL 8.0
- **Build Tool:** Vite 6
- **CSS:** Tailwind CSS 4
- **TypeScript:** Yes
- **Animation:** GSAP + ScrollTrigger
- **Hosting:** Fortrabbit (Universal Stack, eu-w1a)

## Content Architecture

### Content Model

- **Experiences** (Channel) - Resident stories with flexible Matrix content
  - Two visual layouts: `Editorial Reportage` (magazine-style) vs `Community Story` (personal/blog-style)
  - Related to Places and Themes for multi-dimensional navigation
- **Themes** (Structure) - Topic taxonomy (hierarchical)
- **Places** (Structure) - Geographic taxonomy (hierarchical)
- **Categories** - `experienceTypes` and `participationPhases` for filtering

### Matrix Field Architecture

5 block types for editorial flexibility:

- `richText` - CKEditor paragraphs with Retcon transformation
- `pullQuote` - Highlighted resident quotes
- `imageBlock` - Images with required alt text and optional caption
- `callout` - Highlighted text boxes
- `beforeAfter` - TypeScript-powered comparison slider

### Query Patterns

- **URL-based filtering**: Native `craft.app.request.getQueryParam()` with `relatedTo()` queries
- **Eager loading**: `.with(['featuredImage', 'place', 'themes'])` on listing pages
- **Nested eager loading**: `['peopleInvolved', { with: ['involvedPersonPhoto'] }]` on homepage

### Template Organization

```
templates/
  _layouts/           # Base page layouts
  _modules/           # Reusable components (nav, filters, page-header)
  _partials/
    _experience-blocks/  # Matrix block renderers
    _retcon/            # Rich text transformation (prose, lead, minimal)
    entry/              # Card components
```

### Frontend Components (TypeScript)

- **FilterDropdown** - Accessible dropdown with keyboard nav, ARIA attributes
- **BeforeAfterSlider** - Touch/mouse/keyboard image comparison
- **ThemeToggle** - Dark mode with localStorage persistence
- **SiteNav** - Mobile navigation
- **ScrollReveal** - GSAP-powered scroll animations (dynamic import for performance)

### Image Strategy

- Parameterized `srcSet` macro with dynamic aspect ratio calculation
- 5 responsive widths: 400, 800, 1200, 1600, 2400px
- Consolidated from reference project's 4 separate macros into 1

### Accessibility

- Skip link in base layout
- 26+ ARIA attributes throughout
- `aria-expanded` toggled by JavaScript on interactive elements
- Screen reader text (`.sr-only`) for icon-only buttons
- Full keyboard navigation for all interactive components

## In Development

Active enhancements being implemented:

- **Search functionality** - Full-text search across experiences
- **RSS feed** - Syndication for content updates
- **Blitz caching** - Full-page caching for production performance
- **Breadcrumbs** - Navigation context for deep pages
- **Multi-select filtering** - Multiple selections within filter categories
- **SEOmatic integration** - Structured data and advanced meta tags

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
