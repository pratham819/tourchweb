import React, { useEffect, useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

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
      {/* =========================================================================
          CENTERPIECE: WARM CREAM STREETLAMP & PENDANT LIGHTING FIXTURES
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Full-bleed warm cream lighting artwork */}
        <img
          src="/hero-streetlights-warm.png"
          alt="TouchStone Architectural Street & Pendant Fixtures"
          className="w-full h-full object-cover object-[65%_center] md:object-center"
        />

        {/* Ambient warm optical glow mapped to mouse movement */}
        <div
          className="absolute w-[360px] md:w-[480px] h-[360px] md:h-[480px] rounded-full bg-gradient-to-tr from-[#f39c12]/20 to-[#ff7b00]/25 blur-[90px] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            top: '18%',
            right: '25%',
            transform: `translate(${mouseOffset.x * 20}px, ${mouseOffset.y * 15}px)`,
          }}
        />

        {/* Soft warm gradient on left so the headline reads with crisp editorial clarity */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 md:w-2/5 bg-gradient-to-r from-[#ede5c5]/90 via-[#ede5c5]/50 to-transparent z-[2]" />

        {/* Subtle bottom edge gradient to harmonize with the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#ede5c5] via-[#ede5c5]/70 to-transparent z-[2]" />
      </div>

      {/* =========================================================================
          BOTTOM ROW: EDITORIAL TYPOGRAPHY & RADIANT CTA BUTTON
         ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-8 sm:pb-10 md:pb-12 pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
          {/* Bottom Left: Clean Editorial Headline matching the present website copy */}
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

          {/* Bottom Right: Monospace Statement + High-Contrast Radiant Orange CTA Button */}
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
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#ede5c5] hover:bg-[#e4dcba] text-[#111111] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 border border-[#d8cfba]/60 shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(237,229,197,0.35)] hover:-translate-y-0.5 active:scale-98 cursor-pointer whitespace-nowrap text-center"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              <span>BOOK A CALL</span>
              <ArrowRight className="w-4 h-4 text-[#c4820a] group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
