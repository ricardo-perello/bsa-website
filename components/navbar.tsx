"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { LUMA_URL } from "@/lib/constants"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* Temporary text replacement for the logo */}
              <span className="text-2xl font-bold tracking-tight text-[#1f273a]">Blockchain Student Association EPFL</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-gray-700 hover:text-[#1f273a] transition-colors">
              About
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-[#1f273a] transition-colors">
              Events
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-[#1f273a] transition-colors">
              Articles
            </Link>
            <Link href="/startups" className="text-gray-700 hover:text-[#1f273a] transition-colors">
              Startups
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-[#1f273a] transition-colors">
              Team
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1f273a] transition-colors">
              Contact
            </Link>
            <Button asChild className="bg-[#1f273a] hover:bg-[#2a3349]">
              <Link href="/join">Join Us</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1f273a] focus:outline-none"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1f273a] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/events"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1f273a] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/articles"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1f273a] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/startups"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1f273a] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Startups
            </Link>
            <Link
              href="/team"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1f273a] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1f273a] hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-3 py-2">
              <Button asChild className="w-full bg-[#1f273a] hover:bg-[#2a3349]">
                <Link href="/join" onClick={() => setIsMenuOpen(false)}>
                  Join Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

