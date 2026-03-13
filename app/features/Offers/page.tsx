"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Gift, Sparkles, Calendar, Heart, Clock, Users, Star, Tag, ChevronRight } from 'lucide-react'

const OffersPage = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const gifts = useRef<HTMLDivElement>(null)
  const membership = useRef<HTMLDivElement>(null)
  const AvailableOffers = useRef<HTMLDivElement>(null)
  const packages = useRef<HTMLDivElement>(null)

  const categories = [
    { id: 'all', label: 'All Offers', icon: '' },
    { id: 'packages', label: 'Packages', icon: '' },
    { id: 'seasonal', label: 'Seasonal', icon: '' },
    { id: 'membership', label: 'Membership', icon: '' },
    { id: 'gifts', label: 'Gift Cards', icon: '' }
  ]

  const offers = [
    // Special Packages
    {
      id: 1,
      category: 'packages',
      title: 'Bridal Beauty Package',
      description: 'Complete bridal preparation including hair trial, makeup trial, full wedding day styling, and a relaxing facial one week before.',
      price: 'KES 25,000',
      originalPrice: 'KES 32,000',
      discount: '20% off',
      validUntil: 'Valid throughout 2025',
      popular: true,
      image: 'https://images.unsplash.com/photo-1583939411023-1478317e950c?w=600&auto=format',
      includes: ['Hair trial & styling', 'Makeup trial & application', 'Deep cleansing facial', 'Bridal shimmer touch']
    },
    {
      id: 2,
      category: 'packages',
      title: 'Self-Care Sunday',
      description: 'Three hours of pure relaxation. Manicure, pedicure, and a custom facial tailored to your skin.',
      price: 'KES 8,500',
      originalPrice: 'KES 11,000',
      discount: '23% off',
      validUntil: 'Valid Sundays only',
      popular: false,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format',
      includes: ['Spa manicure', 'Spa pedicure', '60-min custom facial', 'Herbal tea service']
    },
    {
      id: 3,
      category: 'packages',
      title: 'Mother & Daughter Day',
      description: 'Share the experience. Two mini facials, two manicures, and afternoon treats.',
      price: 'KES 14,500',
      originalPrice: 'KES 19,000',
      discount: '24% off',
      validUntil: 'Valid any weekday',
      popular: true,
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format',
      includes: ['2 mini facials', '2 classic manicures', 'Champagne or juice', 'Take-home gift set']
    },

    // Seasonal Deals
    {
      id: 4,
      category: 'seasonal',
      title: 'March Glow',
      description: 'Welcome the new season with a brightening facial and a fresh haircut. Perfect for a fresh start.',
      price: 'KES 6,500',
      originalPrice: 'KES 8,200',
      discount: '21% off',
      validUntil: 'Valid until March 31st',
      popular: false,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format',
      includes: ['Brightening facial', 'Haircut & blow-dry', 'Style consultation']
    },
    {
      id: 5,
      category: 'seasonal',
      title: 'Easter Special',
      description: 'Get ready for the holidays with a complete nail makeover and a mini make-up touch up.',
      price: 'KES 4,800',
      originalPrice: 'KES 6,500',
      discount: '26% off',
      validUntil: 'April 15-22 only',
      popular: true,
      image: 'https://images.unsplash.com/photo-1610992015732-2449b0bb0a86?w=600&auto=format',
      includes: ['Gel manicure', 'Pedicure', 'Mini makeup touch-up']
    },
    {
      id: 6,
      category: 'seasonal',
      title: 'First Time Visitor',
      description: 'New to Jumuia? We saved a seat for you. First time guests enjoy any single service at a special rate.',
      price: 'KES 3,500',
      originalPrice: 'KES 5,000',
      discount: '30% off',
      validUntil: 'First visit only',
      popular: true,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format',
      includes: ['Choice of 1 service', 'Welcome drink', 'Take-home sample']
    },

    // Membership
    {
      id: 7,
      category: 'membership',
      title: 'The Regular',
      description: 'For those who like to pop in monthly. One service per month, rolled over if you miss a month.',
      price: 'KES 3,200/month',
      originalPrice: 'KES 4,800',
      discount: '33% savings',
      validUntil: 'Min. 3 months',
      popular: false,
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&auto=format',
      includes: ['1 service monthly', '10% off extras', 'Birthday treat', 'No commitment']
    },
    {
      id: 8,
      category: 'membership',
      title: 'The Devoted',
      description: 'Our most loved membership. Two services monthly plus priority booking and exclusive events.',
      price: 'KES 5,800/month',
      originalPrice: 'KES 8,500',
      discount: '32% savings',
      validUntil: 'Min. 6 months',
      popular: true,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format',
      includes: ['2 services monthly', '15% off products', 'Priority booking', 'Member-only nights']
    },
    {
      id: 9,
      category: 'membership',
      title: 'Couples Membership',
      description: 'Share the love. Two memberships for the price of one and a half. Perfect for partners or best friends.',
      price: 'KES 8,900/month',
      originalPrice: 'KES 11,600',
      discount: '23% off',
      validUntil: 'For two people',
      popular: false,
      image: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=600&auto=format',
      includes: ['2 memberships', 'Shared appointment times', 'Double points']
    },

    // Gift Cards
    {
      id: 10,
      category: 'gifts',
      title: 'Little Treat',
      description: 'Small but thoughtful. Perfect for a friend who deserves a pick-me-up.',
      price: 'KES 2,500',
      originalPrice: null,
      discount: null,
      validUntil: 'Valid 12 months',
      popular: false,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&auto=format',
      includes: ['Redeemable for any service under KES 3,000']
    },
    {
      id: 11,
      category: 'gifts',
      title: 'Spa Day',
      description: 'The full experience. Give someone a whole day of feeling beautiful.',
      price: 'KES 10,000',
      originalPrice: null,
      discount: null,
      validUntil: 'Valid 12 months',
      popular: true,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format',
      includes: ['Any combination of services up to KES 10,000']
    },
    {
      id: 12,
      category: 'gifts',
      title: 'Create Your Own',
      description: 'Let them choose. A gift card in any amount you decide.',
      price: 'From KES 1,000',
      originalPrice: null,
      discount: null,
      validUntil: 'Valid 12 months',
      popular: false,
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&auto=format',
      includes: ['Choose the amount', 'Digital or physical card', 'Personal message']
    }
  ]

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section - Responsive */}
      <section className="relative h-[35vh] sm:h-[40vh] md:h-[50vh] flex items-end overflow-hidden">
        <img 
          src="/offers-hero.jpg" 
          alt="Jumuia Special Offers" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        
        {/* Back Button - Responsive */}
        <button 
          onClick={() => router.back()}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-20 flex items-center gap-1 sm:gap-2 text-white hover:text-amber-400 transition-colors group bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="relative z-10 px-4 sm:px-6 md:px-12 pb-8 sm:pb-10 md:pb-12 lg:pb-16 w-full">
          <p className="text-amber-400 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3">
            Limited Time Offers
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-2 sm:mb-3 md:mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Special <span className="text-amber-400 italic">Treatments</span>
          </h1>
          <p className="text-white/80 max-w-xl text-xs sm:text-sm md:text-base">
            We believe everyone deserves a little pampering. Here's your chance to experience luxury at a fraction of the price.
          </p>
        </div>
      </section>

      {/* Category Pills - Responsive */}
      <section id="packages" ref={packages} className="sticky top-0 z-30 bg-white/20 backdrop-blur-md border-b border-gray-200 py-2 sm:py-3 md:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-black font-medium shadow-md'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Grid - Responsive */}
      <section id="packages" ref={packages} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="group relative bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
              onMouseEnter={() => setHoveredId(offer.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container - Responsive */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Tags - Responsive */}
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex gap-1 sm:gap-2">
                  {offer.popular && (
                    <span className="bg-amber-400 text-black text-[8px] sm:text-[10px] md:text-xs font-bold px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-0.5 sm:gap-1">
                      <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" /> Popular
                    </span>
                  )}
                  {offer.discount && (
                    <span className="bg-black/80 text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
                      {offer.discount}
                    </span>
                  )}
                </div>

                {/* Category Tag - Responsive */}
                <span className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white/60 backdrop-blur-sm text-gray-800 text-[8px] sm:text-[10px] md:text-xs px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-0.5 sm:gap-1">
                  <Tag className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                  {offer.category}
                </span>

                {/* Price Badge - Responsive */}
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 shadow-lg">
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">{offer.price}</span>
                      {offer.originalPrice && (
                        <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-400 line-through">{offer.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content - Responsive */}
              <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{offer.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                  {offer.description}
                </p>

                {/* Quick Actions - Responsive */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <button 
                    onClick={() => toggleExpand(offer.id)}
                    className="text-amber-600 text-xs sm:text-sm flex items-center gap-0.5 sm:gap-1 hover:gap-1 sm:hover:gap-2 transition-all"
                  >
                    {expandedId === offer.id ? 'Show less' : "What's included"}
                    <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${expandedId === offer.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Expanded Details - Responsive */}
                {expandedId === offer.id && (
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 md:p-4 bg-amber-50 rounded-lg sm:rounded-xl animate-slideDown">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2">This offer includes:</p>
                    <ul className="space-y-1 sm:space-y-2">
                      {offer.includes.map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm text-gray-700 flex items-center gap-1 sm:gap-2">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                          <span className="text-[10px] sm:text-xs md:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Validity - Responsive */}
                <div className="flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[10px] md:text-xs text-amber-600 bg-amber-50 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{offer.validUntil}</span>
                </div>

                {/* Book Button - Responsive */}
                <button className="w-full border border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 text-gray-800 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm transition-all hover:-translate-y-0.5 font-medium">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Membership Banner - Responsive */}
      <section id="membership" ref={membership} className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] my-8 sm:my-10 md:my-12">
        <img 
          src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1200&auto=format" 
          alt="Luxury Salon Experience"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center">
          <div className="max-w-xl">
            <span className="text-amber-400 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase mb-2 sm:mb-3 md:mb-4 block">Join The Club</span>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-3 sm:mb-4 md:mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Become a <span className="text-amber-400 italic">Member</span>
            </h2>
            <p className="text-white/80 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
              Members enjoy exclusive pricing, priority booking, and a free birthday treatment every year.
            </p>
            
            <div className="flex gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400">200+</div>
                <div className="text-white/60 text-[8px] sm:text-[10px] md:text-xs">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400">15%</div>
                <div className="text-white/60 text-[8px] sm:text-[10px] md:text-xs">Member Discount</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400">Free</div>
                <div className="text-white/60 text-[8px] sm:text-[10px] md:text-xs">Birthday Treat</div>
              </div>
            </div>

            <button className="bg-amber-400 hover:bg-amber-300 text-black px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all hover:shadow-lg hover:-translate-y-0.5">
              View Membership Options
            </button>
          </div>
        </div>
      </section>

      {/* Gift Cards Section - Responsive */}
      <section id="gifts" ref={gifts} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
          {/* Main gift card CTA - Responsive */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 border border-gray-100">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-amber-600 mb-3 sm:mb-4">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-medium tracking-wider">GIFT CARDS</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                The gift of beauty, 
                <span className="text-amber-600 italic block">their way</span>
              </h3>
              
              <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8">
                Whether it's for a birthday, anniversary, or just because — 
                let them choose exactly what they need.
              </p>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">KES 1,000</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-400 ml-1 sm:ml-2">min</span>
                </div>
                <div className="bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Instant</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-400 ml-1 sm:ml-2">delivery</span>
                </div>
                <div className="bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">12 months</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-400 ml-1 sm:ml-2">valid</span>
                </div>
              </div>
              
              <button className="bg-black hover:bg-gray-800 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded text-xs sm:text-sm tracking-wide transition-colors">
                Give a Gift Card
              </button>
            </div>
          </div>

          {/* Testimonials column - Responsive */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-sm">
              <p className="text-gray-600 text-xs sm:text-sm italic mb-3 sm:mb-4">
                "Bought this for my mum and she's already planning her third visit. Best daughter ever? I think so."
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108777-466d103a8a3b?w=100&auto=format" 
                  alt=""
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Njeri K.</p>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">Gave a Spa Day card</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-amber-100">
              <p className="text-gray-700 text-xs sm:text-sm italic mb-3 sm:mb-4">
                "My sister gifted me a facial and now I'm the one buying her a membership. This place is special."
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format" 
                  alt=""
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Amina W.</p>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500">Now a regular</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar - Responsive */}
      <section className="border-t border-gray-200 bg-white py-4 sm:py-5 md:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">12 Active Offers</p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">New deals monthly</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">Limited Time</p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">Book before they're gone</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">200+ Members</p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">Join the family</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">Gift Cards</p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">From KES 1,000</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </main>
  )
}

export default OffersPage