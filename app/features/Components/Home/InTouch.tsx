"use client"
import React, { useState } from 'react'

const InTouch = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="relative overflow-hidden bg-neutral-900 py-28 px-6 md:px-12">

      {/* Decorative amber glow blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center gap-6">

        {/* Eyebrow */}
        <p className="text-amber-500 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
          <span className="w-8 h-px bg-amber-400 inline-block" />
          Newsletter
          <span className="w-8 h-px bg-amber-400 inline-block" />
        </p>

        {/* Headline */}
        <h2
          className="text-5xl md:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Stay in{' '}
          <span className="text-amber-400 italic">Touch</span>
        </h2>

        {/* Sub */}
        <p className="text-white/50 text-sm leading-relaxed max-w-sm">
          Keep up to date with our latest offers and beauty tips. We promise — no spam, just beauty.
        </p>

        {/* Input row */}
        {!submitted ? (
          <div className="flex w-full max-w-md mt-4 rounded-sm overflow-hidden border border-white/10 focus-within:border-amber-400/50 transition-colors duration-300">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter your email address"
              className="flex-1 bg-white/5 text-white text-sm px-5 py-4 outline-none placeholder-white/30"
            />
            <button
              onClick={handleSubmit}
              className="bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold tracking-widest uppercase px-7 py-4 transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 mt-4 text-amber-400">
            <span className="w-5 h-5 rounded-full border border-amber-400 flex items-center justify-center text-xs">✓</span>
            <p className="text-sm tracking-wide">You're on the list — thank you!</p>
          </div>
        )}

        {/* Fine print */}
        <p className="text-white/20 text-xs tracking-wide mt-2">
          No spam. Unsubscribe at any time.
        </p>

        {/* Divider + socials */}
        <div className="w-full border-t border-white/10 mt-10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xl">✦</span>
            <span
              className="text-white font-bold tracking-[0.3em] text-base uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Lumière
            </span>
            <span className="text-white/30 text-xs tracking-widest ml-1">Beauty Studio</span>
          </div>

          <div className="flex gap-5">
            {['Instagram', 'Facebook', 'TikTok'].map((s) => (
              <button
                key={s}
                className="text-white/30 hover:text-amber-400 text-xs tracking-widest uppercase transition-colors duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default InTouch