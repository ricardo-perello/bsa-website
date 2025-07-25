"use client"

import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Linkedin, Twitter, Github, Send, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

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
      setFormData({ name: "", email: "", subject: "", message: "" })
      
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <MessageCircle size={16} />
              <span>Contact</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Get in
              <span className="gradient-text block">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Get in touch with the BSA team. We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="glass rounded-2xl p-8 border border-[#6366f1]/20">
                <h2 className="text-3xl font-bold mb-8 text-white">Send us a Message</h2>
                
                {submitStatus === "success" && (
                  <div className="bg-green-900/20 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg mb-6">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="bg-red-900/20 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6">
                    There was an error sending your message. Please try again.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1 bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-300">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                      placeholder="Tell us about your inquiry, collaboration idea, or any questions you have..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="glass rounded-2xl p-8 border border-[#6366f1]/20">
                <h2 className="text-3xl font-bold mb-8 text-white">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Email</h3>
                      <p className="text-gray-300">info@bsa-epfl.ch</p>
                      <p className="text-gray-300">president@bsa-epfl.ch</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Location</h3>
                      <p className="text-gray-300">EPFL Campus</p>
                      <p className="text-gray-300">Lausanne, Switzerland</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Phone</h3>
                      <p className="text-gray-300">+41 21 693 0000</p>
                      <p className="text-gray-300">(EPFL Main Switchboard)</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com/company/bsa-epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300 hover-lift"
                    >
                      <Linkedin className="text-white" size={20} />
                    </a>
                    <a
                      href="https://twitter.com/bsa_epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300 hover-lift"
                    >
                      <Twitter className="text-white" size={20} />
                    </a>
                    <a
                      href="https://github.com/bsa-epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] rounded-lg flex items-center justify-center hover:from-[#7c3aed] hover:to-[#ec4899] transition-all duration-300 hover-lift"
                    >
                      <Github className="text-white" size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Frequently Asked
                <span className="gradient-text block">Questions</span>
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
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
              ].map((faq, idx) => (
                <div key={idx} className="glass rounded-2xl p-6 border border-[#6366f1]/20 hover-lift">
                  <h3 className="text-lg font-semibold mb-2 text-white">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass rounded-2xl p-12 border border-[#6366f1]/20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Ready to Get
                <span className="gradient-text block">Involved?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join our community and be part of the blockchain revolution at EPFL.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="/events">
                    View Events
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift"
                >
                  <a href="/about">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 