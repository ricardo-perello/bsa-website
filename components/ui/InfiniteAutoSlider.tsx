"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { StartupType } from "@/types"

export default function InfiniteAutoSlider({ content }: { content: StartupType[] }) {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1
        // Reset position when reaching the end of the first set
        if (newPosition >= content.length * 200) {
          return 0
        }
        return newPosition
      })
    }, 30) // Adjust speed by changing interval

    return () => clearInterval(scrollInterval)
  }, [content.length])

  return (
    <div className="w-full overflow-hidden relative">
      <div
        className="w-fit py-8 inline-flex gap-8 transition-transform duration-1000"
        style={{
          transform: `translateX(-${scrollPosition}px)`,
        }}
      >
        {/* First set of logos */}
        {content.map((item, index) => (
          <a
            key={`first-${index}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[200px] h-40 bg-[#1f273a] rounded-lg flex items-center justify-center p-6"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={160}
              height={80}
              className="object-contain"
            />
          </a>
        ))}
        {/* Duplicate set for infinite scroll */}
        {content.map((item, index) => (
          <a
            key={`second-${index}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[200px] h-40 bg-[#1f273a] rounded-lg flex items-center justify-center p-6"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={160}
              height={80}
              className="object-contain"
            />
          </a>
        ))}
      </div>
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent" />
    </div>
  )
} 