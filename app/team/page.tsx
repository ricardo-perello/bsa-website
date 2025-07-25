"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, Briefcase, GraduationCap, Linkedin, Twitter, Github, Mail, UserPlus, Heart, Zap } from "lucide-react"
import { useEffect, useRef } from "react"

export default function TeamPage() {
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

  const leadershipTeam = [
    {
      name: "Alex Chen",
      role: "President",
      image: "/placeholder-user.jpg",
      bio: "Computer Science student passionate about DeFi and blockchain infrastructure. Leading BSA's strategic initiatives and community growth.",
      linkedin: "https://linkedin.com/in/alexchen",
      twitter: "https://twitter.com/alexchen",
      github: "https://github.com/alexchen"
    },
    {
      name: "Sarah Kim",
      role: "Vice President",
      image: "/placeholder-user.jpg", 
      bio: "Data Science major focused on blockchain analytics and research. Overseeing educational programs and workshop coordination.",
      linkedin: "https://linkedin.com/in/sarahkim",
      twitter: "https://twitter.com/sarahkim",
      github: "https://github.com/sarahkim"
    },
    {
      name: "Marcus Rodriguez",
      role: "Technical Lead",
      image: "/placeholder-user.jpg",
      bio: "Electrical Engineering student specializing in smart contracts and Web3 development. Leading technical workshops and hackathons.",
      linkedin: "https://linkedin.com/in/marcusrodriguez", 
      twitter: "https://twitter.com/marcusrodriguez",
      github: "https://github.com/marcusrodriguez"
    },
    {
      name: "Emma Thompson",
      role: "Events Coordinator",
      image: "/placeholder-user.jpg",
      bio: "Mathematics student with expertise in blockchain governance and DAOs. Organizing networking events and industry partnerships.",
      linkedin: "https://linkedin.com/in/emmathompson",
      twitter: "https://twitter.com/emmathompson", 
      github: "https://github.com/emmathompson"
    }
  ]

  const advisors = [
    {
      name: "Dr. Michael Zhang",
      role: "Faculty Advisor",
      image: "/placeholder-user.jpg",
      bio: "Professor of Computer Science at EPFL, specializing in distributed systems and blockchain technology.",
      linkedin: "https://linkedin.com/in/michaelzhang",
      email: "michael.zhang@epfl.ch"
    },
    {
      name: "Dr. Lisa Patel",
      role: "Research Advisor", 
      image: "/placeholder-user.jpg",
      bio: "Research scientist focusing on blockchain scalability and consensus mechanisms. Leading academic collaborations.",
      linkedin: "https://linkedin.com/in/lisapatel",
      email: "lisa.patel@epfl.ch"
    },
    {
      name: "David Wilson",
      role: "Industry Advisor",
      image: "/placeholder-user.jpg", 
      bio: "CTO at BlockchainCorp, former Google engineer. Providing industry insights and career mentorship.",
      linkedin: "https://linkedin.com/in/davidwilson",
      email: "david.wilson@blockchaincorp.com"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <Users size={16} />
              <span>Our Team</span>
            </div>
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              Meet Our
              <span className="gradient-text block">Team</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              The passionate individuals driving innovation in blockchain at EPFL
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Leadership
                <span className="gradient-text block">Team</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadershipTeam.map((member, idx) => (
                <div key={idx} className="scroll-trigger glass rounded-2xl p-6 border border-[#6366f1]/20 hover-lift" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-full flex items-center justify-center mx-auto mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-[#6366f1] font-medium">{member.role}</p>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  <div className="flex justify-center gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300"
                    >
                      <Linkedin size={16} className="text-white" />
                    </a>
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300"
                    >
                      <Twitter size={16} className="text-white" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300"
                    >
                      <Github size={16} className="text-white" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Our
                <span className="gradient-text block">Advisors</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {advisors.map((advisor, idx) => (
                <div key={idx} className="scroll-trigger glass rounded-2xl p-6 border border-[#6366f1]/20 hover-lift" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-full flex items-center justify-center mx-auto mb-4">
                      <img 
                        src={advisor.image} 
                        alt={advisor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{advisor.name}</h3>
                    <p className="text-[#6366f1] font-medium text-sm">{advisor.role}</p>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {advisor.bio}
                  </p>
                  
                  <div className="flex justify-center gap-3">
                    <a
                      href={advisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300"
                    >
                      <Linkedin size={16} className="text-white" />
                    </a>
                    <a
                      href={`mailto:${advisor.email}`}
                      className="w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300"
                    >
                      <Mail size={16} className="text-white" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join the Team */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Join Our
                <span className="gradient-text block">Team</span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
                <h3 className="text-2xl font-bold mb-6 text-white">Open Positions</h3>
                <div className="space-y-4">
                  {[
                    "Technical Lead - Smart Contracts",
                    "Events Coordinator", 
                    "Marketing & Communications",
                    "Research Assistant",
                    "Community Manager"
                  ].map((position, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">{position}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  asChild
                  className="w-full mt-6 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="/contact">
                    Apply Now <ArrowRight size={16} className="ml-2" />
                  </a>
                </Button>
              </div>
              
              <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
                <h3 className="text-2xl font-bold mb-6 text-white">Benefits</h3>
                <div className="space-y-4">
                  {[
                    { icon: Heart, text: "Passionate community" },
                    { icon: Zap, text: "Hands-on experience" },
                    { icon: Award, text: "Leadership opportunities" },
                    { icon: Briefcase, text: "Industry connections" },
                    { icon: GraduationCap, text: "Learning & growth" }
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center">
                        <benefit.icon size={16} className="text-white" />
                      </div>
                      <span className="text-gray-300">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
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
                Ready to
                <span className="gradient-text block">Join Us?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Be part of a team that's shaping the future of blockchain technology. 
                We're always looking for passionate individuals to join our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="/join">
                    <UserPlus size={16} className="mr-2" />
                    Join the Team
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift"
                >
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 