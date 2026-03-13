"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'

const Services = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    { id: 1, title: 'Skin Care',   image: '/makeup.jpeg', desc: 'Radiant, healthy skin treatments' },
    { id: 2, title: 'Hair Tattoo', image: '/hair.jpeg',   desc: 'Bold, precise hair artistry'      },
    { id: 3, title: 'Lips Tattoo', image: '/lips.jpeg',   desc: 'Long-lasting lip perfection'      },
    { id: 4, title: 'Nail Art',    image: '/nail.jpeg',   desc: 'Creative nail expressions'        },
  ]

  const route = useRouter()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll-triggered entrance animations
  useEffect(() => {
    const ob = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx)
            setVisibleCards(prev => prev.includes(i) ? prev : [...prev, i])
          }
        })
      },
      { threshold: 0.12 }
    )
    cardRefs.current.forEach(el => el && ob.observe(el))
    return () => ob.disconnect()
  }, [])

  const isMobile  = windowWidth > 0 && windowWidth < 640
  const isTablet  = windowWidth >= 640 && windowWidth < 768

  const getCardHeight = () => {
    if (isMobile) return '280px'
    if (isTablet) return '380px'
    return '480px'
  }

  const getNumberSize = () => {
    if (isMobile) return '2.2rem'
    if (isTablet) return '2.5rem'
    return '3rem'
  }

  const getTitleSize = () => {
    if (isMobile) return '1.1rem'
    if (isTablet) return '1.2rem'
    return '1.3rem'
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#faf8f5]">
      <style>{`
        @keyframes cardSlideUp {
          from { opacity: 0; transform: translateY(36px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .card-enter {
          animation: cardSlideUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        /* On mobile: always show content (no hover needed) */
        @media (max-width: 639px) {
          .svc-number   { opacity: 1 !important; }
          .svc-bar      { transform: scaleX(1) !important; }
          .svc-desc     { max-height: 3rem !important; }
          .svc-explore  { opacity: 1 !important; }
          .svc-title    { transform: translateY(0) !important; }
          .svc-scrim    { background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.1) 100%) !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 gap-2 sm:gap-3 md:gap-4">
          <p className="text-amber-500 text-[9px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase flex items-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-6 md:w-8 h-px bg-amber-400 inline-block" />
            Beauty Salon Services
            <span className="w-5 sm:w-6 md:w-8 h-px bg-amber-400 inline-block" />
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight px-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Elevating your{' '}
            <span className="text-amber-500 italic">natural beauty</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-[280px] sm:max-w-md px-2">
            Discover our full range of luxury treatments, each crafted to bring out the best in you.
          </p>
        </div>

        {/* Grid */}
        <div
          onClick={() => route.push('/features/Services')}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3"
        >
          {services.map((service, i) => {
            const isVisible = visibleCards.includes(i)
            const delay = `${i * 0.1}s`

            return (
              <div
                key={service.id}
                ref={el => { cardRefs.current[i] = el }}
                data-idx={i}
                className={`group relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer ${isVisible ? 'card-enter' : 'opacity-0'}`}
                style={{ height: getCardHeight(), animationDelay: delay }}
              >
                {/* Full-bleed image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient scrim */}
                <div
                  className="svc-scrim absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-500"
                />

                {/* Amber bar */}
                <div className="svc-bar absolute top-0 left-0 right-0 h-[2px] sm:h-[3px] bg-gradient-to-r from-amber-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Number */}
                <div className="svc-number absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span
                    className="text-amber-400/50 font-bold leading-none select-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: getNumberSize() }}
                  >
                    0{service.id}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col gap-1 sm:gap-2">
                  <h3
                    className="svc-title text-white font-semibold leading-tight translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: getTitleSize() }}
                  >
                    {service.title}
                  </h3>

                  <p className="svc-desc text-white/60 text-[10px] sm:text-xs leading-relaxed overflow-hidden max-h-0 group-hover:max-h-12 sm:group-hover:max-h-16 transition-all duration-500">
                    {service.desc}
                  </p>

                  <button className="svc-explore mt-0 sm:mt-1 self-start text-[8px] sm:text-[9px] md:text-[10px] tracking-widest uppercase text-amber-400 flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Explore
                    <span className="w-3 sm:w-4 md:w-5 h-px bg-amber-400 inline-block" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-14">
          <button
            onClick={() => route.push('/features/Services')}
            className="border border-amber-400 text-amber-500 hover:bg-amber-400 hover:text-black text-[9px] sm:text-xs tracking-widest uppercase px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-sm transition-all duration-300 font-semibold"
          >
            View All Services
          </button>
        </div>

      </div>
    </section>
  )
}

export default Services