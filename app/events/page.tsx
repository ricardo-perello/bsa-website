import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react"
import { LUMA_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Events | Blockchain Student Association",
  description: "Discover upcoming and past events hosted by the Blockchain Student Association at EPFL - workshops, hackathons, networking events, and more.",
}

export default function EventsPage() {
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
      registrationUrl: null
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
      registrationUrl: null
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
      registrationUrl: null
    }
  ]

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
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
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
    </div>
  )
} 