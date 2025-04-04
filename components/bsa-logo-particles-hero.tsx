"use client"

import { useRef, useEffect, useState } from "react"
import { BSA_LOGO_PATH } from "./bsa-logo-path"

export default function BSAHeroLogoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const wavesRef = useRef<{x: number, y: number, radius: number, strength: number}[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768) // Set mobile breakpoint
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = "white"
      ctx.save()

      // Increase logo size
      const logoHeight = isMobile ? 300 : 500 // Reduced from 440/720
      const bsaLogoWidth = logoHeight * (135 / 151)

      // Position the logo on the right side of the canvas
      const xPosition = isMobile
        ? canvas.width / 2 - bsaLogoWidth / 2 // Center on mobile
        : canvas.width / 2

      const yPosition = canvas.height / 2 - logoHeight / 1.5

      ctx.translate(xPosition, yPosition)

      // Draw BSA logo
      const bsaScale = logoHeight / 151
      ctx.scale(bsaScale, bsaScale)
      const bsaPath = new Path2D(BSA_LOGO_PATH)
      ctx.fill(bsaPath)

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return bsaScale
    }

    function createParticle(scale: number) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data
      const particleGap = 2

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "white",
            scatteredColor: "#7B68EE", // Changed from purple to dark blue/slate
            life: Math.random() * 100 + 50,
          }
        }
      }

      return null
    }

    function createInitialParticles(scale: number) {
      if (!canvas) return
      const baseParticleCount = 7000 // Increased base count for higher density
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale)
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number

    function animate(scale: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 160

      // Update and draw waves
      for (let i = wavesRef.current.length - 1; i >= 0; i--) {
        const wave = wavesRef.current[i]
        wave.radius += 5
        wave.strength *= 0.95

        if (wave.strength < 0.01) {
          wavesRef.current.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(123, 104, 238, ${wave.strength * 0.8})`
        ctx.lineWidth = 4
        ctx.stroke()
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        let totalMoveX = 0
        let totalMoveY = 0

        // Mouse repulsion
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          totalMoveX += Math.cos(angle) * force * 60
          totalMoveY += Math.sin(angle) * force * 60
        }

        // Wave effect
        for (const wave of wavesRef.current) {
          const waveDx = wave.x - p.x
          const waveDy = wave.y - p.y
          const waveDistance = Math.sqrt(waveDx * waveDx + waveDy * waveDy)
          const waveEffect = Math.abs(waveDistance - wave.radius) < 30

          if (waveEffect) {
            const waveForce = wave.strength * (1 - Math.abs(waveDistance - wave.radius) / 30)
            const waveAngle = Math.atan2(waveDy, waveDx)
            totalMoveX += Math.cos(waveAngle) * waveForce * 100
            totalMoveY += Math.sin(waveAngle) * waveForce * 100
          }
        }

        p.x = p.baseX - totalMoveX
        p.y = p.baseY - totalMoveY

        ctx.fillStyle = "white"
        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle(scale)
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const baseParticleCount = 7000
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
      )
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale)
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      particles = []
      createInitialParticles(newScale)
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.pageX, e.pageY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].pageX, e.touches[0].pageY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    const handleClick = (e: MouseEvent) => {
      wavesRef.current.push({
        x: e.pageX,
        y: e.pageY,
        radius: 0,
        strength: 1
      })
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)
    canvas.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      canvas.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-[80vh] flex flex-col items-center justify-center bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-[100vh] absolute top-[-10vh] left-0 touch-none"
        aria-label="Interactive particle effect with BSA logo"
      />

      {/* Text content on the left */}
      <div
        className="absolute z-10 text-white max-w-md px-6 md:px-10 lg:px-0 
                     md:left-[10%] lg:left-[15%] 
                     text-center md:text-left"
      >
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 
                       tracking-tight bg-clip-text text-transparent 
                       bg-gradient-to-r from-white to-[#7B68EE]
                       font-sans"
        >
          Blockchain Student Association
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Bridging academia and industry to empower the next generation of blockchain innovators. Explore, learn, and
          build the decentralized future.
        </p>
        <button
          className="mt-8 px-6 py-3 bg-[#1f273a] hover:bg-[#2a3349] text-white 
                         rounded-lg font-medium transition-colors duration-300 
                         shadow-lg shadow-[#1f273a]/20"
        >
          Join the Community
        </button>
      </div>
    </div>
  )
}

