import React from 'react'

interface ScrollIndicatorProps {
  targetId?: string
}

export default function ScrollIndicator({ targetId = 'approach-section' }: ScrollIndicatorProps) {
  const scrollToTarget = () => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToTarget}
      className="group flex items-center gap-3.5 bg-black/40 hover:bg-black/70 border border-white/15 hover:border-white/30 text-white/70 hover:text-white px-4 py-2 rounded-full backdrop-blur-xl transition-all cursor-pointer select-none"
      aria-label="Scroll to content"
    >
      <div className="relative w-3.5 h-6 rounded-full border border-white/40 flex items-start justify-center p-0.5">
        <span className="w-1 h-1.5 rounded-full bg-white animate-bounce transition-transform duration-700" />
      </div>
      <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-white/80 group-hover:text-white">
        SCROLL
      </span>
    </button>
  )
}
