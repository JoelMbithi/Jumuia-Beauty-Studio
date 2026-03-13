"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

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
  { src: '/makeup.jpeg',  category: 'Skin Care',   label: 'Skin Care'     },
  { src: '/hair.jpeg',    category: 'Hair Tattoo', label: 'Hair Tattoo'   },
  { src: '/lips.jpeg',    category: 'Lips Tattoo', label: 'Lips Tattoo'   },
  { src: '/nail.jpeg',    category: 'Nail Art',    label: 'Nail Art'      },
  { src: '/makeup2.jpeg', category: 'Skin Care',   label: 'Facial Glow'   },
  { src: '/hair2.jpeg',   category: 'Hair Tattoo', label: 'Micro Pigment' },
  { src: '/lips1.jpeg',   category: 'Lips Tattoo', label: 'Lip Blush'     },
  { src: '/nail.jpeg',    category: 'Nail Art',    label: 'Gel Art'       },
  { src: '/makeup3.jpeg', category: 'Skin Care',   label: 'Deep Cleanse'  },
  { src: '/hair3.jpeg',   category: 'Hair Tattoo', label: 'Fade & Line'   },
  { src: '/lips2.jpeg',   category: 'Lips Tattoo', label: 'Ombre Lips'    },
  { src: '/nail2.jpeg',   category: 'Nail Art',    label: 'Nail Design'   },
  { src: '/makeup4.jpeg', category: 'Skin Care',   label: 'Brightening'   },
  { src: '/hair4.jpeg',   category: 'Hair Tattoo', label: 'Scalp Art'     },
  { src: '/lips3.jpeg',   category: 'Lips Tattoo', label: 'Full Tint'     },
  { src: '/nail3.jpeg',   category: 'Nail Art',    label: 'French Tip'    },
  { src: '/makeup5.jpeg', category: 'Skin Care',   label: 'Anti-Aging'    },
  { src: '/hair.jpeg',    category: 'Hair Tattoo', label: 'Crown Work'    },
  { src: '/lips4.jpeg',   category: 'Lips Tattoo', label: 'Nude Lips'     },
  { src: '/nail4.jpeg',   category: 'Nail Art',    label: 'Acrylic Set'   },
  { src: '/makeup6.jpeg', category: 'Skin Care',   label: 'Hydra Boost'   },
  { src: '/hair5.jpeg',   category: 'Hair Tattoo', label: 'Precision Cut' },
  { src: '/lips5.jpeg',   category: 'Lips Tattoo', label: 'Berry Tint'    },
  { src: '/nail5.jpeg',   category: 'Nail Art',    label: 'Chrome Nails'  },
]

