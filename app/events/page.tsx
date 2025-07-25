"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"
import { LUMA_URL } from "@/lib/constants"
import { useState } from "react"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Sample event data - you can replace this with real data
  const pastEvents = [
    {
      id: 4,
      title: "Web3 Development Bootcamp",
      date: "2025-07-10",
      time: "10:00 - 16:00",
      location: "EPFL, Room BC 410",
      description: "Intensive bootcamp covering Solidity, smart contract development, and DApp deployment on Ethereum.",
      attendees: 35,
      type: "Bootcamp",
      registrationUrl: null,
      detailedDescription: "Our comprehensive Web3 Development Bootcamp was a resounding success! Over 35 participants from various backgrounds came together to dive deep into blockchain development. The bootcamp covered essential topics including Solidity smart contract development, DApp architecture, and deployment strategies on the Ethereum network. Participants worked on real-world projects and gained hands-on experience with industry-standard tools and frameworks. The event featured guest speakers from leading blockchain companies and concluded with a hackathon where teams built and presented their own decentralized applications.",
      photos: [
        "/placeholder.jpg?height=400&width=600",
        "/placeholder.jpg?height=400&width=600", 
        "/placeholder.jpg?height=400&width=600"
      ],
      highlights: [
        "35 participants from diverse backgrounds",
        "Hands-on Solidity development",
        "Real-world project implementation",
        "Guest speakers from industry leaders",
        "Final hackathon with live demos"
      ]
    },
    {
      id: 5,
      title: "Blockchain Research Symposium",
      date: "2025-06-25",
      time: "13:00 - 17:00",
      location: "EPFL, Auditorium",
      description: "Academic symposium featuring research presentations on blockchain scalability, privacy, and consensus mechanisms.",
      attendees: 150,
      type: "Academic",
      registrationUrl: null,
      detailedDescription: "The Blockchain Research Symposium brought together leading researchers, academics, and industry professionals to discuss cutting-edge developments in blockchain technology. The symposium featured presentations on novel consensus mechanisms, privacy-preserving protocols, and scalability solutions. Key topics included zero-knowledge proofs, layer 2 scaling solutions, and cross-chain interoperability. The event fostered meaningful discussions between academia and industry, leading to several collaborative research initiatives. The symposium also included a poster session where students presented their latest research findings.",
      photos: [
        "/placeholder.jpg?height=400&width=600",
        "/placeholder.jpg?height=400&width=600"
      ],
      highlights: [
        "150+ researchers and professionals",
        "15 research presentations",
        "Poster session with student research",
        "Industry-academia networking",
        "Collaborative research initiatives"
      ]
    },
    {
      id: 6,
      title: "Startup Pitch Competition",
      date: "2025-06-15",
      time: "14:00 - 18:00",
      location: "EPFL Innovation Park",
      description: "Student teams pitched their blockchain startup ideas to a panel of investors and industry experts.",
      attendees: 200,
      type: "Competition",
      registrationUrl: null,
      detailedDescription: "Our inaugural Startup Pitch Competition was a thrilling showcase of entrepreneurial talent! Ten student teams presented innovative blockchain startup ideas to a distinguished panel of investors, industry experts, and successful entrepreneurs. The competition featured startups working on DeFi protocols, NFT marketplaces, supply chain solutions, and more. Teams were evaluated on innovation, market potential, technical feasibility, and presentation quality. The winning team received seed funding and mentorship opportunities. The event also included networking sessions where participants connected with potential investors and advisors.",
      photos: [
        "/placeholder.jpg?height=400&width=600",
        "/placeholder.jpg?height=400&width=600",
        "/placeholder.jpg?height=400&width=600",
        "/placeholder.jpg?height=400&width=600"
      ],
      highlights: [
        "10 student startup teams",
        "Distinguished investor panel",
        "Seed funding for winners",
        "Mentorship opportunities",
        "Networking with industry leaders"
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1f273a] to-[#2d3748] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Join us for workshops, hackathons, networking events, and more
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-white text-[#1f273a] hover:bg-gray-100"
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Event Calendar</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse and register for our upcoming events directly through our integrated calendar. 
                All events are automatically updated and synchronized with our Luma platform.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-center w-full">
                <div className="w-full max-w-[1200px]">
                  <iframe
                    src="https://lu.ma/embed/calendar/cal-KuAvNkii7TFKkpK/events"
                    className="w-full aspect-[14/5.8]"
                    style={{ border: '1px solid #bfcbda88', borderRadius: '8px' }}
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => openEventModal(event)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                        {event.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={16} className="mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={16} className="mr-2" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-[#1f273a] font-medium">
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Event Types</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1f273a] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Workshops</h3>
                <p className="text-gray-600">
                  Hands-on learning sessions covering blockchain fundamentals and advanced topics.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1f273a] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Hackathons</h3>
                <p className="text-gray-600">
                  Intensive coding competitions to build innovative blockchain applications.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1f273a] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Networking</h3>
                <p className="text-gray-600">
                  Connect with industry professionals, researchers, and fellow students.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1f273a] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Competitions</h3>
                <p className="text-gray-600">
                  Pitch competitions, research challenges, and innovation contests.
                </p>
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
              Stay Updated
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Don't miss out on our upcoming events. Follow us on social media and 
              subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-white text-[#1f273a] hover:bg-gray-100"
              >
                <a href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  View All Events
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1f273a]"
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#1f273a] text-white text-sm rounded-full">
                      {selectedEvent.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
                  className="text-gray-500 hover:text-gray-700"
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
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                        >
                          <ChevronLeft size={20} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={nextPhoto}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
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
                <h3 className="text-xl font-bold mb-3">Event Details</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedEvent.detailedDescription}
                </p>
              </div>

              {/* Highlights */}
              {selectedEvent.highlights && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedEvent.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#1f273a] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={closeEventModal}
                  className="bg-[#1f273a] hover:bg-[#2d3748]"
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