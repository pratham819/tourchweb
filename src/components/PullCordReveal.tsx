import React, { useState, useRef, useCallback } from 'react'
import Lamp3DCanvas from './Lamp3D/Lamp3DCanvas'
import { Sparkles, ArrowRight, CheckCircle2, Shield, Wrench, Layers } from 'lucide-react'

interface PullCordRevealProps {
  onNavigateToManufacturing?: () => void
}

export default function PullCordReveal({ onNavigateToManufacturing }: PullCordRevealProps) {
  const [isOn, setIsOn] = useState(false)
  const [waveActive, setWaveActive] = useState(false)
  const [waveOrigin, setWaveOrigin] = useState<{ x: number; y: number }>({ x: 78, y: 24 })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleToggle = useCallback((coords: { x: number; y: number }) => {
    // Lock wave origin to exact inner-bulb coordinates inside the 3D lamp
    setWaveOrigin(coords)
    setWaveActive(true)

    // Toggle the revealed state as the liquid wave expands outward
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsOn((prev) => !prev)
    }, 400)

    // Clear wave active animation state once expansion finishes
    setTimeout(() => {
      setWaveActive(false)
    }, 1150)
  }, [])

  return (
    <section
      className="relative min-h-[760px] w-full overflow-hidden select-none transition-colors duration-700 ease-out"
      style={{
        backgroundColor: isOn ? '#faf8f5' : '#08090c',
      }}
    >
      {/* 1. BUTTERY-SMOOTH WAVE REVEAL MASK LAYER (EXPANDING DIRECTLY FROM INSIDE LAMP) */}
      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden transition-all duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          clipPath: isOn
            ? `circle(170% at ${waveOrigin.x}% ${waveOrigin.y}%)`
            : `circle(0% at ${waveOrigin.x}% ${waveOrigin.y}%)`,
          backgroundColor: '#faf8f5',
          willChange: 'clip-path',
        }}
      />

      {/* 2. CHROMATIC LIQUID SHOCKWAVE CREST (FLOWING OUT OF THE LAMP SHADE) */}
      {waveActive && (
        <div
          className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
          style={{ willChange: 'opacity' }}
        >
          {/* Inner Light Flare Burst (Emerging from inside lamp mouth) */}
          <div
            className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${waveOrigin.x}%`,
              top: `${waveOrigin.y}%`,
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,240,190,0.9) 30%, rgba(201,169,110,0.7) 60%, rgba(255,42,96,0) 100%)',
              boxShadow: '0 0 50px 25px rgba(255,245,210,0.85)',
              animation: 'innerFlareBurst 0.35s ease-out forwards',
              willChange: 'transform, opacity',
            }}
          />

          {/* Concentric Expanding Shockwave Wavefront Ring */}
          <div
            className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${waveOrigin.x}%`,
              top: `${waveOrigin.y}%`,
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(201,169,110,0.65) 35%, rgba(255,42,96,0.45) 65%, rgba(67,132,255,0) 100%)',
              boxShadow: '0 0 80px 40px rgba(201,169,110,0.6), inset 0 0 50px rgba(255,255,255,0.9)',
              animation: 'innerLampWaveExpand 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              willChange: 'transform, opacity',
            }}
          />
        </div>
      )}

      {/* GPU KEYFRAME ANIMATIONS: Silky smooth 60fps transform & opacity */}
      <style>{`
        @keyframes innerFlareBurst {
          0% {
            transform: scale(0.2);
            opacity: 1;
          }
          50% {
            transform: scale(2.2);
            opacity: 0.95;
          }
          100% {
            transform: scale(3.5);
            opacity: 0;
          }
        }

        @keyframes innerLampWaveExpand {
          0% {
            transform: scale(0.15);
            opacity: 1;
          }
          25% {
            opacity: 0.95;
          }
          60% {
            opacity: 0.6;
          }
          100% {
            transform: scale(45);
            opacity: 0;
          }
        }
      `}</style>

      {/* MAIN CONTAINER: TWO COLUMNS (TEXT LEFT, LAMP TOP-RIGHT) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: EDITORIAL TEXT CONTENT */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-2">
            {/* DUAL-LAYER CROSSFADE HEADLINE & BODY */}
            <div className="relative min-h-[320px]">
              {/* STATE A: Dark Architectural Precision */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: isOn ? 0 : 1,
                  transform: isOn ? 'translateY(-18px) scale(0.98)' : 'translateY(0px) scale(1)',
                  pointerEvents: isOn ? 'none' : 'auto',
                  position: isOn ? 'absolute' : 'relative',
                  inset: 0,
                  willChange: 'opacity, transform',
                }}
              >
                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#faf8f5] tracking-tight leading-[1.05] mb-6"
                  style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                >
                  When standard <br />
                  catalog fixtures fail, <br />
                  <span className="text-neutral-400">we manufacture</span> <br />
                  the impossible.
                </h2>

                <p className="text-white/65 text-base sm:text-lg max-w-xl font-light leading-relaxed mb-8">
                  Standard off-the-shelf luminaires often force architects and developers to compromise on beam throw, fixture finish, and extreme weather durability. TouchStone designs and mills bespoke solid brass and architectural alloy fixtures engineered for your property.
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c9a96e] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
                    Pull the brass chain to toggle
                  </span>
                </div>
              </div>

              {/* STATE B: Revealed Warm Cream & Gold Manufacturing World */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: isOn ? 1 : 0,
                  transform: isOn ? 'translateY(0px) scale(1)' : 'translateY(22px) scale(0.98)',
                  pointerEvents: isOn ? 'auto' : 'none',
                  position: !isOn ? 'absolute' : 'relative',
                  inset: 0,
                  willChange: 'opacity, transform',
                }}
              >
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight leading-[1.08] mb-5"
                  style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                >
                  When standard isn't enough, <br />
                  <span className="text-neutral-500">we build exactly</span> what the project needs.
                </h2>

                <p className="text-[#111111]/75 text-base leading-relaxed mb-6 font-normal">
                  Our in-house Minneapolis engineering studio manufactures custom bollards, facade spotlights, and pathway luminaires. Turnkey domestic craftsmanship with zero ocean shipping delays.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                  {[
                    'Bespoke Photometrics & Optics',
                    'Marine-Grade Solid Brass & Copper',
                    'In-House Rapid Prototyping',
                    'Direct Factory Engineering Support',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#111111]/85 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b00] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {onNavigateToManufacturing && (
                    <button
                      onClick={onNavigateToManufacturing}
                      className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#f0ede8] hover:bg-[#e4e0d7] text-[#111111] font-bold text-xs uppercase tracking-[0.14em] transition-all shadow-sm hover:shadow-md border border-black/10 cursor-pointer"
                    >
                      <span>Explore Manufacturing</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D LAMP IN THE TOP-RIGHT CORNER */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start">
            <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] -mt-4 sm:-mt-8">
              <Lamp3DCanvas isOn={isOn} onToggle={handleToggle} />
            </div>

            <div
              className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-500 mt-2 text-center lg:text-right ${
                isOn ? 'text-[#1a1916]/40' : 'text-white/30'
              }`}
            >
              MODEL: TC-LUM-01 • BRUSHED COMMERCIAL BRASS
            </div>
          </div>
        </div>

        {/* BOTTOM SHOWCASE: REVEALED MANUFACTURING FACILITY CARD */}
        {isOn && (
          <div className="mt-14 pt-12 border-t border-[#1a1916]/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fadeIn">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#c9a96e]/20 group h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1735494033576-9c882e80504c?w=1200&h=800&fit=crop&auto=format"
                alt="CNC metal fabrication and precision welding"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c9a96e]">
                    FACILITY 01 • MINNEAPOLIS
                  </span>
                  <h4 className="text-xl font-bold font-serif">Bespoke CNC &amp; TIG Fabrication</h4>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono">
                  100% USA
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c9a96e]/15 flex items-center justify-center text-[#8b6b2a]">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-base text-[#1a1916]">Rapid Prototyping Laboratory</h5>
                  <p className="text-xs text-[#1a1916]/60">Physical CAD &amp; mockups delivered within 72 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c9a96e]/15 flex items-center justify-center text-[#8b6b2a]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-base text-[#1a1916]">Marine-Grade Weathersealing</h5>
                  <p className="text-xs text-[#1a1916]/60">IP67+ submersion &amp; sub-zero freeze rated</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c9a96e]/15 flex items-center justify-center text-[#8b6b2a]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-base text-[#1a1916]">Custom Photometric Mapping</h5>
                  <p className="text-xs text-[#1a1916]/60">Precision IES files modeled specifically for your site</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
