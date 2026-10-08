import React, { useState } from 'react'
import { MatchStats } from './TiebreakCanvas'
import { Volume2, VolumeX, Maximize2, Minimize2, Sparkles, Zap, ArrowLeft } from 'lucide-react'

interface TiebreakHUDProps {
  stats: MatchStats
  cameraMode: 'editorial' | 'tactical' | 'courtside'
  setCameraMode: (mode: 'editorial' | 'tactical' | 'courtside') => void
  speedMultiplier: number
  setSpeedMultiplier: (speed: number) => void
  isSoundMuted: boolean
  setIsSoundMuted: (muted: boolean) => void
  onTriggerWave: () => void
  onBackToSite?: () => void
}

export default function TiebreakHUD({
  stats,
  cameraMode,
  setCameraMode,
  speedMultiplier,
  setSpeedMultiplier,
  isSoundMuted,
  setIsSoundMuted,
  onTriggerWave,
  onBackToSite,
}: TiebreakHUDProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [waveRing, setWaveRing] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
        setIsFullscreen(false)
      }
    }
  }

  const handleWaveClick = () => {
    setWaveRing(true)
    setTimeout(() => setWaveRing(false), 800)
    onTriggerWave()
  }

  const formatScore = (score: number) => {
    if (score === 0) return '00'
    if (score < 10) return `0${score}`
    return `${score}`
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10 select-none text-white/90">
      {waveRing && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-rose-500/70 animate-ping opacity-75 scale-150 duration-700" />
        </div>
      )}

      {/* TOP BAR */}
      <div className="flex items-start justify-between">
        <div className="pointer-events-auto flex flex-col space-y-1">
          <div className="flex items-center gap-3">
            {onBackToSite && (
              <button
                onClick={onBackToSite}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 text-xs tracking-widest uppercase transition-all backdrop-blur-md cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-rose-400" />
                <span>Lighting Site</span>
              </button>
            )}
            <span className="text-[10px] uppercase tracking-[0.25em] text-rose-400/90 font-mono px-2 py-0.5 rounded border border-rose-500/30 bg-rose-500/10">
              VOL. IV • PARIS
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white/95" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            THE TIEBREAK
          </h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-mono">
            Editorial 3D WebGL Court • Physics Engine
          </p>
        </div>

        <div className="hidden lg:flex pointer-events-auto items-center gap-8 px-6 py-2.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Radar Speed</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-light text-rose-400 font-mono tracking-tight">{stats.ballSpeedKmh}</span>
              <span className="text-[10px] font-mono text-white/50">KM/H</span>
            </div>
          </div>
          <div className="w-[1px] h-6 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Peak Velocity</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-light text-white/90 font-mono tracking-tight">{stats.peakSpeedKmh}</span>
              <span className="text-[10px] font-mono text-white/50">KM/H</span>
            </div>
          </div>
          <div className="w-[1px] h-6 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Shot Dynamics</span>
            <span className="text-xs font-mono uppercase tracking-wider text-white/70 font-medium">
              {stats.lastShotType}
            </span>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsSoundMuted(!isSoundMuted)}
            className="p-2.5 rounded-full bg-black/40 hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white transition-all backdrop-blur-xl cursor-pointer"
            title={isSoundMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-full bg-black/40 hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white transition-all backdrop-blur-xl cursor-pointer"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* CENTER SCOREBOARD */}
      <div className="pointer-events-none flex flex-col items-center justify-center my-auto">
        <div className="flex items-center gap-8 md:gap-16 opacity-85">
          <div className="flex flex-col items-center">
            <div
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-light tracking-tighter leading-none text-white transition-all duration-300 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
              style={{ fontFamily: '"Cormorant Garamond", "Italiana", serif' }}
            >
              {formatScore(stats.scorePlayer)}
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono mt-2">
              PLAYER • FOREGROUND
            </span>
          </div>

          <div className="text-4xl md:text-6xl text-white/20 font-light font-serif pb-6">:</div>

          <div className="flex flex-col items-center">
            <div
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-light tracking-tighter leading-none text-white/40 transition-all duration-300 drop-shadow-[0_0_20px_rgba(255,42,95,0.2)]"
              style={{ fontFamily: '"Cormorant Garamond", "Italiana", serif' }}
            >
              {formatScore(stats.scoreOpponent)}
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-rose-400/50 font-mono mt-2">
              OPPONENT • BASELINE
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-mono text-white/70">
            RALLY STREAK: <strong className="text-white font-semibold">{stats.rallyCount}</strong>
          </span>
        </div>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="pointer-events-auto flex items-center p-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setCameraMode('editorial')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              cameraMode === 'editorial'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            PARALLAX
          </button>
          <button
            onClick={() => setCameraMode('courtside')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              cameraMode === 'courtside'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            COURTSIDE
          </button>
          <button
            onClick={() => setCameraMode('tactical')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              cameraMode === 'tactical'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            TOP-DOWN
          </button>
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={handleWaveClick}
            className="group relative flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500/80 to-rose-600/80 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs tracking-[0.15em] uppercase shadow-[0_0_25px_rgba(255,42,95,0.45)] hover:shadow-[0_0_35px_rgba(255,42,95,0.7)] transition-all active:scale-95 border border-rose-300/30 backdrop-blur-xl cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin duration-1000" />
            <span>TRIGGER SHOCKWAVE</span>
          </button>

          <button
            onClick={() => setSpeedMultiplier(speedMultiplier === 1.0 ? 0.35 : 1.0)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-mono tracking-wider transition-all backdrop-blur-xl cursor-pointer ${
              speedMultiplier < 1.0
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-black/50 border-white/10 text-white/70 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{speedMultiplier < 1.0 ? 'SLOW-MO 0.35X' : '1.0X REALTIME'}</span>
          </button>
        </div>

        <div className="text-[11px] font-mono tracking-wider text-white/40 text-center sm:text-right hidden md:block">
          <p>MOVE CURSOR TO CONTROL PADDLE</p>
          <p className="text-white/25">CLICK ANYWHERE FOR FLUID RIPPLE</p>
        </div>
      </div>
    </div>
  )
}
