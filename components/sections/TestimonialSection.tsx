'use client'

import React from 'react'

export interface TestimonialSectionProps {
  quote?: string
  author?: string
  role?: string
  company?: string
}

export default function TestimonialSection({ quote, author, role, company }: TestimonialSectionProps) {
  const displayQuote = quote ?? 'Great product!'
  const displayAuthor = author ?? 'Anonymous'

  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-20 px-6 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-400"
      tabIndex={0}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.2),_transparent_60%)]" />
        <div className="absolute -bottom-24 right-16 h-52 w-52 rounded-full bg-amber-400/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 h-12 w-12 rounded-full border border-white/20 bg-white/5 text-4xl leading-[3rem] text-emerald-300" aria-hidden="true">
          &ldquo;
        </div>
        <blockquote cite="#" className="mb-8">
          <p className="text-xl font-medium italic text-slate-100 sm:text-2xl leading-relaxed">
            {displayQuote}
          </p>
        </blockquote>
        <div className="flex flex-col items-center">
          <h4 className="font-display text-lg font-semibold text-white">
            {displayAuthor}
          </h4>
          {(role || company) && (
            <span className="mt-1 text-sm text-slate-300">
              {role}{role && company ? ' at ' : ''}{company}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
