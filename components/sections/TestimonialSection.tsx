'use client'

import React from 'react'

export interface TestimonialSectionProps {
  quote: string
  author: string
  role?: string
}

export default function TestimonialSection({ quote, author, role }: TestimonialSectionProps) {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-center" tabIndex={0}>
      <blockquote cite="#" className="mb-6">
        <p className="text-2xl md:text-3xl font-medium italic text-gray-900">
          &quot;{quote}&quot;
        </p>
      </blockquote>
      <div className="flex flex-col items-center">
        <h4 className="font-bold text-lg text-gray-900">{author}</h4>
        {role && <span className="text-gray-500 mt-1">{role}</span>}
      </div>
    </section>
  )
}
