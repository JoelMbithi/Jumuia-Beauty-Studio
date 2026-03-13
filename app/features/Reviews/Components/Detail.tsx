"use client"
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'

const Detail = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote: "I absolutely can't recommend Jumuia enough — the atmosphere is wonderful and the staff treat you as if you were the first client through the door. Sometimes salons can make you feel uncomfortable, but here they are so welcoming.",
      author: "Sarah M.",
      role: "Regular Client"
    },
    {
      quote: "The best salon experience I've ever had! The team at Jumuia transformed my look completely. Professional, friendly, and absolutely talented. I'll definitely be coming back for all my beauty needs!",
      author: "Amina K.",
      role: "Verified Client"
    },
    {
      quote: "Outstanding service from start to finish! The attention to detail and customer care is exceptional. Jumuia Salon has become my go-to place for premium beauty treatments.",
      author: "Fatuma L.",
      role: "Loyal Member"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">

        {/* ── Top: Welcome + About ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — headline */}
          <div className="flex flex-col gap-6">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-amber-400 inline-block" />
              Est. 2026
            </p>
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Welcome to<br />
              <span className="text-amber-500 italic">The Salon</span><br />
              of Jumuia
            </h2>
            {/* Decorative divider */}
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-amber-400" />
              <span className="text-amber-400 text-lg">✦</span>
              <span className="w-12 h-px bg-amber-400" />
            </div>
          </div>

          {/* Right — about text */}
          <div className="flex flex-col gap-6 pt-2 lg:pt-14">
            {[
              "Here at Jumuia we have over 10 years of experience in the hair and beauty industry.",
              "We are passionate about what we do and, since opening our doors in 2026, we aim to create a relaxed and fun environment for our clients to enjoy.",
              "The products we use are, we believe, the best in the industry. Our creative and dedicated team are always learning — we believe in regularly updating our skills and knowledge to give every client the best possible service."
            ].map((text, i) => (
              <p key={i} className="text-gray-500 text-sm leading-relaxed border-l-2 border-amber-200 pl-4">
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* ── Bottom: Image + Testimonial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[420px]">

          {/* Image — full bleed left */}
          <div className="relative overflow-hidden rounded-tl-2xl rounded-bl-2xl">
            <img
              src="/makeup.jpeg"
              alt="Jumuia Salon"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay on right edge to blend into testimonial */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
          </div>

          {/* Testimonial — right panel */}
          <div className="bg-neutral-900 rounded-tr-2xl rounded-br-2xl flex flex-col justify-between p-10 md:p-14">

            {/* Large quote mark */}
            <span
              className="text-amber-400/30 text-[8rem] leading-none font-bold select-none -mt-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "
            </span>

            {/* Animated quote */}
            <div className="flex-1 flex items-center -mt-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  className="text-white/80 text-base leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}
                >
                  {testimonials[currentTestimonial].quote}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Author + dots */}
            <div className="flex items-center justify-between mt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial + '-author'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-amber-400 text-sm font-semibold tracking-wide">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">
                    {testimonials[currentTestimonial].role}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentTestimonial ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Detail