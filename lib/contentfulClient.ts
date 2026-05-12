import { createClient } from 'contentful'
import type { EntrySkeletonType } from 'contentful'

import type { Page, Section } from '../types'

type ContentfulEntry<TFields> = {
  sys?: { id?: string }
  fields?: TFields
}

type ContentfulPageFields = {
  pageId?: string
  slug?: string
  title?: string
  sections?: Array<ContentfulEntry<ContentfulSectionFields>>
}

type ContentfulSectionFields = {
  sectionId?: string
  type?: string
  props?: Record<string, unknown>
}

interface ContentfulPageSkeleton extends EntrySkeletonType {
  fields: ContentfulPageFields
  contentTypeId: 'page'
}

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in your environment to use Contentful.`,
    )
  }
  return value
}

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN

const deliveryClient = createClient({
  space: space || '',
  accessToken: accessToken || '',
})

const previewClient = createClient({
  space: space || '',
  accessToken: previewToken || '',
  host: 'preview.contentful.com',
})

export async function getPage(slug: string, preview = false): Promise<Page> {
  const client = preview ? previewClient : deliveryClient

  if (preview) {
    getEnv('CONTENTFUL_SPACE_ID')
    getEnv('CONTENTFUL_PREVIEW_TOKEN')
  } else {
    getEnv('CONTENTFUL_SPACE_ID')
    getEnv('CONTENTFUL_ACCESS_TOKEN')
  }

  const response = await client.getEntries({
    content_type: 'page',
    'fields.slug': slug,
    include: 2,
  } as Record<string, unknown>)

  const entry = response.items?.[0] as ContentfulEntry<ContentfulPageFields> | undefined
  if (!entry) {
    throw new Error(`Page with slug "${slug}" not found.`)
  }

  const sections = (entry.fields?.sections || []).map((sectionRef: any) => {
    const sectionEntry = sectionRef?.fields
      ? sectionRef
      : response.includes?.Entry?.find(
          (e: any) => e.sys.id === sectionRef.sys.id,
        )

    const fields = sectionEntry?.fields || {}
    const rawProps = fields?.props
    const props =
      rawProps && typeof rawProps === 'object' && !Array.isArray(rawProps)
        ? rawProps
        : {}

    return {
      id: fields?.sectionId ?? sectionRef.sys?.id ?? sectionEntry?.sys?.id ?? '',
      type: (fields?.type || 'hero') as Section['type'],
      props,
    }
  })

  return {
    pageId: entry.fields?.pageId || entry.sys?.id || '',
    slug: entry.fields?.slug || '',
    title: entry.fields?.title || '',
    sections,
  }
}

export async function getAllSlugs(): Promise<string[]> {
  getEnv('CONTENTFUL_SPACE_ID')
  getEnv('CONTENTFUL_ACCESS_TOKEN')

  const entries = await deliveryClient.getEntries<ContentfulPageSkeleton>({
    content_type: 'page',
    select: ['fields.slug'],
  } as Record<string, unknown>)

  const slugs: string[] = []
  for (const entry of entries.items) {
    if (entry.fields?.slug) {
      slugs.push(entry.fields.slug as string)
    }
  }
  return slugs
}
