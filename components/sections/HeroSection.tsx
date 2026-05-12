'use client'

import Image from 'next/image'

interface HeroSectionProps {
  headline: string
  subheading?: string
  imageUrl?: string
}

export default function HeroSection({
  headline,
  subheading,
  imageUrl,
}: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-20 text-center text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.12),_transparent_55%)]" />
      </div>
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6">
        <div className="h-1 w-16 rounded-full bg-teal-300/80" />
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl animate-rise">
          {headline}
        </h1>
        {subheading ? (
          <p className="max-w-2xl text-base text-slate-200/90 sm:text-lg animate-rise-delay-1">
            {subheading}
          </p>
        ) : null}
        {imageUrl ? (
          <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-2xl animate-rise-delay-2">
            <Image
              src={imageUrl}
              alt=""
              width={1200}
              height={720}
              className="h-auto w-full"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
