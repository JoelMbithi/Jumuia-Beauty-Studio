"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Heart, Star, Users, Clock, Award, Sparkles, Quote } from 'lucide-react'

const AboutPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('story')
  const [counts, setCounts] = useState({
    clients: 0,
    years: 0,
    treatments: 0,
    smiles: 0
  })
  
  // Refs for animation triggers
  const storyRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const awardsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  const [isStoryVisible, setIsStoryVisible] = useState(false)
  const [isValuesVisible, setIsValuesVisible] = useState(false)
  const [isTeamVisible, setIsTeamVisible] = useState(false)
  const [isStatsVisible, setIsStatsVisible] = useState(false)
  const [isAwardsVisible, setIsAwardsVisible] = useState(false)
  const [isGalleryVisible, setIsGalleryVisible] = useState(false)
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === storyRef.current && entry.isIntersecting) {
            setIsStoryVisible(true)
          }
          if (entry.target === valuesRef.current && entry.isIntersecting) {
            setIsValuesVisible(true)
          }
          if (entry.target === teamRef.current && entry.isIntersecting) {
            setIsTeamVisible(true)
          }
          if (entry.target === statsRef.current && entry.isIntersecting) {
            setIsStatsVisible(true)
          }
          if (entry.target === awardsRef.current && entry.isIntersecting) {
            setIsAwardsVisible(true)
          }
          if (entry.target === galleryRef.current && entry.isIntersecting) {
            setIsGalleryVisible(true)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px' }
    )
    
    if (storyRef.current) observer.observe(storyRef.current)
    if (valuesRef.current) observer.observe(valuesRef.current)
    if (teamRef.current) observer.observe(teamRef.current)
    if (statsRef.current) observer.observe(statsRef.current)
    if (awardsRef.current) observer.observe(awardsRef.current)
    if (galleryRef.current) observer.observe(galleryRef.current)
    
    return () => observer.disconnect()
  }, [])
  
  // Counter animation for stats
  useEffect(() => {
    if (!isStatsVisible) return
    
    const targets = {
      clients: 5000,
      years: 8,
      treatments: 25,
      smiles: 4800
    }
    
    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps
    
    let currentStep = 0
    
    const timer = setInterval(() => {
      currentStep++
      
      setCounts({
        clients: Math.min(Math.floor((currentStep / steps) * targets.clients), targets.clients),
        years: Math.min(Math.floor((currentStep / steps) * targets.years), targets.years),
        treatments: Math.min(Math.floor((currentStep / steps) * targets.treatments), targets.treatments),
        smiles: Math.min(Math.floor((currentStep / steps) * targets.smiles), targets.smiles)
      })
      
      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, interval)
    
    return () => clearInterval(timer)
  }, [isStatsVisible])

  const team = [
    {
      name: "Grace Muthoni",
      role: "Founder & Creative Director",
      bio: "Started Jumuia 8 years ago with a simple dream — a place where women feel seen, heard, and beautiful. Still here, still passionate.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format",
      favorite: "Custom facials",
      since: "2017"
    },
    {
      name: "Amina Hassan",
      role: "Senior Stylist",
      bio: "15 years of experience, but she'll tell you every client teaches her something new. Specializes in natural hair and transformations.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format",
      favorite: "Hair transformations",
      since: "2018"
    },
    {
      name: "Wanjiku Kimani",
      role: "Skincare Specialist",
      bio: "The gentle hands behind our most popular facials. Trained in Korea and Kenya, she brings the best of both worlds.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format",
      favorite: "Deep cleansing",
      since: "2019"
    },
    {
      name: "Sarah Akinyi",
      role: "Nail Artist",
      bio: "From simple polish to intricate nail art, Sarah treats every nail like a tiny canvas. Clients book weeks in advance for her.",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&auto=format",
      favorite: "Nail art",
      since: "2020"
    }
  ]

  const awards = [
    {
      year: "2024",
      title: "Best Salon Experience",
      organization: "Nairobi Beauty Awards",
      description: "Recognized for exceptional customer service and transformative results."
    },
    {
      year: "2023",
      title: "Innovation in Skincare",
      organization: "East Africa Beauty Expo",
      description: "For our unique approach to traditional and modern skincare techniques."
    },
    {
      year: "2022",
      title: "Community Choice Award",
      organization: "Women in Business",
      description: "Voted by our community for making beauty accessible and welcoming."
    },
    {
      year: "2021",
      title: "Rising Star",
      organization: "Kenya Salon Association",
      description: "Recognized as one of Nairobi's fastest-growing beauty destinations."
    }
  ]

  const gallery = [
    {
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format",
      title: "Bridal Transformations",
      category: "Weddings"
    },
    {
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format",
      title: "Signature Facials",
      category: "Skincare"
    },
    {
      image: "https://images.unsplash.com/photo-1772322586711-22f84f5f3432?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Nail Artistry",
      category: "Nails"
    },
    {
      image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Salon Interior",
      category: "Space"
    }
  ]

  const values = [
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Feel at home",
      description: "We remember your name, your favorite drink, and how you like your coffee. Because beauty is better with familiarity."
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Real conversations",
      description: "No awkward silences. No pressure to talk. You decide the vibe — we follow your lead."
    },
    {
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Skills that matter",
      description: "Continuous learning isn't a buzzword here. Our team trains locally and internationally to bring you the best."
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Your time is precious",
      description: "We run on time because we know your schedule is full. In and out when promised, every single time."
    }
  ]

  return (
    <main className="min-h-screen bg-[#fcfaf7]">
      {/* Back Button - Responsive */}
      <button 
        onClick={() => router.back()}
        className="fixed top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-50 flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-amber-400 transition-colors group bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm text-xs sm:text-sm"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      {/* Hero Section - Responsive */}
      <section id="story" className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1400&auto=format" 
            alt="Jumuia Beauty Studio Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
          <div className="max-w-xl sm:max-w-2xl animate-fadeInUp">
            <p className="text-amber-400 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3">
              <span className="w-6 sm:w-8 md:w-10 h-px bg-amber-400"></span>
              Since 2017
            </p>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-3 sm:mb-4 md:mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              More than a salon.
              <span className="block text-amber-400 italic mt-1 sm:mt-2">A place to belong.</span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md md:max-w-xl leading-relaxed">
              Jumuia means community in Swahili. And that's exactly what we built — a space where beauty meets warmth, and every visit feels like coming home.
            </p>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on very small screens */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Responsive */}
      <section 
        id="story"
        ref={storyRef}
        className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className={`space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-1000 transform ${
            isStoryVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            <span className="text-amber-400 text-[10px] sm:text-xs tracking-widest uppercase">Our Story</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Started with a 
              <span className="block text-amber-400 italic">dream and a chair</span>
            </h2>
            <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                Eight years ago, Grace opened the doors to a small studio with just two chairs and a big hope — to create a place where women could come exactly as they are.
              </p>
              <p>
                No judgment. No pretence. Just honest conversations and great hair. Slowly, word spread. One client told another. The two chairs became four, then eight.
              </p>
              <p className="text-gray-900 font-medium">
                Today, we're a team of twelve, but the feeling hasn't changed. Walk in, take a breath, and let us take care of the rest.
              </p>
            </div>
            
            {/* Signature */}
            <div className="pt-4 sm:pt-5 md:pt-6">
              <p className="text-xs sm:text-sm text-gray-400">— Grace Muthoni, Founder</p>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 transform ${
            isStoryVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&auto=format" 
                alt="Grace in the salon"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating quote card - Responsive */}
            <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-4 md:-left-6 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6 max-w-[200px] sm:max-w-[250px] md:max-w-xs">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-amber-200 mb-1 sm:mb-2" />
              <p className="text-gray-700 text-[10px] sm:text-xs md:text-sm italic mb-2 sm:mb-3">
                "I still greet every client at the door. That will never change."
              </p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">— Grace</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Responsive */}
      <section 
        id="values"
        ref={valuesRef}
        className="py-12 sm:py-16 md:py-20 bg-amber-50/50 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 transform ${
            isValuesVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <span className="text-amber-400 text-[10px] sm:text-xs tracking-widest uppercase">What we believe</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mt-2 sm:mt-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Beauty with 
              <span className="block text-amber-400 italic">heart</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-700 transform ${
                  isValuesVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-amber-100 text-amber-400 flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                  {value.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Responsive */}
      <section 
        id="stats"
        ref={statsRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { label: 'Happy Clients', value: counts.clients, suffix: '+' },
            { label: 'Years Strong', value: counts.years, suffix: '' },
            { label: 'Treatments', value: counts.treatments, suffix: '+' },
            { label: 'Smiles', value: counts.smiles, suffix: '+' }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-1000 transform ${
                isStatsVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-amber-400 mb-1 sm:mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section - Responsive */}
      <section 
        id="team"
        ref={teamRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 transform ${
          isTeamVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <span className="text-amber-400 text-[10px] sm:text-xs tracking-widest uppercase">The faces of Jumuia</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mt-2 sm:mt-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Meet the 
            <span className="block text-amber-400 italic">team</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className={`group transition-all duration-700 transform ${
                isTeamVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-xl sm:rounded-2xl">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Hover info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-xs sm:text-sm">{member.favorite}</p>
                  <p className="text-white/60 text-[8px] sm:text-[10px] md:text-xs">Loves: {member.favorite}</p>
                </div>
              </div>
              
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900">{member.name}</h3>
              <p className="text-amber-400 text-xs sm:text-sm mb-1 sm:mb-2">{member.role}</p>
              <p className="text-gray-500 text-[10px] sm:text-xs">With us since {member.since}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section - Responsive */}
      <section 
        id="awards"
        ref={awardsRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl my-8 sm:my-10 md:my-12"
      >
        <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 transform ${
          isAwardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <span className="text-amber-400 text-[10px] sm:text-xs tracking-widest uppercase">Recognition</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mt-2 sm:mt-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Awards & 
            <span className="block text-amber-400 italic">Accolades</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {awards.map((award, index) => (
            <div 
              key={index}
              className={`p-4 sm:p-5 md:p-6 border border-amber-100 rounded-lg sm:rounded-xl hover:shadow-md transition-all duration-700 transform ${
                isAwardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-amber-400 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{award.year}</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{award.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-3">{award.organization}</p>
              <p className="text-xs sm:text-sm text-gray-500">{award.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section - Responsive */}
      <section 
        id="gallery"
        ref={galleryRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 transform ${
          isGalleryVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <span className="text-amber-400 text-[10px] sm:text-xs tracking-widest uppercase">Our Work</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mt-2 sm:mt-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Beautiful 
            <span className="block text-amber-400 italic">Transformations</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {gallery.map((item, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-lg sm:rounded-xl aspect-square transition-all duration-700 transform ${
                isGalleryVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-white text-xs sm:text-sm md:text-base font-medium">{item.title}</h4>
                <p className="text-white/60 text-[8px] sm:text-[10px] md:text-xs">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1400&auto=format" 
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-5 md:mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Ready to feel at home?
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Come experience Jumuia for yourself. First-time visitors get 20% off their first service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button onClick= {() => router.push('/features/BookAppointment')} className="bg-amber-400 hover:bg-amber-300 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all hover:shadow-xl transform hover:-translate-y-1">
              Book an Appointment
            </button>
            <button className="border border-white/30 hover:border-amber-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all hover:bg-white/10">
              Take a Virtual Tour
            </button>
          </div>
          
          <p className="text-white/40 text-xs sm:text-sm mt-6 sm:mt-8">
            No pressure. Just good conversation and great service.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease-out forwards;
        }
        
        .animate-scroll {
          animation: scroll 1.8s infinite;
        }
      `}</style>
    </main>
  )
}

export default AboutPage