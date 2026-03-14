import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type SubmenuItem = {
  name: string;
  path: string;
  description?: string;
  url?: string;
}

type MenuItem = {
  name: string;
  hasDropdown: boolean;
  path: string;
  submenu?: SubmenuItem[];
}

const Navbar = () => {
  const router = useRouter()
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>('Home')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)


  const menuItems: MenuItem[] = [
    { name: 'Home', hasDropdown: false, path: 'home' },
   {
  name: 'About', hasDropdown: true, path: 'about',
  submenu: [
    { name: 'Our Story', path: 'story', description: 'Discover our journey and passion for beauty', url: '/features/About#story' },
    { name: 'Team', path: 'team', description: 'Meet our expert stylists and professionals', url: '/features/About#team' },
    { name: 'Gallery', path: 'gallery', description: 'Browse our beautiful transformations', url: '/features/About#gallery' },
    { name: 'Awards', path: 'awards', description: 'Recognition for our excellence', url: '/features/About#awards' }
  ]
},
    {
      name: 'Services', hasDropdown: true, path: 'services',
      submenu: [
        { name: 'Hair Care', path: 'hair', description: 'Cut, color, styling & treatments', url: '/features/Services' },
        { name: 'Skin Care', path: 'skin', description: 'Facials, peels & rejuvenation', url: '/features/Services' },
        { name: 'Nail Art', path: 'nails', description: 'Manicure, pedicure & designs', url: '/features/Services' },
        { name: 'Makeup', path: 'makeup', description: 'Bridal, event & everyday glam', url: '/features/Services' },
        { name: 'Bridal', path: 'bridal', description: 'Complete bridal packages', url: '/features/Services' }
      ]
    },
    {
      name: 'Offers', hasDropdown: true, path: 'offers',
      submenu: [
        { name: 'Special Packages', path: 'packages', description: 'Curated beauty experiences', url: '/features/Offers#packages' },
        { name: 'Seasonal Deals', path: 'seasonal', description: 'Limited time offers', url: '/features/Offers#seasonalDeals' },
        { name: 'Membership', path: 'membership', description: 'Exclusive member benefits', url: '/features/Offers#membership' },
        { name: 'Gift Cards', path: 'gifts', description: 'Perfect gifts for loved ones', url: '/features/Offers#gifts' }
      ]
    },
    { name: 'Reviews', hasDropdown: true, path: 'reviews',
      submenu: [
        {name: 'Customer Testimonials', path: 'testimonials', description: 'Hear from our satisfied clients', url: '/features/Reviews#testimonials' },
        {name: 'Before & After', path: 'beforeafter', description: 'See our stunning transformations', url: '/features/Reviews#beforeafter' },
        {name: 'Press & Media', path: 'press', description: 'Our features in the media', url: '/features/Reviews#press' },
        {name: 'Awards & Recognition', path: 'awards', description: 'Our accolades and achievements', url: '/features/Reviews#awards' }
      ]
     },
    {
      name: 'Contact', hasDropdown: true, path: 'contact',
      submenu: [
        { name: 'Locations', path: 'locations', description: 'Find a salon near you', url: '/features/Contact' },
        { name: 'Book Appointment', path: 'book', description: 'Schedule your visit', url: '/features/Contact' },
        { name: 'FAQ', path: 'faq', description: 'Answers to common questions', url: '/features/Contact' },
        { name: 'Support', path: 'support', description: 'Get in touch with us', url: '/features/Contact' }
      ]
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const scrollPosition = window.scrollY + 100
      for (const item of menuItems) {
        const element = document.getElementById(item.name.toLowerCase())
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.name)
            break
          }
        }
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
      setOpenDropdown(null)
    }
  }

  const handleDropdownClick = (itemName: string, e: React.MouseEvent) => {
    e.preventDefault()
    setOpenDropdown(openDropdown === itemName ? null : itemName)
  }

  const handleSubmenuClick = (path: string, url?: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    console.log("Submenu clicked with path:", path, "url:", url)
    
    if (url) {
      router.push(url)
    } else {
      scrollToSection(path)
    }
    
    setOpenDropdown(null)
    setMobileMenuOpen(false)
  }

  const activeDropdownItem = openDropdown ? menuItems.find(item => item.name === openDropdown) : null

  return (
    <div ref={navRef} className="relative">
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-lg shadow-2xl' : 'bg-gradient-to-b from-black/60 via-black/40 to-transparent'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
          <span className="text-amber-400 text-3xl transform group-hover:rotate-180 transition-transform duration-700">✦</span>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-[0.3em] text-lg uppercase leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Lumière
            </span>
            <span className="text-[8px] text-amber-400/60 tracking-[0.5em] uppercase">Beauty Studio</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-white/80 text-xs tracking-widest uppercase">
          {menuItems.map((item) => (
            <li key={item.name} className="relative">
              <button
                onClick={(e) => {
                  if (item.hasDropdown) {
                    handleDropdownClick(item.name, e);
                  } else {
                    scrollToSection(item.name);
                  }
                }}
                className={`cursor-pointer transition-all duration-300 relative flex items-center px-2 py-1 ${
                  activeSection === item.name || openDropdown === item.name ? 'text-amber-400' : 'hover:text-amber-400'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-amber-400 transition-all duration-300 ${
                    activeSection === item.name || openDropdown === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Book Now CTA */}
        <button onClick= {() => router.push('/features/BookAppointment')} className="hidden md:block relative overflow-hidden group">
          <span className="relative z-10 text-xs tracking-widest uppercase border border-amber-400 text-amber-400 px-6 py-2.5 hover:text-black transition-colors duration-300 rounded-sm block">
            Book Now
          </span>
          <span className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </button>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            {mobileMenuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 text-white right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 py-6 px-6 md:hidden animate-fadeIn max-h-[80vh] overflow-y-auto">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item.name} className="border-b border-white/5 last:border-0">
                  <button
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        handleDropdownClick(item.name, e);
                      } else {
                        scrollToSection(item.name);
                      }
                    }}
                    className={`cursor-pointer transition-all duration-300 relative flex items-center px-2 py-1 ${
                      activeSection === item.name || openDropdown === item.name ? 'text-amber-400' : 'hover:text-amber-400'
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-amber-400 transition-all duration-300 ${
                        activeSection === item.name || openDropdown === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>

                  {item.hasDropdown && openDropdown === item.name && item.submenu && (
                    <div className="pl-4 pb-2 space-y-2 animate-slideDown">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={(e) => handleSubmenuClick(subItem.path, subItem.url, e)}
                          className="w-full text-left py-2 px-3 text-white/60 hover:text-amber-400 text-xs tracking-wider cursor-pointer transition-colors border-l border-white/10 hover:border-amber-400"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li className="pt-6">
                <button  onClick={() => router.push('/features/BookAppointment')}  className="w-full bg-amber-400 text-black text-sm tracking-widest uppercase px-6 py-4 rounded-sm font-semibold hover:bg-amber-300 transition-colors">
                  Book Now
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Full-width Dropdown Panel */}
     {openDropdown && activeDropdownItem?.submenu && (
  <div 
    className="fixed left-0 right-0 z-40 bg-whit/10 backdrop-blur-md  shadow-lg"
    style={{ 
      top: scrolled ? '72px' : '80px',
    }}
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
      {/* Category title */}
      <p className="text-xs text-amber-500 tracking-wider mb-6 flex items-center gap-2">
        <span className="w-6 h-px bg-amber-300"></span>
        {openDropdown}
      </p>
      
      {/* Simple, clean list */}
      <div className="flex flex-wrap gap-x-12 gap-y-6">
        {activeDropdownItem.submenu.map((subItem) => (
          <button
            key={subItem.name}
            onClick={(e) => handleSubmenuClick(subItem.path, subItem.url, e)}
            className="group text-left"
          >
            <span className="text-gray-900 text-sm font-medium group-hover:text-amber-600 transition-colors">
              {subItem.name}
            </span>
            {subItem.description && (
              <p className="text-xs text-gray-400 group-hover:text-amber-500/70 mt-0.5 max-w-[180px]">
                {subItem.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
)}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
      `}</style>
    </div>
  )
}

export default Navbar