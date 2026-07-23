# Web Documentation UX Planning Guide

## Core Principles

### 1. Information Architecture

**Goal**: Make finding information effortless for developers who know what they need.

#### Hierarchy Structure
```
Home (orientation)
├── Installation (get started immediately)
├── Quick Start (first working example in <5 min)
├── Examples (learn by seeing)
│   ├── Full game demo
│   ├── Animation
│   └── Collision
├── API Reference (comprehensive lookup)
├── Collision (conceptual guide)
├── Collision Runner (movement systems)
├── JSON Formats (data specification)
└── Technical (architecture details)
```

#### Navigation Patterns
- **Sidebar**: Always visible on desktop (w-64), shows complete site structure
- **Section navigation**: Sub-items appear inline when parent section is active
- **Search**: Cmd+K modal for direct page/section lookup
- **Breadcrumbs**: Not needed—sidebar shows location context

### 2. Content Strategy

#### Page Types

**Landing Pages** (Home, Installation)
- Single column of text
- One primary action per section
- No decorative elements

**Conceptual Guides** (Collision, Collision Runner)
- Explain the "why" before the "how"
- Use diagrams only when necessary (ASCII or simple SVG)
- Include DO/DON'T callouts for common mistakes

**Reference Pages** (API Reference, JSON Formats)
- Tabular data for properties/methods
- Minimal prose, maximum signal
- Code examples show usage, not explanation

**Technical Deep Dives** (Technical Docs)
- Architecture decisions with rationale
- Performance characteristics
- Extension points for advanced users

#### Writing Style
- **Active voice**: "Call `load_map()` to load a map"
- **Imperative for instructions**: "Pass the path to your JSON file"
- **Descriptive for concepts**: "The renderer sorts tiles by Y coordinate"
- **No marketing language**: Avoid "powerful", "easy", "intuitive"

### 3. Visual Design Constraints

