"use client"

import { useRef, useEffect, useState } from "react"
import { BSA_LOGO_PATH } from "./bsa-logo-path"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Users } from "lucide-react"
import Link from "next/link"

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
      setIsMobile(window.innerWidth < 768)
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

      ctx.fillStyle = "#6366f1"
      ctx.save()

      const logoHeight = isMobile ? 200 : 300
      const bsaLogoWidth = logoHeight * (135 / 151)

      // Position the logo on the right side of the canvas
      const xPosition = isMobile
        ? canvas.width / 2 - bsaLogoWidth / 2
        : canvas.width * 0.7 // Move logo to the right side

      const yPosition = canvas.height / 2 - logoHeight / 2

      ctx.translate(xPosition, yPosition)

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
            size: Math.random() * 2 + 1,
            color: "#6366f1",
            scatteredColor: "#7c3aed",
            life: Math.random() * 100 + 50,
          }
        }
      }

      return null
    }

    function createInitialParticles(scale: number) {
      if (!canvas) return
      const baseParticleCount = 8000
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
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#0a0a0a')
      gradient.addColorStop(1, '#1a1a1a')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 160

      // Update and draw waves with enhanced colors
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
        ctx.strokeStyle = `rgba(99, 102, 241, ${wave.strength * 0.8})`
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

        // Enhanced particle rendering with glow effect
        ctx.shadowColor = p.color
        ctx.shadowBlur = 4
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)
        ctx.shadowBlur = 0

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

      const baseParticleCount = 8000
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
    <div className="relative w-full h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] overflow-hidden pt-16">
      <canvas
        ref={canvasRef}
        className="w-full h-[90vh] absolute top-[-5vh] left-0 touch-none"
        aria-label="Interactive particle effect with BSA logo"
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#6366f1] rounded-full animate-pulse-glow opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-[#7c3aed] rounded-full animate-float opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-[#ec4899] rounded-full animate-pulse-glow opacity-50"></div>
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-[#6366f1] rounded-full animate-float opacity-30"></div>
      </div>

      {/* Content Layout */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-[70vh]">
          {/* Text content on the left */}
          <div className="text-white">
            <div className="mb-6 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] animate-fade-in">
                <Sparkles size={16} />
                <span>Building the Future of Web3</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight animate-slide-up text-center lg:text-left">
              <span className="gradient-text">Blockchain</span>
              <br />
              <span className="text-white">Student Association</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 animate-slide-up text-center lg:text-left" style={{ animationDelay: '0.2s' }}>
              Empowering the next generation of blockchain innovators through education, 
              collaboration, and hands-on experience. Join our community of builders, 
              thinkers, and creators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 px-8 py-3 text-lg font-semibold hover-lift">
                <Link href="/join" className="flex items-center gap-2">
                  Join the Community
                  <ArrowRight size={20} />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white px-8 py-3 text-lg font-semibold hover-lift">
                <Link href="/events" className="flex items-center gap-2">
                  <Users size={20} />
                  Explore Events
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold gradient-text">500+</div>
                <div className="text-gray-400 text-sm">Active Members</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold gradient-text">50+</div>
                <div className="text-gray-400 text-sm">Events Hosted</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold gradient-text">20+</div>
                <div className="text-gray-400 text-sm">Startups Launched</div>
              </div>
            </div>
          </div>

          {/* Logo area on the right */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* This area will be filled by the canvas particles */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

