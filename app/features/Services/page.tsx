"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const categories = ['All', 'Skin Care', 'Hair Tattoo', 'Lips Tattoo', 'Nail Art']

const services = [
  {
    id: 1, category: 'Skin Care', title: 'Skin Care',
    image: '/makeup.jpeg', desc: 'Radiant, healthy skin treatments',
    detail: 'Customised facials, chemical peels, and advanced skin rejuvenation tailored to your skin type.',
    duration: '60–90 min', from: 'KSh 2,500',
  },
  {
    id: 2, category: 'Hair Tattoo', title: 'Hair Tattoo',
    image: '/hair.jpeg', desc: 'Bold, precise hair artistry',
    detail: 'Scalp micropigmentation and precision hair tattoo techniques for a flawless finish.',
    duration: '90–120 min', from: 'KSh 4,000',
  },
  {
    id: 3, category: 'Lips Tattoo', title: 'Lips Tattoo',
    image: '/lips.jpeg', desc: 'Long-lasting lip perfection',
    detail: 'Semi-permanent lip blush and full lip colour tattoo for defined, lasting beauty.',
    duration: '60 min', from: 'KSh 3,500',
  },
  {
    id: 4, category: 'Nail Art', title: 'Nail Art',
    image: '/nail.jpeg', desc: 'Creative nail expressions',
    detail: 'Gel manicures, intricate nail art, and premium nail extensions crafted by expert artists.',
    duration: '45–75 min', from: 'KSh 1,800',
  },
]

const ALL_IMAGES = [
  { src: '/makeup.jpeg', category: 'Skin Care',   label: 'Skin Care' },
  { src: '/hair.jpeg',   category: 'Hair Tattoo', label: 'Hair Tattoo' },
  { src: '/lips.jpeg',   category: 'Lips Tattoo', label: 'Lips Tattoo' },
  { src: '/nail.jpeg',   category: 'Nail Art',    label: 'Nail Art' },
  { src: '/makeup.jpeg', category: 'Skin Care',   label: 'Facial Glow' },
  { src: '/hair.jpeg',   category: 'Hair Tattoo', label: 'Micro Pigment' },
  { src: '/lips.jpeg',   category: 'Lips Tattoo', label: 'Lip Blush' },
  { src: '/nail.jpeg',   category: 'Nail Art',    label: 'Gel Art' },
  { src: '/makeup.jpeg', category: 'Skin Care',   label: 'Deep Cleanse' },
  { src: '/hair.jpeg',   category: 'Hair Tattoo', label: 'Fade & Line' },
  { src: '/lips.jpeg',   category: 'Lips Tattoo', label: 'Ombre Lips' },
  { src: '/nail.jpeg',   category: 'Nail Art',    label: 'Nail Design' },
  { src: '/makeup.jpeg', category: 'Skin Care',   label: 'Brightening' },
  { src: '/hair.jpeg',   category: 'Hair Tattoo', label: 'Scalp Art' },
  { src: '/lips.jpeg',   category: 'Lips Tattoo', label: 'Full Tint' },
  { src: '/nail.jpeg',   category: 'Nail Art',    label: 'French Tip' },
  { src: '/makeup.jpeg', category: 'Skin Care',   label: 'Anti-Aging' },
  { src: '/hair.jpeg',   category: 'Hair Tattoo', label: 'Crown Work' },
  { src: '/lips.jpeg',   category: 'Lips Tattoo', label: 'Nude Lips' },
  { src: '/nail.jpeg',   category: 'Nail Art',    label: 'Acrylic Set' },
  { src: '/makeup.jpeg', category: 'Skin Care',   label: 'Hydra Boost' },
  { src: '/hair.jpeg',   category: 'Hair Tattoo', label: 'Precision Cut' },
  { src: '/lips.jpeg',   category: 'Lips Tattoo', label: 'Berry Tint' },
  { src: '/nail.jpeg',   category: 'Nail Art',    label: 'Chrome Nails' },
]

