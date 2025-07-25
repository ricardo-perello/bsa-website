import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Blockchain Student Association",
  description: "Learn about the Blockchain Student Association at EPFL - our mission, values, and commitment to blockchain education and innovation.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1f273a] to-[#2d3748] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About the BSA
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Empowering the next generation of blockchain innovators at EPFL
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  The Blockchain Student Association (BSA) at EPFL is dedicated to fostering 
                  blockchain education, innovation, and community among students passionate 
                  about decentralized technologies.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  We believe in the transformative potential of blockchain technology to 
                  reshape industries, create new economic models, and build a more 
                  transparent and equitable digital future.
                </p>
                <p className="text-lg text-gray-700">
                  Through workshops, hackathons, networking events, and collaborative 
                  projects, we provide students with the knowledge, skills, and 
                  connections needed to become leaders in the blockchain space.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">What We Do</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#1f273a] mr-3">•</span>
                    Educational workshops and seminars
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1f273a] mr-3">•</span>
                    Blockchain hackathons and competitions
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1f273a] mr-3">•</span>
                    Industry networking events
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1f273a] mr-3">•</span>
                    Research collaboration opportunities
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1f273a] mr-3">•</span>
                    Startup incubation support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Education</h3>
                <p className="text-gray-600">
                  We believe in accessible, high-quality blockchain education for all 
                  students, regardless of their background or experience level.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Collaboration</h3>
                <p className="text-gray-600">
                  We foster a collaborative environment where students can learn from 
                  each other, share ideas, and build meaningful connections.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">💡</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We encourage creative thinking and innovative approaches to solving 
                  real-world problems using blockchain technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-[#1f273a] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">2023 - Foundation</h3>
                  <p className="text-gray-600">
                    The BSA was founded by a group of EPFL students passionate about 
                    blockchain technology and its potential to transform various industries.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-[#1f273a] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">2024 - Growth</h3>
                  <p className="text-gray-600">
                    We expanded our activities, hosting our first major hackathon and 
                    establishing partnerships with industry leaders and academic institutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-[#1f273a] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">2025 - Innovation</h3>
                  <p className="text-gray-600">
                    Today, we continue to grow our community and impact, supporting 
                    students in their blockchain journey and contributing to the broader 
                    ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1f273a] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Ready to dive into the world of blockchain? Join the BSA and become 
              part of a community that's shaping the future of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-[#1f273a] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get in Touch
              </a>
              <a 
                href="/events" 
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1f273a] transition-colors"
              >
                View Events
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 