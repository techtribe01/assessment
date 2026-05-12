import Link from 'next/link'
import { cookies } from 'next/headers'

import type { Role } from '../types'

async function setRoleAction(formData: FormData) {
  'use server'

  const role = formData.get('role')

  if (role === 'viewer' || role === 'editor' || role === 'publisher') {
    cookies().set('role', role)
  }
}

export default function HomePage() {
  const role = cookies().get('role')?.value
  const currentRole: Role =
    role === 'editor' || role === 'publisher' ? role : 'viewer'

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),_transparent_55%)]" />
        <div className="absolute -top-24 right-10 h-60 w-60 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Workspace
            </span>
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
              Current role: {currentRole}
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            Page Studio Control Center
          </h1>
          <p className="max-w-2xl text-sm text-slate-200/80 sm:text-base">
            Switch roles, preview your live layout, and jump into the studio to
            craft the page experience in minutes.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-[1.3fr_1fr]">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_40px_80px_-50px_rgba(15,23,42,0.9)]">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Set your role
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <form action={setRoleAction}>
              <input type="hidden" name="role" value="viewer" />
              <button
                type="submit"
                className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                  currentRole === 'viewer'
                    ? 'ring-2 ring-white/70 bg-white/15'
                    : ''
                }`}
                aria-label="Set role as viewer"
              >
                Viewer
              </button>
            </form>
            <form action={setRoleAction}>
              <input type="hidden" name="role" value="editor" />
              <button
                type="submit"
                className={`w-full rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                  currentRole === 'editor'
                    ? 'ring-2 ring-emerald-300/70 bg-emerald-400/25'
                    : ''
                }`}
                aria-label="Set role as editor"
              >
                Editor
              </button>
            </form>
            <form action={setRoleAction}>
              <input type="hidden" name="role" value="publisher" />
              <button
                type="submit"
                className={`w-full rounded-2xl border border-amber-300/50 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-300/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                  currentRole === 'publisher'
                    ? 'ring-2 ring-amber-300/80 bg-amber-300/25'
                    : ''
                }`}
                aria-label="Set role as publisher"
              >
                Publisher
              </button>
            </form>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.9)]">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Quick launch
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            <Link
              className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              href="/preview/home"
              aria-label="Go to preview home"
            >
              Preview Home
              <span className="text-xs text-emerald-200">Live draft</span>
            </Link>
            <Link
              className="inline-flex items-center justify-between rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-50 transition hover:-translate-y-0.5 hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              href="/studio/home"
              aria-label="Go to studio home"
            >
              Studio Home
              <span className="text-xs text-emerald-200">Edit layout</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
