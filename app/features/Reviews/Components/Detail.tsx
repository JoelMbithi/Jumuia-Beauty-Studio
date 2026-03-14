"use client"
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'

const Detail = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote: "I absolutely can't recommend Jumuia enough — the atmosphere is wonderful and the staff treat you as if you were the first client through the door. Sometimes salons can make you feel uncomfortable, but here they are so welcoming.",
      author: "Sarah M.",
      role: "Regular Client",
      image: "https://images.unsplash.com/photo-1674882632140-832a3e650c41?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      quote: "The best salon experience I've ever had! The team at Jumuia transformed my look completely. Professional, friendly, and absolutely talented. I'll definitely be coming back for all my beauty needs!",
      author: "Amina K.",
      role: "Verified Client",
      image: "https://i.pinimg.com/736x/ef/0e/a7/ef0ea718e996feadcc262d1b2b9a4089.jpg"
    },
    {
      quote: "Outstanding service from start to finish! The attention to detail and customer care is exceptional. Jumuia Salon has become my go-to place for premium beauty treatments.",
      author: "Fatuma L.",
      role: "Loyal Member",
      image: "https://images.unsplash.com/photo-1731055046084-1d9b1418b24e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2FyYWh8ZW58MHx8MHx8fDA%3D"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 lg:px-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">

        {/* ── Top: Welcome + About ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Left — headline */}
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-amber-400 inline-block" />
              Est. 2017
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.05]"
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
          <div className="flex flex-col gap-4 md:gap-6 pt-0 lg:pt-14">
            {[
              "Here at Jumuia we have over 10 years of experience in the hair and beauty industry.",
              "We are passionate about what we do and, since opening our doors in 2017, we aim to create a relaxed and fun environment for our clients to enjoy.",
              "The products we use are, we believe, the best in the industry. Our creative and dedicated team are always learning — we believe in regularly updating our skills and knowledge to give every client the best possible service."
            ].map((text, i) => (
              <p key={i} className="text-gray-500 text-sm leading-relaxed border-l-2 border-amber-200 pl-4">
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* ── Bottom: Image + Testimonial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[500px] md:min-h-[420px]">

          {/* Image — full width on mobile, left on desktop with animation */}
          {/* Image — full width on mobile, left on desktop with animation */}
<div className="relative overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none h-[250px] sm:h-[300px] lg:h-auto">
  <AnimatePresence mode="wait">
    <motion.img
      key={currentTestimonial}
      src={testimonials[currentTestimonial].image}
      alt={`Jumuia Salon - ${testimonials[currentTestimonial].author}`}
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    />
  </AnimatePresence>
  {/* Gradient overlay - adjusted for mobile */}
  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 via-transparent to-transparent lg:from-transparent lg:via-transparent lg:to-black/30" />
</div>

{/* Testimonial — right panel */}
<div className="bg-neutral-900 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-14">

  {/* Large quote mark - adjusted for mobile */}
  <span
    className="text-amber-400/30 text-6xl sm:text-7xl md:text-[8rem] leading-none font-bold select-none -mt-2 md:-mt-6"
    style={{ fontFamily: "'Cormorant Garamond', serif" }}
  >
    "
  </span>

  {/* Animated quote */}
  <div className="flex-1 flex items-center -mt-4 sm:-mt-6 md:-mt-10">
    <AnimatePresence mode="wait">
      <motion.p
        key={currentTestimonial}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.5 }}
        className="text-white/80 text-sm sm:text-base leading-relaxed"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(0.9rem, 4vw, 1.1rem)' }}
      >
        {testimonials[currentTestimonial].quote}
      </motion.p>
    </AnimatePresence>
  </div>

  {/* Author + dots - stacked on mobile */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mt-6 sm:mt-8 md:mt-10">
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTestimonial + '-author'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        {/* User image for mobile - adding small profile images */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400/50 flex-shrink-0">
          <img 
            src={testimonials[currentTestimonial].image} 
            alt={testimonials[currentTestimonial].author}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-amber-400 text-xs sm:text-sm font-semibold tracking-wide">
            {testimonials[currentTestimonial].author}
          </p>
          <p className="text-white/30 text-[10px] sm:text-xs tracking-widest uppercase mt-0.5">
            {testimonials[currentTestimonial].role}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>

    {/* Dot indicators - centered on mobile */}
    <div className="flex gap-2 justify-center sm:justify-end">
      {testimonials.map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentTestimonial(i)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === currentTestimonial ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/20'
          }`}
          aria-label={`Go to testimonial ${i + 1}`}
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