'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {  ArrowLeft } from 'lucide-react'


// TypeScript interfaces
interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
}

interface ServiceCategory {
  category: string;
  icon: string;
  items: ServiceItem[];
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  stylist: string;
  notes: string;
}

const services: ServiceCategory[] = [
  {
    category: 'Hair',
    icon: '',
    items: [
      { id: 'haircut', name: 'Haircut & Style', duration: '45 min', price: 'Ksh 450' },
      { id: 'blowout', name: 'Blowout & Blowdry', duration: '30 min', price: 'Ksh 350' },
      { id: 'color', name: 'Hair Coloring', duration: '2 hrs', price: 'Ksh 1,200' },
      { id: 'highlights', name: 'Highlights / Balayage', duration: '2.5 hrs', price: 'Ksh 1,500' },
      { id: 'keratin', name: 'Keratin Treatment', duration: '3 hrs', price: 'Ksh 2,000' },
      { id: 'perm', name: 'Perm / Relaxer', duration: '2 hrs', price: 'Ksh 1,100' },
    ],
  },
  {
    category: 'Nails',
    icon: '',
    items: [
      { id: 'manicure', name: 'Classic Manicure', duration: '30 min', price: 'Ksh 250' },
      { id: 'pedicure', name: 'Classic Pedicure', duration: '45 min', price: 'Ksh 350' },
      { id: 'gel-nails', name: 'Gel Nails', duration: '1 hr', price: 'Ksh 500' },
      { id: 'nail-art', name: 'Nail Art', duration: '1 hr', price: 'Ksh 600' },
      { id: 'acrylic', name: 'Acrylic Extensions', duration: '1.5 hrs', price: 'Ksh 700' },
    ],
  },
  {
    category: 'Skin & Face',
    icon: '',
    items: [
      { id: 'facial', name: 'Classic Facial', duration: '1 hr', price: 'Ksh 800' },
      { id: 'deep-cleanse', name: 'Deep Cleanse Facial', duration: '1.5 hrs', price: 'Ksh 1,100' },
      { id: 'eyebrows', name: 'Eyebrow Shaping & Tint', duration: '30 min', price: 'Ksh 300' },
      { id: 'eyelash', name: 'Eyelash Extensions', duration: '2 hrs', price: 'Ksh 1,200' },
      { id: 'waxing', name: 'Full Face Waxing', duration: '45 min', price: 'Ksh 550' },
    ],
  },
  {
    category: 'Body & Massage',
    icon: '',
    items: [
      { id: 'swedish', name: 'Swedish Massage', duration: '1 hr', price: 'Ksh 900' },
      { id: 'deep-tissue', name: 'Deep Tissue Massage', duration: '1 hr', price: 'Ksh 1,100' },
      { id: 'body-wax', name: 'Full Body Wax', duration: '1.5 hrs', price: 'Ksh 1,300' },
      { id: 'body-scrub', name: 'Body Scrub & Wrap', duration: '1 hr', price: 'Ksh 1,000' },
    ],
  },
  {
    category: 'Packages',
    icon: '',
    items: [
      { id: 'bridal', name: 'Bridal Package', duration: '4 hrs', price: 'Ksh 3,500' },
      { id: 'glow', name: 'Glow Up Package', duration: '3 hrs', price: 'Ksh 2,500' },
      { id: 'spa-day', name: 'Full Spa Day', duration: '5 hrs', price: 'Ksh 4,200' },
    ],
  },
]

const stylists: string[] = ['Any Available', 'Sarah M.', 'Amina K.', 'Fatuma L.', 'Grace W.', 'Zainab H.']
const timeSlots: string[] = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
]

const today: string = new Date().toISOString().split('T')[0]

