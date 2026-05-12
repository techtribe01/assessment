'use client'

import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  label: string
  url: string
}

export default function CTASection({ label, url }: CTASectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(15,23,42,0.04)_0%,_rgba(45,212,191,0.12)_40%,_rgba(251,191,36,0.12)_100%)]" />
        <div className="absolute -top-24 right-10 h-40 w-40 rounded-full border border-slate-200/70 bg-white/70 shadow-lg" />
      </div>
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
          Ready to build something bold?
        </h2>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Launch your next landing page in minutes with a layout that feels handcrafted.
        </p>
        <a
          href={url}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          aria-label={label}
        >
          <span>{label}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
