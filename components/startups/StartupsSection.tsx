"use client"

import Image from "next/image"
import { startups } from "@/data/startups"
import InfiniteAutoSlider from "@/components/ui/InfiniteAutoSlider"
import ContinuousDriftSlider from "@/components/ui/ContinuousDriftSlider"
import Link from "next/link"
import { Rocket, ExternalLink, Users } from "lucide-react"

export default function StartupsSection() {
  return (
    <section id="startups" className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="scroll-trigger text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
            <Rocket size={16} />
            <span>Startups Incubator</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            BSA
            <span className="gradient-text block">Startups Incubator</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover innovative startups created and shaped by BSA members, pushing the boundaries of blockchain technology
          </p>
        </div>

        {/* Mobile View: Auto-scrolling slider */}
        <div className="md:hidden scroll-trigger" style={{ animationDelay: '0.2s' }}>
          <InfiniteAutoSlider content={startups} />
        </div>

        {/* Desktop View: Continuous drift slider */}
        <div className="hidden md:block scroll-trigger" style={{ animationDelay: '0.2s' }}>
          <ContinuousDriftSlider content={startups} baseSpeed={0.5} maxSpeed={3} acceleration={0.03} />
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16 scroll-trigger" style={{ animationDelay: '0.6s' }}>
          <div className="glass rounded-2xl p-8 border border-[#6366f1]/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-xl flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Ready to Launch Your Startup?</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Join our community of innovators and get access to resources, mentorship, and funding opportunities to bring your blockchain ideas to life.
            </p>
            <a
              href="/join"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white rounded-xl font-semibold hover-lift"
            >
              <Rocket size={20} />
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 