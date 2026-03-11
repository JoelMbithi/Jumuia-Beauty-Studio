import React from "react";

const WhyChooseUs = () => {
  const items = [
    {
      title: "Expert Hands, Stunning Results",
      desc: "Our skilled team ensures every treatment brings out your natural beauty.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="10" r="3" />
          <path d="M11 13c1.3-.6 3-.6 4.3 0 1.7.7 2.7 1.7 3.7 1.7" />
          <rect x="2" y="16" width="20" height="3.2" rx="1.6" />
        </svg>
      ),
    },
    {
      title: "High-Quality Products Only",
      desc: "We use premium, trusted products for safe and effective beauty care.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 2.5-7.5L2 9h7l3-7z" />
        </svg>
      ),
    },
    {
      title: "Luxurious, Relaxing Atmosphere",
      desc: "Experience ultimate comfort and relaxation in our serene salon environment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 12 2 12s4.477 10 10 10 10-10 10-10S17.523 2 12 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      title: "Attention to Every Detail",
      desc: "Our dedication to perfection means every detail is thoughtfully handled.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Tailored Beauty Solutions",
      desc: "Personalized services designed to meet your unique beauty needs and goals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
          <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="6" r="2" />
          <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="12" r="2" />
          <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      ),
    },
    {
      title: "Comprehensive Beauty Care",
      desc: "From skincare to hair treatments — everything for complete beauty care.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l10 6-10 6-10-6 10-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l10 6 10-6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 17l10 6 10-6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <p className="text-amber-500 text-xs tracking-[0.4em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-amber-400 inline-block" />
            Why Choose Us
            <span className="w-8 h-px bg-amber-400 inline-block" />
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Personalized{" "}
            <span className="text-amber-500 italic">Beauty Care</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md">
            Every visit is crafted around you — your skin, your style, your comfort.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative p-7 bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 transition-all duration-300 overflow-hidden"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Amber top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-amber-500 mb-5 transition-colors duration-300">
                {item.icon}
              </div>

              {/* Text */}
              <h3
                className="font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}
              >
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Index number — decorative bottom-right */}
              <span
                className="absolute bottom-4 right-5 text-5xl font-bold text-gray-100 group-hover:text-amber-100 transition-colors duration-300 select-none leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;