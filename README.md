## Architecture Overview
Page Studio uses a layered architecture that keeps CMS concerns isolated and UI logic predictable.

Data flow diagram:

Contentful
  -> contentfulClient adapter
  -> Next.js server components (preview)
  ## Architecture Overview
  Page Studio is a Next.js app that loads page definitions from Contentful, lets editors update section props in a lightweight studio, previews the result, and publishes immutable, versioned snapshots.

  Core flow:
  Contentful -> contentfulClient adapter -> server-rendered preview -> Redux draft state -> UI sections

  Tech used:
  - Next.js (App Router) + TypeScript
  - Redux Toolkit (draft + publish flow state)
  - Contentful (Delivery + Preview APIs)
  - Tailwind CSS + shadcn/ui
  - Playwright + axe for e2e and accessibility
  - GitHub Actions for CI
  - Vercel for deployment

  Role-based access (cookie + server enforcement):
  - viewer: preview only
  - editor: studio access and draft editing
  - publisher: publish releases

  Enforcement points:
  - Middleware redirects non-editors away from /studio
  - Publish endpoint rejects non-publisher requests

  ## Redux Slice Responsibilities
  | Slice | State Shape | Actions |
  | --- | --- | --- |
  | draftPage | { page: Page | null; isDirty: boolean } | setPage, updateSectionProp, addSection, removeSection, reorderSections, markClean |
  | ui | { selectedSectionId: string | null; isPanelOpen: boolean; isLoading: boolean } | selectSection, togglePanel, setLoading |
  | publish | { status: 'idle'|'publishing'|'success'|'error'; currentVersion: string; changelog: string; errorMessage: string } | setStatus, setVersion, setChangelog, setErrorMessage |

  ## Contentful Model + Adapter Explanation
  Contentful uses two content types:
  - page: the top-level page object (slug, title, section references)
  - section: section entries with a type and props blob

  The adapter in [lib/contentfulClient.ts](lib/contentfulClient.ts) encapsulates all Contentful SDK usage and maps entries into the internal types below. Preview pages read from Contentful directly; studio editing uses Redux drafts.

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

  ## Publish + SemVer Logic
  Publish uses deterministic diff rules to determine a version bump:
  - Major: section removed or type changed
  - Minor: section added
  - Patch: prop/text changes only

  Publishing writes immutable snapshots to releases/<slug>/<version>.json and updates latest.json. Publishing is idempotent when no changes are detected.

  ## Accessibility Evidence
  - Focus-visible outlines for keyboard users
  - Skip-to-content link on preview pages
  - Logical heading hierarchy in sections
  - Reduced motion support in globals
  - Playwright + axe run produces a11y-report.json

  ## What Is Incomplete and Why
  - Publish on Vercel: filesystem writes are not persistent; needs KV/Blob/DB storage
  - Production auth: role is cookie-based for demo; replace with a real auth provider
| CONTENTFUL_SPACE_ID | Contentful space identifier |
| CONTENTFUL_ACCESS_TOKEN | Contentful delivery API token |
| CONTENTFUL_PREVIEW_TOKEN | Contentful preview API token |
| NEXTAUTH_SECRET | Secret used by NextAuth (required for production auth) |
