import React, { useState } from 'react'
import TiebreakCanvas, { MatchStats } from './TiebreakCanvas'
import TiebreakHUD from './TiebreakHUD'

interface TiebreakExperienceProps {
  onBackToSite?: () => void
}

export default function TiebreakExperience({ onBackToSite }: TiebreakExperienceProps) {
  const [stats, setStats] = useState<MatchStats>({
    scorePlayer: 0,
    scoreOpponent: 0,
    rallyCount: 0,
    ballSpeedKmh: 142,
    peakSpeedKmh: 168,
    lastShotType: 'FLAT SERVE',
    aces: 2,
  })

  const [cameraMode, setCameraMode] = useState<'editorial' | 'tactical' | 'courtside'>('editorial')
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0)
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false)
  const [triggerWaveFlag, setTriggerWaveFlag] = useState<number>(0)

  const handleTriggerWave = () => {
    setTriggerWaveFlag((prev) => prev + 1)
  }

  return (
    <div className="relative w-full h-screen min-h-[600px] bg-[#07080b] overflow-hidden select-none">
      <TiebreakCanvas
        onStatsUpdate={setStats}
        cameraMode={cameraMode}
        speedMultiplier={speedMultiplier}
        isSoundMuted={isSoundMuted}
        triggerWaveFlag={triggerWaveFlag}
      />

      <TiebreakHUD
        stats={stats}
        cameraMode={cameraMode}
        setCameraMode={setCameraMode}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        isSoundMuted={isSoundMuted}
        setIsSoundMuted={setIsSoundMuted}
        onTriggerWave={handleTriggerWave}
        onBackToSite={onBackToSite}
      />

      <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%] z-10" />
    </div>
  )
}
