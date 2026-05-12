'use client'

import React from 'react'

export interface Feature {
  title: string
  description: string
  icon?: string
}

export interface FeatureGridSectionProps {
  features?: Feature[]
}

const placeholderFeatures: Feature[] = [
  { title: 'Fast Performance', description: 'Experience lightning-fast load times and smooth interactions.', icon: '⚡' },
  { title: 'Secure by Default', description: 'Enterprise-grade security built into every layer of our platform.', icon: '🔒' },
  { title: '24/7 Support', description: 'Our dedicated team is ready to help you anytime, anywhere.', icon: '💬' },
]

export default function FeatureGridSection({ features }: FeatureGridSectionProps) {
  const displayFeatures = features && features.length > 0 ? features : placeholderFeatures

  return (
    <section className="py-16 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition-shadow"
              tabIndex={0}
            >
              <div className="text-4xl mb-4" aria-hidden="true">{feature.icon || '✨'}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
