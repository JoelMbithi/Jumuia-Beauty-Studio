'use client'
import React, { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Types
type FormData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

type HourData = {
  day: string;
  time: string;
}

type SocialData = {
  label: string;
  handle: string;
  href: string;
}

const HOURS: HourData[] = [
  { day: 'Monday – Friday', time: '8:00 AM – 7:00 PM' },
  { day: 'Saturday',        time: '9:00 AM – 6:00 PM' },
  { day: 'Sunday',          time: '2:00 PM – 4:00 PM' },
]

const SOCIALS: SocialData[] = [
  { label: 'Instagram',  handle: '@JumuiaBeautyStudio',  href: '#' },
  { label: 'TikTok',     handle: '@JumuiaBeautyStudio',  href: '#' },
  { label: 'WhatsApp',   handle: '+254 743 861 565', href: '#' },
]

export default function Page() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState<boolean>(false)
  const [focused, setFocused] = useState<string>('')
  const [loaded, setLoaded] = useState<boolean>(false)
  const router = useRouter()
  const [isSending, setIsSending] = useState<boolean>(false);
const [emailError, setEmailError] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }
  
  const onSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 

    const emailSent = await sendContactEmail()

    if(emailSent){
        setSent(true)
    }else {
        alert('failed to send message. Please try again')
    }
    setSent(true) 
  }

  const inputCls = (name: string) =>
    `w-full bg-neutral-50 border rounded-lg px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 ${
      focused === name ? 'border-amber-400' : 'border-neutral-200'
    }`

  useEffect(() => {
    // Small delay so fonts are ready before animating in
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const scrollToSection = (section: string) => {
    // This function is called from the logo click
    const element = document.getElementById(section.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sendContactEmail = async () => {
  setIsSending(true);
  setEmailError('');
  
  try {
    const response = await fetch('/features/Contact/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form,
      }),
    });

    const data = await response.json();
    
    if (!data.success) {
      setEmailError('Failed to send message. Please try again.');
      console.error('Failed to send email:', data.message);
      return false;
    }
    return true;
  } catch (error) {
    setEmailError('Network error. Please check your connection.');
    console.error('Error sending email:', error);
    return false;
  } finally {
    setIsSending(false);
  }
};

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Header with Background Image ── */}
      <header 
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Fsb258ZW58MHx8MHx8fDA%3D')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        
        {/* Top bar with Back button and Logo */}
        <div className="absolute top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 z-20 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 md:gap-2 text-white hover:text-amber-400 transition-colors group bg-black/30 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          {/* Logo - positioned on the right */}
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => scrollToSection('home')}
          >
            <span className="text-amber-400 text-3xl transform group-hover:rotate-180 transition-transform duration-700">✦</span>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-[0.3em] text-lg uppercase leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Lumière
              </span>
              <span className="text-[8px] text-amber-400/60 tracking-[0.5em] uppercase">Beauty Studio</span>
            </div>
          </div>
        </div>

        {/* Content - centered with max-width */}
        <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="max-w-[820px] mx-auto">
            <p className="text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-3">Get in touch</p>
            <h1 className="text-white text-4xl font-bold tracking-tight leading-tight m-0">
              We&apos;d love to<br />hear from you.
            </h1>
            <p className="text-neutral-400 text-sm mt-4 max-w-md leading-relaxed">
              Questions, booking enquiries, or just want to say hi — drop us a message and we&apos;ll get back to you within the hour during business hours.
            </p>
          </div>
        </div>
      </header>

      {/* ── Main grid ── */}
      <div className="max-w-[820px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">

        {/* ── Left: Form ── */}
        <div>
          {sent ? (
            <div className="border border-neutral-200 rounded-xl p-10 text-center">
              <div className="w-12 h-12 bg-amber-400 text-neutral-900 text-xl font-bold rounded-lg flex items-center justify-center mx-auto mb-4">
                ✓
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Message sent!</h2>
              <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                Thanks, <strong>{form.name}</strong>. We&apos;ll reply to <strong>{form.email}</strong> shortly.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name:'', phone:'', email:'', subject:'', message:'' }) }}
                className="bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Full name <span className="text-amber-400">*</span>
                  </label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={onChange} 
                    required
                    placeholder="Enter your name"
                    onFocus={() => setFocused('name')} 
                    onBlur={() => setFocused('')}
                    className={inputCls('name')} 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Phone
                  </label>
                  <input 
                    name="phone" 
                    value={form.phone} 
                    onChange={onChange} 
                    type="tel"
                    placeholder="Enter your phone number"
                    onFocus={() => setFocused('phone')} 
                    onBlur={() => setFocused('')}
                    className={inputCls('phone')} 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Email address <span className="text-amber-400">*</span>
                </label>
                <input 
                  name="email" 
                  value={form.email} 
                  onChange={onChange} 
                  required 
                  type="email"
                  placeholder="Enter your email"
                  onFocus={() => setFocused('email')} 
                  onBlur={() => setFocused('')}
                  className={inputCls('email')} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Subject
                </label>
                <select 
                  name="subject" 
                  value={form.subject} 
                  onChange={onChange}
                  onFocus={() => setFocused('subject')} 
                  onBlur={() => setFocused('')}
                  className={inputCls('subject')}
                >
                  <option value="">Select a topic</option>
                  <option>Booking enquiry</option>
                  <option>Price & services</option>
                  <option>Bridal & events</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Message <span className="text-amber-400">*</span>
                </label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={onChange} 
                  required 
                  rows={5}
                  placeholder="Tell us how we can help..."
                  onFocus={() => setFocused('message')} 
                  onBlur={() => setFocused('')}
                  className={`${inputCls('message')} resize-none`} 
                />
              </div>

              <div className="pt-1">
               <button 
  type="submit"
  disabled={isSending}
  className={`bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold text-sm px-8 py-3 rounded-lg transition-colors w-full sm:w-auto ${
    isSending ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {isSending ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending...
    </span>
  ) : (
    'Send message →'
  )}
</button>
              </div>
            </form>
          )}
        </div>

        {/* ── Right: Info sidebar ── */}
        <div className="space-y-6">

          {/* Visit us */}
          <div className="border border-neutral-200 rounded-xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-3">Visit us</p>
            <p className="text-sm font-semibold text-neutral-900 leading-snug mb-1">Jumuia Beauty Studio</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              14 Kimathi Street<br />
              Nairobi CBD, Kenya
            </p>
            <a 
  href="https://www.google.com/maps/place/Kimathi+Street,+Nairobi,+Kenya"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-3 text-xs font-semibold text-neutral-900 border border-neutral-200 px-4 py-2 rounded-lg hover:border-amber-400 hover:text-amber-500 transition-colors"
>
  Open in Maps ↗
</a>
          </div>

          {/* Call / email */}
          <div className="border border-neutral-200 rounded-xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-3">Call or email</p>
            <div className="space-y-2.5">
              <a 
                href="tel:+254743861565"
                className="flex items-center gap-3 group"
              >
                <span className="w-8 h-8 bg-neutral-100 group-hover:bg-amber-400 rounded-lg flex items-center justify-center text-sm transition-colors">📞</span>
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">+254 743 861 565</span>
              </a>
              <a 
                href="mailto:hello@JumuiaBeautyStudio.co.ke"
                className="flex items-center gap-3 group"
              >
                <span className="w-8 h-8 bg-neutral-100 group-hover:bg-amber-400 rounded-lg flex items-center justify-center text-sm transition-colors">✉️</span>
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">jumuiabeautystudio.co.ke</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="border border-neutral-200 rounded-xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-3">Hours</p>
            <div className="space-y-2">
              {HOURS.map((h: HourData) => (
                <div key={h.day} className="flex justify-between gap-2 text-sm border-b border-neutral-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-neutral-500">{h.day}</span>
                  <span className="font-medium text-neutral-900 text-right">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="border border-neutral-200 rounded-xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-3">Follow us</p>
            <div className="space-y-2.5">
              {SOCIALS.map((s: SocialData) => (
                <a 
                  key={s.label} 
                  href={s.href}
                  className="flex items-center justify-between group"
                >
                  <span className="text-sm text-neutral-500">{s.label}</span>
                  <span className="text-xs font-semibold text-neutral-900 group-hover:text-amber-500 transition-colors">
                    {s.handle} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-100 px-8 py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* logo */}
         
          <span className="text-sm font-semibold text-neutral-900">Jumuia Beauty Studio</span>
          <span className="text-neutral-300 text-sm">·</span>
          <span className="text-sm text-neutral-400">Nairobi, Kenya</span>
        </div>
        <p className="text-xs text-neutral-400">© {new Date().getFullYear()} Jumuia Beauty Studio. All rights reserved.</p>
      </footer>

    </div>
  )
}