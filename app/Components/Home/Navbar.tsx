"use client"
import React, { useState, useEffect, useRef } from 'react'

type SubmenuItem = {
  name: string;
  path: string;
  description?: string;
}

type MenuItem = {
  name: string;
  hasDropdown: boolean;
  path: string;
  submenu?: SubmenuItem[];
}

const Navbar = () => {
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
        { name: 'Our Story', path: 'story', description: 'Discover our journey and passion for beauty' },
        { name: 'Team', path: 'team', description: 'Meet our expert stylists and professionals' },
        { name: 'Gallery', path: 'gallery', description: 'Browse our beautiful transformations' },
        { name: 'Awards', path: 'awards', description: 'Recognition for our excellence' }
      ]
    },
    {
      name: 'Services', hasDropdown: true, path: 'services',
      submenu: [
        { name: 'Hair Care', path: 'hair', description: 'Cut, color, styling & treatments' },
        { name: 'Skin Care', path: 'skin', description: 'Facials, peels & rejuvenation' },
        { name: 'Nail Art', path: 'nails', description: 'Manicure, pedicure & designs' },
        { name: 'Makeup', path: 'makeup', description: 'Bridal, event & everyday glam' },
        { name: 'Bridal', path: 'bridal', description: 'Complete bridal packages' }
      ]
    },
    {
      name: 'Offers', hasDropdown: true, path: 'offers',
      submenu: [
        { name: 'Special Packages', path: 'packages', description: 'Curated beauty experiences' },
        { name: 'Seasonal Deals', path: 'seasonal', description: 'Limited time offers' },
        { name: 'Membership', path: 'membership', description: 'Exclusive member benefits' },
        { name: 'Gift Cards', path: 'gifts', description: 'Perfect gifts for loved ones' }
      ]
    },
    { name: 'Reviews', hasDropdown: false, path: 'reviews' },
    {
      name: 'Contact', hasDropdown: true, path: 'contact',
      submenu: [
        { name: 'Locations', path: 'locations', description: 'Find a salon near you' },
        { name: 'Book Appointment', path: 'book', description: 'Schedule your visit' },
        { name: 'FAQ', path: 'faq', description: 'Answers to common questions' },
        { name: 'Support', path: 'support', description: 'Get in touch with us' }
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
  const handleSubmenuClick = (path: string) => {
    scrollToSection(path)
    setOpenDropdown(null)
  }

  // Get the active dropdown item
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
        <button className="hidden md:block relative overflow-hidden group">
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
                          onClick={() => handleSubmenuClick(subItem.path)}
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
                <button className="w-full bg-amber-400 text-black text-sm tracking-widest uppercase px-6 py-4 rounded-sm font-semibold hover:bg-amber-300 transition-colors">
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
          className="fixed left-0 right-0 w-full z-40 bg-black/95 backdrop-blur-lg border-t border-white/10 shadow-2xl"
          style={{ 
            top: scrolled ? '72px' : '80px',
          }}
        >
          <div className="w-full px-6 md:px-16 lg:px-24 py-12">
            {/* Dropdown header */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-amber-400/30 inline-block" />
              <span className="text-amber-400/50 text-xs tracking-[0.4em] uppercase">
                {openDropdown}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {activeDropdownItem.submenu.map((subItem) => (
                <div
                  key={subItem.name}
                  onClick={() => handleSubmenuClick(subItem.path)}
                  className="group cursor-pointer p-5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-amber-400/30 transition-all duration-300"
                >
                  <h3 className="text-amber-400 text-sm font-semibold mb-2 group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                    {subItem.name}
                  </h3>
                  {subItem.description && (
                    <p className="text-white/50 text-xs leading-relaxed">{subItem.description}</p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-amber-400/50 text-[10px] tracking-widest uppercase">
                    <span>View</span>
                    <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
                  </div>
                </div>
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