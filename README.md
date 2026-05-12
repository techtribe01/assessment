## Architecture Overview
Page Studio uses a layered architecture that keeps CMS concerns isolated and UI logic predictable.

Data flow diagram:

Contentful
  -> contentfulClient adapter
  -> Next.js server components (preview)
  ## Project Summary
  Page Studio is a Next.js app that loads page definitions from Contentful, lets editors update section props in a lightweight studio, previews the result, and publishes immutable, versioned snapshots.

  ## Tech Stack
  - Next.js (App Router) + TypeScript
  - Redux Toolkit for studio state (draft + publish flow)
  - Contentful (Delivery + Preview APIs)
  - Tailwind CSS + shadcn/ui
  - Playwright + axe for e2e and accessibility
  - GitHub Actions for CI
  - Vercel for deployment

  ## Role-Based Access (RBAC)
  Roles are stored in a cookie and enforced server-side.

  - viewer: preview only
  - editor: studio access and draft editing
  - publisher: publish releases

  Enforcement points:
  - Middleware redirects non-editors away from /studio
  - Publish endpoint rejects non-publisher requests

  ## What Is Implemented
  - Schema-driven renderer with Zod and a single section registry
  - Contentful adapter isolated in lib/contentfulClient.ts
  - /preview/[slug] renders validated Contentful sections
  - /studio/[slug] edits draft state in Redux
  - Editable props for hero, cta, featureGrid, testimonial
  - Deterministic SemVer diff logic for releases
  - Playwright + axe checks, CI workflow, and a11y report artifact
  - WCAG-oriented focus styles, skip link, and reduced motion support

  ## Contentful Model
  Page and Section entries map to the following internal types:

  Page {
    pageId: string
    slug: string
    title: string
    sections: Section[]
  }

  Section {
    id: string
    type: 'hero' | 'featureGrid' | 'testimonial' | 'cta'
    props: Record<string, unknown>
  }

  ## Running Locally
  1. pnpm install
  2. Create .env.local
  3. Configure Contentful content types (page, section)
  4. pnpm dev

  ## Environment Variables
  | Variable | Description |
  | --- | --- |
  | CONTENTFUL_SPACE_ID | Contentful space identifier |
  | CONTENTFUL_ACCESS_TOKEN | Contentful delivery API token |
  | CONTENTFUL_PREVIEW_TOKEN | Contentful preview API token |
  | NEXTAUTH_SECRET | Secret used by NextAuth (required for production auth) |

  ## Notes
  - Publish uses filesystem snapshots under releases/. This works locally but requires KV/Blob/DB storage on Vercel.
| CONTENTFUL_SPACE_ID | Contentful space identifier |
| CONTENTFUL_ACCESS_TOKEN | Contentful delivery API token |
| CONTENTFUL_PREVIEW_TOKEN | Contentful preview API token |
| NEXTAUTH_SECRET | Secret used by NextAuth (required for production auth) |
