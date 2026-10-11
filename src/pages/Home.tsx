import React, { useState, useEffect, useRef } from 'react'
import { type PageProps } from '../App'
import HeroSection from '../components/HeroSection'
import PullCordReveal from '../components/PullCordReveal'
import IPadMockup from '../components/IPadMockup'
import CommercialLuminairesSection from '../components/CommercialLuminairesSection'
import { ArrowRight, CheckCircle2, Shield, Compass, Cpu, Wrench, ArrowUpRight, MapPin, Sparkles } from 'lucide-react'

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
  hero: 'https://images.unsplash.com/photo-1772289767405-69513d023448?w=1920&q=85&auto=format',
  campus: 'https://images.unsplash.com/photo-1769971361536-d7d69715a9c2?w=1600&q=85&auto=format',
  hospitality: 'https://images.unsplash.com/photo-1785910723802-99967d4fa265?w=1600&q=85&auto=format',
  pathway: 'https://images.unsplash.com/photo-1777013371468-1ec321f18915?w=1600&q=85&auto=format',
  multifamily: 'https://images.unsplash.com/photo-1571440727633-ca6b05da2008?w=1600&q=85&auto=format',
  citypark: 'https://images.unsplash.com/photo-1770234895407-27d41a860541?w=1600&q=85&auto=format',
  fabrication: 'https://images.unsplash.com/photo-1735494033576-9c882e80504c?w=1600&q=85&auto=format',
  hotelOrnate: 'https://images.unsplash.com/photo-1766164185798-d6e7eb23a131?w=1600&q=85&auto=format',
  cityDusk: 'https://images.unsplash.com/photo-1785736098735-51909a463903?w=1600&q=85&auto=format',
}

const statsData = [
  { target: 40, suffix: '+', unit: 'Years', label: 'of commercial lighting engineering' },
  { target: 50, suffix: '+', unit: 'Projects', label: 'commercial installations executed' },
  { target: 500, suffix: '+', unit: 'Custom Fixtures', label: 'built to architectural specification' },
  { target: 100, suffix: '%', unit: 'Made in USA', label: 'fixtures engineered and built domestically' },
]

interface PinterestProjectItem {
  id: string
  title: string
  category: string
  type: string
  location: string
  scope: string
  heightClass: string
  img: string
  badgeText: string
}

const pinterestProjects: PinterestProjectItem[] = [
  {
    id: 'the-summit',
    title: 'The Summit Campus',
    category: 'Corporate',
    type: 'Corporate Headquarters & Campus',
    location: 'Eden Prairie, MN',
    scope: '28 Custom Fixtures · Facade & Perimeter Path Lighting',
    heightClass: 'h-[480px] md:h-[560px]',
    img: IMGS.campus,
    badgeText: 'Corporate Campus',
  },
  {
    id: 'riverside-commons',
    title: 'Riverside Commons',
    category: 'Multifamily',
    type: 'Luxury Multifamily Development',
    location: 'Plymouth, MN',
    scope: '34 Units · Central Amenity Courtyard & Entry Sequence',
    heightClass: 'h-[360px] md:h-[400px]',
    img: IMGS.multifamily,
    badgeText: 'Luxury Multifamily',
  },
  {
    id: 'the-grand-marquette',
    title: 'The Grand Marquette',
    category: 'Hospitality',
    type: 'Full-Service Resort & Hotel',
    location: 'Bloomington, MN',
    scope: '41 Units · Custom Porte-Cochère & Waterfront Promenade',
    heightClass: 'h-[520px] md:h-[600px]',
    img: IMGS.hospitality,
    badgeText: 'Hospitality & Resort',
  },
  {
    id: 'northfield-crossing',
    title: 'Northfield Crossing',
    category: 'Retail & Civic',
    type: 'Mixed-Use Lifestyle Destination',
    location: 'Maple Grove, MN',
    scope: '52 Units · Pedestrian Plaza & Architectural Facade Accents',
    heightClass: 'h-[380px] md:h-[430px]',
    img: IMGS.cityDusk,
    badgeText: 'Retail Plaza',
  },
  {
    id: 'highland-plaza',
    title: 'Highland Civic Plaza',
    category: 'Retail & Civic',
    type: 'Public Realm & Civic Parks',
    location: 'St. Paul, MN',
    scope: '38 Units · Dark-Sky Certified Perimeter Louvers',
    heightClass: 'h-[460px] md:h-[520px]',
    img: IMGS.citypark,
    badgeText: 'Civic Architecture',
  },
  {
    id: 'wayzata-bay-club',
    title: 'Wayzata Bay Club',
    category: 'Hospitality',
    type: 'Waterfront Private Club',
    location: 'Wayzata, MN',
    scope: 'Bespoke Corten Bollards & Promenade Waterfront Grazing',
    heightClass: 'h-[360px] md:h-[410px]',
    img: IMGS.hotelOrnate,
    badgeText: 'Private Hospitality',
  },
]

