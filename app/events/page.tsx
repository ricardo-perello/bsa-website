"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"
import { LUMA_URL } from "@/lib/constants"
import { useState, useEffect } from "react"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

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

  // Sample event data - you can replace this with real data
  const pastEvents = [
    {
      id: 1,
      title: "EPFL BSA Conference - Privacy x Verifiability",
      date: "2025-03-07",
      time: "9:30 - 18:00 CET",
      location: "BC Building (building of the IC faculty), EPFL, Ecublens",
      description: "Deep dive into the latest in blockchain privacy and verifiability with cutting-edge talks, panel discussions, and networking opportunities.",
      attendees: 363,
      type: "Conference",
      registrationUrl: null,
      detailedDescription: "The EPFL BSA Conference - Privacy x Verifiability was a groundbreaking event that brought together leading minds in blockchain technology to explore the critical intersection of privacy and verifiability. Organized by EPFL students in the BC building, this conference offered cutting-edge talks, panel discussions, and plenty of opportunities to network with fellow enthusiasts. The event featured exciting talks with some of the best minds in the space discussing Privacy-Preserving Payments, Data Security & Confidentiality, Private DeFi, MEV, Secure Hardware, Privacy infrastructure (ZKP, MPC, TEE), Scalability infrastructure, and AI & Privacy. Whether participants were seasoned experts or just curious about data confidentiality, digital privacy, or blockchain scalability, they found valuable insights and a vibrant community ready to share ideas. The conference included breakfast at the beginning, networking lunch at midday, and snacks and refreshments in the afternoon, all provided by our sponsors: The Hashgraph Association, Aleph Zero, Common Finance, Mina Foundation, and Taurus. This event was organized in collaboration with Privacy Guardians (PG), the CVA, and IEE Blockchain, establishing strong connections between communities and leading protocols in the privacy space.",
      photos: [
        "/bsa_events/IMG_0492.JPG",
        "/bsa_events/IMG_0578.JPG", 
        "/bsa_events/IMG_3494.JPG"
      ],
      highlights: [
        "363 attendees from diverse backgrounds",
        "Cutting-edge talks on privacy and verifiability",
        "Panel discussions with industry leaders",
        "Networking with leading protocols and companies",
        "Sponsored by major blockchain organizations",
        "Collaboration with Privacy Guardians and IEE Blockchain"
      ]
    },
    {
      id: 2,
      title: "Privacy and Verifiability Hackathon",
      date: "2025-03-08",
      time: "10:00 - 12:00 (26 hours)",
      location: "BC Building, Room 410, EPFL, Lausanne",
      description: "36-hour hackathon challenging participants to develop innovative solutions focusing on privacy and verifiability in blockchain technology.",
      attendees: 36,
      type: "Hackathon",
      registrationUrl: null,
      detailedDescription: "Following the successful conference, the Privacy and Verifiability Hackathon was an epic 36-hour event that challenged participants to develop innovative solutions focusing on privacy and verifiability in blockchain technology. The hackathon featured 23 project submissions from 36 hackers, all working on cutting-edge blockchain applications. Supported by industry-leading sponsors including Mina, the Hedera Hashgraph Association, and Hylé, participants had access to a total prize pool of 15,000 USD. The event was open to all students, professionals, and enthusiasts with an interest in blockchain technology. Projects were judged based on innovation, technical execution, and how well they addressed privacy concerns while ensuring verifiability in blockchain. The hackathon fostered intense collaboration and innovation, with teams working around the clock to build and present their solutions. The event concluded with project presentations and the announcement of winners, showcasing the incredible talent and creativity in the blockchain community.",
      photos: [
        "/bsa_events/IMG_0492.JPG",
        "/bsa_events/IMG_0578.JPG", 
        "/bsa_events/IMG_3494.JPG"
      ],
      highlights: [
        "36 hackers participated in 26-hour event",
        "23 project submissions",
        "15,000 USD total prize pool",
        "Sponsored by Mina, Hedera Hashgraph Association, Hylé",
        "Focus on privacy and verifiability solutions",
        "Intensive collaboration and innovation"
      ]
    },
    {
      id: 3,
      title: "SUI <> BSA Hackathon 2nd Edition 💧",
      date: "2024-10-12",
      time: "48 hours (October 12-13)",
      location: "BC Building (building of the IC faculty), EPFL, Ecublens",
      description: "European Sui Hackathon in partnership with Sui Foundation, featuring a $20,000+ prize pool and intensive Move language development.",
      attendees: 50,
      type: "Hackathon",
      registrationUrl: "https://bsaepfl.ch/hackathon/",
      detailedDescription: "The SUI <> BSA Hackathon 2nd Edition was a groundbreaking event that brought together blockchain enthusiasts and developers for an intensive 48-hour coding experience. Organized by EPFL's Blockchain Club in partnership with the Sui Foundation, this hackathon offered participants a unique opportunity to develop their skills in the Move language while exploring the revolutionary Sui ecosystem. With a substantial prize pool exceeding $20,000, the event attracted teams of 3-5 developers eager to build innovative blockchain applications. The hackathon took place in the dedicated BC building at EPFL, providing participants with a complete environment including relaxation spaces, shower facilities, and complimentary food throughout the two-day event. To ensure all participants could succeed regardless of their Move language experience, the organizers provided comprehensive pre-hackathon workshops: a Sui Overview and installation session on September 23rd, a Move language fundamentals workshop on September 30th, and an advanced features workshop on October 7th covering Move language intricacies, Zklogin, deep book, and Kiosk functionality, led by a developer from the Sui Foundation. The event fostered intense collaboration, innovation, and skill development, with teams working around the clock to create cutting-edge applications on the Sui blockchain. This hackathon not only provided valuable learning opportunities but also strengthened the connection between the academic blockchain community and industry leaders, showcasing the potential of the next generation of blockchain developers.",
      photos: [
        "/bsa_events/hackathon-sui-1.jpg",
        "/bsa_events/hackathon-sui-2.jpg",
        "/bsa_events/hackathon-sui-3.jpg"
      ],
      highlights: [
        "48-hour intensive hackathon experience",
        "$20,000+ prize pool",
        "Partnership with Sui Foundation",
        "Pre-hackathon Move language workshops",
        "Complete facility access with food and amenities",
        "Focus on Sui ecosystem and Move language development"
      ]
    }
    
  ]

  const openEventModal = (event: any) => {
    setSelectedEvent(event)
    setCurrentPhotoIndex(0)
  }

  const closeEventModal = () => {
    setSelectedEvent(null)
    setCurrentPhotoIndex(0)
  }

  const nextPhoto = () => {
    if (selectedEvent && selectedEvent.photos) {
      setCurrentPhotoIndex((prev) => 
        prev === selectedEvent.photos.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevPhoto = () => {
    if (selectedEvent && selectedEvent.photos) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedEvent.photos.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <Calendar size={16} />
              <span>Events</span>
            </div>
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              Join Our
              <span className="gradient-text block">Events</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Join us for workshops, hackathons, networking events, and more
            </p>
            <div className="scroll-trigger flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
              >
                <a href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  View All Events on Luma
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Large Luma Embedding */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Live Event
                <span className="gradient-text block">Calendar</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Browse and register for our upcoming events directly through our integrated calendar. 
                All events are automatically updated and synchronized with our Luma platform.
              </p>
            </div>
            
            <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
              <div className="flex justify-center w-full">
                <div className="w-full max-w-[1200px]">
                  <iframe
                    src="https://lu.ma/embed/calendar/cal-KuAvNkii7TFKkpK/events"
                    className="w-full h-[450px]"
                    style={{ border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px' }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Past
                <span className="gradient-text block">Events</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, idx) => (
                <div 
                  key={event.id} 
                  className="scroll-trigger glass rounded-2xl overflow-hidden border border-[#6366f1]/20 hover-lift cursor-pointer"
                  onClick={() => openEventModal(event)}
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-[#6366f1]/10 text-[#6366f1] text-sm rounded-full border border-[#6366f1]/20">
                        {event.type}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{event.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock size={16} className="mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin size={16} className="mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Users size={16} className="mr-2" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-[#6366f1] font-medium">
                      Click to view details →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Event
                <span className="gradient-text block">Types</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🎓",
                  title: "Workshops",
                  description: "Hands-on learning sessions covering blockchain fundamentals and advanced topics."
                },
                {
                  icon: "💻",
                  title: "Hackathons",
                  description: "Intensive coding competitions to build innovative blockchain applications."
                },
                {
                  icon: "🤝",
                  title: "Networking",
                  description: "Connect with industry professionals, researchers, and fellow students."
                },
                {
                  icon: "🎯",
                  title: "Competitions",
                  description: "Pitch competitions, research challenges, and innovation contests."
                }
              ].map((eventType, idx) => (
                <div key={idx} className="scroll-trigger text-center glass rounded-2xl p-6 border border-[#6366f1]/20 hover-lift" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    {eventType.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{eventType.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {eventType.description}
                  </p>
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
                Stay
                <span className="gradient-text block">Updated</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Don't miss out on our upcoming events. Follow us on social media and 
                subscribe to our newsletter for the latest updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    View All Events
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

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#6366f1]/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#6366f1]/10 text-[#6366f1] text-sm rounded-full border border-[#6366f1]/20">
                      {selectedEvent.type}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {selectedEvent.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {selectedEvent.location}
                    </span>
                    <span className="flex items-center">
                      <Users size={16} className="mr-1" />
                      {selectedEvent.attendees} attendees
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeEventModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </Button>
              </div>

              {/* Photo Gallery */}
              {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <img
                      src={selectedEvent.photos[currentPhotoIndex]}
                      alt={`${selectedEvent.title} - Photo ${currentPhotoIndex + 1}`}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                    {selectedEvent.photos.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={prevPhoto}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 hover:bg-opacity-100 text-white"
                        >
                          <ChevronLeft size={20} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={nextPhoto}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 hover:bg-opacity-100 text-white"
                        >
                          <ChevronRight size={20} />
                        </Button>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {selectedEvent.photos.map((_: any, index: number) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentPhotoIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-white">Event Details</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedEvent.detailedDescription}
                </p>
              </div>

              {/* Highlights */}
              {selectedEvent.highlights && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-white">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedEvent.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={closeEventModal}
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 