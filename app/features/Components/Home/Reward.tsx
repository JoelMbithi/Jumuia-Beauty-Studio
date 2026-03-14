import React from 'react'
import { Award, Sparkles, ShieldCheck, Star, Gift } from "lucide-react";

const Reward = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
      {/* Award Card - Redesigned */}
      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 p-4 w-full md:w-auto hover:bg-white/15 transition-all duration-300 group">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
          <Award className="w-10 h-10 text-amber-400 relative z-10" />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-400/20 text-amber-400 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wider">
              AWARD WINNER 2025
            </span>
          </div>
          <h3 className="text-white font-medium text-sm">Best Beauty Salon</h3>
          <p className="text-white/50 text-xs">Multi award-winning services</p>
        </div>
      </div>

      {/* Offer Card - Redesigned */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-amber-400/10 to-amber-500/5 backdrop-blur-md rounded-lg border border-amber-400/20 p-4 w-full md:w-auto hover:from-amber-400/20 hover:to-amber-500/10 transition-all duration-300 group">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-md group-hover:blur-lg transition-all"></div>
          <Gift className="w-10 h-10 text-amber-400 relative z-10" />
        </div>
        
        <div>
          <span className="text-amber-400 font-bold text-lg tracking-tight">25% OFF</span>
          <h3 className="text-white font-medium text-sm">Eyebrow Tattoo</h3>
          <p className="text-white/50 text-xs">+ many more attractive offers</p>
        </div>
      </div>

      {/* Rating Badge - New Addition */}
      <div className="hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-white/60 text-xs mt-1">4.9 (2.5k+ reviews)</span>
        </div>
        <div className="w-px h-8 bg-white/10"></div>
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-white/20"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reward