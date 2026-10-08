import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { soundEngine } from '../TiebreakExperience/AudioSynthesizer'

interface Lamp3DCanvasProps {
  isOn: boolean
  onToggle: (screenCoords: { x: number; y: number }) => void
}

export default function Lamp3DCanvas({ isOn, onToggle }: Lamp3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPulling, setIsPulling] = useState(false)

  const pullDistanceRef = useRef(0)
  const isDraggingRef = useRef(false)
  const startDragYRef = useRef(0)

  const bulbRef = useRef<THREE.Mesh | null>(null)
  const pendantRef = useRef<THREE.Mesh | null>(null)
  const chainGroupRef = useRef<THREE.Group | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const flareIntensityRef = useRef(0)

  const onToggleRef = useRef(onToggle)
  useEffect(() => {
    onToggleRef.current = onToggle
  }, [onToggle])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number
    const width = container.clientWidth
    const height = container.clientHeight

    // 1. THREE.JS SCENE & CAMERA
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 50)
    camera.position.set(0, 0.35, 6.4)
    cameraRef.current = camera

    // 2. RENDERER WITH 100% PURE ALPHA TRANSPARENCY
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // 3. ARCHITECTURAL LIGHTING
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.1)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight('#ffffff', 2.8)
    keyLight.position.set(4, 7, 5)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight('#ffd085', 2.4)
    rimLight.position.set(-5, -1, 3)
    scene.add(rimLight)

    // Dynamic Bulb Light inside the lamp
    const bulbLight = new THREE.PointLight('#fff2c0', isOn ? 4.5 : 0.8, 8.5)
    bulbLight.position.set(0, -0.22, 0)
    scene.add(bulbLight)

    // 4. LAMP ASSEMBLY GROUP (FIXED ANGLE - NEVER TILTS UPWARD)
    const lampGroup = new THREE.Group()
    lampGroup.position.set(0, 0.45, 0)
    lampGroup.scale.set(0.92, 0.92, 0.92)
    lampGroup.rotation.set(0.02, 0.04, 0)
    scene.add(lampGroup)

    // Ceiling Drop Conduit
    const canopyGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.08, 32)
    const canopyMat = new THREE.MeshStandardMaterial({
      color: '#1a1815',
      metalness: 0.88,
      roughness: 0.28,
    })
    const canopy = new THREE.Mesh(canopyGeo, canopyMat)
    canopy.position.set(0, 2.3, 0)
    lampGroup.add(canopy)

    const cordGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.4, 16)
    const cordMat = new THREE.MeshStandardMaterial({
      color: '#12110f',
      roughness: 0.7,
    })
    const cord = new THREE.Mesh(cordGeo, cordMat)
    cord.position.set(0, 1.6, 0)
    lampGroup.add(cord)

    // Knurled Brass Socket
    const socketGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.32, 32)
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#c9a96e',
      metalness: 0.92,
      roughness: 0.18,
    })
    const socket = new THREE.Mesh(socketGeo, brassMat)
    socket.position.set(0, 0.95, 0)
    lampGroup.add(socket)

    // Spun Brass Shade Dome
    const domePoints: THREE.Vector2[] = []
    domePoints.push(new THREE.Vector2(0.2, 0.92))
    domePoints.push(new THREE.Vector2(0.32, 0.82))
    domePoints.push(new THREE.Vector2(0.6, 0.6))
    domePoints.push(new THREE.Vector2(1.05, 0.3))
    domePoints.push(new THREE.Vector2(1.35, 0.0))
    domePoints.push(new THREE.Vector2(1.38, -0.06))
    domePoints.push(new THREE.Vector2(1.34, -0.1))
    domePoints.push(new THREE.Vector2(1.28, -0.06))

    const domeGeo = new THREE.LatheGeometry(domePoints, 48)
    const domeMat = new THREE.MeshStandardMaterial({
      color: '#c9a96e',
      metalness: 0.94,
      roughness: 0.16,
      side: THREE.DoubleSide,
    })
    const dome = new THREE.Mesh(domeGeo, domeMat)
    lampGroup.add(dome)

    // Interior brass bushing sleeve where the pull chain originates
    const bushingGeo = new THREE.CylinderGeometry(0.046, 0.046, 0.12, 16)
    const bushing = new THREE.Mesh(bushingGeo, brassMat)
    bushing.position.set(0.62, 0.34, 0)
    lampGroup.add(bushing)

    // Interior Gold Reflector Rim
    const innerRimGeo = new THREE.TorusGeometry(1.34, 0.03, 16, 48)
    const innerRimMat = new THREE.MeshStandardMaterial({
      color: '#e8c989',
      metalness: 0.96,
      roughness: 0.1,
    })
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat)
    innerRim.rotation.x = Math.PI / 2
    innerRim.position.set(0, -0.06, 0)
    lampGroup.add(innerRim)

    // Inner Glowing Bulb
    const bulbGeo = new THREE.SphereGeometry(0.3, 32, 32)
    const bulbMat = new THREE.MeshPhysicalMaterial({
      color: isOn ? '#ffffff' : '#f5f3ee',
      emissive: new THREE.Color(isOn ? '#fff4b8' : '#8c6d32'),
      emissiveIntensity: isOn ? 3.6 : 0.4,
      transmission: 0.72,
      roughness: 0.08,
      thickness: 0.5,
      ior: 1.5,
    })
    const bulb = new THREE.Mesh(bulbGeo, bulbMat)
    bulb.position.set(0, -0.22, 0)
    lampGroup.add(bulb)
    bulbRef.current = bulb

    // Glowing Filament Coil inside bulb
    const filamentGeo = new THREE.TorusGeometry(0.09, 0.016, 12, 24)
    const filamentMat = new THREE.MeshBasicMaterial({
      color: isOn ? '#ffffff' : '#ffb84d',
    })
    const filament = new THREE.Mesh(filamentGeo, filamentMat)
    filament.rotation.x = Math.PI / 2
    filament.position.set(0, -0.22, 0)
    lampGroup.add(filament)

    // 5. 3D BEADED PULL CHAIN (NEVER SHOWS ABOVE SHADE & NEVER DISCONNECTS)
    const chainGroup = new THREE.Group()
    chainGroup.position.set(0.62, -0.04, 0)
    lampGroup.add(chainGroup)
    chainGroupRef.current = chainGroup

    // Top anchor positioned safely inside shade cavity (0.38) well beneath cone surface (~0.58)
    const beadCount = 32
    const beadRadius = 0.032
    const beadSpacing = 0.065
    const topAnchorOffset = 0.38

    const beadGeo = new THREE.SphereGeometry(beadRadius, 16, 16)
    const beadMat = new THREE.MeshStandardMaterial({
      color: '#e6c888',
      metalness: 0.96,
      roughness: 0.12,
    })

    for (let i = 0; i < beadCount; i++) {
      const bead = new THREE.Mesh(beadGeo, beadMat)
      bead.position.set(0, topAnchorOffset - i * beadSpacing, 0)
      chainGroup.add(bead)
    }

    const pendantGeo = new THREE.CapsuleGeometry(0.06, 0.22, 16, 16)
    const pendantMat = new THREE.MeshStandardMaterial({
      color: '#ffd07a',
      metalness: 0.98,
      roughness: 0.08,
    })
    const pendant = new THREE.Mesh(pendantGeo, pendantMat)
    pendant.position.set(0, topAnchorOffset - (beadCount * beadSpacing + 0.12), 0)
    chainGroup.add(pendant)
    pendantRef.current = pendant

    // RAYCASTER: ONLY targets the pull chain & pendant (respecting dome occlusion)
    const raycaster = new THREE.Raycaster()
    const mouseCoords = new THREE.Vector2()

    const isCordHit = (clientX: number, clientY: number): boolean => {
      if (!cameraRef.current || !chainGroupRef.current) return false
      const rect = container.getBoundingClientRect()
      mouseCoords.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouseCoords.y = -(((clientY - rect.top) / rect.height) * 2 - 1)
      raycaster.setFromCamera(mouseCoords, cameraRef.current)
      const testObjects = [dome, ...chainGroupRef.current.children]
      const hits = raycaster.intersectObjects(testObjects, true)
      if (hits.length === 0) return false
      return hits[0].object !== dome
    }

    const triggerSwitch = () => {
      flareIntensityRef.current = 1.0

      if (bulbRef.current && cameraRef.current) {
        const worldPos = new THREE.Vector3()
        bulbRef.current.getWorldPosition(worldPos)

        const containerRect = container.getBoundingClientRect()
        const sectionEl = container.closest('section')
        const sectionRect = sectionEl ? sectionEl.getBoundingClientRect() : containerRect

        const projected = worldPos.clone().project(cameraRef.current)
        const bulbPxX = containerRect.left + ((projected.x + 1) / 2) * containerRect.width
        const bulbPxY = containerRect.top + ((1 - projected.y) / 2) * containerRect.height

        const originPctX = Math.max(5, Math.min(95, ((bulbPxX - sectionRect.left) / sectionRect.width) * 100))
        const originPctY = Math.max(5, Math.min(95, ((bulbPxY - sectionRect.top) / sectionRect.height) * 100))

        soundEngine.playHitPaddle(1.6)
        soundEngine.playScoreChime()

        onToggleRef.current({ x: originPctX, y: originPctY })
      } else {
        onToggleRef.current({ x: 78, y: 24 })
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        const diffY = Math.max(0, e.clientY - startDragYRef.current)
        pullDistanceRef.current = Math.min(diffY * 0.005, 0.30)
        container.style.cursor = 'grabbing'
      } else {
        const overCord = isCordHit(e.clientX, e.clientY)
        container.style.cursor = overCord ? 'grab' : 'default'
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      if (isCordHit(e.clientX, e.clientY)) {
        isDraggingRef.current = true
        startDragYRef.current = e.clientY
        setIsPulling(true)
        container.style.cursor = 'grabbing'
      }
    }

    const onPointerUp = () => {
      if (isDraggingRef.current) {
        const pulled = pullDistanceRef.current > 0.06
        isDraggingRef.current = false
        setIsPulling(false)
        container.style.cursor = 'grab'

        if (pulled) {
          triggerSwitch()
        }
        pullDistanceRef.current = 0
      }
    }

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let chainSpring = 0
    let chainVel = 0
    let time = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.016

      // Rock-solid fixed hero angle
      lampGroup.rotation.y = 0.04
      lampGroup.rotation.x = 0.02

      // Chain spring physics
      const targetPull = pullDistanceRef.current
      const force = (targetPull - chainSpring) * 24.0
      chainVel = (chainVel + force * 0.016) * 0.82
      chainSpring += chainVel * 0.016

      const sway = isDraggingRef.current ? 0 : Math.sin(time * 1.8) * 0.012
      chainGroup.rotation.z = sway
      chainGroup.position.y = -0.04 - chainSpring

      // Flare Decay
      flareIntensityRef.current = Math.max(0, flareIntensityRef.current - 0.035)

      // Light state updates
      const targetLight = isOn ? 4.5 : 0.8
      const flareBoost = flareIntensityRef.current * 4.0
      bulbLight.intensity = THREE.MathUtils.lerp(bulbLight.intensity, targetLight + flareBoost, 0.15)
      bulbMat.emissiveIntensity = THREE.MathUtils.lerp(bulbMat.emissiveIntensity, (isOn ? 3.6 : 0.4) + flareBoost, 0.15)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [isOn])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] select-none"
      style={{
        background: 'transparent',
      }}
    />
  )
}
