"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { StartupType } from "@/types"
import { ExternalLink } from "lucide-react"

interface ContinuousDriftSliderProps {
  content: StartupType[]
  baseSpeed?: number
  maxSpeed?: number
  acceleration?: number
}

export default function ContinuousDriftSlider({ 
  content, 
  baseSpeed = 0.8,
  maxSpeed = 4,
  acceleration = 0.05
}: ContinuousDriftSliderProps) {
  const [scrollDirection, setScrollDirection] = useState<'right' | 'left'>('right')
  const [currentSpeed, setCurrentSpeed] = useState(baseSpeed)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef<number>(Date.now())
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const timeDiff = currentTime - lastScrollTime.current
      
      if (timeDiff > 0) {
        const scrollVelocity = (currentScrollY - lastScrollY.current) / timeDiff
        
        // Determine direction based on scroll velocity
        if (Math.abs(scrollVelocity) > 0.01) {
          const newDirection = scrollVelocity > 0 ? 'right' : 'left'
          setScrollDirection(newDirection)
        }
        
        // Calculate speed based on scroll velocity magnitude
        const speedMultiplier = Math.min(Math.abs(scrollVelocity) * 50, maxSpeed)
        const targetSpeed = baseSpeed + speedMultiplier
        
        setCurrentSpeed(prev => {
          // Smooth acceleration towards target speed
          const diff = targetSpeed - prev
          return prev + (diff * acceleration)
        })
      }
      
      lastScrollY.current = currentScrollY
      lastScrollTime.current = currentTime
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      // Set timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        // Gradually return to base speed when not scrolling
        setCurrentSpeed(prev => {
          const diff = baseSpeed - prev
          return prev + (diff * 0.02) // Slower deceleration
        })
      }, 150) // Wait 150ms after last scroll event
    }

    const animate = () => {
      const container = containerRef.current
      if (container) {
        const direction = scrollDirection === 'right' ? 1 : -1
        const scrollAmount = currentSpeed * direction
        
        container.scrollLeft += scrollAmount
        
        // Handle infinite scroll
        const maxScroll = container.scrollWidth - container.clientWidth
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft = maxScroll
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [scrollDirection, currentSpeed, baseSpeed, maxSpeed, acceleration])

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden hide-scrollbar flex gap-8 px-6 md:px-14 w-full"
      >
        {/* First set of cards */}
        {content.map((startup, index) => (
          <div
            key={`first-${index}`}
            className="hover-lift flex-shrink-0"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className="glass rounded-2xl p-8 border border-[#6366f1]/20 w-[400px] h-[500px] flex flex-col">
              <div className="w-full h-40 flex items-center justify-center mb-6">
                <Image
                  src={startup.img}
                  alt={startup.title + " logo"}
                  width={200}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h4 className="w-full font-bold text-xl text-white mb-4">{startup.title}</h4>
              <p className="w-full text-gray-300 mb-6 flex-grow">{startup.description}</p>
              <a
                href={startup.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit relative rounded-xl bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white font-semibold duration-300 px-6 py-3 flex items-center gap-2 hover-lift"
              >
                <ExternalLink size={16} />
                Discover
              </a>
            </div>
          </div>
        ))}
        {/* Duplicate set for seamless infinite scroll */}
        {content.map((startup, index) => (
          <div
            key={`second-${index}`}
            className="hover-lift flex-shrink-0"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className="glass rounded-2xl p-8 border border-[#6366f1]/20 w-[400px] h-[500px] flex flex-col">
              <div className="w-full h-40 flex items-center justify-center mb-6">
                <Image
                  src={startup.img}
                  alt={startup.title + " logo"}
                  width={200}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h4 className="w-full font-bold text-xl text-white mb-4">{startup.title}</h4>
              <p className="w-full text-gray-300 mb-6 flex-grow">{startup.description}</p>
              <a
                href={startup.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit relative rounded-xl bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white font-semibold duration-300 px-6 py-3 flex items-center gap-2 hover-lift"
              >
                <ExternalLink size={16} />
                Discover
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-6 md:w-14 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-6 md:w-14 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
    </div>
  )
} 