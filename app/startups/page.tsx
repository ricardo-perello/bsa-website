import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Users, Rocket, Target } from "lucide-react"
import { startups } from "@/data/startups"

export default function StartupsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1f273a] via-[#2a3349] to-[#1f273a] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Startups <span className="text-blue-400">Accelerator</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-200 leading-relaxed">
              The BSA is also a wonderful startups incubator. We incentivize students and collaborators to build as much
              value as they can.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Rocket className="w-4 h-4" />
                <span>Innovation Hub</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-4 h-4" />
                <span>Community Driven</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Target className="w-4 h-4" />
                <span>Blockchain Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Startups Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the innovative startups that have emerged from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {startups.map((startup, index) => (
              <div 
                key={`startup-${index}`} 
                className="group bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-blue-500 hover:-translate-y-2"
              >
                {/* Logo Section */}
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6 border-b border-gray-700">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={startup.img}
                      alt={startup.title + " logo"}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {startup.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {startup.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <Button
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-500 transition-colors"
                    >
                      <Link href={startup.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        Visit Startup
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                    
                    {/* Category Badge */}
                    <span className="text-xs bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full font-medium border border-blue-700">
                      BSA Alumni
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">{startups.length}+</div>
              <div className="text-gray-600">Startups Launched</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Blockchain Focused</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Community Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Accelerator CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to Launch Your Startup?
            </h2>
            <p className="text-lg mb-8 text-gray-600 leading-relaxed">
              Have a blockchain project or startup idea? Apply to join our accelerator program and get access to
              mentorship, resources, and networking opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#1f273a] hover:bg-[#2a3349] text-white px-8 py-3">
                <Link href="/contact" className="flex items-center gap-2">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#1f273a] text-[#1f273a] hover:bg-[#1f273a] hover:text-white px-8 py-3">
                <Link href="/about" className="flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

