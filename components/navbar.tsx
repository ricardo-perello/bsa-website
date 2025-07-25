"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { LUMA_URL } from "@/lib/constants"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover-lift">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                <span className="gradient-text">BSA</span>
                <span className="text-white"> EPFL</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              About
            </Link>
            <Link href="/events" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Events
            </Link>
            <Link href="/articles" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Articles
            </Link>
            <Link href="/startups" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Startups
            </Link>
            <Link href="/team" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Team
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Contact
            </Link>
            <Button asChild className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 px-6 py-2 font-semibold hover-lift">
              <Link href="/join">Join Us</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="glass backdrop-blur-md border-t border-[#6366f1]/20">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                href="/about"
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/events"
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/articles"
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/startups"
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Startups
              </Link>
              <Link
                href="/team"
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 py-2">
                <Button asChild className="w-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 font-semibold hover-lift">
                  <Link href="/join" onClick={() => setIsMenuOpen(false)}>
                    Join Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

