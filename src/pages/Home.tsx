import React, { useState, useEffect, useRef } from 'react'
import { type PageProps } from '../App'
import HeroSection from '../components/HeroSection'
import PullCordReveal from '../components/PullCordReveal'
import IPadMockup from '../components/IPadMockup'
import CommercialLuminairesSection from '../components/CommercialLuminairesSection'
import { ArrowRight, CheckCircle2, Shield, Compass, Cpu, Wrench, ChevronLeft, ChevronRight } from 'lucide-react'

function AnimatedCounter({
  target,
  suffix = '',
  duration = 1800,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()

          const update = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Smooth ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(eased * target)
            setCount(current)

            if (progress < 1) {
              requestAnimationFrame(update)
            } else {
              setCount(target)
            }
          }

          requestAnimationFrame(update)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

const IMGS = {
  hero: 'https://images.unsplash.com/photo-1772289767405-69513d023448?w=1920&h=1080&fit=crop&auto=format',
  campus: 'https://images.unsplash.com/photo-1769971361536-d7d69715a9c2?w=1200&h=800&fit=crop&auto=format',
  hospitality: 'https://images.unsplash.com/photo-1785910723802-99967d4fa265?w=1200&h=800&fit=crop&auto=format',
  pathway: 'https://images.unsplash.com/photo-1777013371468-1ec321f18915?w=1200&h=800&fit=crop&auto=format',
  multifamily: 'https://images.unsplash.com/photo-1571440727633-ca6b05da2008?w=1200&h=800&fit=crop&auto=format',
  citypark: 'https://images.unsplash.com/photo-1770234895407-27d41a860541?w=1200&h=800&fit=crop&auto=format',
  fabrication: 'https://images.unsplash.com/photo-1735494033576-9c882e80504c?w=1200&h=800&fit=crop&auto=format',
  hotelOrnate: 'https://images.unsplash.com/photo-1766164185798-d6e7eb23a131?w=1920&h=1080&fit=crop&auto=format',
  cityDusk: 'https://images.unsplash.com/photo-1785736098735-51909a463903?w=1200&h=800&fit=crop&auto=format',
}

const statsData = [
  { target: 40, suffix: '+', unit: 'Years', label: 'of commercial lighting engineering' },
  { target: 50, suffix: '+', unit: 'Projects', label: 'commercial installations executed' },
  { target: 500, suffix: '+', unit: 'Custom Fixtures', label: 'built to architectural specification' },
  { target: 100, suffix: '%', unit: 'Made in USA', label: 'fixtures engineered and built domestically' },
]

const projects = [
  {
    id: 'the-summit',
    title: 'The Summit Campus',
    type: 'Corporate Campus',
    location: 'Eden Prairie, Minnesota',
    desc: 'Complete outdoor lighting strategy for a 4-building corporate campus including pathway, perimeter, and architectural facade lighting.',
    img: IMGS.campus,
  },
  {
    id: 'the-grand-marquette',
    title: 'The Grand Marquette',
    type: 'Hospitality & Resort',
    location: 'Bloomington, Minnesota',
    desc: 'Full exterior lighting design for a full-service hotel with pool, promenade, and landscape zones.',
    img: IMGS.hospitality,
  },
  {
    id: 'riverside-commons',
    title: 'Riverside Commons',
    type: 'Multifamily Development',
    location: 'Plymouth, Minnesota',
    desc: 'Amenity-area and perimeter lighting for a 220-unit luxury multifamily property.',
    img: IMGS.multifamily,
  },
  {
    id: 'northfield-crossing',
    title: 'Northfield Crossing',
    type: 'Mixed-Use Retail',
    location: 'Maple Grove, Minnesota',
    desc: 'Pedestrian plaza, signage accentuation, and facade illumination for an urban commercial destination.',
    img: IMGS.cityDusk,
  },
  {
    id: 'highland-plaza',
    title: 'Highland Civic Plaza',
    type: 'Public Realm & Parks',
    location: 'St. Paul, Minnesota',
    desc: 'Dark-sky certified perimeter path lighting and community gathering nodes.',
    img: IMGS.citypark,
  },
  {
    id: 'wayzata-bay-club',
    title: 'Wayzata Bay Club',
    type: 'Private Hospitality',
    location: 'Wayzata, Minnesota',
    desc: 'Waterfront hospitality promenade, custom corten bollards, and facade accents.',
    img: IMGS.hotelOrnate,
  },
]

interface ProjectMarqueeItem {
  id: string
  title: string
  type: string
  location: string
  desc: string
  img: string
}

function ContinuousProjectsMarquee({
  items,
  onSelectProject,
  onViewAll,
}: {
  items: ProjectMarqueeItem[]
  onSelectProject: (id: string) => void
  onViewAll: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  const isInteractingRef = useRef(false)
  const scrollPosRef = useRef(0)
  const animIdRef = useRef<number | null>(null)

  // Duplicate items 3 times for completely seamless infinite loop
  const displayItems = [...items, ...items, ...items]

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let lastTime = performance.now()
    // Classy, smooth continuous speed (~42px per second)
    const pxPerSec = 42

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000
      lastTime = now

      if (!isHoveredRef.current && !isInteractingRef.current && el) {
        // Single set width = scrollWidth / 3
        const singleSetWidth = el.scrollWidth / 3
        if (singleSetWidth > 0) {
          scrollPosRef.current += pxPerSec * delta
          if (scrollPosRef.current >= singleSetWidth) {
            scrollPosRef.current -= singleSetWidth
          }
          el.scrollLeft = scrollPosRef.current
        }
      } else if (el) {
        // Keep scrollPosRef synchronized with manual scroll
        scrollPosRef.current = el.scrollLeft
      }

      animIdRef.current = requestAnimationFrame(loop)
    }

    animIdRef.current = requestAnimationFrame(loop)

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
    }
  }, [items.length])

  const handleArrow = (dir: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    isInteractingRef.current = true
    const shift = 340
    const target = dir === 'left' ? el.scrollLeft - shift : el.scrollLeft + shift
    el.scrollTo({ left: target, behavior: 'smooth' })
    scrollPosRef.current = target

    // Resume auto-scroll after smooth scroll settles
    setTimeout(() => {
      isInteractingRef.current = false
      if (el) scrollPosRef.current = el.scrollLeft
    }, 500)
  }

  return (
    <section className="pt-16 md:pt-20 pb-10 md:pb-12 bg-[#faf9f7] border-y border-neutral-200/80 relative overflow-hidden select-none">
      {/* Centered Clean Header matching the user's reference */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-10 md:mb-12">
        <h2
          className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111]"
          style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
        >
          Enhance Your Outdoor Vision
        </h2>
        <p className="text-neutral-500 text-sm md:text-base mt-3 max-w-xl mx-auto font-normal">
          Architectural lighting engineered to bring campuses, hotels, and retail destinations to life after dark.
        </p>
      </div>

      {/* Marquee Carousel Container */}
      <div className="relative w-full">
        {/* Left Floating Arrow Button */}
        <button
          onClick={() => handleArrow('left')}
          aria-label="Previous project"
          className="absolute left-4 md:left-8 top-[38%] -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-neutral-200/80 text-neutral-800 hover:text-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Right Floating Arrow Button */}
        <button
          onClick={() => handleArrow('right')}
          aria-label="Next project"
          className="absolute right-4 md:right-8 top-[38%] -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-neutral-200/80 text-neutral-800 hover:text-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Left and Right Smooth Edge Fades for Light Theme (matched to card height) */}
        <div className="pointer-events-none absolute left-0 top-4 bottom-4 w-12 md:w-20 bg-gradient-to-r from-[#faf9f7] via-[#faf9f7]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-4 bottom-4 w-12 md:w-20 bg-gradient-to-l from-[#faf9f7] via-[#faf9f7]/80 to-transparent z-20" />

        {/* The Track */}
        <div
          ref={containerRef}
          onMouseEnter={() => { isHoveredRef.current = true }}
          onMouseLeave={() => { isHoveredRef.current = false }}
          onTouchStart={() => { isHoveredRef.current = true }}
          onTouchEnd={() => { isHoveredRef.current = false }}
          className="flex gap-6 md:gap-8 overflow-x-hidden py-4 px-6 md:px-16"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayItems.map((proj, idx) => (
            <div
              key={`${proj.id}-${idx}`}
              onClick={() => onSelectProject(proj.id)}
              className="group shrink-0 w-[280px] sm:w-[320px] md:w-[340px] bg-white rounded-2xl p-3 pb-5 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-neutral-300 transition-all duration-300 cursor-pointer flex flex-col text-center"
            >
              {/* Image Frame: Compact, Classy, Elegant */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-100 shadow-sm">
                <img
                  src={proj.img}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Text Info: Centered, Clean, Classy below the image */}
              <div className="pt-3.5 px-2 flex flex-col items-center">
                <h3
                  className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 group-hover:text-[#ff3b00] transition-colors"
                  style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                >
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
                  {proj.location}
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#ff3b00] group-hover:text-[#e03400] transition-colors">
                  <span className="underline underline-offset-4 decoration-[#ff3b00]/40 group-hover:decoration-[#ff3b00]">
                    View Case Study
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Button: View All Projects */}
      <div className="text-center mt-8 md:mt-10">
        <button
          onClick={onViewAll}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-neutral-300/90 text-neutral-900 font-semibold text-xs tracking-wider uppercase hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer"
        >
          <span>View All Commercial Projects</span>
          <ArrowRight className="w-4 h-4 text-[#ff3b00] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  )
}


const valuePillars = [
  {
    title: 'Commercial Specialization',
    desc: 'We focus exclusively on high-demand commercial landscapes, campuses, and hospitality properties that demand zero downtime.',
    icon: Compass,
  },
  {
    title: 'Bespoke Fabrication',
    desc: 'Off-the-shelf fixtures often fail architectural visions. We engineer custom brackets, optics, and bollards to suit the blueprint.',
    icon: Wrench,
  },
  {
    title: 'Proprietary Visualization',
    desc: 'Our proprietary on-site planning platform eliminates guesswork, enabling stakeholders to review simulated illumination before fabrication.',
    icon: Cpu,
  },
  {
    title: 'Single-Source Accountability',
    desc: 'From initial photometric consultation to domestic production and installation, you collaborate with one dedicated engineering team.',
    icon: Shield,
  },
]

export default function Home({ setPage, navigateToProject }: PageProps) {
  return (
    <div className="bg-[#faf9f7] text-[#111111] overflow-hidden">
      {/* SECTION 1: HERO */}
      <HeroSection
        onStartProject={() => setPage('contact')}
        onExploreProjects={() => setPage('projects')}
        onLaunch3D={() => setPage('tiebreak')}
      />

      {/* SECTION 2: BRAND POSITIONING (Clean Editorial Lead, No Robotic Eyebrow) */}
      <section id="approach-section" className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto border-b border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Clean Editorial Headline */}
          <div className="lg:col-span-7">
            <h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-[#111111] leading-[1.05]"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              Lighting designed around the property. <br />
              <span className="text-neutral-400">Not the catalog.</span>
            </h2>
          </div>

          {/* Right Column: Editorial Body & Core Facts */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-base md:text-lg text-neutral-700 font-light leading-relaxed mb-8">
              Commercial environments have distinct architectural identities, security requirements, and night-time visitor behaviors. Rather than forcing standard off-the-shelf fixtures into your landscape, TouchStone engineers turnkey illumination strategies tailored to your exact terrain and structures.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">PHOTOMETRICS</span>
                <p className="text-sm font-semibold text-[#111111] mt-1">Dark Sky &amp; IES Compliant</p>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">WARRANTY</span>
                <p className="text-sm font-semibold text-[#111111] mt-1">Lifetime Fixture Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATS STRIP */}
      <section className="bg-[#f0ede8] border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {statsData.map((stat, idx) => (
            <div key={idx} className={`flex flex-col ${idx !== 0 ? 'md:pl-8' : ''} ${idx > 1 ? 'pt-6 md:pt-0' : ''}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight tabular-nums"
                  style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                >
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  {stat.unit}
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTINUOUS PROJECTS CAROUSEL (Light Theme & Elegant Moving Marquee) */}
      <ContinuousProjectsMarquee
        items={projects}
        onSelectProject={(id) => navigateToProject && navigateToProject(id)}
        onViewAll={() => setPage('projects')}
      />


      {/* 🏛️ COMMERCIAL SPECIFICATION LUMINAIRES (Simplified Direct Grid) */}
      <CommercialLuminairesSection onContactClick={() => setPage('contact')} />

      {/* ⚡ SECTION 5: PULL CORD WAVE TRANSITION */}
      <PullCordReveal onNavigateToManufacturing={() => setPage('manufacturing')} />

      {/* SECTION 6: TECHNOLOGY & IPAD VISUALIZATION (Clean Header & Unified Button) */}
      <section id="ipad-planning-suite" className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] leading-[1.1] mb-6"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              See your lighting <br />
              <span className="text-neutral-400">before we build it.</span>
            </h2>

            <p className="text-base text-neutral-700 font-light leading-relaxed mb-6">
              Unlike traditional contractors who present static blueprints, TouchStone’s proprietary on-site planning platform maps actual architectural contours, lumen throws, and shadow gradients live on your grounds.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Interactive luminaire beam angle simulation',
                'Zoned color temperature tuning (2700K - 4000K)',
                'Accurate shadow and contrast mapping',
                'Instant photometric compliance validation',
              ].map((pt, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-neutral-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#ff3b00] shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setPage('contact')}
              className="px-8 py-4 rounded-full bg-[#f0ede8] hover:bg-[#e4e0d7] text-[#111111] font-bold text-xs uppercase tracking-[0.14em] transition-all border border-black/10 shadow-sm hover:shadow-md cursor-pointer"
            >
              Schedule a Live Demo
            </button>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-lg">
              <IPadMockup />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY TOUCHSTONE (TRUST PILLARS) */}
      <section className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-black/5">
        <div className="max-w-2xl mb-14">
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111]"
            style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
          >
            Precision at every layer.
          </h2>
          <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">
            Direct architectural manufacturing and photometric accountability from a single Midwestern facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuePillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="flex flex-col p-7 rounded-2xl border border-black/5 hover:border-black/20 transition-all bg-white shadow-2xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-[#111111] mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className="text-lg font-bold text-[#111111] mb-2"
                  style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* SECTION 8: FINAL CTA (Unified Button Design) */}
      <section className="relative py-28 md:py-36 bg-[#0c0c0e] text-white overflow-hidden select-none">
        <img
          src={IMGS.hotelOrnate}
          alt="Illuminated hotel facade at night"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/85 to-[#0c0c0e]/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <h2
            className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
            style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
          >
            Have a commercial project <br />
            in mind?
          </h2>

          <p className="text-neutral-300 text-base md:text-lg max-w-xl font-light leading-relaxed mb-10">
            Connect with our engineering studio for an initial photometric consultation, custom luminaire prototyping, or a comprehensive site assessment.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => setPage('contact')}
              className="px-8 py-4 rounded-full bg-[#f0ede8] hover:bg-[#e4e0d7] text-[#111111] font-bold text-xs uppercase tracking-[0.14em] transition-all border border-black/10 shadow-sm hover:shadow-md cursor-pointer"
            >
              Start Your Project
            </button>
            <button
              onClick={() => setPage('tiebreak')}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-[0.14em] transition-all backdrop-blur-md cursor-pointer"
            >
              🎾 Experience 3D Court Lab
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
