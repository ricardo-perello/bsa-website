"use client"

import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Linkedin, Twitter, Github, Send, MessageCircle, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Users } from "lucide-react"

export default function ContactPage() {
  const [isClient, setIsClient] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
            console.log('Contact element animated:', entry.target)
          } else {
            // Remove animate class when element goes out of view to allow re-animation
            entry.target.classList.remove('animate')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const observeElements = () => {
      const scrollTriggers = document.querySelectorAll('.scroll-trigger')
      console.log('Contact found scroll triggers:', scrollTriggers.length)
      scrollTriggers.forEach((el) => observer.observe(el))
    }

    // Initial observation
    observeElements()

    // Re-observe after a short delay
    const timeoutId = setTimeout(observeElements, 100)

    return () => {
      clearTimeout(timeoutId)
      const scrollTriggers = document.querySelectorAll('.scroll-trigger')
      scrollTriggers.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      const result = await response.json()
      console.log("Contact form submitted successfully:", result)
      
      setSubmitStatus("success")
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setSubmitStatus("error")
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const faqs = [
    {
      question: "How can I join the BSA?",
      answer: "All EPFL students are welcome to join! Simply attend our events, follow us on social media, or reach out to us directly. We're always looking for passionate students interested in blockchain technology."
    },
    {
      question: "Do I need blockchain experience to participate?",
      answer: "Not at all! We welcome students of all experience levels. Our workshops and events are designed to accommodate beginners while also providing value to more experienced participants."
    },
    {
      question: "How can I collaborate with the BSA?",
      answer: "We're open to collaborations with other student organizations, companies, and academic institutions. Contact us to discuss potential partnerships, sponsorships, or joint events."
    },
    {
      question: "Can non-EPFL students participate?",
      answer: "While our primary focus is EPFL students, we occasionally host events open to the broader blockchain community. Check our events page for public events or contact us for specific inquiries."
    }
  ]

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <Mail size={16} />
              <span>Contact</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              Get in
              <span className="gradient-text block">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Have questions? Want to collaborate? We'd love to hear from you
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <Mail size={16} />
              <span>Contact</span>
            </div>
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              Get in
              <span className="gradient-text block">Touch</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Have questions? Want to collaborate? We'd love to hear from you
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-white">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-white">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#6366f1]/20 text-white focus:border-[#6366f1]">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#6366f1]/20">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="events">Events & Workshops</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="join">Join BSA</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1] min-h-[120px]"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="scroll-trigger space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Get in touch</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Have questions about our events, want to collaborate, or just want to say hello? 
                    We'd love to hear from you. Reach out and we'll get back to you as soon as possible.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-xl flex items-center justify-center">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                      <p className="text-gray-300">contact@bsa-epfl.ch</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-xl flex items-center justify-center">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                      <p className="text-gray-300">EPFL, Lausanne, Switzerland</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#ec4899] to-[#f59e0b] rounded-xl flex items-center justify-center">
                      <Clock size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Response Time</h4>
                      <p className="text-gray-300">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-2xl p-6 border border-[#6366f1]/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Follow us</h4>
                  <div className="flex gap-3">
                    <a
                      href="https://twitter.com/bsa_epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300"
                    >
                      <Twitter size={20} className="text-white" />
                    </a>
                    <a
                      href="https://linkedin.com/company/bsa-epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300"
                    >
                      <Linkedin size={20} className="text-white" />
                    </a>
                    <a
                      href="https://github.com/bsa-epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300"
                    >
                      <Github size={20} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Frequently Asked
                <span className="gradient-text block">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="scroll-trigger glass rounded-2xl border border-[#6366f1]/20" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${idx}`}>
                      <AccordionTrigger className="text-white hover:text-[#6366f1] px-6 py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-300 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger glass rounded-2xl p-12 border border-[#6366f1]/20">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Ready to
                <span className="gradient-text block">Connect?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join our community and stay updated with the latest blockchain events, 
                workshops, and opportunities at EPFL.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="/join">
                    <Users size={16} className="mr-2" />
                    Join BSA
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift"
                >
                  <a href="/events">View Events</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 