const DESKTOP_LAYOUT_STYLES = [
  [
    { col: 'span 3', row: 'span 3', rotate: '-1.2deg' },
    { col: 'span 2', row: 'span 2', rotate: '1.5deg'  },
    { col: 'span 1', row: 'span 1', rotate: '-2deg'   },
    { col: 'span 1', row: 'span 2', rotate: '0.8deg'  },
    { col: 'span 1', row: 'span 1', rotate: '-1deg'   },
    { col: 'span 2', row: 'span 1', rotate: '1.8deg'  },
    { col: 'span 1', row: 'span 1', rotate: '-0.5deg' },
    { col: 'span 1', row: 'span 2', rotate: '2deg'    },
    { col: 'span 2', row: 'span 2', rotate: '-1.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '0.3deg'  },
    { col: 'span 3', row: 'span 2', rotate: '-0.8deg' },
    { col: 'span 1', row: 'span 1', rotate: '1.2deg'  },
  ],
  [
    { col: 'span 2', row: 'span 4', rotate: '1deg'    },
    { col: 'span 2', row: 'span 2', rotate: '-1.8deg' },
    { col: 'span 2', row: 'span 2', rotate: '0.6deg'  },
    { col: 'span 1', row: 'span 2', rotate: '-1.2deg' },
    { col: 'span 1', row: 'span 1', rotate: '2deg'    },
    { col: 'span 2', row: 'span 2', rotate: '-0.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '1.5deg'  },
    { col: 'span 4', row: 'span 2', rotate: '-1deg'   },
    { col: 'span 1', row: 'span 2', rotate: '0.8deg'  },
    { col: 'span 1', row: 'span 1', rotate: '-2deg'   },
    { col: 'span 2', row: 'span 1', rotate: '1.2deg'  },
    { col: 'span 1', row: 'span 1', rotate: '-0.3deg' },
  ],
  [
    { col: 'span 2', row: 'span 2', rotate: '-0.8deg' },
    { col: 'span 1', row: 'span 1', rotate: '1.8deg'  },
    { col: 'span 1', row: 'span 2', rotate: '-1.5deg' },
    { col: 'span 2', row: 'span 1', rotate: '0.5deg'  },
    { col: 'span 1', row: 'span 1', rotate: '-2deg'   },
    { col: 'span 2', row: 'span 2', rotate: '1deg'    },
    { col: 'span 1', row: 'span 1', rotate: '-0.5deg' },
    { col: 'span 1', row: 'span 2', rotate: '2deg'    },
    { col: 'span 3', row: 'span 2', rotate: '-1deg'   },
    { col: 'span 1', row: 'span 1', rotate: '1.5deg'  },
    { col: 'span 1', row: 'span 1', rotate: '-1.8deg' },
    { col: 'span 2', row: 'span 2', rotate: '0.8deg'  },
  ],
  [
    { col: 'span 1', row: 'span 2', rotate: '1.5deg'  },
    { col: 'span 4', row: 'span 3', rotate: '-0.5deg' },
    { col: 'span 1', row: 'span 1', rotate: '2deg'    },
    { col: 'span 1', row: 'span 1', rotate: '-1.8deg' },
    { col: 'span 1', row: 'span 2', rotate: '0.8deg'  },
    { col: 'span 2', row: 'span 2', rotate: '-1.2deg' },
    { col: 'span 1', row: 'span 1', rotate: '1deg'    },
    { col: 'span 2', row: 'span 1', rotate: '-2deg'   },
    { col: 'span 1', row: 'span 1', rotate: '1.8deg'  },
    { col: 'span 3', row: 'span 2', rotate: '-0.8deg' },
    { col: 'span 2', row: 'span 1', rotate: '0.5deg'  },
    { col: 'span 1', row: 'span 1', rotate: '-1deg'   },
  ],
]

// Mobile: simple 2-col layout, no rotation, uniform heights
const MOBILE_LAYOUT: { col: string; row: string; rotate: string }[] = [
  { col: 'span 1', row: 'span 2', rotate: '0deg' }, // tall
  { col: 'span 1', row: 'span 1', rotate: '0deg' }, // short
  { col: 'span 1', row: 'span 1', rotate: '0deg' }, // short
  { col: 'span 2', row: 'span 1', rotate: '0deg' }, // wide
  { col: 'span 1', row: 'span 1', rotate: '0deg' },
  { col: 'span 1', row: 'span 2', rotate: '0deg' }, // tall
  { col: 'span 2', row: 'span 1', rotate: '0deg' }, // wide
  { col: 'span 1', row: 'span 1', rotate: '0deg' },
  { col: 'span 1', row: 'span 1', rotate: '0deg' },
  { col: 'span 1', row: 'span 2', rotate: '0deg' }, // tall
  { col: 'span 1', row: 'span 1', rotate: '0deg' },
  { col: 'span 1', row: 'span 1', rotate: '0deg' },
]

function makeGallery(filter: string) {
  return filter === 'All' ? ALL_IMAGES : ALL_IMAGES.filter(b => b.category === filter)
}

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
  const [loopIndex, setLoopIndex] = useState(0)
  const [layoutIdx, setLayoutIdx] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const tickRef = useRef(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const gallery = makeGallery(activeFilter)
  const TILES = 12
  const visibleGallery = seededShuffle(gallery, loopIndex * 7 + 3).slice(0, TILES)

  const currentLayout = isMobile
    ? MOBILE_LAYOUT
    : DESKTOP_LAYOUT_STYLES[layoutIdx % DESKTOP_LAYOUT_STYLES.length]

  const gridCols    = isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)'
  const gridRowSize = isMobile ? '110px' : '160px'

  // Card scroll reveal
  useEffect(() => {
    setVisibleCards([])
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.idx)
          setVisibleCards(prev => prev.includes(idx) ? prev : [...prev, idx])
        }
      })
    }, { threshold: 0.12 })
    cardRefs.current.forEach(el => el && ob.observe(el))
    return () => ob.disconnect()
  }, [activeFilter])

  useEffect(() => {
    setTileVisible(false)
    const t = setTimeout(() => setTileVisible(true), 120)
    return () => clearTimeout(t)
  }, [loopIndex, layoutIdx, activeFilter])

  useEffect(() => {
    tickRef.current = 0
    setActiveImg(0)
    const interval = setInterval(() => {
      tickRef.current += 1
      if (tickRef.current >= TILES) {
        setExiting(true)
        setTimeout(() => {
          setLoopIndex(l => l + 1)
          setLayoutIdx(l => (l + 1) % DESKTOP_LAYOUT_STYLES.length)
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
      <section className="relative h-[300px] sm:h-[350px] md:h-96 flex items-end overflow-hidden">
        <img src="/Salon.jpeg" alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 md:top-6 md:left-8 z-20 flex items-center gap-1 md:gap-2 text-white hover:text-amber-400 transition-colors group bg-black/30 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm"
        >
          <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
        <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 pb-6 sm:pb-8 md:pb-12 flex flex-col gap-2 md:gap-3">
          <p className="text-amber-400 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase flex items-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-8 h-px bg-amber-400" />
            Jumuia Beauty Studio
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our <span className="text-amber-400 italic">Services</span>
          </h1>
          <p className="text-white/60 text-xs sm:text-sm max-w-[280px] sm:max-w-md">
            Discover our range of beauty services designed to enhance your natural beauty.
          </p>
        </div>
      </section>

      {/* ── Sticky Filter ── */}
      <section className="sticky top-0 z-30 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-gray-100 px-3 sm:px-4 md:px-12 lg:px-20 py-3 md:py-4">
        <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveFilter(cat); setLoopIndex(0); setLayoutIdx(0) }}
              className={`whitespace-nowrap text-[9px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-sm border font-semibold transition-all duration-300 ${
                activeFilter === cat ? 'bg-amber-400 border-amber-400 text-black' : 'border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-500'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="px-3 sm:px-4 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {(activeFilter === 'All' ? services : services.filter(s => s.category === activeFilter)).map((service, idx) => (
            <div key={service.id} ref={el => { cardRefs.current[idx] = el }} data-idx={idx}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer shadow-sm"
              style={{
                height: isMobile ? '340px' : '420px',
                opacity: visibleCards.includes(idx) ? 1 : 0,
                transform: visibleCards.includes(idx) ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${idx * 0.1}s, transform 0.6s ease ${idx * 0.1}s`,
              }}>
              <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-500" />
              <div className="absolute top-0 left-0 right-0 h-[2px] md:h-[3px] bg-gradient-to-r from-amber-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-amber-400/40 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none select-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>0{service.id}</span>
              </div>
              <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-black/40 backdrop-blur-sm border border-white/10 px-2 sm:px-2.5 md:px-3 py-0.5 md:py-1 rounded-full">
                <span className="text-white/70 text-[8px] sm:text-[9px] md:text-[10px] tracking-wide">{service.duration}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 flex flex-col gap-0.5 sm:gap-1 md:gap-1.5">
                <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl translate-y-1 group-hover:translate-y-0 transition-transform duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{service.title}</h3>
                <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-500">{service.detail}</p>
                <div className="flex items-center justify-between mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  <span className="text-amber-400 text-[10px] sm:text-xs font-semibold">From {service.from}</span>
                  <span className="text-[8px] sm:text-[10px] tracking-widest uppercase text-amber-400 flex items-center gap-1 sm:gap-1.5">Book <span className="w-3 sm:w-4 h-px bg-amber-400 inline-block" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scattered Gallery ── */}
      <section className="px-2 sm:px-4 md:px-8 lg:px-12 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10 gap-2 md:gap-3">
            <p className="text-amber-500 text-[9px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase flex items-center gap-2 sm:gap-3">
              <span className="w-5 sm:w-8 h-px bg-amber-400 inline-block" />
              Gallery
              <span className="w-5 sm:w-8 h-px bg-amber-400 inline-block" />
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our <span className="text-amber-500 italic">Work</span>
            </h2>
            {!isMobile && (
              <div className="flex items-center gap-2 mt-1">
                {DESKTOP_LAYOUT_STYLES.map((_, i) => (
                  <div key={i} className="h-1 rounded-full transition-all duration-500"
                    style={{ width: i === layoutIdx % DESKTOP_LAYOUT_STYLES.length ? '24px' : '6px', backgroundColor: i === layoutIdx % DESKTOP_LAYOUT_STYLES.length ? '#FBBF24' : '#d1d5db' }} />
                ))}
              </div>
            )}
          </div>

          {/* ── THE GRID ── */}
          <div
            className="grid gap-2 sm:gap-3 md:gap-4"
            style={{
              gridTemplateColumns: gridCols,
              gridAutoRows: gridRowSize,
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
                  className="relative overflow-hidden cursor-pointer"
                  style={{
                    gridColumn: layout.col,
                    gridRow: layout.row,
                    borderRadius: isMobile ? '10px' : '16px',
                    // Mobile: no rotation (looks messy at small size), desktop: keep the scatter
                    transform: tileVisible
                      ? `rotate(${isActive ? '0deg' : layout.rotate}) scale(${isActive ? 1.02 : 1})`
                      : `rotate(${layout.rotate}) scale(0.88) translateY(14px)`,
                    opacity: tileVisible ? 1 : 0,
                    transition: `opacity 0.5s ease ${(i * 0.04).toFixed(2)}s, transform 0.5s ease ${(i * 0.04).toFixed(2)}s`,
                    boxShadow: isActive
                      ? '0 0 0 2px #FBBF24, 0 8px 24px rgba(0,0,0,0.18)'
                      : isMobile
                        ? '0 2px 8px rgba(0,0,0,0.12)'
                        : '0 2px 12px rgba(0,0,0,0.1)',
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

                  {/* Scrim — always on so label is readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  {/* Amber top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-400 to-orange-400"
                    style={{
                      height: isMobile ? '2px' : '3px',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease',
                    }}
                  />

                  {/* Label — always visible on mobile, fade in on desktop */}
                  <div
                    className="absolute bottom-0 left-0 right-0 flex flex-col gap-0.5"
                    style={{
                      padding: isMobile ? '8px 10px' : '12px 14px',
                      opacity: isMobile ? 1 : isActive ? 1 : 0,
                      transform: isMobile ? 'none' : isActive ? 'translateY(0)' : 'translateY(5px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span className="text-white font-semibold leading-tight"
                      style={{ fontSize: isMobile ? '10px' : '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {img.label}
                    </span>
                    <span className="text-white/50" style={{ fontSize: '9px', letterSpacing: '0.08em' }}>
                      {img.category}
                    </span>
                  </div>

                  {/* Progress bar for active tile */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                      <div className="h-full bg-amber-400" style={{ animation: 'progress 1.6s linear forwards' }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Loop counter desktop only */}
          {!isMobile && (
            <div className="flex justify-center mt-5 md:mt-6 gap-2 items-center">
              <span className="text-gray-300 text-[9px] md:text-[10px] tracking-widest uppercase">Layout</span>
              <span className="text-amber-400 text-[9px] md:text-[10px] font-semibold tracking-widest">
                {String.fromCharCode(65 + (layoutIdx % DESKTOP_LAYOUT_STYLES.length))}
              </span>
              <span className="text-gray-300 text-[9px] md:text-[10px] tracking-widest uppercase mx-1">·</span>
              <span className="text-gray-300 text-[9px] md:text-[10px] tracking-widest uppercase">Shuffle</span>
              <span className="text-amber-400 text-[9px] md:text-[10px] font-semibold tracking-widest">#{loopIndex + 1}</span>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-neutral-900 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 sm:w-80 h-64 sm:h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-6">
          <p className="text-amber-400 text-[9px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase flex items-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-8 h-px bg-amber-400 inline-block" />
            Ready to Transform?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Book your <span className="text-amber-400 italic">appointment</span> today
          </h2>
          <p className="text-white/50 text-xs sm:text-sm max-w-[280px] sm:max-w-md">
            Let our expert team craft a personalised beauty experience just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 flex-wrap justify-center">
            <button className="bg-amber-400 hover:bg-amber-300 text-black text-[10px] sm:text-xs tracking-widest uppercase font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-sm transition-all duration-300">
              Book Now
            </button>
            <button onClick={() => router.back()} className="border border-white/20 text-white/60 hover:border-amber-400 hover:text-amber-400 text-[10px] sm:text-xs tracking-widest uppercase px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-sm transition-all duration-300">
              ← Back
            </button>
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