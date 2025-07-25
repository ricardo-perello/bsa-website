"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { LUMA_URL } from "@/lib/constants"

export default function EventsSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState(400)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://lu.ma') return

      try {
        const data = JSON.parse(event.data)
        if (data.type === 'setHeight' || data.type === 'resize') {
          setIframeHeight(Math.max(400, data.value + 100))
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <section id="events" className="py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="scroll-trigger text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
            <Calendar size={16} />
            <span>Upcoming Events</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Join Our
            <span className="gradient-text block">Community Events</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover workshops, hackathons, and networking events designed to accelerate your blockchain journey
          </p>
        </div>

        <div className="flex gap-8 items-start">
          <div className="flex justify-left w-full md:w-2/3">
            <div className="w-full max-w-[900px] scroll-trigger" style={{ animationDelay: '0.2s' }}>
              <div className="glass rounded-2xl p-6 border border-[#6366f1]/20 hover-lift">
                <iframe
                  ref={iframeRef}
                  src="https://lu.ma/embed/calendar/cal-KuAvNkii7TFKkpK/events"
                  className="w-full aspect-[14/5.8] rounded-xl"
                  style={{ border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px' }}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                />
              </div>
            </div>
          </div>
          
          <div className="hidden md:block w-1/3 scroll-trigger" style={{ animationDelay: '0.4s' }}>
            <div className="glass rounded-2xl p-8 border border-[#6366f1]/20 hover-lift">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Join Our Community</h3>
              </div>
              
              <div className="space-y-6 text-gray-300">
                <p className="leading-relaxed">
                  Stay connected with our vibrant community through our regular events and meetups. Whether you&apos;re a beginner or an expert, there&apos;s something for everyone.
                </p>
                <p className="leading-relaxed">
                  Register for any upcoming event and become part of our growing network of passionate individuals. We can&apos;t wait to meet you!
                </p>
                <p className="leading-relaxed">
                  From hands-on workshops to thought-provoking discussions, our events are carefully crafted to inspire, educate, and foster meaningful connections.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#6366f1]/20">
                <Button asChild className="w-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift">
                  <Link href="/events" className="flex items-center gap-2">
                    <ArrowRight size={20} />
                    View All Events
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile CTA */}
        <div className="md:hidden mt-8 text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 px-8 py-3 text-lg font-semibold hover-lift">
            <Link href="/events" className="flex items-center gap-2">
              <ArrowRight size={20} />
              View All Events
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 