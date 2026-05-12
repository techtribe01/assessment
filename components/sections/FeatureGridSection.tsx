'use client'

import React from 'react'

export interface Feature {
  title: string
  description: string
  icon?: string
}

export interface FeatureGridSectionProps {
  features?: Feature[] | null
}

const placeholderFeatures: Feature[] = [
  { title: 'Fast Performance', description: 'Experience lightning-fast load times and smooth interactions.', icon: '⚡' },
  { title: 'Secure by Default', description: 'Enterprise-grade security built into every layer of our platform.', icon: '🔒' },
  { title: '24/7 Support', description: 'Our dedicated team is ready to help you anytime, anywhere.', icon: '💬' },
]

export default function FeatureGridSection({ features }: FeatureGridSectionProps) {
  const featureList = features ?? placeholderFeatures
  const displayFeatures = featureList.length > 0 ? featureList : placeholderFeatures

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,_rgba(255,255,255,0.9)_0%,_rgba(236,254,255,0.9)_50%,_rgba(245,245,244,0.9)_100%)]" />
        <div className="absolute -top-24 left-10 h-48 w-48 rounded-full bg-teal-200/40 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Feature Grid
          </p>
          <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Features that scale with your story
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {displayFeatures.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.6)] transition-all hover:-translate-y-1 hover:shadow-[0_32px_80px_-45px_rgba(15,23,42,0.6)] focus:outline-none focus:ring-2 focus:ring-emerald-400"
              tabIndex={0}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/5 text-2xl" aria-hidden="true">
                {feature.icon || '✨'}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
