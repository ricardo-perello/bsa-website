"use client"

import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Linkedin, Twitter, Github, Send } from "lucide-react"
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1f273a] to-[#2d3748] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Get in touch with the BSA team. We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
                
                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                    There was an error sending your message. Please try again.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Tell us about your inquiry, collaboration idea, or any questions you have..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#1f273a] hover:bg-[#2d3748]"
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
              <div>
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">info@bsa-epfl.ch</p>
                      <p className="text-gray-600">president@bsa-epfl.ch</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Location</h3>
                      <p className="text-gray-600">EPFL Campus</p>
                      <p className="text-gray-600">Lausanne, Switzerland</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Phone</h3>
                      <p className="text-gray-600">+41 21 693 0000</p>
                      <p className="text-gray-600">(EPFL Main Switchboard)</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com/company/bsa-epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center hover:bg-[#2d3748] transition-colors"
                    >
                      <Linkedin className="text-white" size={20} />
                    </a>
                    <a
                      href="https://twitter.com/bsa_epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center hover:bg-[#2d3748] transition-colors"
                    >
                      <Twitter className="text-white" size={20} />
                    </a>
                    <a
                      href="https://github.com/bsa-epfl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#1f273a] rounded-lg flex items-center justify-center hover:bg-[#2d3748] transition-colors"
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">How can I join the BSA?</h3>
                <p className="text-gray-600">
                  All EPFL students are welcome to join! Simply attend our events, follow us on social media, 
                  or reach out to us directly. We're always looking for passionate students interested in blockchain technology.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Do I need blockchain experience to participate?</h3>
                <p className="text-gray-600">
                  Not at all! We welcome students of all experience levels. Our workshops and events are designed 
                  to accommodate beginners while also providing value to more experienced participants.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">How can I collaborate with the BSA?</h3>
                <p className="text-gray-600">
                  We're open to collaborations with other student organizations, companies, and academic institutions. 
                  Contact us to discuss potential partnerships, sponsorships, or joint events.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Can non-EPFL students participate?</h3>
                <p className="text-gray-600">
                  While our primary focus is EPFL students, we occasionally host events open to the broader 
                  blockchain community. Check our events page for public events or contact us for specific inquiries.
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
              Ready to Get Involved?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join our community and be part of the blockchain revolution at EPFL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-white text-[#1f273a] hover:bg-gray-100"
              >
                <a href="/events">
                  View Events
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1f273a]"
              >
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 