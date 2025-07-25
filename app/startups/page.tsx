"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, TrendingUp, Users, DollarSign, Rocket, Award, Zap } from "lucide-react"
import { useEffect, useRef } from "react"

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

  const startups = [
    {
      id: 1,
      name: "DeFi Protocol",
      logo: "/startups/abstract-horizon.png",
      description: "Decentralized finance protocol for automated yield farming and liquidity provision.",
      category: "DeFi",
      stage: "Series A",
      funding: "$2.5M",
      team: "8 members",
      website: "https://example.com",
      status: "Active"
    },
    {
      id: 2,
      name: "NFT Marketplace",
      logo: "/startups/metacube-logo.png",
      description: "Curated NFT marketplace for digital art and collectibles with advanced trading features.",
      category: "NFTs",
      stage: "Seed",
      funding: "$500K",
      team: "5 members",
      website: "https://example.com",
      status: "Active"
    },
    {
      id: 3,
      name: "Supply Chain",
      logo: "/startups/spectra_logo.png",
      description: "Blockchain-based supply chain tracking solution for transparency and efficiency.",
      category: "Enterprise",
      stage: "Pre-seed",
      funding: "$200K",
      team: "6 members",
      website: "https://example.com",
      status: "Active"
    },
    {
      id: 4,
      name: "Gaming Platform",
      logo: "/startups/warlord-logo.png",
      description: "Web3 gaming platform with play-to-earn mechanics and NFT integration.",
      category: "Gaming",
      stage: "Series B",
      funding: "$5M",
      team: "12 members",
      website: "https://example.com",
      status: "Active"
    },
    {
      id: 5,
      name: "DAO Tools",
      logo: "/startups/OnDefy.webp",
      description: "Governance and voting tools for decentralized autonomous organizations.",
      category: "DAO",
      stage: "Seed",
      funding: "$800K",
      team: "4 members",
      website: "https://example.com",
      status: "Active"
    },
    {
      id: 6,
      name: "Cross-chain Bridge",
      logo: "/startups/HONEY.webp",
      description: "Interoperability solution for seamless asset transfers across blockchain networks.",
      category: "Infrastructure",
      stage: "Series A",
      funding: "$3M",
      team: "10 members",
      website: "https://example.com",
      status: "Active"
    }
  ]

  const stats = [
    { icon: TrendingUp, label: "Total Funding", value: "$12M+" },
    { icon: Users, label: "Team Members", value: "45+" },
    { icon: DollarSign, label: "Average Valuation", value: "$15M" },
    { icon: Rocket, label: "Active Startups", value: "6" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <Rocket size={16} />
              <span>Startups</span>
            </div>
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-6 text-white">
              Our
              <span className="gradient-text block">Portfolio</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover the innovative blockchain startups we've helped launch and grow
            </p>
            
            {/* Feature Badges */}
            <div className="scroll-trigger flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1]">
                <Award size={16} />
                <span>Incubated</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1]">
                <Zap size={16} />
                <span>Accelerated</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1]">
                <TrendingUp size={16} />
                <span>Growing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Featured
                <span className="gradient-text block">Startups</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {startups.map((startup, idx) => (
                <div key={startup.id} className="scroll-trigger glass rounded-2xl overflow-hidden border border-[#6366f1]/20 hover-lift" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center">
                          <img 
                            src={startup.logo} 
                            alt={startup.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{startup.name}</h3>
                          <span className="text-sm text-[#6366f1]">{startup.category}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        startup.status === 'Active' 
                          ? 'bg-green-900/20 text-green-400 border border-green-500/20' 
                          : 'bg-gray-900/20 text-gray-400 border border-gray-500/20'
                      }`}>
                        {startup.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {startup.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Stage:</span>
                        <span className="text-white">{startup.stage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Funding:</span>
                        <span className="text-white">{startup.funding}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Team:</span>
                        <span className="text-white">{startup.team}</span>
                      </div>
                    </div>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift"
                    >
                      <a href={startup.website} target="_blank" rel="noopener noreferrer">
                        Visit Website <ExternalLink size={16} className="ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-trigger grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center glass rounded-2xl p-6 border border-[#6366f1]/20" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join the Accelerator CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger glass rounded-2xl p-12 border border-[#6366f1]/20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Join Our
                <span className="gradient-text block">Accelerator</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Are you building the next big blockchain startup? Apply to our accelerator 
                program and get the support you need to scale your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="/contact">
                    Apply Now <ArrowRight size={16} className="ml-2" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift"
                >
                  <a href="/about">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

