'use client'

import React from 'react'

export interface Feature {
  title: string
  description: string
}

export interface FeatureGridSectionProps {
  features?: Feature[]
}

const placeholderFeatures: Feature[] = [
  { title: 'Feature 1', description: 'Description for first amazing feature.' },
  { title: 'Feature 2', description: 'Description for second amazing feature.' },
  { title: 'Feature 3', description: 'Description for third amazing feature.' },
]

export default function FeatureGridSection({ features }: FeatureGridSectionProps) {
  const displayFeatures = features && features.length > 0 ? features : placeholderFeatures

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
            tabIndex={0}
          >
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
