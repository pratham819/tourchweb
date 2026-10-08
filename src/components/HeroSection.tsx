import React, { useEffect, useState, useRef } from 'react'

interface HeroSectionProps {
  onStartProject: () => void
  onExploreProjects: () => void
  onLaunch3D?: () => void
}

export default function HeroSection({
  onStartProject,
}: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  // Smooth interactive parallax response on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMouseOffset({ x, y })
  }

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[640px] flex flex-col justify-end bg-[#ede5c5] text-[#111111] overflow-hidden select-none"
    >
      {/* Editorial warm paper background */}
      <div className="absolute inset-0 bg-[#ede5c5] pointer-events-none" />

      {/* =========================================================================
          CENTERPIECE: 1367 STUDIO SILHOUETTE WITH LUMINOUS AMBER VISOR
         ========================================================================= */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden pb-0">
        {/* Warm ambient optical glow behind the visor */}
        <div
          className="absolute w-[320px] md:w-[420px] h-[320px] md:h-[420px] rounded-full bg-gradient-to-tr from-[#f39c12]/20 to-[#ff7b00]/25 blur-[75px] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            top: '20%',
            transform: `translate(${mouseOffset.x * 25}px, ${mouseOffset.y * 18}px)`,
          }}
        />

        {/* Silhouette Cutout Figure */}
        <div
          className={`relative h-[72vh] sm:h-[80vh] md:h-[88vh] flex items-end justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-98'
          }`}
          style={{
            transform: `translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 6}px)`,
          }}
        >
          <img
            src="/hero-figure.png"
            alt="Touchstone Commercial Lighting Visionary"
            className="h-full w-auto max-h-none object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] pointer-events-none select-none"
          />
        </div>
      </div>

      {/* =========================================================================
          BOTTOM ROW: EDITORIAL TYPOGRAPHY & ELECTRIC CALL CTA (EXACT 1367 LAYOUT)
         ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-8 sm:pb-10 md:pb-12 pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
          {/* Bottom Left: Clean Editorial Headline (matching 1367 size & two-tone style) */}
          <div
            className={`max-w-md transition-all duration-1000 delay-100 ease-out ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <h1
              className="text-[clamp(28px,3.8vw,52px)] font-bold tracking-[-0.03em] leading-[1.05] text-[#111111]"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              <span>Custom Lighting</span>
              <br />
              <span>Development for</span>
              <br />
              <span className="text-[#8e897c]">Growing Spaces.</span>
            </h1>
          </div>

          {/* Bottom Right: Monospace Statement + High-Contrast Orange CTA Button */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 transition-all duration-1000 delay-200 ease-out shrink-0 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <p
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.05em] text-[#3e3c36] leading-[1.4] max-w-[240px]"
              style={{ fontFamily: '"Space Grotesk", monospace' }}
            >
              WE COLLABORATE WITH
              <br />
              FORWARD-THINKING ARCHITECTS TO
              <br />
              SHAPE AND ELEVATE THEIR
              <br />
              FUTURE.
            </p>

            <button
              onClick={onStartProject}
              className="px-8 py-4 rounded-full bg-[#f0ede8] hover:bg-[#e4e0d7] active:scale-98 text-[#111111] font-bold text-xs uppercase tracking-[0.14em] transition-all duration-300 border border-black/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer whitespace-nowrap text-center"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              BOOK A CALL
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
