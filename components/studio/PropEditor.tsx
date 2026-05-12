'use client'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { updateSectionProp } from '../../store/slices/draftPageSlice'
import { useAppDispatch, useAppSelector } from '../../store'

export default function PropEditor() {
  const dispatch = useAppDispatch()
  const selectedSectionId = useAppSelector(
    (state) => state.ui.selectedSectionId,
  )
  const sections = useAppSelector(
    (state) => state.draftPage.page?.sections || [],
  )
  const section = sections.find((item) => item.id === selectedSectionId)

  if (!section) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
        Select a section to edit
      </div>
    )
  }

  if (section.type === 'hero') {
    const headline = String(section.props.headline || '')
    const subheading = String(section.props.subheading || '')
    const headlineError = headline.trim() ? '' : 'Headline is required'

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hero-headline">Headline</Label>
          <Input
            id="hero-headline"
            value={headline}
            aria-invalid={Boolean(headlineError)}
            aria-describedby={headlineError ? 'hero-headline-error' : undefined}
            onChange={(event) =>
              dispatch(
                updateSectionProp({
                  sectionId: section.id,
                  key: 'headline',
                  value: event.target.value,
                }),
              )
            }
          />
          {headlineError ? (
            <p
              id="hero-headline-error"
              className="text-xs text-red-600"
              role="alert"
            >
              {headlineError}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-subheading">Subheading</Label>
          <Input
            id="hero-subheading"
            value={subheading}
            onChange={(event) =>
              dispatch(
                updateSectionProp({
                  sectionId: section.id,
                  key: 'subheading',
                  value: event.target.value,
                }),
              )
            }
          />
        </div>
      </div>
    )
  }

  if (section.type === 'cta') {
    const label = String(section.props.label || '')
    const url = String(section.props.url || '')
    const labelError = label.trim() ? '' : 'Label is required'
    const urlError = url.trim() ? '' : 'URL is required'

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cta-label">Label</Label>
          <Input
            id="cta-label"
            value={label}
            aria-invalid={Boolean(labelError)}
            aria-describedby={labelError ? 'cta-label-error' : undefined}
            onChange={(event) =>
              dispatch(
                updateSectionProp({
                  sectionId: section.id,
                  key: 'label',
                  value: event.target.value,
                }),
              )
            }
          />
          {labelError ? (
            <p
              id="cta-label-error"
              className="text-xs text-red-600"
              role="alert"
            >
              {labelError}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cta-url">URL</Label>
          <Input
            id="cta-url"
            value={url}
            aria-invalid={Boolean(urlError)}
            aria-describedby={urlError ? 'cta-url-error' : undefined}
            onChange={(event) =>
              dispatch(
                updateSectionProp({
                  sectionId: section.id,
                  key: 'url',
                  value: event.target.value,
                }),
              )
            }
          />
          {urlError ? (
            <p
              id="cta-url-error"
              className="text-xs text-red-600"
              role="alert"
            >
              {urlError}
            </p>
          ) : null}
        </div>
      </div>
    )
  }

  if (section.type === 'featureGrid') {
    const rawFeatures = Array.isArray(section.props.features)
      ? section.props.features
      : []
    const baseFeatures = rawFeatures.length > 0 ? rawFeatures : [{}, {}, {}]
    const features = baseFeatures.map((item) => {
      const feature = typeof item === 'object' && item !== null ? item : {}
      return {
        title: String((feature as { title?: unknown }).title || ''),
        description: String((feature as { description?: unknown }).description || ''),
        icon: String((feature as { icon?: unknown }).icon || ''),
      }
    })

    return (
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="rounded-lg border border-slate-200 p-4">
            <div className="space-y-2">
              <Label htmlFor={`feature-${index}-title`}>Feature Title</Label>
              <Input
                id={`feature-${index}-title`}
                value={feature.title}
                onChange={(event) => {
                  const next = features.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, title: event.target.value }
                      : item,
                  )
                  dispatch(
                    updateSectionProp({
                      sectionId: section.id,
                      key: 'features',
                      value: next,
                    }),
                  )
                }}
              />
            </div>
            <div className="mt-3 space-y-2">
              <Label htmlFor={`feature-${index}-description`}>
                Description
              </Label>
              <Input
                id={`feature-${index}-description`}
                value={feature.description}
                onChange={(event) => {
                  const next = features.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, description: event.target.value }
                      : item,
                  )
                  dispatch(
                    updateSectionProp({
                      sectionId: section.id,
                      key: 'features',
                      value: next,
                    }),
                  )
                }}
              />
            </div>
            <div className="mt-3 space-y-2">
              <Label htmlFor={`feature-${index}-icon`}>
                Icon (emoji or text)
              </Label>
              <Input
                id={`feature-${index}-icon`}
                value={feature.icon}
                onChange={(event) => {
                  const next = features.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, icon: event.target.value }
                      : item,
                  )
                  dispatch(
                    updateSectionProp({
                      sectionId: section.id,
                      key: 'features',
                      value: next,
                    }),
                  )
                }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (section.type === 'testimonial') {
    const quote = String(section.props.quote || '')
    const author = String(section.props.author || '')
    const role = String(section.props.role || '')
    const company = String(section.props.company || '')

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="testimonial-quote">Quote</Label>
          <Input
            id="testimonial-quote"
            value={quote}
            onChange={(event) =>
              dispatch(
                updateSectionProp({
                  sectionId: section.id,
                  key: 'quote',
                  value: event.target.value,
                }),
              )
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testimonial-author">Author</Label>
          <Input
            id="testimonial-author"
            value={author}
            onChange={(event) =>
              dispatch(
                updateSectionProp({
                  sectionId: section.id,
                  key: 'author',
                  value: event.target.value,
                }),
              )
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testimonial-role">Role</Label>
          <Input
            id="testimonial-role"
            value={role}
            onChange={(event) =>
              dispatch(
                updateSectionProp({
                  sectionId: section.id,
                  key: 'role',
                  value: event.target.value,
                }),
              )
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testimonial-company">Company</Label>
          <Input
            id="testimonial-company"
            value={company}
            onChange={(event) =>
              dispatch(
                updateSectionProp({
                  sectionId: section.id,
                  key: 'company',
                  value: event.target.value,
                }),
              )
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
      Select a section to edit
    </div>
  )
}