// 4 distinct layout styles — each loop gets a different one
// Each layout defines how 12 tiles are placed on a 6-col grid
const LAYOUT_STYLES = [
  // Style A — bold diagonals, big heroes top-left and bottom-right
  [
    { col: 'span 3', row: 'span 3', rotate: '-1.2deg' },
    { col: 'span 2', row: 'span 2', rotate: '1.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '-2deg' },
    { col: 'span 1', row: 'span 2', rotate: '0.8deg' },
    { col: 'span 1', row: 'span 1', rotate: '-1deg' },
    { col: 'span 2', row: 'span 1', rotate: '1.8deg' },
    { col: 'span 1', row: 'span 1', rotate: '-0.5deg' },
    { col: 'span 1', row: 'span 2', rotate: '2deg' },
    { col: 'span 2', row: 'span 2', rotate: '-1.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '0.3deg' },
    { col: 'span 3', row: 'span 2', rotate: '-0.8deg' },
    { col: 'span 1', row: 'span 1', rotate: '1.2deg' },
  ],
  // Style B — tall columns + wide banners
  [
    { col: 'span 2', row: 'span 4', rotate: '1deg' },
    { col: 'span 2', row: 'span 2', rotate: '-1.8deg' },
    { col: 'span 2', row: 'span 2', rotate: '0.6deg' },
    { col: 'span 1', row: 'span 2', rotate: '-1.2deg' },
    { col: 'span 1', row: 'span 1', rotate: '2deg' },
    { col: 'span 2', row: 'span 2', rotate: '-0.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '1.5deg' },
    { col: 'span 4', row: 'span 2', rotate: '-1deg' },
    { col: 'span 1', row: 'span 2', rotate: '0.8deg' },
    { col: 'span 1', row: 'span 1', rotate: '-2deg' },
    { col: 'span 2', row: 'span 1', rotate: '1.2deg' },
    { col: 'span 1', row: 'span 1', rotate: '-0.3deg' },
  ],
  // Style C — mosaic of equal-ish tiles, more breathing room
  [
    { col: 'span 2', row: 'span 2', rotate: '-0.8deg' },
    { col: 'span 1', row: 'span 1', rotate: '1.8deg' },
    { col: 'span 1', row: 'span 2', rotate: '-1.5deg' },
    { col: 'span 2', row: 'span 1', rotate: '0.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '-2deg' },
    { col: 'span 2', row: 'span 2', rotate: '1deg' },
    { col: 'span 1', row: 'span 1', rotate: '-0.5deg' },
    { col: 'span 1', row: 'span 2', rotate: '2deg' },
    { col: 'span 3', row: 'span 2', rotate: '-1deg' },
    { col: 'span 1', row: 'span 1', rotate: '1.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '-1.8deg' },
    { col: 'span 2', row: 'span 2', rotate: '0.8deg' },
  ],
  // Style D — one giant centrepiece flanked by smalls
  [
    { col: 'span 1', row: 'span 2', rotate: '1.5deg' },
    { col: 'span 4', row: 'span 3', rotate: '-0.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '2deg' },
    { col: 'span 1', row: 'span 1', rotate: '-1.8deg' },
    { col: 'span 1', row: 'span 2', rotate: '0.8deg' },
    { col: 'span 2', row: 'span 2', rotate: '-1.2deg' },
    { col: 'span 1', row: 'span 1', rotate: '1deg' },
    { col: 'span 2', row: 'span 1', rotate: '-2deg' },
    { col: 'span 1', row: 'span 1', rotate: '1.8deg' },
    { col: 'span 3', row: 'span 2', rotate: '-0.8deg' },
    { col: 'span 2', row: 'span 1', rotate: '0.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '-1deg' },
  ],
]

function makeGallery(filter: string) {
  return filter === 'All' ? ALL_IMAGES : ALL_IMAGES.filter(b => b.category === filter)
}

// shuffle array deterministically by seed
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = (seed * 1664525 + 1013904223 + i) % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ServicesPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('All')
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [tileVisible, setTileVisible] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [loopIndex, setLoopIndex] = useState(0)   // which loop we're on
  const [layoutIdx, setLayoutIdx] = useState(0)   // which layout style
  const [exiting, setExiting] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const tickRef = useRef(0)

  const gallery = makeGallery(activeFilter)
  const TILES = 12  // how many tiles to show per loop

  // pick 12 images for this loop (shuffled differently each time)
  const visibleGallery = seededShuffle(gallery, loopIndex * 7 + 3).slice(0, TILES)
  const currentLayout = LAYOUT_STYLES[layoutIdx % LAYOUT_STYLES.length]

  // Card scroll reveal
  useEffect(() => {
    setVisibleCards([])
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number((entry.target as HTMLElement).dataset.idx)
          setVisibleCards(prev => prev.includes(idx) ? prev : [...prev, idx])
        }
      })
    }, { threshold: 0.12 })
    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [activeFilter])

  // Gallery tile entrance
  useEffect(() => {
    setTileVisible(false)
    const t = setTimeout(() => setTileVisible(true), 120)
    return () => clearTimeout(t)
  }, [loopIndex, layoutIdx, activeFilter])

  // Ticker: advance activeImg every 1.6s; when loop ends, swap layout + shuffle
  useEffect(() => {
    tickRef.current = 0
    setActiveImg(0)
    const interval = setInterval(() => {
      tickRef.current += 1
      if (tickRef.current >= TILES) {
        // Loop over — transition out, then swap
        setExiting(true)
        setTimeout(() => {
          setLoopIndex(l => l + 1)
          setLayoutIdx(l => (l + 1) % LAYOUT_STYLES.length)
          setActiveImg(0)
          tickRef.current = 0
          setExiting(false)
        }, 600)
      } else {
        setActiveImg(tickRef.current)
      }
    }, 1600)
    return () => clearInterval(interval)
  }, [activeFilter, loopIndex])

  return (
    <main className="min-h-screen bg-[#faf8f5]">

      {/* ── Hero ── */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <img src="/makeup.jpeg" alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 px-8 md:px-20 pb-12 flex flex-col gap-3">
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-amber-400" />
            Jumuia Beauty Studio
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our <span className="text-amber-400 italic">Services</span>
          </h1>
          <p className="text-white/60 text-sm max-w-md">
            Discover our range of beauty services designed to enhance your natural beauty.
          </p>
        </div>
      </section>

      {/* ── Sticky Filter ── */}
      <section className="sticky top-0 z-30 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-gray-100 px-6 md:px-20 py-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveFilter(cat); setLoopIndex(0); setLayoutIdx(0) }}
              className={`whitespace-nowrap text-xs tracking-widest uppercase px-5 py-2.5 rounded-sm border font-semibold transition-all duration-300 ${
                activeFilter === cat ? 'bg-amber-400 border-amber-400 text-black' : 'border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-500'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(activeFilter === 'All' ? services : services.filter(s => s.category === activeFilter)).map((service, idx) => (
            <div key={service.id} ref={el => { cardRefs.current[idx] = el }} data-idx={idx}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm"
              style={{ height: '420px', opacity: visibleCards.includes(idx) ? 1 : 0, transform: visibleCards.includes(idx) ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.6s ease ${idx * 0.1}s, transform 0.6s ease ${idx * 0.1}s` }}>
              <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-500" />
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-amber-400/40 font-bold text-5xl leading-none select-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>0{service.id}</span>
              </div>
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
                <span className="text-white/70 text-[10px] tracking-wide">{service.duration}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1.5">
                <h3 className="text-white font-semibold text-xl translate-y-1 group-hover:translate-y-0 transition-transform duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{service.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-500">{service.detail}</p>
                <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  <span className="text-amber-400 text-xs font-semibold">From {service.from}</span>
                  <span className="text-[10px] tracking-widest uppercase text-amber-400 flex items-center gap-1.5">Book <span className="w-4 h-px bg-amber-400 inline-block" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scattered Gallery ── */}
      <section className="px-4 md:px-8 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10 gap-3">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-amber-400 inline-block" />
              Gallery
              <span className="w-8 h-px bg-amber-400 inline-block" />
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our <span className="text-amber-500 italic">Work</span>
            </h2>
            {/* Layout style indicator */}
            <div className="flex items-center gap-2 mt-1">
              {LAYOUT_STYLES.map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-500"
                  style={{ width: i === layoutIdx % LAYOUT_STYLES.length ? '24px' : '6px', backgroundColor: i === layoutIdx % LAYOUT_STYLES.length ? '#FBBF24' : '#d1d5db' }} />
              ))}
            </div>
          </div>

          {/* Grid */}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridAutoRows: '160px',
              opacity: exiting ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            {visibleGallery.map((img, i) => {
              const layout = currentLayout[i]
              const isActive = activeImg === i
              return (
                <div
                  key={`${loopIndex}-${i}`}
                  onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer"
                  style={{
                    gridColumn: layout.col,
                    gridRow: layout.row,
                    transform: tileVisible
                      ? `rotate(${isActive ? '0deg' : layout.rotate}) scale(${isActive ? 1.04 : 1})`
                      : `rotate(${layout.rotate}) scale(0.82) translateY(20px)`,
                    opacity: tileVisible ? 1 : 0,
                    transition: `opacity 0.55s ease ${(i * 0.045).toFixed(2)}s, transform 0.55s ease ${(i * 0.045).toFixed(2)}s`,
                    boxShadow: isActive
                      ? '0 0 0 3px #FBBF24, 0 12px 40px rgba(0,0,0,0.22)'
                      : '0 4px 20px rgba(0,0,0,0.12)',
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover"
                    style={{
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.7s ease',
                    }}
                  />

                  {/* Always-on subtle scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Active label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1"
                    style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}>
                    <span className="text-white text-[10px] tracking-widest uppercase">{img.label}</span>
                    <span className="text-white/40 text-[9px] tracking-wider">{img.category}</span>
                  </div>

                  {/* Amber top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-orange-400"
                    style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />

                  {/* Progress bar at bottom for active tile */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                      <div className="h-full bg-amber-400" style={{ animation: 'progress 1.6s linear forwards' }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Loop counter */}
          <div className="flex justify-center mt-6 gap-2 items-center">
            <span className="text-gray-300 text-[10px] tracking-widest uppercase">Layout</span>
            <span className="text-amber-400 text-[10px] font-semibold tracking-widest">
              {String.fromCharCode(65 + (layoutIdx % LAYOUT_STYLES.length))}
            </span>
            <span className="text-gray-300 text-[10px] tracking-widest uppercase mx-1">·</span>
            <span className="text-gray-300 text-[10px] tracking-widest uppercase">Shuffle</span>
            <span className="text-amber-400 text-[10px] font-semibold tracking-widest">#{loopIndex + 1}</span>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-neutral-900 py-20 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-amber-400 inline-block" />
            Ready to Transform?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Book your <span className="text-amber-400 italic">appointment</span> today
          </h2>
          <p className="text-white/50 text-sm max-w-md">Let our expert team craft a personalised beauty experience just for you.</p>
          <div className="flex gap-4 mt-2 flex-wrap justify-center">
            <button className="bg-amber-400 hover:bg-amber-300 text-black text-xs tracking-widest uppercase font-semibold px-10 py-4 rounded-sm transition-all duration-300">Book Now</button>
            <button onClick={() => router.back()} className="border border-white/20 text-white/60 hover:border-amber-400 hover:text-amber-400 text-xs tracking-widest uppercase px-10 py-4 rounded-sm transition-all duration-300">← Back</button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </main>
  )
}