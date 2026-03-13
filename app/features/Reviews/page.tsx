"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, ArrowLeft, CheckCircle, ThumbsUp, ArrowUpRight, Sparkles } from 'lucide-react'

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,600&family=Mulish:wght@300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:#f9f6f2;font-family:'Mulish',sans-serif;color:#1a1612}
    :root{
      --g:#FBBF24;--gl:#d4b07a;--gp:#fdf6e8;
      --ink:#1a1612;--i6:rgba(26,22,18,.6);--i2:rgba(26,22,18,.1);
      --cr:#f9f6f2;--wh:#ffffff;--dk:#111009;
    }
    .no-sb::-webkit-scrollbar{display:none}
    .no-sb{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideInR{from{transform:translateX(48px);opacity:0}to{transform:translateX(0);opacity:1}}
    @keyframes slideInL{from{transform:translateX(-48px);opacity:0}to{transform:translateX(0);opacity:1}}
    @keyframes slideOutR{from{transform:translateX(0);opacity:1}to{transform:translateX(48px);opacity:0}}
    @keyframes slideOutL{from{transform:translateX(0);opacity:1}to{transform:translateX(-48px);opacity:0}}
    @keyframes prog{from{width:0}to{width:100%}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    .card-lift{transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease}
    .card-lift:hover{transform:translateY(-5px);box-shadow:0 20px 56px rgba(26,22,18,.12);border-color:rgba(184,151,90,.4)!important}
    .img-zoom img{transition:transform .5s ease}
    .img-zoom:hover img{transform:scale(1.06)}
    .gold-btn{all:unset;cursor:pointer;background:#FBBF24;color:#1f1f1f;font-family:'Mulish',sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:14px 32px;border-radius:2px;transition:background .2s}
    .gold-btn:hover{background:#FBBF24}
    .ghost-btn{all:unset;cursor:pointer;border:1px solid #FBBF24;color:#FBBF24;font-family:'Mulish',sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:13px 32px;border-radius:2px;transition:all .2s}
    .ghost-btn:hover{background:#FBBF24;color:#1f1f1f}
    .filter-pill{all:unset;cursor:pointer;padding:8px 20px;border-radius:20px;font-family:'Mulish',sans-serif;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--i2);color:var(--i6);transition:all .22s;white-space:nowrap}
    .filter-pill:hover{border-color:#FBBF24;color:#FBBF24}
    .filter-pill.on{background:#FBBF24;border-color:#FBBF24;color:#1f1f1f}

    /* Responsive breakpoints */
    @media (max-width: 768px) {
      .gold-btn { padding: 10px 20px; font-size: 10px; }
      .ghost-btn { padding: 9px 20px; font-size: 10px; }
      .filter-pill { padding: 6px 14px; font-size: 10px; }
    }
    @media (max-width: 480px) {
      .gold-btn { padding: 8px 16px; font-size: 9px; }
      .ghost-btn { padding: 7px 16px; font-size: 9px; }
      .filter-pill { padding: 5px 12px; font-size: 9px; }
    }
  `}</style>
)

// ─── DATA ────────────────────────────────────────────────────────────────────
const reviews = [
  {
    id:1, name:'Amina Wanjiku', role:'Loyal Client · 2yrs', location:'Westlands',
    service:'Skin Care', rating:5, date:'March 2025', platform:'Google',
    avatar:'AW', avatarGrad:'linear-gradient(135deg,#fde68a,#f59e0b)',
    img:'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    helpful:34, verified:true,
    review:"I've been coming to Jumuia for over two years and honestly I can't imagine going anywhere else. The facials have completely transformed my skin — I get compliments all the time. The team remembers your name, your preferences, everything. It feels like visiting family.",
    highlight:"Feels like visiting family",
  },
  {
    id:2, name:'Fatuma Ochieng', role:'First Visit', location:'Kilimani',
    service:'Lips Tattoo', rating:5, date:'February 2025', platform:'Fresha',
    avatar:'FO', avatarGrad:'linear-gradient(135deg,#fecaca,#f43f5e)',
    img:'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80',
    helpful:28, verified:true,
    review:"The lip tattoo came out absolutely perfect. I was nervous going in but the artist walked me through every step and made sure I was comfortable the whole time. Three months later and it still looks fresh. Worth every shilling.",
    highlight:"Three months later, still perfect",
  },
  {
    id:3, name:'Sarah Muthoni', role:'Regular Client', location:'Karen',
    service:'Nail Art', rating:5, date:'March 2025', platform:'Google',
    avatar:'SM', avatarGrad:'linear-gradient(135deg,#e9d5ff,#7c3aed)',
    img:'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
    helpful:21, verified:true,
    review:"Came in for a simple manicure and left with the most beautiful chrome nails I've ever seen. The nail artist took time to understand the vibe I was going for and then just elevated it. The salon is so clean and calm — exactly what you need after a long week.",
    highlight:"Elevated beyond what I imagined",
  },
  {
    id:4, name:'Grace Kamau', role:'Referred Client', location:'Lavington',
    service:'Hair Tattoo', rating:5, date:'January 2025', platform:'Instagram',
    avatar:'GK', avatarGrad:'linear-gradient(135deg,#a7f3d0,#059669)',
    img:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    helpful:19, verified:true,
    review:"My hair tattoo looks unbelievably natural. I'd been going to three different places and never felt fully happy — until Jumuia. The precision and attention to detail here is on another level. I tell everyone about this place.",
    highlight:"Precision on another level",
  },
  {
    id:5, name:'Njeri Karanja', role:'Bride', location:'Runda',
    service:'Skin Care', rating:5, date:'February 2025', platform:'Google',
    avatar:'NK', avatarGrad:'linear-gradient(135deg,#fef08a,#eab308)',
    img:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
    helpful:41, verified:true,
    review:"I booked a deep cleansing facial ahead of my wedding and oh my goodness — my skin glowed on the day like never before. The esthetician was so knowledgeable and the products felt so luxurious. This salon is genuinely world class.",
    highlight:"My skin glowed on my wedding day",
  },
  {
    id:6, name:'Aisha Hassan', role:'New Client', location:'Parklands',
    service:'Nail Art', rating:4, date:'January 2025', platform:'Fresha',
    avatar:'AH', avatarGrad:'linear-gradient(135deg,#bfdbfe,#3b82f6)',
    img:'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80',
    helpful:15, verified:true,
    review:"Great experience overall. The nail art was creative and well-executed. Booking was easy, the team was friendly, and the studio is beautifully designed. I waited about 15 minutes past my appointment time but the results absolutely made up for it.",
    highlight:"Results made it all worth it",
  },
]

const stats = [
  {v:'4.9', l:'Overall Rating', s:'out of 5.0'},
  {v:'2,500+', l:'Verified Reviews', s:'real clients'},
  {v:'98%', l:'Would Return', s:'retention rate'},
  {v:'99%', l:'Recommend Us', s:'word of mouth'},
]

const breakdown = [
  {n:5,p:91},{n:4,p:7},{n:3,p:1},{n:2,p:1},{n:1,p:0},
]

const services = ['All','Skin Care','Hair Tattoo','Lips Tattoo','Nail Art']
const triple = [...reviews,...reviews,...reviews]

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Stars = ({n,sz=13}:{n:number,sz?:number}) => (
  <div style={{display:'flex',gap:'2px'}}>
    {[...Array(5)].map((_,i)=>(
      <Star key={i} fill={i<n?'#FBBF24':'transparent'} stroke={i<n?'#FBBF24':'#d4cfc6'} strokeWidth={1.5} style={{width:sz,height:sz}}/>
    ))}
  </div>
)

const Av = ({initials,grad,sz=44}:{initials:string,grad:string,sz?:number}) => (
  <div style={{width:sz,height:sz,borderRadius:'50%',background:grad,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:sz*.27,fontWeight:700,color:'#fff',fontFamily:"'Mulish',sans-serif"}}>
    {initials}
  </div>
)

// ─── FEATURED CARD ────────────────────────────────────────────────────────────
function FCard({r,anim}:{r:typeof reviews[0],anim:string}) {
  return (
    <div style={{background:'#fff',borderRadius:'6px',overflow:'hidden',border:'1px solid var(--i2)',animation:`${anim} .45s ease both`}}>
      {/* Image strip */}
      <div className="img-zoom" style={{position:'relative',height:'200px',overflow:'hidden'}}>
        <img src={r.img} alt={r.service} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(26,22,18,.7) 0%,transparent 60%)'}}/>
        <div style={{position:'absolute',bottom:'16px',left:'20px',right:'20px',display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div>
            <span style={{display:'inline-block',background:'#FBBF24',color:'#111',fontFamily:"'Mulish',sans-serif",fontSize:'10px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',padding:'3px 10px',borderRadius:'2px',marginBottom:'6px'}}>{r.service}</span>
            <div style={{display:'flex',gap:'2px'}}>
              {[...Array(r.rating)].map((_,i)=><Star key={i} fill='#f9f6f2' stroke='#f9f6f2' strokeWidth={1.5} style={{width:12,height:12}}/>)}
            </div>
          </div>
          <span style={{fontFamily:"'Mulish',sans-serif",fontSize:'11px',color:'rgba(249,246,242,.6)'}}>{r.date}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{padding:'28px 32px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px'}}>
          <Av initials={r.avatar} grad={r.avatarGrad} sz={46}/>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
              <span style={{fontFamily:"'Mulish',sans-serif",fontWeight:700,fontSize:'15px',color:'var(--ink)'}}>{r.name}</span>
              {r.verified && <span style={{display:'inline-flex',alignItems:'center',gap:'3px',background:'#f0fdf4',color:'#16a34a',fontSize:'10px',padding:'2px 7px',borderRadius:'20px',fontWeight:600}}><CheckCircle style={{width:9,height:9}}/>Verified</span>}
            </div>
            <span style={{fontFamily:"'Mulish',sans-serif",fontSize:'12px',color:'var(--i6)'}}>{r.role} · {r.location}</span>
          </div>
        </div>

        <p style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',fontStyle:'italic',lineHeight:1.8,color:'var(--ink)',marginBottom:'18px'}}>"{r.review}"</p>

        <div style={{background:'var(--gp)',borderLeft:'3px solid #FBBF24',padding:'10px 14px',borderRadius:'0 3px 3px 0'}}>
          <p style={{fontFamily:"'Mulish',sans-serif",fontSize:'12px',fontWeight:600,color:'#FBBF24'}}>✦ {r.highlight}</p>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ReviewsPage() {
  const [feat,setFeat] = useState(0)
  const [prev,setPrev] = useState<number|null>(null)
  const [dir,setDir] = useState<'R'|'L'>('R')
  const [transitioning,setTransitioning] = useState(false)
  const [filter,setFilter] = useState('All')
  const [heroIn,setHeroIn] = useState(false)
  const [statsIn,setStatsIn] = useState(false)
  const [cardsIn,setCardsIn] = useState<number[]>([])
  const [liked,setLiked] = useState<number[]>([])
  const [windowWidth, setWindowWidth] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement|null)[]>([])
  const paused = useRef(false)

  const filtered = filter==='All' ? reviews : reviews.filter(r=>r.service===filter)

  useEffect(()=>{setTimeout(()=>setHeroIn(true),80)},[])

  useEffect(()=>{
    if(!statsRef.current) return
    const ob = new IntersectionObserver(([e])=>{if(e.isIntersecting)setStatsIn(true)},{threshold:.3})
    ob.observe(statsRef.current); return ()=>ob.disconnect()
  },[])

  useEffect(()=>{
    setCardsIn([])
    const ob = new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){const i=Number((e.target as HTMLElement).dataset.idx);setCardsIn(p=>p.includes(i)?p:[...p,i])}})
    },{threshold:.08})
    cardRefs.current.forEach(el=>el&&ob.observe(el)); return ()=>ob.disconnect()
  },[filter])

  useEffect(()=>{
    const t=setInterval(()=>{if(!paused.current) goTo((feat+1)%reviews.length,'R')},4800)
    return ()=>clearInterval(t)
  },[feat])

  useEffect(()=>{
    const el=scrollRef.current; if(!el) return
    let x=0; let raf:number
    const step=()=>{if(!paused.current){x+=.5;if(x>=el.scrollWidth/3)x=0;el.scrollLeft=x}; raf=requestAnimationFrame(step)}
    raf=requestAnimationFrame(step); return ()=>cancelAnimationFrame(raf)
  },[])

  // Handle window resize
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goTo=(idx:number,d:'R'|'L')=>{
    if(transitioning) return
    setDir(d); setTransitioning(true); setPrev(feat); setFeat(idx)
    setTimeout(()=>{setPrev(null);setTransitioning(false)},490)
  }

  const hero = reviews[feat]
  const prevHero = prev!==null ? reviews[prev] : null

  // Helper function for responsive values
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const isDesktop = windowWidth >= 1024

  return (
    <main style={{minHeight:'100vh',background:'var(--cr)'}}>
      <G/>

      {/* ── HERO - Responsive ───────────────────────────────────────── */}
      <section style={{
        position:'relative',
        height: isMobile ? '300px' : '380px',
        overflow:'hidden'
      }}>
        <img src="/makeup.jpeg" alt="Jumuia" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(160deg,rgba(14,13,9,.82) 0%,rgba(14,13,9,.35) 60%,rgba(14,13,9,.15) 100%)'}}/>

        {/* Back - responsive */}
        <button onClick={()=>window.history.back()} style={{
          all:'unset',cursor:'pointer',position:'absolute',
          top: isMobile ? '16px' : '28px',
          left: isMobile ? '16px' : '36px',
          zIndex:20,display:'flex',alignItems:'center',
          gap: isMobile ? '4px' : '8px',
          color:'rgba(255,255,255,.6)',
          fontFamily:"'Mulish',sans-serif",
          fontSize: isMobile ? '11px' : '13px',
          transition:'color .2s'
        }}
          onMouseEnter={e=>(e.currentTarget.style.color='#FBBF24')}
          onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.6)')}>
          <ArrowLeft style={{
            width: isMobile ? 12 : 15,
            height: isMobile ? 12 : 15
          }}/> Back
        </button>

        {/* Text - responsive */}
        <div style={{
          position:'absolute',
          bottom: isMobile ? '24px' : '52px',
          left: isMobile ? '16px' : '52px',
          zIndex:10
        }}>
          <div style={{
            display:'flex',alignItems:'center',
            gap: isMobile ? '6px' : '10px',
            marginBottom: isMobile ? '8px' : '14px',
            opacity:heroIn?1:0,transform:heroIn?'none':'translateY(16px)',
            transition:'all .6s ease .05s'
          }}>
            <div style={{
              width: isMobile ? '16px' : '24px',
              height:'1px',background:'#FBBF24'
            }}/>
            <span style={{
              fontFamily:"'Mulish',sans-serif",
              fontSize: isMobile ? '8px' : '10px',
              fontWeight:600,
              letterSpacing: isMobile ? '.2em' : '.28em',
              textTransform:'uppercase',color:'#FBBF24'
            }}>What our clients say</span>
          </div>
          <h1 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize: isMobile ? '2rem' : 'clamp(2.8rem,5vw,5rem)',
            fontWeight:400,color:'#fff',lineHeight:.95,
            opacity:heroIn?1:0,transform:heroIn?'none':'translateY(20px)',
            transition:'all .65s ease .18s'
          }}>
            Client <span style={{fontStyle:'italic',color:'#FBBF24'}}>Reviews</span>
          </h1>
        </div>

        {/* Floating summary pill - responsive */}
        <div style={{
          position:'absolute',
          bottom: isMobile ? '24px' : '52px',
          right: isMobile ? '16px' : '52px',
          zIndex:10,background:'rgba(255,255,255,.12)',
          backdropFilter:'blur(16px)',
          border:'1px solid rgba(255,255,255,.2)',
          borderRadius:'6px',
          padding: isMobile ? '10px 14px' : '16px 24px',
          opacity:heroIn?1:0,transform:heroIn?'none':'translateY(16px)',
          transition:'all .65s ease .32s'
        }}>
          <div style={{display:'flex',gap:'4px',marginBottom:'6px'}}>
            {[...Array(5)].map((_,i)=><Star key={i} fill='#FBBF24' stroke='#FBBF24' strokeWidth={1.5} style={{
              width: isMobile ? 10 : 14,
              height: isMobile ? 10 : 14
            }}/>)}
          </div>
          <p style={{
            fontFamily:"'Playfair Display',serif",
            fontSize: isMobile ? '20px' : '28px',
            color:'#fff',lineHeight:1
          }}>4.9</p>
          <p style={{
            fontFamily:"'Mulish',sans-serif",
            fontSize: isMobile ? '9px' : '11px',
            color:'rgba(255,255,255,.6)',
            marginTop:'3px'
          }}>2,500+ verified reviews</p>
        </div>
      </section>

      {/* ── STATS BAR - Responsive ──────────────────────────────────── */}
      <section ref={statsRef} style={{background:'#1f1f1f'}}>
        <div style={{
          maxWidth:'1200px',margin:'0 auto',
          padding: isMobile ? '0 16px' : '0 52px',
          display:'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? '16px' : '0'
        }}>
          {stats.map((s,i)=>(
            <div key={s.l} style={{
              padding: isMobile ? '20px 0' : '30px 0',
              textAlign:'center',
              borderRight: isMobile ? 'none' : (i<3?'1px solid rgba(255,255,255,.07)':'none'),
              opacity:statsIn?1:0,transform:statsIn?'none':'translateY(18px)',
              transition:`opacity .6s ease ${i*.1}s,transform .6s ease ${i*.1}s`
            }}>
              <p style={{
                fontFamily:"'Playfair Display',serif",
                fontSize: isMobile ? '28px' : '40px',
                fontWeight:400,color:'#FBBF24',lineHeight:1
              }}>{s.v}</p>
              <p style={{
                fontFamily:"'Mulish',sans-serif",
                fontSize: isMobile ? '9px' : '11px',
                fontWeight:700,letterSpacing:'.08em',
                textTransform:'uppercase',
                color:'rgba(255,255,255,.7)',
                marginTop:'6px'
              }}>{s.l}</p>
              <p style={{
                fontFamily:"'Mulish',sans-serif",
                fontSize: isMobile ? '8px' : '10px',
                color:'rgba(255,255,255,.3)',
                marginTop:'2px'
              }}>{s.s}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{
        maxWidth:'1200px',margin:'0 auto',
        padding: isMobile ? '40px 16px' : '72px 52px'
      }}>

        {/* ── FEATURED CAROUSEL - Responsive ────────────────────────── */}
        <div style={{
          marginBottom: isMobile ? '48px' : '80px'
        }}>
          {/* Section label */}
          <div style={{
            display:'flex',alignItems:'center',gap:'10px',
            marginBottom: isMobile ? '20px' : '32px'
          }}>
            <div style={{width:'20px',height:'1px',background:'#FBBF24'}}/>
            <span style={{
              fontFamily:"'Mulish',sans-serif",
              fontSize: isMobile ? '9px' : '10px',
              fontWeight:600,letterSpacing:'.22em',
              textTransform:'uppercase',color:'#FBBF24'
            }}>Featured Reviews</span>
          </div>

          <div style={{
            display:'grid',
            gridTemplateColumns: isDesktop ? '1fr 320px' : '1fr',
            gap: isMobile ? '16px' : '24px',
            alignItems:'start'
          }}>
            {/* Animated card */}
            <div onMouseEnter={()=>{paused.current=true}} onMouseLeave={()=>{paused.current=false}}>
              <div style={{position:'relative',overflow:'hidden',borderRadius:'6px'}}>
                {prevHero && (
                  <div style={{position:'absolute',inset:0,zIndex:10}}>
                    <FCard r={prevHero} anim={dir==='R'?'slideOutL':'slideOutR'}/>
                  </div>
                )}
                <div style={{position:'relative',zIndex:20}}>
                  <FCard r={hero} anim={dir==='R'?'slideInR':'slideInL'}/>
                </div>
              </div>

              {/* Controls - responsive */}
              <div style={{
                display:'flex',justifyContent:'space-between',
                alignItems:'center',marginTop:'16px'
              }}>
                <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                  {reviews.map((_,i)=>(
                    <button key={i} onClick={()=>goTo(i,i>feat?'R':'L')} style={{
                      all:'unset',cursor:'pointer',
                      height: isMobile ? '3px' : '4px',
                      borderRadius:'2px',
                      background:i===feat?'#FBBF24':'var(--i2)',
                      width:i===feat ? (isMobile ? '16px' : '22px') : (isMobile ? '4px' : '6px'),
                      transition:'all .35s'
                    }}/>
                  ))}
                </div>
                <div style={{display:'flex',gap:'8px'}}>
                  <button onClick={()=>goTo((feat-1+reviews.length)%reviews.length,'L')} style={{
                    all:'unset',cursor:'pointer',
                    width: isMobile ? '30px' : '36px',
                    height: isMobile ? '30px' : '36px',
                    borderRadius:'50%',border:'1px solid var(--i2)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:'var(--i6)',transition:'all .2s'
                  }} onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor='#FBBF24';(e.currentTarget as HTMLButtonElement).style.color='#FBBF24'}} onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor='var(--i2)';(e.currentTarget as HTMLButtonElement).style.color='var(--i6)'}}>
                    <ChevronLeft style={{
                      width: isMobile ? 12 : 14,
                      height: isMobile ? 12 : 14
                    }}/>
                  </button>
                  <button onClick={()=>goTo((feat+1)%reviews.length,'R')} style={{
                    all:'unset',cursor:'pointer',
                    width: isMobile ? '30px' : '36px',
                    height: isMobile ? '30px' : '36px',
                    borderRadius:'50%',border:'1px solid var(--i2)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:'var(--i6)',transition:'all .2s'
                  }} onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor='#FBBF24';(e.currentTarget as HTMLButtonElement).style.color='#FBBF24'}} onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor='var(--i2)';(e.currentTarget as HTMLButtonElement).style.color='var(--i6)'}}>
                    <ChevronRight style={{
                      width: isMobile ? 12 : 14,
                      height: isMobile ? 12 : 14
                    }}/>
                  </button>
                </div>
              </div>
              <div style={{marginTop:'10px',height:'2px',background:'var(--i2)',borderRadius:'1px',overflow:'hidden'}}>
                <div key={feat} style={{height:'100%',background:'#FBBF24',borderRadius:'1px',animation:'prog 4.8s linear forwards'}}/>
              </div>
            </div>

            {/* Right sidebar - hide on mobile */}
            {isDesktop && (
              <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                {/* Score card */}
                <div style={{background:'#fff',border:'1px solid var(--i2)',borderRadius:'6px',padding:'28px',overflow:'hidden',position:'relative'}}>
                  <div style={{position:'absolute',top:'-20px',right:'-20px',width:'100px',height:'100px',background:'var(--gp)',borderRadius:'50%',pointerEvents:'none'}}/>
                  <div style={{display:'flex',alignItems:'flex-end',gap:'10px',marginBottom:'20px'}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:'56px',fontWeight:400,color:'var(--ink)',lineHeight:1}}>4.9</span>
                    <div style={{marginBottom:'6px'}}>
                      <Stars n={5} sz={15}/>
                      <p style={{fontFamily:"'Mulish',sans-serif",fontSize:'11px',color:'var(--i6)',marginTop:'4px'}}>2,500+ reviews</p>
                    </div>
                  </div>
                  {breakdown.map((b,i)=>(
                    <div key={b.n} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                      <span style={{fontFamily:"'Mulish',sans-serif",fontSize:'11px',color:'var(--i6)',width:'8px'}}>{b.n}</span>
                      <Star fill='#FBBF24' stroke='#FBBF24' strokeWidth={1.5} style={{width:10,height:10,flexShrink:0}}/>
                      <div style={{flex:1,height:'4px',background:'var(--i2)',borderRadius:'2px',overflow:'hidden'}}>
                        <div style={{height:'100%',background:'#FBBF24',borderRadius:'2px',width:statsIn?`${b.p}%`:'0%',transition:`width 1.1s ease ${.2+i*.08}s`}}/>
                      </div>
                      <span style={{fontFamily:"'Mulish',sans-serif",fontSize:'11px',color:'var(--i6)',width:'28px'}}>{b.p}%</span>
                    </div>
                  ))}
                </div>

                {/* Thumbnail strip of other reviewers */}
                <div style={{background:'#fff',border:'1px solid var(--i2)',borderRadius:'6px',padding:'18px 20px'}}>
                  <p style={{fontFamily:"'Mulish',sans-serif",fontSize:'10px',fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--i6)',marginBottom:'12px'}}>More clients</p>
                  <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    {reviews.filter((_,i)=>i!==feat).slice(0,3).map(r=>(
                      <button key={r.id} onClick={()=>goTo(reviews.indexOf(r),reviews.indexOf(r)>feat?'R':'L')} style={{all:'unset',cursor:'pointer',display:'flex',alignItems:'center',gap:'10px',padding:'8px',borderRadius:'4px',transition:'background .2s'}}
                        onMouseEnter={e=>(e.currentTarget.style.background='var(--gp)')}
                        onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                        {/* mini image */}
                        <div style={{width:'44px',height:'44px',borderRadius:'4px',overflow:'hidden',flexShrink:0}}>
                          <img src={r.img} alt={r.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                        </div>
                        <div style={{flex:1,textAlign:'left'}}>
                          <p style={{fontFamily:"'Mulish',sans-serif",fontSize:'12px',fontWeight:600,color:'var(--ink)'}}>{r.name}</p>
                          <p style={{fontFamily:"'Mulish',sans-serif",fontSize:'11px',color:'var(--i6)'}}>{r.service}</p>
                        </div>
                        <Stars n={r.rating} sz={9}/>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA dark card */}
                <div style={{background:'#1f1f1f',borderRadius:'6px',padding:'24px',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:'-30px',right:'-30px',width:'110px',height:'110px',background:'rgba(184,151,90,.1)',borderRadius:'50%',pointerEvents:'none'}}/>
                  <Sparkles style={{width:18,height:18,color:'#FBBF24',marginBottom:'10px'}}/>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'19px',fontWeight:400,color:'#fff',lineHeight:1.35,marginBottom:'14px'}}>
                    Visit Jumuia.<br/><span style={{fontStyle:'italic',color:'#FBBF24'}}>Experience the difference.</span>
                  </h3>
                  <button className="gold-btn" style={{fontSize:'10px',padding:'11px 20px'}}>Book Now</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── MARQUEE STRIP - Responsive ────────────────────────────── */}
        <div style={{
          margin: isMobile ? '0 -16px 48px' : '0 -52px 80px',
          overflow:'hidden'
        }}>
          <div style={{
            padding: isMobile ? '0 16px' : '0 52px',
            marginBottom:'16px',
            display:'flex',alignItems:'center',gap:'10px'
          }}>
            <div style={{width:'20px',height:'1px',background:'#FBBF24'}}/>
            <span style={{
              fontFamily:"'Mulish',sans-serif",
              fontSize: isMobile ? '9px' : '10px',
              fontWeight:600,letterSpacing:'.22em',
              textTransform:'uppercase',color:'#FBBF24'
            }}>More voices</span>
          </div>
          <div ref={scrollRef} className="no-sb" style={{
            display:'flex',gap:'16px',overflowX:'hidden',
            paddingLeft: isMobile ? '16px' : '52px',
            cursor:'default'
          }}
            onMouseEnter={()=>{paused.current=true}} onMouseLeave={()=>{paused.current=false}}>
            {triple.map((r,i)=>(
              <div key={i} style={{
                flexShrink:0,
                width: isMobile ? '200px' : '260px',
                background:'#fff',border:'1px solid var(--i2)',
                borderRadius:'6px',overflow:'hidden',
                transition:'border-color .22s,box-shadow .22s'
              }}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='rgba(184,151,90,.35)';(e.currentTarget as HTMLDivElement).style.boxShadow='0 8px 28px rgba(26,22,18,.1)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='var(--i2)';(e.currentTarget as HTMLDivElement).style.boxShadow='none'}}>
                {/* image top */}
                <div style={{
                  height: isMobile ? '80px' : '110px',
                  overflow:'hidden',position:'relative'
                }}>
                  <img src={r.img} alt={r.service} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .4s ease'}}
                    onMouseOver={e=>(e.currentTarget.style.transform='scale(1.06)')}
                    onMouseOut={e=>(e.currentTarget.style.transform='scale(1)')}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(26,22,18,.5),transparent)'}}/>
                  <span style={{
                    position:'absolute',bottom:'8px',left:'10px',
                    background:'#FBBF24',color:'#111',
                    fontFamily:"'Mulish',sans-serif",
                    fontSize: isMobile ? '7px' : '9px',
                    fontWeight:700,letterSpacing:'.1em',
                    textTransform:'uppercase',
                    padding: isMobile ? '1px 6px' : '2px 8px',
                    borderRadius:'2px'
                  }}>{r.service}</span>
                </div>
                <div style={{
                  padding: isMobile ? '8px' : '14px'
                }}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                    <Av initials={r.avatar} grad={r.avatarGrad} sz={isMobile ? 24 : 30}/>
                    <div>
                      <p style={{
                        fontFamily:"'Mulish',sans-serif",
                        fontSize: isMobile ? '10px' : '12px',
                        fontWeight:700,color:'var(--ink)'
                      }}>{r.name}</p>
                      <Stars n={r.rating} sz={isMobile ? 7 : 9}/>
                    </div>
                  </div>
                  <p style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize: isMobile ? '10px' : '13px',
                    fontStyle:'italic',color:'var(--i6)',
                    lineHeight:1.6,display:'-webkit-box',
                    WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'
                  }}>"{r.review}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FILTER - Responsive ───────────────────────────────────── */}
        <div style={{
          marginBottom: isMobile ? '24px' : '36px'
        }}>
          <div style={{
            display:'flex',alignItems:'center',gap:'10px',
            marginBottom: isMobile ? '12px' : '16px'
          }}>
            <div style={{width:'20px',height:'1px',background:'#FBBF24'}}/>
            <span style={{
              fontFamily:"'Mulish',sans-serif",
              fontSize: isMobile ? '9px' : '10px',
              fontWeight:600,letterSpacing:'.22em',
              textTransform:'uppercase',color:'#FBBF24'
            }}>Browse by service</span>
          </div>
          <div className="no-sb" style={{display:'flex',gap:'8px',overflowX:'auto'}}>
            {services.map(s=>(
              <button key={s} onClick={()=>setFilter(s)} className={`filter-pill ${filter===s?'on':''}`}>{s}</button>
            ))}
          </div>
        </div>

        {/* ── REVIEW GRID - Responsive ──────────────────────────────── */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)'),
          gap: isMobile ? '12px' : '18px',
          marginBottom: isMobile ? '36px' : '52px'
        }}>
          {filtered.map((r,i)=>{
            const style = i % 3

            if(style===0) return (
              // Style A: Image top card
              <div key={r.id} ref={el=>{cardRefs.current[i]=el}} data-idx={i} className="card-lift"
                style={{background:'#fff',border:'1px solid var(--i2)',borderRadius:'6px',overflow:'hidden',opacity:cardsIn.includes(i)?1:0,transform:cardsIn.includes(i)?'none':'translateY(24px)',transition:`opacity .55s ease ${i*.07}s,transform .55s ease ${i*.07}s`}}>
                <div className="img-zoom" style={{
                  position:'relative',
                  height: isMobile ? '120px' : '160px',
                  overflow:'hidden'
                }}>
                  <img src={r.img} alt={r.service} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(26,22,18,.55),transparent)'}}/>
                  <span style={{
                    position:'absolute',bottom:'10px',left:'12px',
                    background:'#FBBF24',color:'#111',
                    fontFamily:"'Mulish',sans-serif",
                    fontSize: isMobile ? '7px' : '9px',
                    fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',
                    padding: isMobile ? '1px 6px' : '2px 9px',
                    borderRadius:'2px'
                  }}>{r.service}</span>
                  <span style={{
                    position:'absolute',top:'10px',right:'10px',
                    background:'rgba(255,255,255,.9)',color:'var(--ink)',
                    fontFamily:"'Mulish',sans-serif",
                    fontSize: isMobile ? '8px' : '10px',
                    fontWeight:600,
                    padding: isMobile ? '1px 6px' : '2px 8px',
                    borderRadius:'20px'
                  }}>{r.date}</span>
                </div>
                <div style={{
                  padding: isMobile ? '12px' : '22px'
                }}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                    <Av initials={r.avatar} grad={r.avatarGrad} sz={isMobile ? 32 : 40}/>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        <span style={{
                          fontFamily:"'Mulish',sans-serif",
                          fontSize: isMobile ? '11px' : '13px',
                          fontWeight:700,color:'var(--ink)'
                        }}>{r.name}</span>
                        {r.verified && <CheckCircle style={{width:11,height:11,color:'#16a34a'}}/>}
                      </div>
                      <span style={{
                        fontFamily:"'Mulish',sans-serif",
                        fontSize: isMobile ? '9px' : '11px',
                        color:'var(--i6)'
                      }}>{r.location}</span>
                    </div>
                  </div>
                  <Stars n={r.rating} sz={isMobile ? 9 : 11}/>
                  <p style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize: isMobile ? '11px' : '14px',
                    fontStyle:'italic',lineHeight:1.7,color:'var(--ink)',
                    margin: isMobile ? '8px 0' : '12px 0',
                    display:'-webkit-box',WebkitLineClamp:3,
                    WebkitBoxOrient:'vertical',overflow:'hidden'
                  }}>"{r.review}"</p>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'12px',borderTop:'1px solid var(--i2)'}}>
                    <span style={{
                      fontFamily:"'Mulish',sans-serif",
                      fontSize: isMobile ? '9px' : '11px',
                      fontWeight:600,color:'#FBBF24'
                    }}>✦ {r.highlight}</span>
                    <button onClick={()=>setLiked(p=>p.includes(r.id)?p.filter(x=>x!==r.id):[...p,r.id])} style={{all:'unset',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',fontFamily:"'Mulish',sans-serif",fontSize: isMobile ? '9px' : '11px',color:liked.includes(r.id)?'#FBBF24':'var(--i6)',transition:'color .2s'}}>
                      <ThumbsUp style={{width:11,height:11}}/>{r.helpful+(liked.includes(r.id)?1:0)}
                    </button>
                  </div>
                </div>
              </div>
            )

            if(style===1) return (
              // Style B: Dark editorial card with left image
              <div key={r.id} ref={el=>{cardRefs.current[i]=el}} data-idx={i} className="card-lift"
                style={{background:'#1f1f1f',border:'1px solid rgba(255,255,255,.07)',borderRadius:'6px',overflow:'hidden',display:'flex',flexDirection:'column',opacity:cardsIn.includes(i)?1:0,transform:cardsIn.includes(i)?'none':'translateY(24px)',transition:`opacity .55s ease ${i*.07}s,transform .55s ease ${i*.07}s`}}>
                <div className="img-zoom" style={{
                  position:'relative',
                  height: isMobile ? '100px' : '150px',
                  overflow:'hidden'
                }}>
                  <img src={r.img} alt={r.service} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.7)'}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,#1f1f1f 0%,transparent 60%)'}}/>
                </div>
                <div style={{
                  padding: isMobile ? '12px 14px' : '20px 22px',
                  flex:1,display:'flex',flexDirection:'column',
                  gap: isMobile ? '8px' : '12px'
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <span style={{
                      display:'inline-block',background:'rgba(184,151,90,.15)',
                      color:'#FBBF24',fontFamily:"'Mulish',sans-serif",
                      fontSize: isMobile ? '7px' : '9px',
                      fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',
                      padding: isMobile ? '2px 6px' : '3px 9px',
                      borderRadius:'2px',border:'1px solid rgba(184,151,90,.25)'
                    }}>{r.service}</span>
                    <Stars n={r.rating} sz={isMobile ? 8 : 10}/>
                  </div>
                  <p style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize: isMobile ? '11px' : '14px',
                    fontStyle:'italic',lineHeight:1.7,
                    color:'rgba(255,255,255,.85)',
                    flex:1,display:'-webkit-box',
                    WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'
                  }}>"{r.review}"</p>
                  <div style={{borderTop:'1px solid rgba(255,255,255,.07)',paddingTop:'12px',display:'flex',alignItems:'center',gap:'10px'}}>
                    <Av initials={r.avatar} grad={r.avatarGrad} sz={isMobile ? 28 : 34}/>
                    <div style={{flex:1}}>
                      <p style={{
                        fontFamily:"'Mulish',sans-serif",
                        fontSize: isMobile ? '10px' : '12px',
                        fontWeight:700,color:'#fff'
                      }}>{r.name}</p>
                      <p style={{
                        fontFamily:"'Mulish',sans-serif",
                        fontSize: isMobile ? '8px' : '10px',
                        color:'rgba(255,255,255,.45)'
                      }}>{r.role} · {r.date}</p>
                    </div>
                    <button onClick={()=>setLiked(p=>p.includes(r.id)?p.filter(x=>x!==r.id):[...p,r.id])} style={{all:'unset',cursor:'pointer',display:'flex',alignItems:'center',gap:'3px',fontFamily:"'Mulish',sans-serif",fontSize: isMobile ? '9px' : '11px',color:liked.includes(r.id)?'#FBBF24':'rgba(255,255,255,.35)',transition:'color .2s'}}>
                      <ThumbsUp style={{width:11,height:11}}/>{r.helpful+(liked.includes(r.id)?1:0)}
                    </button>
                  </div>
                </div>
              </div>
            )

            // Style C: Clean minimal with side accent
            return (
              <div key={r.id} ref={el=>{cardRefs.current[i]=el}} data-idx={i} className="card-lift"
                style={{background:'#fff',border:'1px solid var(--i2)',borderRadius:'6px',overflow:'hidden',display:'flex',flexDirection:'column',opacity:cardsIn.includes(i)?1:0,transform:cardsIn.includes(i)?'none':'translateY(24px)',transition:`opacity .55s ease ${i*.07}s,transform .55s ease ${i*.07}s`}}>
                {/* Top color accent bar */}
                <div style={{height:'4px',background:`${r.avatarGrad}`}}/>
                {/* Side image + content layout */}
                <div style={{display:'flex',gap:'0',flex:1}}>
                  {/* Small image column */}
                  <div className="img-zoom" style={{
                    width: isMobile ? '60px' : '90px',
                    flexShrink:0,overflow:'hidden',position:'relative'
                  }}>
                    <img src={r.img} alt={r.service} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                  <div style={{
                    flex:1,
                    padding: isMobile ? '10px 10px 10px 8px' : '18px 18px 18px 16px',
                    display:'flex',flexDirection:'column',
                    gap: isMobile ? '6px' : '10px'
                  }}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div>
                        <p style={{
                          fontFamily:"'Mulish',sans-serif",
                          fontSize: isMobile ? '11px' : '13px',
                          fontWeight:700,color:'var(--ink)'
                        }}>{r.name}</p>
                        <p style={{
                          fontFamily:"'Mulish',sans-serif",
                          fontSize: isMobile ? '8px' : '10px',
                          color:'var(--i6)'
                        }}>{r.service}</p>
                      </div>
                      <Stars n={r.rating} sz={isMobile ? 8 : 10}/>
                    </div>
                    <p style={{
                      fontFamily:"'Playfair Display',serif",
                      fontSize: isMobile ? '10px' : '13px',
                      fontStyle:'italic',lineHeight:1.65,color:'var(--ink)',
                      flex:1,display:'-webkit-box',
                      WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'
                    }}>"{r.review}"</p>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <span style={{
                        fontFamily:"'Mulish',sans-serif",
                        fontSize: isMobile ? '8px' : '10px',
                        color:'#FBBF24',fontWeight:600
                      }}>✦ {r.highlight}</span>
                      <button onClick={()=>setLiked(p=>p.includes(r.id)?p.filter(x=>x!==r.id):[...p,r.id])} style={{all:'unset',cursor:'pointer',display:'flex',alignItems:'center',gap:'3px',fontFamily:"'Mulish',sans-serif",fontSize: isMobile ? '8px' : '10px',color:liked.includes(r.id)?'#FBBF24':'var(--i6)',transition:'color .2s'}}>
                        <ThumbsUp style={{width:10,height:10}}/>{r.helpful+(liked.includes(r.id)?1:0)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Load more */}
        <div style={{display:'flex',justifyContent:'center'}}>
          <button className="ghost-btn">Load More Reviews</button>
        </div>
      </div>

      {/* ── CTA FOOTER - Responsive ─────────────────────────────────── */}
      <section style={{position:'relative',overflow:'hidden'}}>
        {/* Split: left image, right dark */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          minHeight: isMobile ? '500px' : '340px'
        }}>
          <div style={{position:'relative',overflow:'hidden', height: isMobile ? '250px' : 'auto'}}>
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80" alt="salon" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            <div style={{
              position:'absolute',inset:0,
              background: isMobile 
                ? 'linear-gradient(to top, #1f1f1f 0%, transparent 50%)' 
                : 'linear-gradient(to right,transparent 40%,#1f1f1f 100%)'
            }}/>
          </div>
          <div style={{
            background:'#1f1f1f',display:'flex',flexDirection:'column',
            justifyContent:'center',
            padding: isMobile ? '40px 24px' : '60px 56px',
            position:'relative',overflow:'hidden'
          }}>
            <div style={{position:'absolute',top:'-50px',right:'-50px',width:'200px',height:'200px',pointerEvents:'none'}}/>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px'}}>
              <div style={{width:'20px',height:'1px',background:'#FBBF24'}}/>
              <span style={{fontFamily:"'Mulish',sans-serif",fontSize:'10px',fontWeight:600,letterSpacing:'.28em',textTransform:'uppercase',color:'#FBBF24'}}>Join our clients</span>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,3.5vw,3rem)',fontWeight:400,color:'#fff',lineHeight:1.1,marginBottom:'16px'}}>
              Ready for your own <span style={{fontStyle:'italic',color:'#FBBF24'}}>glow up?</span>
            </h2>
            <p style={{fontFamily:"'Mulish',sans-serif",fontSize:'14px',color:'rgba(255,255,255,.45)',lineHeight:1.75,maxWidth:'380px',marginBottom:'28px'}}>
              Thousands of clients across Nairobi trust Jumuia for their beauty. Book today and see why they never leave.
            </p>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <button className="gold-btn">Book Appointment</button>
              <button style={{all:'unset',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontFamily:"'Mulish',sans-serif",fontSize:'12px',color:'rgba(255,255,255,.5)',transition:'color .2s'}} onMouseEnter={e=>(e.currentTarget.style.color='#FBBF24')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.5)')}>
                Write a Review <ArrowUpRight style={{width:13,height:13}}/>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}