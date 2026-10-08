import React, { useEffect, useRef } from 'react'

interface ShockwavePostOverlayProps {
  active: boolean
  origin: { x: number; y: number } // UV 0 to 1 (screen percentage)
  progress: number // 0 to 1
}

export default function ShockwavePostOverlay({
  active,
  origin,
  progress,
}: ShockwavePostOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = (canvas.width = window.innerWidth)
    const h = (canvas.height = window.innerHeight)

    const centerX = origin.x * w
    const centerY = origin.y * h

    const maxRadius = Math.hypot(w, h) * 1.35
    const currentRadius = progress * maxRadius
    const waveBandWidth = Math.max(120, progress * 320) // Heavy broad expanding band

    ctx.clearRect(0, 0, w, h)

    // 1. RADIANT BULB FLASH EXPLOSION (Originating directly at the bulb light source)
    if (progress < 0.4) {
      const flashOpacity = (1.0 - progress / 0.4) * 0.98
      const flashRadius = currentRadius * 0.6 + 180

      const flashGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        flashRadius
      )
      flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashOpacity})`)
      flashGrad.addColorStop(0.2, `rgba(255, 245, 210, ${flashOpacity * 0.9})`)
      flashGrad.addColorStop(0.5, `rgba(201, 169, 110, ${flashOpacity * 0.7})`)
      flashGrad.addColorStop(0.8, `rgba(255, 42, 96, ${flashOpacity * 0.45})`)
      flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = flashGrad
      ctx.beginPath()
      ctx.arc(centerX, centerY, flashRadius, 0, Math.PI * 2)
      ctx.fill()
    }

    // 2. HEAVY OPTICAL SHOCKWAVE CREST WITH CHROMATIC ABERRATION PRISM SPLIT
    const innerRadius = Math.max(0, currentRadius - waveBandWidth)
    const waveGrad = ctx.createRadialGradient(
      centerX,
      centerY,
      innerRadius,
      centerX,
      centerY,
      currentRadius
    )

    const waveAlpha = (1.0 - progress * 0.55) * 0.92

    // Chromatic prism dispersion (Red, Gold, Pure White crest, Cyan/Ice Blue edge)
    waveGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
    waveGrad.addColorStop(0.25, `rgba(255, 42, 96, ${waveAlpha * 0.7})`)  // Neon Rose
    waveGrad.addColorStop(0.55, `rgba(255, 255, 255, ${waveAlpha * 0.95})`) // Bright White Crest
    waveGrad.addColorStop(0.75, `rgba(201, 169, 110, ${waveAlpha * 0.85})`) // Warm Brass Gold
    waveGrad.addColorStop(0.92, `rgba(67, 132, 255, ${waveAlpha * 0.75})`) // Ice Blue Fringe
    waveGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = waveGrad
    ctx.beginPath()
    ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
    ctx.fill()

    // 3. INTENSE REFRACTION SHOCKWAVE RING (High definition crisp ripple)
    const sharpRingRadius = currentRadius * 0.88
    if (sharpRingRadius > 15) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, sharpRingRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${(1.0 - progress * 0.7) * 0.85})`
      ctx.lineWidth = Math.max(4, 12 * (1.0 - progress))
      ctx.shadowColor = 'rgba(255, 240, 200, 0.95)'
      ctx.shadowBlur = 32
      ctx.stroke()
      ctx.restore()
    }

    // 4. SECONDARY TRAILING PULSE RING
    const secondaryRadius = currentRadius * 0.65
    if (secondaryRadius > 15) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, secondaryRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(201, 169, 110, ${(1.0 - progress) * 0.5})`
      ctx.lineWidth = 3
      ctx.shadowColor = 'rgba(255, 42, 96, 0.7)'
      ctx.shadowBlur = 18
      ctx.stroke()
      ctx.restore()
    }
  }, [active, origin, progress])

  if (!active) return null

  // Calculate dynamic heavy blur intensity (peaks at mid-expansion up to 28px)
  const blurPx = Math.sin(progress * Math.PI) * 28

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* HEAVY OPTICAL BACKDROP BLUR & CHROMATIC LENSING */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-75"
        style={{
          backdropFilter: `blur(${blurPx}px) saturate(${1 + Math.sin(progress * Math.PI) * 0.8}) contrast(${
            1 + Math.sin(progress * Math.PI) * 0.2
          })`,
          WebkitBackdropFilter: `blur(${blurPx}px) saturate(${
            1 + Math.sin(progress * Math.PI) * 0.8
          }) contrast(${1 + Math.sin(progress * Math.PI) * 0.2})`,
          opacity: Math.sin(progress * Math.PI) * 1.0,
        }}
      />

      {/* CANVAS FOR CONCENTRIC CHROMATIC SHOCKWAVE DISPERSION */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  )
}
