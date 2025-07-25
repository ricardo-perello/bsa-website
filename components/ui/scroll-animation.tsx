"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  rootMargin?: string
  animation?: "fade-in" | "slide-up" | "slide-in-left" | "slide-in-right" | "scale-in" | "blur-in"
}

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  animation = "fade-in"
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold, rootMargin])

  const animationClasses = {
    "fade-in": "opacity-0 transition-opacity duration-1000",
    "slide-up": "opacity-0 translate-y-10 transition-all duration-1000",
    "slide-in-left": "opacity-0 -translate-x-10 transition-all duration-1000",
    "slide-in-right": "opacity-0 translate-x-10 transition-all duration-1000",
    "scale-in": "opacity-0 scale-95 transition-all duration-1000",
    "blur-in": "opacity-0 blur-sm transition-all duration-1000",
  }

  const visibleClasses = {
    "fade-in": "opacity-100",
    "slide-up": "opacity-100 translate-y-0",
    "slide-in-left": "opacity-100 translate-x-0",
    "slide-in-right": "opacity-100 translate-x-0",
    "scale-in": "opacity-100 scale-100",
    "blur-in": "opacity-100 blur-0",
  }

  return (
    <div
      ref={ref}
      className={`${className} ${animationClasses[animation]} ${
        isVisible ? visibleClasses[animation] : ""
      }`}
    >
      {children}
    </div>
  )
} 