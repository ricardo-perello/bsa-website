"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { LUMA_URL } from "@/lib/constants"

// interface Event {
//   id: string
//   name: string
//   description: string
//   start_time: string
//   end_time: string
//   url: string
//   cover_url?: string
// }

export default function EventsSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState(400) // Slightly larger default height

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from Luma
      if (event.origin !== 'https://lu.ma') return

      try {
        const data = JSON.parse(event.data)
        // The calendar embed might use a different message type
        if (data.type === 'setHeight' || data.type === 'resize') {
          // Add some padding to the height to ensure no scrolling
          setIframeHeight(Math.max(400, data.value + 100))
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // const [events, setEvents] = useState<Event[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       // Replace with your actual Luma API key
  //       const response = await fetch('https://api.lu.ma/public/v1/calendar/list-events', {
  //         headers: {
  //           'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LUMA_API_KEY}`
  //         }
  //       })

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch events')
  //       }

  //       const data = await response.json()
  //       setEvents(data.events || [])
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'An error occurred')
  //       console.error('Error fetching events:', err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchEvents()
  // }, [])

  // if (loading) {
  //   return (
  //     <section className="py-16 bg-gray-50">
  //       <div className="container mx-auto px-4 md:px-6">
  //         <div className="flex flex-col md:flex-row justify-between items-center mb-12">
  //           <h2 className="text-2xl md:text-4xl font-bold">Upcoming Events</h2>
  //           <Button asChild variant="outline" className="mt-4 md:mt-0 border-[#1f273a] text-[#1f273a]">
  //             <Link href="/events" className="flex items-center gap-2">
  //               View All Events <ArrowRight size={16} />
  //             </Link>
  //           </Button>
  //         </div>
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {[1, 2, 3].map((i) => (
  //             <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
  //               <div className="h-12 bg-gray-200"></div>
  //               <div className="p-6">
  //                 <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
  //                 <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
  //                 <div className="h-10 bg-gray-200 rounded w-full"></div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>
  //   )
  // }

  // if (error) {
  //   return (
  //     <section className="py-16 bg-gray-50">
  //       <div className="container mx-auto px-4 md:px-6">
  //         <div className="flex flex-col md:flex-row justify-between items-center mb-12">
  //           <h2 className="text-2xl md:text-4xl font-bold">Upcoming Events</h2>
  //           <Button asChild variant="outline" className="mt-4 md:mt-0 border-[#1f273a] text-[#1f273a]">
  //             <Link href="/events" className="flex items-center gap-2">
  //               View All Events <ArrowRight size={16} />
  //             </Link>
  //           </Button>
  //         </div>
  //         <div className="text-center py-12">
  //           <p className="text-gray-600">Unable to load events at this time. Please try again later.</p>
  //         </div>
  //       </div>
  //     </section>
  //   )
  // }

  // return (
  //   <section className="py-16 bg-gray-50">
  //     <div className="container mx-auto px-4 md:px-6">
  //       <div className="flex flex-col md:flex-row justify-between items-center mb-12">
  //         <h2 className="text-2xl md:text-4xl font-bold">Upcoming Events</h2>
  //         <Button asChild variant="outline" className="mt-4 md:mt-0 border-[#1f273a] text-[#1f273a]">
  //           <Link href="/events" className="flex items-center gap-2">
  //             View All Events <ArrowRight size={16} />
  //           </Link>
  //         </Button>
  //       </div>
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //         {events.slice(0, 3).map((event) => {
  //           const startDate = new Date(event.start_time)
  //           const formattedDate = startDate.toLocaleDateString('en-US', {
  //             month: 'long',
  //             day: 'numeric',
  //             year: 'numeric'
  //           })
  //           const formattedTime = startDate.toLocaleTimeString('en-US', {
  //             hour: 'numeric',
  //             minute: '2-digit'
  //           })

  //           return (
  //             <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
  //               {event.cover_url && (
  //                 <img
  //                   src={event.cover_url}
  //                   alt={event.name}
  //                   className="w-full h-48 object-cover"
  //                 />
  //               )}
  //               <div className="bg-[#1f273a] text-white p-3 text-sm font-medium">
  //                 {formattedDate} • {formattedTime}
  //               </div>
  //               <div className="p-6">
  //                 <h3 className="text-xl font-bold mb-2">{event.name}</h3>
  //                 <p className="text-gray-600 mb-4 line-clamp-2">
  //                   {event.description}
  //                 </p>
  //                 <Button asChild className="w-full bg-[#1f273a] hover:bg-[#2a3349]">
  //                   <Link href={event.url} target="_blank" rel="noopener noreferrer">
  //                     Register Now
  //                   </Link>
  //                 </Button>
  //               </div>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   </section>
  // )

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">Upcoming Events</h2>
          <Button asChild variant="outline" className="mt-4 md:mt-0 border-[#1f273a] text-[#1f273a]">
            <Link href="/events" className="flex items-center gap-2">
              View All Events <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div className="flex gap-8 items-start">
          <div className="flex justify-left w-full md:w-2/3">
            <div className="w-full max-w-[900px]">
              <iframe
                ref={iframeRef}
                src="https://lu.ma/embed/calendar/cal-KuAvNkii7TFKkpK/events"
                className="w-full aspect-[14/5.8]"
                style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
          </div>
          <div className="hidden md:block w-1/3 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-[#1f273a]">Join Our Community</h3>
            <p className="text-gray-600 mb-4">
              Stay connected with our vibrant community through our regular events and meetups. Whether you&apos;re a beginner or an expert, there&apos;s something for everyone.
            </p>
            <p className="text-gray-600 mb-4">
              Register for any upcoming event and become part of our growing network of passionate individuals. We can&apos;t wait to meet you!
            </p>
            <p className="text-gray-600">
              From hands-on workshops to thought-provoking discussions, our events are carefully crafted to inspire, educate, and foster meaningful connections. Join us in creating moments that spark innovation and lasting friendships.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 