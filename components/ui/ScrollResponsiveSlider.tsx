"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { StartupType } from "@/types"
import { ExternalLink } from "lucide-react"

interface ScrollResponsiveSliderProps {
  content: StartupType[]
  scrollMultiplier?: number
}

export default function ScrollResponsiveSlider({ 
  content, 
  scrollMultiplier = 2 
}: ScrollResponsiveSliderProps) {
  const [horizontalScroll, setHorizontalScroll] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !isInView) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate how much of the section is visible
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
      const totalHeight = rect.height
      const scrollProgress = visibleHeight / totalHeight
      
      // Calculate horizontal scroll based on vertical scroll progress
      const maxHorizontalScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
      const newHorizontalScroll = scrollProgress * maxHorizontalScroll * scrollMultiplier
      const clampedScroll = Math.max(0, Math.min(newHorizontalScroll, maxHorizontalScroll))
      
      setHorizontalScroll(clampedScroll)
      
      // Apply the scroll position
      containerRef.current.scrollTo({
        left: clampedScroll,
        behavior: 'smooth'
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      observer.disconnect()
    }
  }, [isInView, scrollMultiplier])

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden hide-scrollbar flex gap-8 px-6 md:px-14 w-full"
        style={{
          scrollBehavior: 'smooth'
        }}
      >
        {content.map((startup, index) => (
          <div
            key={`scrollStartup${index}`}
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