import type { ComponentType } from 'react'

import CTASection from '../components/sections/CTASection'
import FeatureGridSection from '../components/sections/FeatureGridSection'
import HeroSection from '../components/sections/HeroSection'
import TestimonialSection from '../components/sections/TestimonialSection'
import UnsupportedSection from '../components/sections/UnsupportedSection'
import type { SectionType } from '../types'

type SectionRegistry = Record<SectionType, ComponentType<any>>

export const sectionRegistry: SectionRegistry = {
  hero: HeroSection,
  featureGrid: FeatureGridSection,
  testimonial: TestimonialSection,
  cta: CTASection,
}

export function getSection(type: string): ComponentType<any> {
  return type in sectionRegistry
    ? sectionRegistry[type as SectionType]
    : UnsupportedSection
}
