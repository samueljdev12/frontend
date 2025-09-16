'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Landing */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Generate professional meeting agendas in seconds</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">Cut prep time, increase clarity, and keep your team aligned with smart, editable agendas.</p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/generate" className="w-full sm:w-auto inline-block rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800 text-center">Create Free Agenda</Link>
            <Link href="/generate#templates" className="w-full sm:w-auto inline-block rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 text-center">See Templates</Link>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">⚡ Instant Agendas</h3>
            <p className="mt-2 text-sm text-gray-600">Professional structures ready in seconds — tailored to your meeting.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">📝 Edit‑First Flow</h3>
            <p className="mt-2 text-sm text-gray-600">Tweak opening, topics, timing, and wrap‑up before you share.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">📂 Smart Templates</h3>
            <p className="mt-2 text-sm text-gray-600">Standup, 1:1, sprint planning, sales, board updates — and more.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">🔗 Share Anywhere</h3>
            <p className="mt-2 text-sm text-gray-600">Share a unique link or export as PDF. Calendar export coming soon.</p>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-gray-500">How it works</p>
          <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-gray-900">Type → Tweak → Share</h3>
          <div className="mt-6 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
              <h4 className="font-medium text-gray-900 text-base sm:text-lg">Pick a template (or type your title)</h4>
              <p className="mt-2 text-sm text-gray-600">Start with a proven structure or let AI draft one for you.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
              <h4 className="font-medium text-gray-900 text-base sm:text-lg">Customize in seconds</h4>
              <p className="mt-2 text-sm text-gray-600">Edit topics, durations, and notes inline — no friction.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
              <h4 className="font-medium text-gray-900 text-base sm:text-lg">Share instantly</h4>
              <p className="mt-2 text-sm text-gray-600">Send a link or export. Everyone&apos;s aligned before the meeting starts.</p>
            </div>
          </div>
          <div className="pt-6 sm:pt-8">
            <Link href="/generate" className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800">Generate an agenda</Link>
          </div>
        </section>

        {/* Social proof / Trust */}
        <section className="mt-12 sm:mt-16 text-center space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Teams are spending less time prepping — and more time deciding.</h3>
          <p className="text-base sm:text-lg text-gray-600">&quot;Finally, meeting prep takes minutes, not hours.&quot;</p>
          <p className="text-sm text-gray-500">Planned integrations: Google Calendar • Slack • Gmail</p>
        </section>

        {/* Feature deep dive (optional) */}
        <section className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h4 className="font-medium text-gray-900 text-base sm:text-lg">Agenda preview</h4>
            <p className="mt-2 text-sm text-gray-600">Opening, topics with durations, and wrap‑up — clean and organized.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h4 className="font-medium text-gray-900 text-base sm:text-lg">Templates gallery</h4>
            <p className="mt-2 text-sm text-gray-600">Choose common meeting types or save your own favorites.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h4 className="font-medium text-gray-900 text-base sm:text-lg">Sharing options</h4>
            <p className="mt-2 text-sm text-gray-600">Share a link or export to PDF. Calendar export (ICS) coming soon.</p>
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h4 className="font-medium text-gray-900 text-base sm:text-lg">Save prep time ⏳</h4>
            <p className="mt-2 text-sm text-gray-600">From blank page to polished agenda in minutes.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h4 className="font-medium text-gray-900 text-base sm:text-lg">Increase clarity ✅</h4>
            <p className="mt-2 text-sm text-gray-600">Every meeting has a purpose, plan, and timebox.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h4 className="font-medium text-gray-900 text-base sm:text-lg">Standardize rituals 🧩</h4>
            <p className="mt-2 text-sm text-gray-600">Consistent standups, reviews, and 1:1s.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
            <h4 className="font-medium text-gray-900 text-base sm:text-lg">Reduce wasted time 💸</h4>
            <p className="mt-2 text-sm text-gray-600">Focused discussions, documented decisions, clear next steps.</p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 sm:mt-20 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Stop wasting time on messy meetings</h3>
          <p className="text-base sm:text-lg text-gray-600">Create your first agenda in seconds — free.</p>
          <div className="pt-2">
            <Link href="/generate" className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800">Get Started Free</Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-sm text-gray-500 text-center">
          <div>Built with ❤️ to make meetings better.</div>
        </div>
      </footer>
    </div>
  );
}