function PinterestProjectsShowcase({
  items = pinterestProjects,
  onSelectProject,
  onViewAll,
}: {
  items?: PinterestProjectItem[]
  onSelectProject: (id: string) => void
  onViewAll: () => void
}) {
  const [activeCategory, setActiveCategory] = useState('All Projects')

  const categories = ['All Projects', 'Corporate', 'Hospitality', 'Multifamily', 'Retail & Civic']

  const filteredItems =
    activeCategory === 'All Projects'
      ? items
      : items.filter((item) => item.category === activeCategory)

  return (
    <section className="py-20 md:py-28 bg-[#faf9f7] border-y border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0ede8] border border-black/5 text-[#c9a96e] text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Featured Installations</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] leading-tight"
            style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
          >
            Enhance Your Outdoor Vision
          </h2>
          <p className="text-neutral-600 text-base md:text-lg mt-4 font-light leading-relaxed">
            Architectural lighting engineered to bring campuses, hotels, and retail destinations to life after dark.
          </p>

          {/* Pinterest Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-md shadow-neutral-900/10'
                      : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Pinterest Masonry Waterfall Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8">
          {filteredItems.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="break-inside-avoid mb-6 md:mb-8 group relative rounded-3xl overflow-hidden bg-neutral-900 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.24)] transition-all duration-500 cursor-pointer"
            >
              {/* Image Frame */}
              <div className={`relative w-full overflow-hidden ${project.heightClass}`}>
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Ambient Lighting Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:from-black/95 group-hover:via-black/45 transition-all duration-500" />

                {/* Top-Left Category Badge */}
                <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
                  <span>{project.badgeText}</span>
                </div>

                {/* Top-Right Pinterest Hover Action Pill */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none sm:pointer-events-auto">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff3b00] text-white text-xs font-semibold shadow-lg hover:bg-[#e03400] transition-colors">
                    <span>View Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 z-20 flex flex-col text-white">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                    <MapPin className="w-3 h-3 text-[#ff5500]" />
                    <span>{project.location}</span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#ff9d7a] transition-colors leading-snug"
                    style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300/90 font-light mt-1.5 line-clamp-2">
                    {project.scope}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#ff5500] group-hover:underline underline-offset-4 decoration-[#ff5500]/60 inline-flex items-center gap-1">
                      <span>Explore Case Study</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <span className="text-neutral-400 font-mono text-[11px]">
                      {project.type.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 hover:bg-black text-white font-semibold text-xs tracking-widest uppercase shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <span>View All Commercial Projects</span>
            <ArrowRight className="w-4 h-4 text-[#ff5500] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}


const valuePillars = [
  {
    title: 'Commercial Specialization',
    desc: 'We focus exclusively on high-demand commercial landscapes, campuses, and hospitality properties that demand zero downtime.',
    icon: Compass,
    iconColor: 'text-[#d97706]',
    bgGradient: 'from-[#fffbeb] to-[#fef3c7]',
    borderColor: 'border-[#fde68a]',
    tag: 'CAMPUS & HOSPITALITY',
  },
  {
    title: 'Bespoke Fabrication',
    desc: 'Off-the-shelf fixtures often fail architectural visions. We engineer custom brackets, optics, and bollards to suit the blueprint.',
    icon: Wrench,
    iconColor: 'text-[#ea580c]',
    bgGradient: 'from-[#fff7ed] to-[#ffedd5]',
    borderColor: 'border-[#fed7aa]',
    tag: 'DOMESTIC CNC & FORGE',
  },
  {
    title: 'Proprietary Visualization',
    desc: 'Our proprietary on-site planning platform eliminates guesswork, enabling stakeholders to review simulated illumination before fabrication.',
    icon: Cpu,
    iconColor: 'text-[#ff5500]',
    bgGradient: 'from-[#fff1ee] to-[#ffe4de]',
    borderColor: 'border-[#ffccbf]',
    tag: 'PHOTOMETRIC IPAD APP',
  },
  {
    title: 'Single-Source Accountability',
    desc: 'From initial photometric consultation to domestic production and installation, you collaborate with one dedicated engineering team.',
    icon: Shield,
    iconColor: 'text-[#b45309]',
    bgGradient: 'from-[#fefce8] to-[#fef08a]/60',
    borderColor: 'border-[#fef08a]',
    tag: 'LIFETIME GUARANTEE',
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

      {/* SECTION 4: PINTEREST-STYLE PROJECT SHOWCASE (High-Impact Masonry Gallery) */}
      <PinterestProjectsShowcase
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
                  <CheckCircle2 className="w-4 h-4 text-[#c4820a] shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setPage('contact')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ede5c5] hover:bg-[#e4dcba] text-[#111111] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 border border-[#d8cfba]/60 shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(237,229,197,0.35)] hover:-translate-y-0.5 active:scale-98 cursor-pointer"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              <span>Schedule a Live Demo</span>
              <ArrowRight className="w-4 h-4 text-[#c4820a] group-hover:translate-x-1.5 transition-transform" />
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
                className="group flex flex-col p-8 rounded-3xl border border-black/5 hover:border-amber-500/30 transition-all duration-300 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(217,119,6,0.1)] hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.bgGradient} border ${pillar.borderColor} flex items-center justify-center ${pillar.iconColor} mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold mb-2">
                  {pillar.tag}
                </div>
                <h3
                  className="text-lg font-bold text-[#111111] group-hover:text-[#d97706] transition-colors mb-2.5"
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

          <div className="flex items-center justify-center">
            <button
              onClick={() => setPage('contact')}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#ede5c5] hover:bg-[#e4dcba] text-[#111111] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 border border-[#d8cfba]/50 shadow-[0_8px_24px_rgba(237,229,197,0.2)] hover:shadow-[0_14px_32px_rgba(237,229,197,0.32)] hover:-translate-y-0.5 active:scale-98 cursor-pointer"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 text-[#c4820a] group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
