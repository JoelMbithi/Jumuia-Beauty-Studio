import { useRouter } from 'next/navigation'
import React from 'react'

const Services = () => {
  const services = [
    { id: 1, title: 'Skin Care', image: '/makeup.jpeg', desc: 'Radiant, healthy skin treatments' },
    { id: 2, title: 'Hair Tattoo', image: '/hair.jpeg', desc: 'Bold, precise hair artistry' },
    { id: 3, title: 'Lips Tattoo', image: '/lips.jpeg', desc: 'Long-lasting lip perfection' },
    { id: 4, title: 'Nail Art', image: '/nail.jpeg', desc: 'Creative nail expressions' },
  ]

  const route = useRouter()

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <p className="text-amber-500 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-amber-400 inline-block" />
            Beauty Salon Services
            <span className="w-8 h-px bg-amber-400 inline-block" />
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Elevating your{' '}
            <span className="text-amber-500 italic">natural beauty</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md">
            Discover our full range of luxury treatments, each crafted to bring out the best in you.
          </p>
        </div>

        {/* Grid — images fill every pixel of the card */}
        <div onClick={() => route.push('/features/Services')} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{ height: '480px' }}
            >
              {/* Full-bleed image — positioned absolutely so it owns 100% of the card */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-500" />

              {/* Number — fades in top-left on hover */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span
                  className="text-amber-400/50 font-bold leading-none select-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem' }}
                >
                  0{service.id}
                </span>
              </div>

              {/* Amber bar slides in from left on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                <h3
                  className="text-white font-semibold leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem' }}
                >
                  {service.title}
                </h3>

                <p className="text-white/60 text-xs leading-relaxed overflow-hidden max-h-0 group-hover:max-h-10 transition-all duration-500">
                  {service.desc}
                </p>

                <button className="mt-1 self-start text-[10px] tracking-widest uppercase text-amber-400 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Explore
                  <span className="w-5 h-px bg-amber-400 inline-block" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <button onClick={() => route.push('/features/Services')} className="border border-amber-400 text-amber-500 hover:bg-amber-400 hover:text-black text-xs tracking-widest uppercase px-10 py-4 rounded-sm transition-all duration-300 font-semibold">
            View All Services
          </button>
        </div>

      </div>
    </section>
  )
}

export default Services