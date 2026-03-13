"use client"
import React, { useState, useEffect, useRef } from 'react'
import Reward from './Reward'
import HomeAbout from './HomeAbout'
import Searvices from '../../features/Services/components/Searvices'
import WhyChooseUs from './WhyChooseUs'
import Detail from '../../features/Reviews/Components/Detail'
import InTouch from './InTouch'
import Navbar from './Navbar'

const LandingPage = () => {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Small delay so fonts are ready before animating in
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full font-sans antialiased overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        id="home"
        className="relative w-full min-h-screen flex items-end bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/landing.png')" }}
      >
        {/* Overlay — simple, not over-engineered */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/10" />

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-20 pb-20 md:pb-28">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-5"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              <span className="w-8 h-px bg-amber-400" />
              <span className="text-amber-400 text-xs tracking-[0.35em] uppercase">
                Jumuia Beauty Studio
              </span>
            </div>

            {/* Headline — feels handwritten, not corporate */}
            <h1
              className="text-white font-bold leading-[1.08] mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
              }}
            >
              Where your natural<br />
              <span className="text-amber-400 italic">beauty blooms.</span>
            </h1>

            {/* Description — conversational, warm */}
            <p
              className="text-white/65 text-sm md:text-base leading-relaxed max-w-lg mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
              }}
            >
              We believe every person deserves to feel beautiful. Come in, relax, and let
              our team take care of the rest — skin, hair, nails and everything in between.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 mb-14"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s',
              }}
            >
              <button className="bg-amber-400 hover:bg-amber-300 text-black text-xs tracking-widest uppercase font-semibold px-8 py-3.5 rounded-sm transition-colors duration-300">
                See Our Services
              </button>
              <button className="border border-white/30 hover:border-amber-400 hover:text-amber-400 text-white text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors duration-300">
                Book Appointment
              </button>
            </div>

            {/* Rewards — understated divider */}
            <div
              className="border-t border-white/10 pt-7"
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.7s ease 0.7s',
              }}
            >
              <Reward />
            </div>
          </div>
        </div>

        {/* Scroll cue — minimal */}
        <div
          className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2"
          style={{
            opacity: loaded ? 0.4 : 0,
            transition: 'opacity 1s ease 1.2s',
          }}
        >
          <span className="text-white text-[9px] tracking-[0.3em] uppercase rotate-90 mb-1">Scroll</span>
          <div className="w-px h-12 bg-white/30 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full h-5 bg-amber-400 rounded-full" style={{ animation: 'drip 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <div className="bg-[#faf8f5]">
        <div id="about" className="scroll-mt-20"><HomeAbout /></div>
        <div id="services" className="scroll-mt-20"><Searvices /></div>
        <div id="offers" className="scroll-mt-20"><WhyChooseUs /></div>
        <div id="reviews" className="scroll-mt-20"><Detail /></div>
        <div id="contact" className="scroll-mt-20 bg-neutral-900"><InTouch /></div>
      </div>

      <style jsx>{`
        @keyframes drip {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(300%);  opacity: 1; }
          100% { transform: translateY(300%);  opacity: 0; }
        }
        .scroll-mt-20 { scroll-margin-top: 5rem; }
      `}</style>
    </div>
  )
}

export default LandingPage