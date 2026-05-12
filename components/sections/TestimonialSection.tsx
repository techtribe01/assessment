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
    <section className="bg-gray-900 py-16 px-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" tabIndex={0}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl text-gray-500 font-serif leading-none mb-4" aria-hidden="true">&ldquo;</div>
        <blockquote cite="#" className="mb-8">
          <p className="text-xl md:text-2xl font-medium italic text-white leading-relaxed">
            {displayQuote}
          </p>
        </blockquote>
        <div className="flex flex-col items-center">
          <h4 className="font-bold text-lg text-white">{displayAuthor}</h4>
          {(role || company) && (
            <span className="text-sm text-gray-400 mt-1">
              {role}{role && company ? ' at ' : ''}{company}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