export default function Page() {
  const [step, setStep] = useState<number>(1)
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('Hair')
   const [isSending, setIsSending] = useState<boolean>(false); 
  const route = useRouter()
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', date: '', time: '', stylist: 'Any Available', notes: '',
  })
  const [submitted, setSubmitted] = useState<boolean>(false)

  // Detect mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const toggleService = (item: ServiceItem): void => {
    setSelectedServices(prev =>
      prev.find(s => s.id === item.id)
        ? prev.filter(s => s.id !== item.id)
        : [...prev, item]
    )
  }

  const extractNumericPrice = (priceStr: string): number => {
    // Remove 'Ksh ' and commas, then parse as float
    const numericStr = priceStr.replace('Ksh ', '').replace(/,/g, '')
    return parseFloat(numericStr)
  }

  const totalPrice = selectedServices.reduce((acc: number, s: ServiceItem) => {
    const num = extractNumericPrice(s.price)
    return acc + num
  }, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
  // Send email first
  await sendBookingEmail();
  
  // Then show success message
  setSubmitted(true);
  }

  const sendBookingEmail = async () => {
    setIsSending(true)
  try {
    const response = await fetch('/features/BookAppointment/api/Booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form,
        selectedServices,
        totalPrice,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      console.error('Failed to send email:', data.message);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  } finally{
    setIsSending(false)
  }
};

  const formatKsh = (amount: number): string => {
    return `Ksh ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (submitted) {
    return (
      <div className="min-h-screen  border border-gray-50  font-sans">
        <div className="max-w-[480px] mx-auto mt-16 bg-white rounded p-12 shadow-xs border border-gray-100 text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-900 text-amber-400 text-3xl flex items-center justify-center mx-auto mb-5">
            ✓
          </div>
          <h2 className="text-2xl font-medium text-neutral-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 text-sm mb-6">
            Thank you, <strong>{form.name}</strong>. We'll see you soon.
          </p>
          <div className="bg-gray-50 rounded-lg p-5 mb-4">
            <Row label="Date" value={form.date} />
            <Row label="Time" value={form.time} />
            <Row label="Stylist" value={form.stylist} />
            <Row label="Services" value={selectedServices.map(s => s.name).join(', ')} />
            <Row label="Total" value={formatKsh(totalPrice)} highlight />
          </div>
          <p className="text-gray-400 text-xs mb-6">
            A confirmation will be sent to <strong>{form.email}</strong>
          </p>
          <div className="flex flex-row justify-between ">
             <button 
            className=" text-neutral-900 px-7 border border-gray-200 py-3 rounded-lg font-semibold text-sm hover:bg-amber-50 transition-colors"
            onClick={() => { 
              route.push('/')
            }}
          >
           Close
          </button>
            <button 
            className="bg-amber-400 text-neutral-900 px-7 py-3 rounded-lg font-semibold text-sm hover:bg-amber-500 transition-colors"
            onClick={() => { 
              setSubmitted(false); 
              setStep(1); 
              setSelectedServices([]); 
              setForm({ name: '', phone: '', email: '', date: '', time: '', stylist: 'Any Available', notes: '' }) 
            }}
          >
            Book Another
          </button>

         
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50/40 via-white to-amber-50/40 font-sans pb-16">
      {/* Header */}
     <header className="bg-neutral-900 text-white px-10 py-7 flex items-center justify-between relative">
  {/* Back button - left side */}
  <button 
    onClick={() => window.history.back()} 
    style={{
      all: 'unset',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '4px' : '8px',
      color: 'rgba(255,255,255,.6)',
      fontFamily: "'Mulish', sans-serif",
      fontSize: isMobile ? '11px' : '13px',
      transition: 'color .2s',
      zIndex: 20
    }}
    onMouseEnter={e => (e.currentTarget.style.color = '#FBBF24')}
    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.6)')}
  >
    <ArrowLeft style={{
      width: isMobile ? 12 : 15,
      height: isMobile ? 12 : 15
    }} /> 
    Back
  </button>

  {/* Logo/Brand - right side */}
  <div className="flex items-center gap-4">
    <div className="text-amber-400 text-3xl">✦</div>
    <div>
      <h1 className="text-2xl font-normal tracking-wider m-0">Jumuia Salon</h1>
      <p className="text-amber-400 text-xs tracking-widest uppercase mt-0.5 m-0">Est. 2026</p>
    </div>
  </div>
</header>
      {/* Stepper */}
      <div className="flex items-center justify-center py-7 px-5">
        {['Services', 'Details', 'Confirm'].map((label, i) => {
          const num = i + 1
          const active = step === num
          const done = step > num
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${active ? 'bg-amber-400 text-neutral-900' : 
                    done ? 'bg-neutral-900 text-amber-400' : 
                    'bg-gray-100 text-gray-400'}
                `}>
                  {done ? '✓' : num}
                </div>
                <span className={`text-xs tracking-wider ${
                  active ? 'text-amber-400' : done ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div className={`w-20 h-0.5 mb-5 mx-1 transition-all ${done ? 'bg-amber-400' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Main Card - Glass Effect Applied Here */}
      <div className="max-w-[820px] mx-auto  backdrop-blur-xl p-9 rounded-md border border-gray-50 shadow-xs">

        {/* STEP 1 — Services */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-medium text-neutral-900 mb-1">Choose Your Services</h2>
            <p className="text-gray-600 text-sm mb-6">Select one or more services below</p>

            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap mb-5">
              {services.map(cat => (
                <button
                  key={cat.category}
                  className={`
                    px-4 py-2 rounded border text-sm flex items-center gap-1.5 transition-all
                    ${activeCategory === cat.category 
                      ? 'bg-neutral-900 border-neutral-900 text-amber-400 font-semibold' 
                      : 'border-gray-200 bg-white/50 text-gray-600 hover:border-gray-300'}
                  `}
                  onClick={() => setActiveCategory(cat.category)}
                >
                  <span>{cat.icon}</span> {cat.category}
                </button>
              ))}
            </div>

            {/* Service Grid */}
            {services.filter(c => c.category === activeCategory).map(cat => (
              <div key={cat.category} className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 mb-2">
                {cat.items.map(item => {
                  const selected = !!selectedServices.find(s => s.id === item.id)
                  return (
                    <button
                      key={item.id}
                      className={`
                        p-4 rounded border text-left relative transition-all
                        ${selected 
                          ? 'border-amber-400 bg-amber-400/10 shadow-sm' 
                          : 'border-gray-200 bg-white/50 hover:border-gray-300'}
                      `}
                      onClick={() => toggleService(item)}
                    >
                      {selected && (
                        <div className="absolute top-2.5 right-3 w-5 h-5 rounded-full bg-amber-400 text-neutral-900 text-xs flex items-center justify-center font-bold">
                          ✓
                        </div>
                      )}
                      <p className="font-semibold text-neutral-900 pr-6 mb-2.5 text-sm">{item.name}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">⏱ {item.duration}</span>
                        <span className="font-bold text-green-600 text-sm">{item.price}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            ))}

            {/* Selection summary strip */}
            {selectedServices.length > 0 && (
              <div className="mt-6 p-5 bg-neutral-900/90 backdrop-blur-sm border border-amber-400/30 rounded flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="text-white text-sm">
                    {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                  </span>
                  <span className="text-amber-400 font-semibold text-sm ml-1">
                    · Total: <span className="text-green-400">{formatKsh(totalPrice)}</span>
                  </span>
                </div>
                <button 
                  className="bg-amber-400 text-neutral-900 px-6 py-2.5 rounded font-semibold text-sm hover:bg-amber-500 transition-colors"
                  onClick={() => setStep(2)}
                >
                  Continue →
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Details */}
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3) }}>
            <h2 className="text-2xl font-medium text-neutral-900 mb-1">Your Details</h2>
            <p className="text-gray-600 text-sm mb-6">Tell us a bit about yourself and your preferred time</p>

            <div className="grid grid-cols-2 gap-4 mb-7">
              <Field label="Full Name *" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
              <Field label="Phone Number *" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="07XX XXX XXX" required />
              <Field label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required className="col-span-2" />
              <Field label="Preferred Date *" name="date" type="date" value={form.date} min={today} onChange={handleChange} required />
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600 uppercase tracking-wider">Preferred Time *</label>
                <select 
                  name="time" 
                  value={form.time} 
                  onChange={handleChange} 
                  required 
                  className="p-2.5 rounded-lg border border-gray-200 text-sm text-neutral-900 bg-white/50 focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs text-gray-600 uppercase tracking-wider">Preferred Stylist</label>
                <select 
                  name="stylist" 
                  value={form.stylist} 
                  onChange={handleChange} 
                  className="p-2.5 rounded-lg border border-gray-200 text-sm text-neutral-900 bg-white/50 focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {stylists.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs text-gray-600 uppercase tracking-wider">Special Requests / Notes</label>
                <textarea 
                  name="notes" 
                  value={form.notes} 
                  onChange={handleChange} 
                  placeholder="Any allergies, preferences, or special occasions..." 
                  rows={3} 
                  className="p-2.5 rounded-lg border border-gray-200 text-sm text-neutral-900 bg-white/50 focus:outline-none focus:border-amber-400 transition-colors resize-y"
                />
              </div>
            </div>

            <div className="flex justify-between gap-3 flex-wrap">
              <button 
                type="button" 
                className="px-6 py-2.5 bg-white/50 text-gray-600 border border-gray-200 rounded-lg text-sm hover:bg-white/80 transition-colors"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button 
                type="submit" 
                className="px-7 py-2.5 bg-amber-400 text-neutral-900 rounded font-semibold text-sm hover:bg-amber-500 transition-colors"
              >
                Review Booking →
              </button>
            </div>
          </form>
        )}

        {/* STEP 3 — Confirm */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-medium text-neutral-900 mb-1">Review & Confirm</h2>
            <p className="text-gray-600 text-sm mb-6">Please review your booking before confirming</p>

            <div className="mb-6 pb-5 border-b border-gray-200/50">
              <h3 className="text-xs uppercase tracking-wider text-amber-400 mb-3">Your Information</h3>
              <Row label="Name" value={form.name} />
              <Row label="Phone" value={form.phone} />
              <Row label="Email" value={form.email} />
            </div>

            <div className="mb-6 pb-5 border-b border-gray-200/50">
              <h3 className="text-xs uppercase tracking-wider text-amber-400 mb-3">Appointment</h3>
              <Row label="Date" value={form.date} />
              <Row label="Time" value={form.time} />
              <Row label="Stylist" value={form.stylist} />
            </div>

            <div className="mb-6 pb-5 border-b border-gray-200/50">
              <h3 className="text-xs uppercase tracking-wider text-amber-400 mb-3">Services</h3>
              {selectedServices.map(s => (
                <div key={s.id} className="flex justify-between py-1.5 text-sm text-gray-700 border-b border-dashed border-gray-200/50">
                  <span>{s.name}</span>
                  <span className="text-green-600 font-medium">{s.price}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3.5 font-medium text-neutral-900">
                <span>Total</span>
                <span className="text-green-600 font-bold text-lg">{formatKsh(totalPrice)}</span>
              </div>
            </div>

            {form.notes && (
              <div className="mb-6 pb-5 border-b border-gray-200/50">
                <h3 className="text-xs uppercase tracking-wider text-amber-400 mb-3">Notes</h3>
                <p className="text-gray-600 text-sm m-0">{form.notes}</p>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center my-5 leading-relaxed">
              By confirming, you agree to our cancellation policy. Please arrive 5 minutes early.
            </p>

            <div className="flex justify-between gap-3 flex-wrap">
              <button 
                className="px-6 py-2.5 bg-white/50 text-gray-600 border border-gray-200 rounded-lg text-sm hover:bg-white/80 transition-colors"
                onClick={() => setStep(2)}
              >
                ← Back
              </button>
              <form style={{ display: 'inline' }} onSubmit={handleSubmit}>
                <button 
                  type="submit"
                  className="px-9 py-3 bg-neutral-900 text-amber-400 rounded-lg font-medium tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Confirm Booking ✦
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center pt-8 text-gray-500 text-xs tracking-wider">
        <p>Jumuia Salon · Nairobi, Kenya · +254 743 861 565</p>
      </footer>
    </div>
  )
}

// Field component with TypeScript
interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  className?: string;
}

function Field({ label, name, value, onChange, type = 'text', placeholder, required, min, className = '' }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs text-gray-600 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="p-2.5 rounded-lg border border-gray-200 text-sm text-neutral-900 bg-white/50 focus:outline-none focus:border-amber-400 transition-colors"
      />
    </div>
  )
}

// Row component with TypeScript
interface RowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function Row({ label, value, highlight }: RowProps) {
  return (
    <div className="flex justify-between py-1.5 border-b border-dashed border-gray-200/50">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm text-neutral-900 font-medium max-w-[60%] text-right ${highlight ? 'text-amber-400 font-bold' : ''}`}>
        {value}
      </span>
    </div>
  )
}