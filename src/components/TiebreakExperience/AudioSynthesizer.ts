class SoundEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private isMuted: boolean = false

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime)
        this.masterGain.connect(this.ctx.destination)
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime)
    }
  }

  public getMuted() {
    return this.isMuted
  }

  public playHitPaddle(velocity: number = 1) {
    if (this.isMuted) return
    this.init()
    if (!this.ctx || !this.masterGain) return

    const now = this.ctx.currentTime
    const v = Math.min(Math.max(velocity, 0.5), 2.2)

    const osc1 = this.ctx.createOscillator()
    const gain1 = this.ctx.createGain()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(320 * v, now)
    osc1.frequency.exponentialRampToValueAtTime(70, now + 0.08)

    gain1.gain.setValueAtTime(0.5 * Math.min(v, 1.2), now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    const bufferSize = this.ctx.sampleRate * 0.06
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2))
    }
    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1200 * v, now)
    filter.Q.setValueAtTime(2.5, now)

    const noiseGain = this.ctx.createGain()
    noiseGain.gain.setValueAtTime(0.4 * v, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

    osc1.connect(gain1)
    gain1.connect(this.masterGain)
    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(this.masterGain)

    osc1.start(now)
    osc1.stop(now + 0.14)
    noise.start(now)
    noise.stop(now + 0.08)
  }

  public playCourtBounce(velocity: number = 1) {
    if (this.isMuted) return
    this.init()
    if (!this.ctx || !this.masterGain) return

    const now = this.ctx.currentTime
    const v = Math.min(Math.max(velocity, 0.4), 1.8)

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(110 * v, now)
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.18)

    gain.gain.setValueAtTime(0.6 * v, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    osc.connect(gain)
    gain.connect(this.masterGain)

    osc.start(now)
    osc.stop(now + 0.25)
  }

  public playScoreChime() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx || !this.masterGain) return

    const now = this.ctx.currentTime
    const freqs = [587.33, 880.0, 1174.66, 1760.0]

    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator()
      const gain = this.ctx!.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.04)

      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), now + idx * 0.04 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.2)

      osc.connect(gain)
      gain.connect(this.masterGain!)

      osc.start(now + idx * 0.04)
      osc.stop(now + idx * 0.04 + 1.3)
    })
  }

  public playWhoosh() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx || !this.masterGain) return

    const now = this.ctx.currentTime
    const bufferSize = this.ctx.sampleRate * 0.2
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(250, now)
    filter.frequency.exponentialRampToValueAtTime(900, now + 0.1)
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.2)
    filter.Q.setValueAtTime(3.0, now)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    noise.start(now)
    noise.stop(now + 0.25)
  }
}

export const soundEngine = new SoundEngine()
