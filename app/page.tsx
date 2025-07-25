"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Users, Rocket, BookOpen, Globe, Zap } from "lucide-react"
import EventsSection from "@/components/events/EventsSection"
import StartupsSection from "@/components/startups/StartupsSection"
import ArticlesSection from "@/components/articles/ArticlesSection"
import BSAHeroLogoParticles from "@/components/bsa-logo-particles-hero"
import { useEffect, useRef } from "react"

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null)
  const joinRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, observerOptions)

    const scrollTriggers = document.querySelectorAll('.scroll-trigger')
    scrollTriggers.forEach((trigger) => observer.observe(trigger))

    return () => {
      scrollTriggers.forEach((trigger) => observer.unobserve(trigger))
    }
  }, [])

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      
      <BSAHeroLogoParticles />

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-trigger">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
                <Code size={16} />
                <span>About BSA</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Empowering the Next Generation of
                <span className="gradient-text block">Blockchain Innovators</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                The Blockchain Student Association (BSA) at EPFL is a student-led organization dedicated to promoting
                blockchain technology and its applications. We organize workshops, hackathons, and networking events to
                connect students with industry professionals.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our mission is to educate, inspire, and empower the next generation of blockchain innovators and
                leaders through hands-on experience and real-world projects.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 px-8 py-3 text-lg font-semibold hover-lift">
                <Link href="/about" className="flex items-center gap-2">
                  Learn More <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
            
            <div className="scroll-trigger" style={{ animationDelay: '0.2s' }}>
              <div className="glass rounded-2xl p-8 border border-[#6366f1]/20 min-h-[400px]">
                <h3 className="text-2xl font-bold mb-8 text-white">What We Do</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group hover-lift">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Educational Workshops</h4>
                      <p className="text-gray-300 leading-relaxed">Regular workshops on blockchain technology, smart contract development, and DeFi protocols</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group hover-lift">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Networking Events</h4>
                      <p className="text-gray-300 leading-relaxed">Connect with industry professionals, researchers, and like-minded students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group hover-lift">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#ec4899] to-[#f59e0b] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Rocket size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Hackathons & Projects</h4>
                      <p className="text-gray-300 leading-relaxed">Hands-on experience building blockchain applications and innovative solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <EventsSection />

      {/* Startups Section */}
      <StartupsSection />

      {/* Latest Articles Section */}
      <ArticlesSection />

      {/* Join Us Section */}
      <section ref={joinRef} id="join" className="py-12 md:py-16 bg-gradient-to-t from-[#0a0a0a] to-transparent">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="scroll-trigger">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <Globe size={16} />
              <span>Join Our Community</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
              Ready to Build the
              <span className="gradient-text block">Future of Web3?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Become a member of the Blockchain Student Association and get access to exclusive events, 
              resources, networking opportunities, and hands-on experience with cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 px-8 py-3 text-lg font-semibold hover-lift">
                <Link href="/join" className="flex items-center gap-2">
                  <Zap size={20} />
                  Join Us Today
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="glass rounded-xl p-6 border border-[#6366f1]/20 hover-lift">
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <div className="text-gray-300">Active Members</div>
              </div>
              <div className="glass rounded-xl p-6 border border-[#6366f1]/20 hover-lift">
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-300">Events Hosted</div>
              </div>
              <div className="glass rounded-xl p-6 border border-[#6366f1]/20 hover-lift">
                <div className="text-3xl font-bold gradient-text mb-2">20+</div>
                <div className="text-gray-300">Startups Launched</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

