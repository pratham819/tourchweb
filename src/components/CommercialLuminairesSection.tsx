import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COMMERCIAL_PRODUCTS, type CommercialProduct } from '../data/commercialProducts'
import { Sparkles, ArrowRight } from 'lucide-react'

interface Props {
  onContactClick: () => void
}

const CATEGORIES = [
  { id: 'all', label: 'All Series' },
  { id: 'pathway', label: 'Pathway & Walkways' },
  { id: 'spotlight', label: 'Directional & Flood' },
  { id: 'bollard', label: 'Architectural Bollards' },
  { id: 'sconce', label: 'Wall & Sconces' },
  { id: 'hardscape', label: 'Hardscape & Steps' },
]

const staggerGrid = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export default function CommercialLuminairesSection({ onContactClick }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewModes, setViewModes] = useState<Record<string, 'product' | 'night'>>({})

  // Listen for category selection dispatched from Nav bar
  useEffect(() => {
    const handleCategoryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail) {
        setSelectedCategory(customEvent.detail)
      }
    }
    window.addEventListener('touchstone-select-category', handleCategoryEvent)
    return () => window.removeEventListener('touchstone-select-category', handleCategoryEvent)
  }, [])

  // Products belonging to currently selected category
  const categoryProducts =
    selectedCategory === 'all'
      ? COMMERCIAL_PRODUCTS
      : COMMERCIAL_PRODUCTS.filter((p) => p.category === selectedCategory)

  const toggleViewMode = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setViewModes((prev) => ({
      ...prev,
      [productId]: prev[productId] === 'night' ? 'product' : 'night',
    }))
  }

  const getViewMode = (productId: string) => viewModes[productId] || 'product'

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId)
  }

  return (
    <section
      id="commercial-fixtures"
      className="pt-10 md:pt-14 pb-20 md:pb-28 bg-[#faf9f7] text-[#111111] border-b border-black/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Clean Section Header (No robotic eyebrow) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] leading-[1.08]"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              Architectural Low-Voltage Luminaires.
            </h2>
            <p className="mt-4 text-sm md:text-base text-neutral-600 leading-relaxed max-w-xl">
              Engineered and hand-assembled in Minnesota. Solid cast brass, marine-grade 6061 aluminum,
              and Corten weathering steel designed to endure decades of extreme commercial exposure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'Fixture' : 'Fixtures'} Displayed
            </span>
          </div>
        </div>

        {/* ── Category Option Selector ── */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-3 mb-12 no-scrollbar border-b border-black/10">
          {CATEGORIES.map((c) => {
            const isActive = selectedCategory === c.id
            return (
              <button
                key={c.id}
                onClick={() => handleCategorySelect(c.id)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-[-0.01em] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-[#111111] shadow-sm'
                    : 'text-neutral-600 hover:text-black hover:bg-black/5 bg-transparent'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </nav>

        {/* ── CLEAN PRODUCT GRID: Displays the lights directly ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={staggerGrid}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categoryProducts.map((product) => {
              const mode = getViewMode(product.id)
              const currentImg = mode === 'night' ? product.nightImg : product.productImg

              return (
                <motion.div
                  key={product.id}
                  variants={cardItem}
                  layout
                  className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Media Container with Studio / Night Toggle */}
                  <div className="relative aspect-[4/3] w-full bg-[#f6f5f1] flex items-center justify-center p-6 overflow-hidden border-b border-neutral-100">
                    <img
                      src={currentImg}
                      alt={`${product.title} - ${mode === 'night' ? 'Night Illumination' : 'Studio View'}`}
                      className={`w-full h-full transition-all duration-500 ${
                        mode === 'night'
                          ? 'object-cover rounded-xl'
                          : 'object-contain group-hover:scale-105'
                      }`}
                      loading="lazy"
                    />

                    {/* Clean Dual-View Toggle Pill */}
                    <div
                      className="absolute top-3.5 right-3.5 z-10 flex items-center bg-black/80 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => toggleViewMode(product.id, e)}
                        className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                          mode === 'product'
                            ? 'bg-white text-black font-bold shadow-xs'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        Studio
                      </button>
                      <button
                        onClick={(e) => toggleViewMode(product.id, e)}
                        className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                          mode === 'night'
                            ? 'bg-white text-black font-bold shadow-xs'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        Night
                      </button>
                    </div>

                    {/* Category Label */}
                    <div className="absolute bottom-3.5 left-3.5">
                      <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white/90">
                        {product.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Minimal Card Body: Pure Product Title & Arrow */}
                  <div className="px-5 py-4 flex items-center justify-between bg-white">
                    <h3
                      className="text-base font-bold text-neutral-900 group-hover:text-[#ff3b00] transition-colors tracking-tight"
                      style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
                    >
                      {product.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#ff3b00] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom Bespoke Architectural Runs Banner (Unified Button, No Neon Yellow) ── */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl bg-[#111111] text-[#f7f5f0] flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/10 shadow-xl">
          <div className="max-w-xl">
            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3"
              style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}
            >
              Need Custom Arm Lengths, Mounting Plates, or RAL Finishes?
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We specialize in custom architectural fabrications. Because we machine our luminaires domestically, we can customize brackets, stem heights, and optic beam angles to fit your project blueprint.
            </p>
          </div>

          <button
            onClick={onContactClick}
            className="px-8 py-4 rounded-full bg-[#f0ede8] hover:bg-[#e4e0d7] text-[#111111] font-bold text-xs uppercase tracking-[0.14em] transition-all shrink-0 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] border border-black/10"
          >
            REQUEST TRADE QUOTE
          </button>
        </div>
      </div>
    </section>
  )
}
