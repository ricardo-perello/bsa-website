import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Github, Mail, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Team | Blockchain Student Association",
  description: "Meet the leadership team and members of the Blockchain Student Association at EPFL - passionate students driving blockchain innovation.",
}

// Sample team data - replace with actual team information
const teamMembers = [
  {
    name: "Alex Chen",
    role: "President",
    image: "/placeholder-user.jpg",
    bio: "Computer Science student passionate about DeFi and smart contract development. Leading the BSA's strategic vision and community growth.",
    social: {
      linkedin: "https://linkedin.com/in/alexchen",
      twitter: "https://twitter.com/alexchen",
      github: "https://github.com/alexchen",
      email: "alex.chen@epfl.ch"
    }
  },
  {
    name: "Sarah Johnson",
    role: "Vice President",
    image: "/placeholder-user.jpg",
    bio: "Mathematics and Computer Science student focused on blockchain scalability and zero-knowledge proofs.",
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      github: "https://github.com/sarahjohnson",
      email: "sarah.johnson@epfl.ch"
    }
  },
  {
    name: "Marcus Rodriguez",
    role: "Events Coordinator",
    image: "/placeholder-user.jpg",
    bio: "Electrical Engineering student organizing workshops, hackathons, and networking events for the BSA community.",
    social: {
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      twitter: "https://twitter.com/marcusrodriguez",
      github: "https://github.com/marcusrodriguez",
      email: "marcus.rodriguez@epfl.ch"
    }
  },
  {
    name: "Emma Thompson",
    role: "Communications Lead",
    image: "/placeholder-user.jpg",
    bio: "Communication Systems student managing BSA's social media, newsletter, and external communications.",
    social: {
      linkedin: "https://linkedin.com/in/emmathompson",
      twitter: "https://twitter.com/emmathompson",
      github: "https://github.com/emmathompson",
      email: "emma.thompson@epfl.ch"
    }
  },
  {
    name: "David Kim",
    role: "Technical Lead",
    image: "/placeholder-user.jpg",
    bio: "Computer Science student specializing in blockchain infrastructure and developer tooling.",
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      twitter: "https://twitter.com/davidkim",
      github: "https://github.com/davidkim",
      email: "david.kim@epfl.ch"
    }
  },
  {
    name: "Lisa Wang",
    role: "Partnerships Manager",
    image: "/placeholder-user.jpg",
    bio: "Management student building relationships with industry partners, startups, and academic institutions.",
    social: {
      linkedin: "https://linkedin.com/in/lisawang",
      twitter: "https://twitter.com/lisawang",
      github: "https://github.com/lisawang",
      email: "lisa.wang@epfl.ch"
    }
  }
]

const advisors = [
  {
    name: "Dr. Maria Santos",
    role: "Faculty Advisor",
    image: "/placeholder-user.jpg",
    bio: "Professor of Computer Science at EPFL, specializing in distributed systems and blockchain technology.",
    social: {
      linkedin: "https://linkedin.com/in/mariasantos",
      email: "maria.santos@epfl.ch"
    }
  },
  {
    name: "Dr. James Wilson",
    role: "Industry Advisor",
    image: "/placeholder-user.jpg",
    bio: "CTO at BlockchainCorp, providing industry insights and mentorship to BSA members.",
    social: {
      linkedin: "https://linkedin.com/in/jameswilson",
      email: "james.wilson@blockchaincorp.com"
    }
  }
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1f273a] to-[#2d3748] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Meet the passionate students and advisors driving blockchain innovation at EPFL
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-[#1f273a] font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                    
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#1f273a] transition-colors"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#1f273a] transition-colors"
                        >
                          <Twitter size={20} />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#1f273a] transition-colors"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="text-gray-400 hover:text-[#1f273a] transition-colors"
                        >
                          <Mail size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Advisors</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {advisors.map((advisor, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{advisor.name}</h3>
                        <p className="text-[#1f273a] font-semibold mb-3">{advisor.role}</p>
                        <p className="text-gray-600 mb-4">{advisor.bio}</p>
                        <div className="flex space-x-3">
                          {advisor.social.linkedin && (
                            <a
                              href={advisor.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-[#1f273a] transition-colors"
                            >
                              <Linkedin size={20} />
                            </a>
                          )}
                          {advisor.social.email && (
                            <a
                              href={`mailto:${advisor.social.email}`}
                              className="text-gray-400 hover:text-[#1f273a] transition-colors"
                            >
                              <Mail size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join the Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Team
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always looking for passionate students to join our leadership team. 
              Whether you're interested in events, communications, technical projects, 
              or partnerships, there's a place for you in the BSA.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Open Positions</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>• Marketing & Social Media Coordinator</li>
                  <li>• Technical Workshop Lead</li>
                  <li>• Research Coordinator</li>
                  <li>• Treasurer</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Benefits</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>• Leadership experience</li>
                  <li>• Industry connections</li>
                  <li>• Skill development</li>
                  <li>• Community impact</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-[#1f273a] hover:bg-[#2d3748]"
              >
                <a href="/contact">
                  Apply Now
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-[#1f273a] text-[#1f273a] hover:bg-[#1f273a] hover:text-white"
              >
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1f273a] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Have questions about joining the team or want to collaborate? 
              We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-white text-[#1f273a] hover:bg-gray-100"
              >
                <a href="/contact">
                  Contact Us
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1f273a]"
              >
                <a href="/events">View Events</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 