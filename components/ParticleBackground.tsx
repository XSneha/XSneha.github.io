"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const linesRef = useRef<THREE.LineSegments | null>(null)
  const timeRef = useRef(0)
  const speedRef = useRef(0.05)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 25
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const particleCount = 150
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const initialPositions = new Float32Array(particleCount * 3)

    // Initialize particles with valid positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      // Create a more spread out initial distribution
      positions[i3] = (Math.random() - 0.5) * 80     // x: increased from 50 to 80
      positions[i3 + 1] = (Math.random() - 0.5) * 60 // y: increased from 40 to 60
      positions[i3 + 2] = (Math.random() - 0.5) * 40 // z: increased from 20 to 40

      // Store initial positions
      initialPositions[i3] = positions[i3]
      initialPositions[i3 + 1] = positions[i3 + 1]
      initialPositions[i3 + 2] = positions[i3 + 2]

      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.3)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.computeBoundingSphere()

    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Create lines
    const updateLines = () => {
      if (!particlesRef.current) return

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const linePositions: number[] = []
      const lineColors: number[] = []

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3
          const j3 = j * 3
          
          const distance = Math.sqrt(
            Math.pow(positions[i3] - positions[j3], 2) +
            Math.pow(positions[i3 + 1] - positions[j3 + 1], 2) +
            Math.pow(positions[i3 + 2] - positions[j3 + 2], 2)
          )

          if (distance < 12) {
            linePositions.push(
              positions[i3], positions[i3 + 1], positions[i3 + 2],
              positions[j3], positions[j3 + 1], positions[j3 + 2]
            )

            const color = new THREE.Color()
            color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.3)
            lineColors.push(
              color.r, color.g, color.b,
              color.r, color.g, color.b
            )
          }
        }
      }

      const lineGeometry = new THREE.BufferGeometry()
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3))
      lineGeometry.computeBoundingSphere()

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.15,
      })

      if (linesRef.current) {
        scene.remove(linesRef.current)
      }

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
      scene.add(lines)
      linesRef.current = lines
    }

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      timeRef.current += speedRef.current

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < positions.length; i += 3) {
          const ix = Math.floor(i / 3)
          
          // Create flowing movement using sine waves with larger amplitudes
          positions[i] = initialPositions[i] + 
            Math.sin(timeRef.current * 0.1 + ix * 0.2) * 2.0 + // Slower frequency (0.2 -> 0.1) and larger amplitude (1.0 -> 2.0)
            Math.cos(timeRef.current * 0.05 + ix * 0.15) * 1.5  // Slower frequency (0.1 -> 0.05) and larger amplitude (0.8 -> 1.5)

          positions[i + 1] = initialPositions[i + 1] + 
            Math.cos(timeRef.current * 0.1 + ix * 0.2) * 2.0 + // Slower frequency and larger amplitude
            Math.sin(timeRef.current * 0.05 + ix * 0.15) * 1.5  // Slower frequency and larger amplitude

          positions[i + 2] = initialPositions[i + 2] + 
            Math.sin(timeRef.current * 0.05 + ix * 0.3) * 1.0   // Slower frequency (0.1 -> 0.05) and larger amplitude (0.6 -> 1.0)

          // Mouse interaction with larger influence
          const distance = Math.sqrt(
            Math.pow(positions[i] - mousePosition.current.x * 25, 2) + // Increased from 15 to 25
            Math.pow(positions[i + 1] - mousePosition.current.y * 25, 2)
          )

          if (distance < 12) { // Increased from 8 to 12
            positions[i] += (positions[i] - mousePosition.current.x * 25) * 0.02 // Reduced from 0.03 to 0.02 for smoother movement
            positions[i + 1] += (positions[i + 1] - mousePosition.current.y * 25) * 0.02
          }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
        
        if (Math.floor(timeRef.current * 5) % 2 === 0) {
          updateLines()
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      style={{ 
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)'
      }}
    />
  )
}

export default ParticleBackground 