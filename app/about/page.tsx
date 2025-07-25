"use client"

import { useEffect, useRef } from "react"

export default function AboutPage() {
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
              <span>About Us</span>
            </div>
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              About the
              <span className="gradient-text block">BSA</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Empowering the next generation of blockchain innovators at EPFL
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Our
                <span className="gradient-text block">Mission</span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="scroll-trigger space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  The Blockchain Student Association (BSA) at EPFL is dedicated to fostering 
                  blockchain education, innovation, and community among students passionate 
                  about decentralized technologies.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We believe in the transformative potential of blockchain technology to 
                  reshape industries, create new economic models, and build a more 
                  transparent and equitable digital future.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Through workshops, hackathons, networking events, and collaborative 
                  projects, we provide students with the knowledge, skills, and 
                  connections needed to become leaders in the blockchain space.
                </p>
              </div>
              <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
                <h3 className="text-2xl font-bold mb-6 text-white">What We Do</h3>
                <div className="space-y-4">
                  {[
                    "Educational workshops and seminars",
                    "Blockchain hackathons and competitions", 
                    "Industry networking events",
                    "Research collaboration opportunities",
                    "Startup incubation support"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Our
                <span className="gradient-text block">Values</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎓",
                  title: "Education",
                  description: "We believe in accessible, high-quality blockchain education for all students, regardless of their background or experience level."
                },
                {
                  icon: "🤝", 
                  title: "Collaboration",
                  description: "We foster a collaborative environment where students can learn from each other, share ideas, and build meaningful connections."
                },
                {
                  icon: "💡",
                  title: "Innovation", 
                  description: "We encourage creative thinking and innovative approaches to solving real-world problems using blockchain technology."
                }
              ].map((value, idx) => (
                <div key={idx} className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20 hover-lift" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-2xl flex items-center justify-center mb-6 text-2xl">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Our
                <span className="gradient-text block">Story</span>
              </h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  year: "2023",
                  title: "Foundation",
                  description: "The BSA was founded by a group of EPFL students passionate about blockchain technology and its potential to transform various industries."
                },
                {
                  year: "2024", 
                  title: "Growth",
                  description: "We expanded our activities, hosting our first major hackathon and establishing partnerships with industry leaders and academic institutions."
                },
                {
                  year: "2025",
                  title: "Innovation", 
                  description: "Today, we continue to grow our community and impact, supporting students in their blockchain journey and contributing to the broader ecosystem."
                }
              ].map((milestone, idx) => (
                <div key={idx} className="scroll-trigger flex items-start gap-6" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <div className="w-4 h-4 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="glass rounded-2xl p-6 border border-[#6366f1]/20 flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[#6366f1] font-bold text-lg">{milestone.year}</span>
                      <span className="text-white font-semibold text-lg">-</span>
                      <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger glass rounded-2xl p-12 border border-[#6366f1]/20">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Join Our
                <span className="gradient-text block">Community</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ready to dive into the world of blockchain? Join the BSA and become 
                part of a community that's shaping the future of technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white px-8 py-4 rounded-xl font-semibold hover-lift transition-all duration-300"
                >
                  Get in Touch
                </a>
                <a 
                  href="/events" 
                  className="border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white px-8 py-4 rounded-xl font-semibold hover-lift transition-all duration-300"
                >
                  View Events
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 