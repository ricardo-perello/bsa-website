"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Rocket } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { startups } from "@/data/startups"

export default function StartupsPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const scrollTriggers = document.querySelectorAll('.scroll-trigger')
    scrollTriggers.forEach((el) => observer.observe(el))

    return () => {
      scrollTriggers.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <Rocket size={16} />
              <span>Startups</span>
            </div>
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              BSA
              <span className="gradient-text block">Startups</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover innovative startups created and shaped by BSA members
            </p>
          </div>
        </div>
      </section>

      {/* Startups Grid */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Featured
                <span className="gradient-text block">Startups</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {startups.map((startup, idx) => (
                <div 
                  key={startup.title} 
                  className="scroll-trigger glass rounded-2xl overflow-hidden border border-[#6366f1]/20 hover-lift"
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  {/* Startup Logo */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#6366f1]/10 to-[#7c3aed]/10 flex items-center justify-center">
                      <Image
                        src={startup.img}
                        alt={startup.title + " logo"}
                        width={200}
                        height={80}
                        className="object-contain max-w-[80%] max-h-[60%]"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white">{startup.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">{startup.description}</p>
                    
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                    >
                      <a href={startup.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        Visit Website
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

