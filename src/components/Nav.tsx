import React, { useState, useEffect, useRef } from 'react'
import { type Page } from '../App'
import { ChevronDown, ArrowUpRight, X, Phone, Mail, MapPin } from 'lucide-react'
import TouchStoneLogo from './TouchStoneLogo'

interface NavProps {
  page: Page
  setPage: (page: Page) => void
  navigateToProject?: (id: string) => void
}

const RESIDENTIAL_URL = 'https://touchstonelights.com'

export default function Nav({ page, setPage, navigateToProject }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Track scroll position to morph between wide transparent header and floating pill
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when side nav is open
  useEffect(() => {
    if (sideNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sideNavOpen])

  // Dropdown hover timing
  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(menu)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const closeDropdowns = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(null)
    setSideNavOpen(false)
  }

  // Navigation handlers
  const handleShopAll = () => {
    closeDropdowns()
    if (page !== 'home') {
      setPage('home')
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('touchstone-select-category', { detail: 'all' }))
        const el = document.getElementById('commercial-fixtures')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.dispatchEvent(new CustomEvent('touchstone-select-category', { detail: 'all' }))
      const el = document.getElementById('commercial-fixtures')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSelectCategory = (catId: string) => {
    closeDropdowns()
    if (page !== 'home') {
      setPage('home')
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('touchstone-select-category', { detail: catId }))
        const el = document.getElementById('commercial-fixtures')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.dispatchEvent(new CustomEvent('touchstone-select-category', { detail: catId }))
      const el = document.getElementById('commercial-fixtures')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSelectProject = (projectId: string) => {
    closeDropdowns()
    if (navigateToProject) {
      navigateToProject(projectId)
    } else {
      setPage('projects')
    }
  }

  const handleSelectPage = (target: Page) => {
    closeDropdowns()
    setPage(target)
  }

  const handleSelectIpadApp = () => {
    closeDropdowns()
    if (page !== 'home') {
      setPage('home')
      setTimeout(() => {
        document.getElementById('ipad-planning-suite')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById('ipad-planning-suite')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Dark header detection when on dark background pages
  const isDarkPage = (page === 'manufacturing' || page === 'project-detail') && !scrolled
  const textClass = isDarkPage
    ? 'text-white/80 hover:text-white'
    : 'text-neutral-800/80 hover:text-black'

  return (
    <>
      {/* =========================================================================
          PREVIOUS 1367 STUDIO STYLE FLOATING / MORPHING HEADER
         ========================================================================= */}
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none flex justify-center ${
          scrolled ? 'pt-3 px-4' : 'pt-6 md:pt-8 px-6 md:px-12'
        }`}
      >
        <div
          id="header-pill"
          className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
            scrolled
              ? 'w-full max-w-5xl rounded-full px-5 md:px-7 py-2.5 bg-[#ede5c5]/90 md:bg-white/85 backdrop-blur-xl border border-neutral-900/10 shadow-[0_10px_35px_rgba(0,0,0,0.08)]'
              : 'w-full max-w-7xl px-0 py-0 bg-transparent border-transparent'
          }`}
        >
          {/* =====================================================================
              LEFT: Shop All, Categories ⌄, Use Cases ⌄
             ===================================================================== */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* 1. Shop All */}
            <button
              onClick={handleShopAll}
              className={`text-xs md:text-sm tracking-[-0.01em] transition-colors cursor-pointer bg-transparent border-none p-0 ${textClass}`}
            >
              Shop All
            </button>

            {/* 2. Categories ⌄ */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('categories')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')
                }
                className={`text-xs md:text-sm tracking-[-0.01em] transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1 group ${textClass}`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    activeDropdown === 'categories' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'categories' && (
                <div className="absolute top-full left-0 pt-2 z-50 animate-in fade-in duration-150">
                  <div className="bg-[#faf8f4]/95 md:bg-white/95 backdrop-blur-xl border border-neutral-900/10 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.1)] py-1.5 min-w-[220px]">
                    {[
                      { id: 'pathway', label: 'Pathway & Walkways' },
                      { id: 'spotlight', label: 'Directional & Flood Spotlights' },
                      { id: 'bollard', label: 'Architectural Bollards' },
                      { id: 'sconce', label: 'Wall Mounts & Sconces' },
                      { id: 'hardscape', label: 'Hardscape & Steps' },
                    ].map(c => (
                      <button
                        key={c.id}
                        onClick={() => handleSelectCategory(c.id)}
                        className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-neutral-700 hover:text-black hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Use Cases ⌄ */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('use-cases')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'use-cases' ? null : 'use-cases')
                }
                className={`text-xs md:text-sm tracking-[-0.01em] transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1 group ${textClass}`}
              >
                <span>Use Cases</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    activeDropdown === 'use-cases' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'use-cases' && (
                <div className="absolute top-full left-0 pt-2 z-50 animate-in fade-in duration-150">
                  <div className="bg-[#faf8f4]/95 md:bg-white/95 backdrop-blur-xl border border-neutral-900/10 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.1)] py-1.5 min-w-[210px]">
                    {[
                      { id: 'the-summit', label: 'Corporate Campuses' },
                      { id: 'the-grand-marquette', label: 'Hospitality & Resorts' },
                      { id: 'riverside-commons', label: 'Luxury Multifamily' },
                      { id: 'northfield-crossing', label: 'Mixed-Use Retail & Civic' },
                    ].map(proj => (
                      <button
                        key={proj.id}
                        onClick={() => handleSelectProject(proj.id)}
                        className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-neutral-700 hover:text-black hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap"
                      >
                        {proj.label}
                      </button>
                    ))}
                    <button
                      onClick={() => handleSelectPage('tiebreak')}
                      className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-[#ff3b00] hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap font-medium"
                    >
                      🎾 Sports & Athletic Courts
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =====================================================================
              CENTER: TouchStone Official Brandmark
             ===================================================================== */}
          <button
            onClick={() => {
              closeDropdowns()
              setPage('home')
              window.scrollTo({ top: 0, behavior: 'instant' })
            }}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 group select-none transition-transform hover:scale-[1.02]"
            aria-label="Touchstone Commercial Home"
          >
            <TouchStoneLogo
              variant={isDarkPage ? 'dark' : 'light'}
              height={26}
              className="max-w-[170px] sm:max-w-[210px] md:max-w-[240px]"
            />
          </button>

          {/* =====================================================================
              RIGHT: Lighting Applications ⌄, Resources ⌄, and Hamburger Menu
             ===================================================================== */}
          <div className="flex items-center gap-6 xl:gap-8">
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {/* 4. Lighting Applications ⌄ */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('applications')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'applications' ? null : 'applications')
                  }
                  className={`text-xs md:text-sm tracking-[-0.01em] transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1 group ${textClass}`}
                >
                  <span>Lighting Applications</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === 'applications' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeDropdown === 'applications' && (
                  <div className="absolute top-full right-0 pt-2 z-50 animate-in fade-in duration-150">
                    <div className="bg-[#faf8f4]/95 md:bg-white/95 backdrop-blur-xl border border-neutral-900/10 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.1)] py-1.5 min-w-[240px]">
                      {[
                        { cat: 'spotlight', label: 'Facade & Architectural Uplighting' },
                        { cat: 'pathway', label: 'Pedestrian Wayfinding & Egress' },
                        { cat: 'spotlight', label: 'Landscape & Specimen Trees' },
                        { cat: 'bollard', label: 'Security & Perimeter Boundaries' },
                        { cat: 'hardscape', label: 'Hardscape & Retaining Steps' },
                      ].map((app, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectCategory(app.cat)}
                          className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-neutral-700 hover:text-black hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap"
                        >
                          {app.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Resources ⌄ */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')
                  }
                  className={`text-xs md:text-sm tracking-[-0.01em] transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1 group ${textClass}`}
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === 'resources' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeDropdown === 'resources' && (
                  <div className="absolute top-full right-0 pt-2 z-50 animate-in fade-in duration-150">
                    <div className="bg-[#faf8f4]/95 md:bg-white/95 backdrop-blur-xl border border-neutral-900/10 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.1)] py-1.5 min-w-[230px]">
                      <button
                        onClick={() => handleSelectPage('tiebreak')}
                        className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-[#ff3b00] hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap font-medium"
                      >
                        🎾 3D Court Lab Simulator
                      </button>
                      <button
                        onClick={() => handleSelectPage('projects')}
                        className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-neutral-700 hover:text-black hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap"
                      >
                        Selected Project Case Studies
                      </button>
                      <button
                        onClick={() => handleSelectPage('manufacturing')}
                        className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-neutral-700 hover:text-black hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap"
                      >
                        Custom CNC Manufacturing
                      </button>
                      <button
                        onClick={handleSelectIpadApp}
                        className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-neutral-700 hover:text-black hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap"
                      >
                        Proprietary iPad Planning Suite
                      </button>
                      <a
                        href={RESIDENTIAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left px-4 py-2 text-xs md:text-[13px] text-neutral-700 hover:text-black hover:bg-black/5 transition-colors cursor-pointer bg-transparent border-none block whitespace-nowrap no-underline flex items-center justify-between"
                      >
                        <span>Residential Division Catalog</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 1367 Studio Hamburger Menu Icon Button */}
            <button
              onClick={() => setSideNavOpen(true)}
              className="p-1.5 -mr-1.5 flex flex-col justify-center items-center gap-1 bg-transparent border-none cursor-pointer group"
              aria-label="Open side navigation menu"
            >
              <span
                className={`w-5 h-[1.5px] transition-transform duration-300 group-hover:translate-x-0.5 ${
                  isDarkPage ? 'bg-white' : 'bg-black'
                }`}
              />
              <span
                className={`w-5 h-[1.5px] transition-transform duration-300 group-hover:-translate-x-0.5 ${
                  isDarkPage ? 'bg-white' : 'bg-black'
                }`}
              />
              <span
                className={`w-5 h-[1.5px] transition-transform duration-300 group-hover:translate-x-0.5 ${
                  isDarkPage ? 'bg-white' : 'bg-black'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          1367 STUDIO SIDE NAVIGATION DRAWER (Slide-Out Right Panel)
         ========================================================================= */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          sideNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSideNavOpen(false)}
        aria-hidden="true"
      />

      {/* Side Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[440px] bg-[#0f0e0d] text-[#f7f5f0] flex flex-col justify-between p-8 md:p-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sideNavOpen
            ? 'translate-x-0 shadow-[-20px_0_60px_rgba(0,0,0,0.6)] pointer-events-auto visible opacity-100'
            : 'translate-x-[calc(100%+120px)] shadow-none pointer-events-none invisible opacity-0'
        }`}
        aria-label="Side Navigation"
      >
        {/* Drawer Header: Logo + Close */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div className="flex items-center">
            <TouchStoneLogo variant="dark" height={26} className="max-w-[220px]" />
          </div>

          <button
            onClick={() => setSideNavOpen(false)}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="py-6 flex flex-col space-y-3 overflow-y-auto flex-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-1">
            NAVIGATION
          </span>

          {/* 01: Shop All */}
          <button
            onClick={handleShopAll}
            className="group flex items-start gap-4 text-left bg-transparent border-none cursor-pointer p-2 -mx-2 rounded-xl hover:bg-white/[0.04] transition-all"
          >
            <span className="text-xs font-mono text-white/40 group-hover:text-[#ff3b00] transition-colors mt-1">
              01
            </span>
            <div className="flex flex-col">
              <span
                className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all"
                style={{ fontFamily: '"Manrope", sans-serif' }}
              >
                Shop All
              </span>
              <span className="text-xs text-white/40 font-light mt-0.5">
                Complete architectural commercial luminaires catalog
              </span>
            </div>
          </button>

          {/* 02: Categories */}
          <div className="rounded-xl overflow-hidden bg-white/[0.02]">
            <button
              onClick={() =>
                setMobileExpanded(mobileExpanded === 'categories' ? null : 'categories')
              }
              className="w-full group flex items-center justify-between text-left bg-transparent border-none cursor-pointer p-2 rounded-xl hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono text-white/40 group-hover:text-[#ff3b00] transition-colors mt-1">
                  02
                </span>
                <span
                  className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white"
                  style={{ fontFamily: '"Manrope", sans-serif' }}
                >
                  Categories
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/40 transition-transform ${
                  mobileExpanded === 'categories' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileExpanded === 'categories' && (
              <div className="pl-10 pr-2 pb-2 space-y-1">
                {[
                  { id: 'pathway', label: 'Pathway & Walkways' },
                  { id: 'spotlight', label: 'Directional & Flood Spotlights' },
                  { id: 'bollard', label: 'Architectural Bollards' },
                  { id: 'sconce', label: 'Wall Mounts & Sconces' },
                  { id: 'hardscape', label: 'Hardscape & Steps' },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCategory(c.id)}
                    className="w-full text-left py-1.5 text-xs text-white/70 hover:text-white cursor-pointer bg-transparent border-none block"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 03: Use Cases */}
          <div className="rounded-xl overflow-hidden bg-white/[0.02]">
            <button
              onClick={() =>
                setMobileExpanded(mobileExpanded === 'use-cases' ? null : 'use-cases')
              }
              className="w-full group flex items-center justify-between text-left bg-transparent border-none cursor-pointer p-2 rounded-xl hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono text-white/40 group-hover:text-[#ff3b00] transition-colors mt-1">
                  03
                </span>
                <span
                  className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white"
                  style={{ fontFamily: '"Manrope", sans-serif' }}
                >
                  Use Cases
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/40 transition-transform ${
                  mobileExpanded === 'use-cases' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileExpanded === 'use-cases' && (
              <div className="pl-10 pr-2 pb-2 space-y-1">
                {[
                  { id: 'the-summit', label: 'Corporate Campuses' },
                  { id: 'the-grand-marquette', label: 'Hospitality & Resorts' },
                  { id: 'riverside-commons', label: 'Luxury Multifamily' },
                  { id: 'northfield-crossing', label: 'Mixed-Use Retail & Civic' },
                ].map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(proj.id)}
                    className="w-full text-left py-1.5 text-xs text-white/70 hover:text-white cursor-pointer bg-transparent border-none block"
                  >
                    {proj.label}
                  </button>
                ))}
                <button
                  onClick={() => handleSelectPage('tiebreak')}
                  className="w-full text-left py-1.5 text-xs text-[#ff3b00] cursor-pointer bg-transparent border-none block font-medium"
                >
                  🎾 Sports & Athletic Courts (3D Lab)
                </button>
              </div>
            )}
          </div>

          {/* 04: Lighting Applications */}
          <div className="rounded-xl overflow-hidden bg-white/[0.02]">
            <button
              onClick={() =>
                setMobileExpanded(mobileExpanded === 'applications' ? null : 'applications')
              }
              className="w-full group flex items-center justify-between text-left bg-transparent border-none cursor-pointer p-2 rounded-xl hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono text-white/40 group-hover:text-[#ff3b00] transition-colors mt-1">
                  04
                </span>
                <span
                  className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white"
                  style={{ fontFamily: '"Manrope", sans-serif' }}
                >
                  Lighting Applications
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/40 transition-transform ${
                  mobileExpanded === 'applications' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileExpanded === 'applications' && (
              <div className="pl-10 pr-2 pb-2 space-y-1">
                {[
                  { cat: 'spotlight', label: 'Facade & Architectural Uplighting' },
                  { cat: 'pathway', label: 'Pedestrian Wayfinding & Egress' },
                  { cat: 'spotlight', label: 'Landscape & Specimen Trees' },
                  { cat: 'bollard', label: 'Security & Perimeter Boundaries' },
                  { cat: 'hardscape', label: 'Hardscape & Retaining Steps' },
                ].map((app, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectCategory(app.cat)}
                    className="w-full text-left py-1.5 text-xs text-white/70 hover:text-white cursor-pointer bg-transparent border-none block"
                  >
                    {app.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 05: Resources */}
          <div className="rounded-xl overflow-hidden bg-white/[0.02]">
            <button
              onClick={() =>
                setMobileExpanded(mobileExpanded === 'resources' ? null : 'resources')
              }
              className="w-full group flex items-center justify-between text-left bg-transparent border-none cursor-pointer p-2 rounded-xl hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono text-white/40 group-hover:text-[#ff3b00] transition-colors mt-1">
                  05
                </span>
                <span
                  className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white"
                  style={{ fontFamily: '"Manrope", sans-serif' }}
                >
                  Resources
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/40 transition-transform ${
                  mobileExpanded === 'resources' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileExpanded === 'resources' && (
              <div className="pl-10 pr-2 pb-2 space-y-1">
                <button
                  onClick={() => handleSelectPage('tiebreak')}
                  className="w-full text-left py-1.5 text-xs text-[#ff3b00] cursor-pointer bg-transparent border-none block font-medium"
                >
                  🎾 3D Court Lab Simulator
                </button>
                <button
                  onClick={() => handleSelectPage('projects')}
                  className="w-full text-left py-1.5 text-xs text-white/70 hover:text-white cursor-pointer bg-transparent border-none block"
                >
                  Selected Project Case Studies
                </button>
                <button
                  onClick={() => handleSelectPage('manufacturing')}
                  className="w-full text-left py-1.5 text-xs text-white/70 hover:text-white cursor-pointer bg-transparent border-none block"
                >
                  Custom CNC Manufacturing
                </button>
                <button
                  onClick={handleSelectIpadApp}
                  className="w-full text-left py-1.5 text-xs text-white/70 hover:text-white cursor-pointer bg-transparent border-none block"
                >
                  Proprietary iPad Planning Suite
                </button>
              </div>
            )}
          </div>

          {/* Residential Division Link */}
          <div className="pt-2 border-t border-white/10">
            <a
              href={RESIDENTIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between text-sm uppercase tracking-wider text-white/60 hover:text-[#c9a96e] transition-colors no-underline py-2"
            >
              <span>Residential Division</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
          <div className="space-y-1.5 text-xs text-white/60 font-mono">
            <div className="flex items-center gap-2 text-white/80">
              <Mail className="w-3.5 h-3.5 text-[#ff3b00]" />
              <span>specifications@touchstonecommercial.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#ff3b00]" />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <MapPin className="w-3.5 h-3.5" />
              <span>Minneapolis, MN — Direct Architectural Supply</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
