import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { CinematicPostShader } from './CinematicPostShader'
import { soundEngine } from './AudioSynthesizer'

export interface MatchStats {
  scorePlayer: number
  scoreOpponent: number
  rallyCount: number
  ballSpeedKmh: number
  peakSpeedKmh: number
  lastShotType: string
  aces: number
}

interface TiebreakCanvasProps {
  onStatsUpdate: (stats: MatchStats) => void
  cameraMode: 'editorial' | 'tactical' | 'courtside'
  speedMultiplier: number
  isSoundMuted: boolean
  triggerWaveFlag: number
}

export default function TiebreakCanvas({
  onStatsUpdate,
  cameraMode,
  speedMultiplier,
  isSoundMuted,
  triggerWaveFlag,
}: TiebreakCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMutedRef = useRef(isSoundMuted)
  isMutedRef.current = isSoundMuted

  const statsRef = useRef<MatchStats>({
    scorePlayer: 0,
    scoreOpponent: 0,
    rallyCount: 0,
    ballSpeedKmh: 142,
    peakSpeedKmh: 168,
    lastShotType: 'FLAT SERVE',
    aces: 2,
  })

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, prevX: 0, vx: 0 })
  const waveAnimRef = useRef({ active: false, progress: 0, center: [0.5, 0.5] })
  const impactFlashRef = useRef(0)
  const chromaSpikeRef = useRef(0.0035)

  const prevTriggerRef = useRef(triggerWaveFlag)
  useEffect(() => {
    if (triggerWaveFlag !== prevTriggerRef.current) {
      prevTriggerRef.current = triggerWaveFlag
      waveAnimRef.current = {
        active: true,
        progress: 0,
        center: [0.5, 0.5],
      }
      chromaSpikeRef.current = 0.016
      impactFlashRef.current = 0.6
      soundEngine.playWhoosh()
    }
  }, [triggerWaveFlag])

  useEffect(() => {
    soundEngine.setMuted(isSoundMuted)
  }, [isSoundMuted])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#07080b')
    scene.fog = new THREE.FogExp2('#07080b', 0.022)

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 11.5, 14.5)
    camera.lookAt(0, 0, 0.5)

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      stencil: false,
      depth: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.82,
      0.45,
      0.68
    )
    composer.addPass(bloomPass)

    const cinematicPass = new ShaderPass(CinematicPostShader)
    cinematicPass.uniforms.uResolution.value = [width, height]
    composer.addPass(cinematicPass)

    const ambientLight = new THREE.AmbientLight('#12151c', 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight('#f0f4fa', 2.8)
    keyLight.position.set(0, 18, 4)
    scene.add(keyLight)

    const roseRim = new THREE.DirectionalLight('#ff2460', 3.8)
    roseRim.position.set(-14, 5, -9)
    scene.add(roseRim)

    const blueRim = new THREE.DirectionalLight('#4384ff', 2.2)
    blueRim.position.set(14, 5, 9)
    scene.add(blueRim)

    const ballPointLight = new THREE.PointLight('#fff580', 2.5, 7.5, 2)
    scene.add(ballPointLight)

    const courtWidth = 9.2
    const courtLength = 18.4
    const floorGeo = new THREE.PlaneGeometry(courtWidth + 5.0, courtLength + 6.0)
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#0a0c10',
      roughness: 0.88,
      metalness: 0.12,
    })
    const floorMesh = new THREE.Mesh(floorGeo, floorMat)
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.position.y = -0.01
    scene.add(floorMesh)

    const playfieldGeo = new THREE.PlaneGeometry(courtWidth, courtLength)
    const playfieldMat = new THREE.MeshStandardMaterial({
      color: '#0d1016',
      roughness: 0.76,
      metalness: 0.18,
    })
    const playfieldMesh = new THREE.Mesh(playfieldGeo, playfieldMat)
    playfieldMesh.rotation.x = -Math.PI / 2
    playfieldMesh.position.y = 0.001
    scene.add(playfieldMesh)

    const lineMat = new THREE.MeshBasicMaterial({
      color: '#f5f6fa',
      transparent: true,
      opacity: 0.92,
    })

    const lineGroup = new THREE.Group()
    const createCourtLine = (w: number, l: number, x: number, z: number) => {
      const geo = new THREE.PlaneGeometry(w, l)
      const mesh = new THREE.Mesh(geo, lineMat)
      mesh.rotation.x = -Math.PI / 2
      mesh.position.set(x, 0.005, z)
      lineGroup.add(mesh)
      return mesh
    }

    const lineWidth = 0.045
    const halfW = courtWidth / 2
    const halfL = courtLength / 2
    const singlesW = 3.65

    createCourtLine(courtWidth, lineWidth, 0, -halfL)
    createCourtLine(courtWidth, lineWidth, 0, halfL)
    createCourtLine(lineWidth, courtLength, -halfW, 0)
    createCourtLine(lineWidth, courtLength, halfW, 0)
    createCourtLine(lineWidth, courtLength, -singlesW, 0)
    createCourtLine(lineWidth, courtLength, singlesW, 0)

    const serviceDist = 4.6
    createCourtLine(singlesW * 2, lineWidth, 0, -serviceDist)
    createCourtLine(singlesW * 2, lineWidth, 0, serviceDist)
    createCourtLine(lineWidth, serviceDist * 2, 0, 0)
    createCourtLine(lineWidth, 0.35, 0, -halfL + 0.175)
    createCourtLine(lineWidth, 0.35, 0, halfL - 0.175)
    scene.add(lineGroup)

    const netGroup = new THREE.Group()
    const netHeight = 0.95
    const netWidth = courtWidth + 0.8

    const netMeshGeo = new THREE.PlaneGeometry(netWidth, netHeight, 36, 12)
    const netMeshMat = new THREE.MeshBasicMaterial({
      color: '#c4cad8',
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    })
    const netMesh = new THREE.Mesh(netMeshGeo, netMeshMat)
    netMesh.position.set(0, netHeight / 2, 0)
    netGroup.add(netMesh)

    const tapeGeo = new THREE.BoxGeometry(netWidth, 0.04, 0.03)
    const tapeMat = new THREE.MeshBasicMaterial({ color: '#ffffff' })
    const tapeMesh = new THREE.Mesh(tapeGeo, tapeMat)
    tapeMesh.position.set(0, netHeight, 0)
    netGroup.add(tapeMesh)

    const postGeo = new THREE.CylinderGeometry(0.045, 0.045, netHeight + 0.06, 16)
    const postMat = new THREE.MeshStandardMaterial({
      color: '#1a1d26',
      metalness: 0.85,
      roughness: 0.2,
    })
    const postLeft = new THREE.Mesh(postGeo, postMat)
    postLeft.position.set(-netWidth / 2, (netHeight + 0.06) / 2, 0)
    const postRight = new THREE.Mesh(postGeo, postMat)
    postRight.position.set(netWidth / 2, (netHeight + 0.06) / 2, 0)
    netGroup.add(postLeft)
    netGroup.add(postRight)
    scene.add(netGroup)

    const makeCourtTextTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1024
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = '300 24px "Space Grotesk", sans-serif'
        ctx.fillStyle = 'rgba(240, 243, 250, 0.35)'
        ctx.textAlign = 'center'
        ctx.fillText('EDITION AUTOMNE-HIVER • COURT CENTRAL PARIS', 512, 120)

        ctx.font = '600 44px "Cormorant Garamond", serif'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
        ctx.fillText('LE GRAND TIEBREAK', 512, 200)

        ctx.font = '400 16px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(255, 50, 90, 0.65)'
        ctx.fillText('LAT 48.8471° N  •  LONG 2.2530° E  /  REGULATION 23.77M × 8.23M', 512, 270)
      }
      return new THREE.CanvasTexture(canvas)
    }

    const textTex = makeCourtTextTexture()
    const textGeo = new THREE.PlaneGeometry(7.0, 3.5)
    const textMat = new THREE.MeshBasicMaterial({
      map: textTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    const textMesh = new THREE.Mesh(textGeo, textMat)
    textMesh.rotation.x = -Math.PI / 2
    textMesh.position.set(0, 0.006, -7.0)
    scene.add(textMesh)

    const blobGroup = new THREE.Group()
    const blobConfigs = [
      { pos: [-5.8, 1.8, -2.5], size: 1.15, speed: 0.8, color: '#ff2d60' },
      { pos: [5.6, 2.2, 1.8], size: 0.95, speed: 1.1, color: '#387aff' },
      { pos: [-6.2, 2.6, 5.0], size: 1.35, speed: 0.7, color: '#ff3366' },
      { pos: [6.0, 1.6, -5.2], size: 0.85, speed: 1.3, color: '#f59e0b' },
      { pos: [0.0, 3.8, -9.8], size: 1.5, speed: 0.5, color: '#ffffff' },
    ]

    const blobs: {
      mesh: THREE.Mesh
      basePos: THREE.Vector3
      phase: number
      speed: number
      scale: number
    }[] = []

    blobConfigs.forEach((cfg, idx) => {
      const geo = new THREE.IcosahedronGeometry(cfg.size, 4)
      const mat = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.15,
        transmission: 0.88,
        thickness: 1.2,
        ior: 1.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        attenuationColor: new THREE.Color(cfg.color),
        attenuationDistance: 1.5,
        transparent: true,
        opacity: 0.85,
      })

      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2])
      blobGroup.add(mesh)

      blobs.push({
        mesh,
        basePos: new THREE.Vector3(...cfg.pos),
        phase: idx * 1.5,
        speed: cfg.speed,
        scale: cfg.size,
      })
    })
    scene.add(blobGroup)

    const paddleGroup = new THREE.Group()
    const paddleWidth = 1.65
    const paddleRadius = 0.14
    const paddleGeo = new THREE.CapsuleGeometry(paddleRadius, paddleWidth, 16, 24)
    paddleGeo.rotateZ(Math.PI / 2)

    const paddleMat = new THREE.MeshPhysicalMaterial({
      color: '#f8f9fa',
      roughness: 0.12,
      metalness: 0.25,
      transmission: 0.65,
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: new THREE.Color('#ff2460'),
      emissiveIntensity: 0.08,
    })
    const paddleMesh = new THREE.Mesh(paddleGeo, paddleMat)
    paddleGroup.add(paddleMesh)

    const coreStripGeo = new THREE.BoxGeometry(paddleWidth * 0.7, 0.03, 0.04)
    const coreStripMat = new THREE.MeshBasicMaterial({ color: '#ff2d60' })
    const coreStrip = new THREE.Mesh(coreStripGeo, coreStripMat)
    coreStrip.position.set(0, 0, 0.12)
    paddleGroup.add(coreStrip)

    const shadowGeo = new THREE.PlaneGeometry(paddleWidth * 1.4, 0.6)
    const shadowMat = new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: 0.45,
    })
    const paddleShadow = new THREE.Mesh(shadowGeo, shadowMat)
    paddleShadow.rotation.x = -Math.PI / 2
    paddleShadow.position.set(0, 0.008, 0)
    paddleGroup.add(paddleShadow)

    const paddleZ = 8.2
    paddleGroup.position.set(0, 0.22, paddleZ)
    scene.add(paddleGroup)

    const ballContainer = new THREE.Group()
    const ballRadius = 0.18
    const ballGeo = new THREE.SphereGeometry(ballRadius, 32, 32)
    const ballMat = new THREE.MeshStandardMaterial({
      color: '#d6ff38',
      emissive: new THREE.Color('#d6ff38'),
      emissiveIntensity: 0.35,
      roughness: 0.45,
      metalness: 0.05,
    })
    const ballMesh = new THREE.Mesh(ballGeo, ballMat)
    ballContainer.add(ballMesh)
    scene.add(ballContainer)

    const ball = {
      pos: new THREE.Vector3(0, 1.2, 0),
      vel: new THREE.Vector3(2.8, 3.2, 9.5),
      gravity: -16.5,
      squashProgress: 0,
      isSquashing: false,
    }

    const particleCount = 24
    const particleGroup = new THREE.Group()
    const particleGeos: THREE.Mesh[] = []

    for (let i = 0; i < particleCount; i++) {
      const pGeo = new THREE.SphereGeometry(ballRadius * (1 - i / particleCount) * 0.75, 12, 12)
      const pMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? '#d6ff38' : '#ff2a5f',
        transparent: true,
        opacity: Math.max(0.05, (1 - i / particleCount) * 0.55),
        blending: THREE.AdditiveBlending,
      })
      const pMesh = new THREE.Mesh(pGeo, pMat)
      pMesh.position.copy(ball.pos)
      particleGroup.add(pMesh)
      particleGeos.push(pMesh)
    }
    scene.add(particleGroup)

    const particleHistory: THREE.Vector3[] = Array.from(
      { length: particleCount },
      () => new THREE.Vector3(0, 1.2, 0)
    )

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      mouseRef.current.targetX = ndcX
      mouseRef.current.targetY = ndcY

      const targetPaddleX = ndcX * (courtWidth * 0.44)
      mouseRef.current.vx = targetPaddleX - mouseRef.current.prevX
      mouseRef.current.prevX = targetPaddleX
    }

    const onPointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const u = (e.clientX - rect.left) / rect.width
      const v = 1.0 - (e.clientY - rect.top) / rect.height

      waveAnimRef.current = {
        active: true,
        progress: 0,
        center: [u, v],
      }
      chromaSpikeRef.current = 0.012
      soundEngine.playWhoosh()
    }

    window.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerdown', onPointerDown)

    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
      cinematicPass.uniforms.uResolution.value = [w, h]
    }
    window.addEventListener('resize', onResize)

    let lastTime = performance.now()

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate)

      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      const effDt = dt * speedMultiplier

      const mouse = mouseRef.current
      mouse.x += (mouse.targetX - mouse.x) * 0.1
      mouse.y += (mouse.targetY - mouse.y) * 0.1

      let targetCamPos = new THREE.Vector3(0, 11.5, 14.5)
      let targetCamLook = new THREE.Vector3(0, 0, 0.5)

      if (cameraMode === 'editorial') {
        targetCamPos.set(mouse.x * 2.2, 11.0 - mouse.y * 1.5, 14.5 + mouse.y * 1.2)
        targetCamLook.set(mouse.x * 0.8, 0, 0.5)
      } else if (cameraMode === 'tactical') {
        targetCamPos.set(0, 19.0, 1.0)
        targetCamLook.set(0, 0, 0)
      } else if (cameraMode === 'courtside') {
        targetCamPos.set(-7.5 + mouse.x * 1.5, 2.8, 0 + mouse.y * 2.0)
        targetCamLook.set(0, 0.8, 0)
      }

      camera.position.lerp(targetCamPos, 0.06)
      camera.lookAt(targetCamLook)

      const targetPaddleX = mouse.x * (courtWidth * 0.44)
      paddleGroup.position.x += (targetPaddleX - paddleGroup.position.x) * 0.22

      const targetTiltZ = -mouse.vx * 0.4
      paddleGroup.rotation.z += (targetTiltZ - paddleGroup.rotation.z) * 0.15

      blobs.forEach((b) => {
        const t = time * 0.001 * b.speed + b.phase
        b.mesh.position.y = b.basePos.y + Math.sin(t * 1.8) * 0.35
        b.mesh.position.x = b.basePos.x + Math.cos(t * 1.2) * 0.2
        b.mesh.rotation.x = t * 0.2
        b.mesh.rotation.y = t * 0.3

        const distToBall = b.mesh.position.distanceTo(ball.pos)
        if (distToBall < 3.0) {
          const repel = (3.0 - distToBall) / 3.0
          b.mesh.scale.set(
            b.scale * (1 + repel * 0.2),
            b.scale * (1 - repel * 0.15),
            b.scale * (1 + repel * 0.2)
          )
        } else {
          b.mesh.scale.set(b.scale, b.scale, b.scale)
        }
      })

      ball.vel.y += ball.gravity * effDt
      ball.pos.x += ball.vel.x * effDt
      ball.pos.y += ball.vel.y * effDt
      ball.pos.z += ball.vel.z * effDt

      if (ball.pos.y <= 0.18 && ball.vel.y < 0) {
        ball.pos.y = 0.18
        ball.vel.y = Math.abs(ball.vel.y) * 0.88
        ball.squashProgress = 1.0
        ball.isSquashing = true

        soundEngine.playCourtBounce(Math.abs(ball.vel.y) / 8)
        chromaSpikeRef.current = Math.max(chromaSpikeRef.current, 0.006)
      }

      const maxCourtX = courtWidth * 0.52
      if (Math.abs(ball.pos.x) > maxCourtX) {
        ball.vel.x = -ball.vel.x * 0.95
        ball.pos.x = Math.sign(ball.pos.x) * maxCourtX
      }

      if (Math.abs(ball.pos.z) < 0.25 && ball.pos.y < netHeight) {
        ball.vel.z = -ball.vel.z * 0.6
        ball.vel.y = Math.abs(ball.vel.y) * 0.5 + 2.0
        soundEngine.playCourtBounce(0.6)
      }

      const paddleHitboxW = paddleWidth * 0.65
      const distToPaddleX = Math.abs(ball.pos.x - paddleGroup.position.x)

      if (
        ball.pos.z >= paddleZ - 0.4 &&
        ball.pos.z <= paddleZ + 0.5 &&
        ball.vel.z > 0 &&
        distToPaddleX < paddleHitboxW &&
        ball.pos.y <= 1.5
      ) {
        ball.vel.z = -(Math.abs(ball.vel.z) * 1.04 + 1.2)
        const hitOffset = (ball.pos.x - paddleGroup.position.x) / paddleHitboxW
        ball.vel.x = hitOffset * 6.5 + mouse.vx * 1.5
        ball.vel.y = Math.random() * 2.5 + 4.2

        ball.squashProgress = 1.0
        ball.isSquashing = true
        impactFlashRef.current = 0.75
        chromaSpikeRef.current = 0.016

        waveAnimRef.current = {
          active: true,
          progress: 0,
          center: [0.5 + (ball.pos.x / courtWidth) * 0.4, 0.85],
        }

        soundEngine.playHitPaddle(Math.abs(ball.vel.z) / 9)

        const currentSpeedKmh = Math.round(ball.vel.length() * 12.8)
        statsRef.current.rallyCount += 1
        statsRef.current.ballSpeedKmh = currentSpeedKmh
        statsRef.current.peakSpeedKmh = Math.max(statsRef.current.peakSpeedKmh, currentSpeedKmh)
        statsRef.current.lastShotType =
          Math.abs(hitOffset) > 0.4 ? 'CROSSCOURT TOPSPIN' : 'POWER DRIVE'
        onStatsUpdate({ ...statsRef.current })
      }

      if (ball.pos.z <= -halfL + 0.5 && ball.vel.z < 0) {
        ball.vel.z = Math.abs(ball.vel.z) * 0.96 + 0.5
        ball.vel.x = (Math.random() * 2 - 1) * 3.8
        ball.vel.y = Math.random() * 2.0 + 3.8
        soundEngine.playHitPaddle(0.9)

        const currentSpeedKmh = Math.round(ball.vel.length() * 12.5)
        statsRef.current.ballSpeedKmh = currentSpeedKmh
        statsRef.current.peakSpeedKmh = Math.max(statsRef.current.peakSpeedKmh, currentSpeedKmh)
        statsRef.current.lastShotType = 'OPPONENT RETURN'
        onStatsUpdate({ ...statsRef.current })
      }

      if (ball.pos.z > paddleZ + 3.5) {
        statsRef.current.scoreOpponent += 15
        if (statsRef.current.scoreOpponent > 40) statsRef.current.scoreOpponent = 0
        statsRef.current.rallyCount = 0
        onStatsUpdate({ ...statsRef.current })

        ball.pos.set(0, 2.5, -halfL + 1.2)
        ball.vel.set((Math.random() * 2 - 1) * 2.0, 3.2, 9.8)
        soundEngine.playCourtBounce(0.5)
      }

      ballContainer.position.copy(ball.pos)
      ballPointLight.position.set(ball.pos.x, ball.pos.y + 0.25, ball.pos.z)

      if (ball.isSquashing) {
        ball.squashProgress -= effDt * 8.0
        if (ball.squashProgress <= 0) {
          ball.squashProgress = 0
          ball.isSquashing = false
        }
        const squish = Math.sin(ball.squashProgress * Math.PI) * 0.45
        ballContainer.scale.set(1.0 + squish, 1.0 - squish, 1.0 + squish)
      } else {
        const speed = ball.vel.length()
        const stretch = 1.0 + Math.min(speed * 0.018, 0.45)
        const compress = 1.0 / Math.sqrt(stretch)

        const velDir = ball.vel.clone().normalize()
        ballContainer.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), velDir)
        ballContainer.scale.set(compress, stretch, compress)
      }

      particleHistory.unshift(ball.pos.clone())
      if (particleHistory.length > particleCount) {
        particleHistory.pop()
      }
      for (let i = 0; i < particleGeos.length; i++) {
        if (particleHistory[i]) {
          particleGeos[i].position.copy(particleHistory[i])
        }
      }

      if (waveAnimRef.current.active) {
        waveAnimRef.current.progress += dt * 0.95
        cinematicPass.uniforms.uWaveProgress.value = waveAnimRef.current.progress
        cinematicPass.uniforms.uWaveCenter.value = waveAnimRef.current.center
        cinematicPass.uniforms.uWaveStrength.value = 0.065

        if (waveAnimRef.current.progress >= 1.0) {
          waveAnimRef.current.active = false
          cinematicPass.uniforms.uWaveStrength.value = 0.0
        }
      }

      impactFlashRef.current = Math.max(0, impactFlashRef.current - dt * 2.5)
      cinematicPass.uniforms.uImpactFlash.value = impactFlashRef.current

      chromaSpikeRef.current = THREE.MathUtils.lerp(chromaSpikeRef.current, 0.0035, dt * 4.0)
      cinematicPass.uniforms.uChromaIntensity.value = chromaSpikeRef.current

      cinematicPass.uniforms.uTime.value = time * 0.001
      composer.render()
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [cameraMode, speedMultiplier, onStatsUpdate])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none cursor-crosshair"
    />
  )
}