#### Typography
- **Inter** for body text (400 weight for prose, 500 for emphasis)
- **JetBrains Mono** for code (inline and blocks)
- One font size per hierarchy level:
  - H1: 2.25rem (36px)
  - H2: 1.5rem (24px)
  - H3: 1.25rem (20px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

#### Color Palette
- Background: `zinc-900` (#18181b for code blocks, #18181b for page)
- Sidebar: `zinc-950` (#09090b)
- Text primary: `zinc-100` (#f4f4f5)
- Text secondary: `zinc-400` (#a1a1aa)
- Text muted: `zinc-500` (#71711a)
- Accent: `blue-600` (#2563EB) — links, active states only
- Borders: `zinc-800` (#27272a)

#### Layout Rules
- Fixed sidebar (w-64) on left
- Content area: `max-w-4xl` with padding (p-8 lg:p-12)
- No cards, no grids (except where tabular data requires it)
- Sections separated by vertical spacing (space-y-12)

### 4. Code Block Standards

```tsx
// ✅ CORRECT
<CodeBlock
  code="pip install tilemap-parser"
  language="bash"
/>

// ❌ WRONG — no titles, no filenames
<CodeBlock
  code="..."
  title="Terminal"  // Remove
/>
```

**Requirements:**
- Dark background (#18181b)
- No line numbers
- No copy buttons
- No syntax highlighting beyond basic colorization
- No filename annotations
- Monospace font only

### 5. Interaction Design

#### Acceptable Motion
- Search modal: opacity transition, <200ms
- Link hover: color change only
- Focus states: 2px solid blue-600 outline

#### Prohibited Motion
- No entrance animations
- No scroll-triggered effects
- No floating/pulsing elements
- No page transitions
- No loading skeletons (show content or nothing)

#### Keyboard Navigation
- `Cmd+K`: Open search (global)
- `Tab`: Navigate links/buttons
- `Enter`: Activate focused element
- `Esc`: Close modal

### 6. Accessibility Requirements

#### Semantic HTML
- `<h1>` once per page (page title)
- `<h2>` for major sections
- `<h3>` for subsections
- `<nav>` for sidebar
- `<main>` for content area
- `<a>` for navigation (not `<div>` with onClick)

#### ARIA Labels
- Skip link: "Skip to main content"
- Search button: "Search docs"
- External links: `aria-label` indicates new tab

#### Focus Management
- Visible focus ring (2px solid blue-600)
- Logical tab order (sidebar → content → footer)
- Focus trapped in modal when open

### 7. SEO Implementation

#### Meta Tags (per page)
```html
<title>{Page Title} | tilemap-parser</title>
<meta name="description" content="{Unique description, 150-160 chars}" />
<meta property="og:title" content="{Page Title} | tilemap-parser" />
<meta property="og:description" content="{Same as description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://tilemap-parser.vercel.app/{slug}" />
<link rel="canonical" href="https://tilemap-parser.vercel.app/{slug}" />
```

#### Structured Data
- TechArticle schema on all pages
- BreadcrumbList for nested pages
- Code snippets in software source code format (future enhancement)

#### Sitemap
- Static XML sitemap in `/public`
- Priority assigned by page type:
  - Home: 1.0
  - Quick Start, Examples, API: 0.9
  - Installation, Collision guides: 0.8
  - Technical, JSON formats: 0.6-0.7

### 8. Performance Budget

#### Targets
- First Contentful Paint: <1.5s
- Time to Interactive: <2.5s
- Total bundle size: <200KB (gzipped)
- No external JS dependencies beyond React + router

#### Optimization Strategies
- Static pages (no client-side data fetching)
- Lazy-load non-critical CSS (none currently)
- System fonts as fallback
- SVG icons inline (no icon font)

### 9. Content Maintenance

#### Update Triggers
- New package version → update version number in sidebar
- New API function → add to API Reference
- Breaking change → add migration note to relevant guide
- Bug fix in collision logic → update DO/DON'T examples

#### Version Strategy
- Current: Show latest version only
- Future: Add version selector if multiple versions needed
- Deprecation: Mark old APIs with "Deprecated" badge + migration link

### 10. Common UX Pitfalls to Avoid

#### DON'T
- Add testimonial/social-proof sections
- Create "Why Choose" comparison tables
- Use gradient backgrounds
- Add icon boxes for features
- Include "Get Started" buttons with arrow icons
- Write marketing copy ("Unlock the power of...")
- Add decorative illustrations
- Use purple/cyan/emerald accent mixes
- Create card grids for documentation links
- Add letter-spacing tricks for "style"

#### DO
- Write for developers who want to solve problems
- Put code examples early in guides
- Link to related sections liberally
- Use consistent terminology (from tilemap-parser-docs-guide.md)
- Keep sentences short and direct
- Test with actual pygame developers
- Measure success by task completion, not engagement time

---

## Example Page Template

```tsx
import { CodeBlock } from "../components/CodeBlock";

export function ExamplePage() {
  return (
    <div id="main-content" className="space-y-12">
      <section>
        <h1 className="text-4xl font-semibold text-zinc-100 mb-4">
          Page Title
        </h1>
        <p className="text-lg text-zinc-400 max-w-3xl">
          One-sentence description of what this page covers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          First Concept
        </h2>
        <p className="text-zinc-400 mb-4">
          Explanation text. Keep paragraphs under 4 sentences.
        </p>
        <CodeBlock
          code="example_code()"
          language="python"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Second Concept
        </h2>
        <p className="text-zinc-400 mb-4">More explanation.</p>
        <ul className="space-y-2 text-zinc-400">
          <li>• Bullet point for key takeaway</li>
          <li>• Another bullet point</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
          Next Steps
        </h2>
        <ul className="space-y-2 text-zinc-400">
          <li>
            <a href="/related-page" className="text-blue-600 hover:text-blue-500">
              Related Page
            </a> — Description of why you'd go there
          </li>
        </ul>
      </section>
    </div>
  );
}
```

---

## Checklist Before Publishing

- [ ] All framer-motion imports removed
- [ ] No gradients in use
- [ ] Only blue-600 as accent color
- [ ] Code blocks have no titles/filenames
- [ ] Skip link present and functional
- [ ] Meta tags unique per page
- [ ] Canonical URLs set
- [ ] Keyboard navigation tested
- [ ] Focus states visible
- [ ] External links have proper rel attributes
- [ ] No decorative animations
- [ ] Typography follows hierarchy
- [ ] Content matches tilemap-parser-docs-guide.md
