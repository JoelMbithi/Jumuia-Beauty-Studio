'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  { src: '/makeup.jpeg', label: 'Skin Care' },
  { src: '/hair.jpeg',   label: 'Hair Tattoo' },
  { src: '/lips.jpeg',   label: 'Lips Tattoo' },
  { src: '/nail.jpeg',   label: 'Nail Art' },
]

const HomeAbout = () => {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)

  const features = [
    { id: '01', title: 'Pure Elegance', description: 'Experience refined beauty care tailored to enhance your natural glow.' },
    { id: '02', title: 'Timeless Beauty', description: 'Our expert touch ensures you radiate elegance every single day.' },
    { id: '03', title: 'Radiant Glow', description: 'Embrace flawless beauty with our luxurious treatments and services.' },
  ]

  const trust = ['Certified Professionals', 'Premium Products', '100% Satisfaction', 'Hygienic Environment']

  const goTo = (idx: number) => {
    if (idx === current || animating) return
    setAnimating(true)
    setPrev(current)
    setCurrent(idx)
    setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 700)
  }

  // Auto-advance every 3.5s — fully automatic, no manual controls shown
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (current + 1) % images.length
      goTo(next)
    }, 3500)
    return () => clearInterval(interval)
  }, [current, animating])

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 bg-[#faf8f5] overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-100/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Image side — clean, no thumbnails, fully automatic */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-amber-200/60" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ aspectRatio: '6/7' }}>

              {/* Outgoing */}
              {prev !== null && (
                <div className="absolute inset-0 z-10" style={{ animation: 'slideOutLeft 0.7s ease forwards' }}>
                  <Image src={images[prev].src} alt={images[prev].label} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              )}

              {/* Incoming */}
              <div key={current} className="absolute inset-0 z-20" style={{ animation: 'slideInRight 0.7s ease forwards' }}>
                <Image src={images[current].src} alt={images[current].label} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Est. badge */}
              <div className="absolute bottom-6 left-6 z-30 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white text-sm">✦</div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-gray-500">Est. 2026</p>
                  <p className="text-base font-bold text-gray-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Jumuia</p>
                </div>
              </div>

              {/* Service label top-right */}
              <div className="absolute top-4 right-4 z-30 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full">
                <span className="text-white/80 text-[10px] tracking-widest uppercase">{images[current].label}</span>
              </div>

              {/* Thin dot indicators — purely decorative, no click needed */}
              <div className="absolute bottom-6 right-6 z-30 flex gap-2 items-center">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: i === current ? '20px' : '5px',
                      height: '5px',
                      backgroundColor: i === current ? '#FBBF24' : 'rgba(255,255,255,0.35)',
                    }}
                  />
                ))}
              </div>

              {/* Progress sweep bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30">
                <div key={current} className="h-full bg-amber-400" style={{ animation: 'progress 3.5s linear forwards' }} />
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-8">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-amber-400 inline-block" />
              About the Salon
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Taking care of your{' '}
              <span className="text-amber-500 italic">natural beauty</span>
            </h2>
            <p className="text-gray-500 leading-relaxed text-base">
              Jumuia elevates your natural beauty with personalised skincare, haircare, and premium beauty treatments.
              From luxurious facials to artistic nail care, we ensure a rejuvenating experience tailored just for you.
            </p>
            <button className="bg-amber-400 hover:bg-amber-500 text-black text-xs tracking-widest uppercase font-semibold px-8 py-4 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-200">
              Our Story
            </button>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              {[{ value: '15+', label: 'Years Experience' }, { value: '50+', label: 'Expert Stylists' }, { value: '10k+', label: 'Happy Clients' }].map(stat => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-amber-500" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{stat.value}</p>
                  <p className="text-xs text-gray-500 tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Features Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-gray-200">
          {features.map(feature => (
            <div key={feature.id} className="group p-7 rounded-xl border border-transparent hover:border-amber-200 hover:bg-white transition-all duration-300">
              <div className="flex items-start gap-5">
                <span className="text-3xl font-bold text-amber-300 group-hover:text-amber-500 transition-colors duration-300 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {feature.id}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Trust Indicators ── */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-10 border-t border-gray-200">
          {trust.map(item => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {item}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12 gap-1">
          <span className="w-1 h-1 rounded-full bg-amber-300" />
          <span className="w-1 h-1 rounded-full bg-rose-300" />
          <span className="w-1 h-1 rounded-full bg-amber-300" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  )
}

export default HomeAbout