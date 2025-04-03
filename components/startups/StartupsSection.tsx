"use client"

import Image from "next/image"
import { startups } from "@/data/startups"
import InfiniteAutoSlider from "@/components/ui/InfiniteAutoSlider"
import Link from "next/link"

export default function StartupsSection() {
  return (
    <section id="startups" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">Startups <span className="text-blue-600">Incubator</span></h2>
          <p className="text-gray-600 mt-2 md:mt-0">
            Check out all the startups created and shaped by BSA members
          </p>
        </div>

        {/* Mobile View: Auto-scrolling slider */}
        <div className="md:hidden">
          <InfiniteAutoSlider content={startups} />
        </div>

        {/* Desktop View: Horizontal scroll */}
        <div className="relative hidden md:block">
          <div className="overflow-x-auto hidden md:inline-flex gap-10 px-6 md:px-14 w-full max-w-fit">
            {startups.map((startup, index) => (
              <div
                key={`homeStartup${index}`}
                className="w-full max-w-[400px] shrink-0 p-4 sm:p-10 flex flex-col gap-8 items-center justify-between bg-[#1f273a] rounded-lg"
              >
                <div className="w-full h-40 flex items-center justify-center">
                  <Image
                    src={startup.img}
                    alt={startup.title + " logo"}
                    width={200}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h4 className="w-full font-semibold text-white">{startup.title}</h4>
                <p className="w-full italic text-sm text-gray-300">{startup.description}</p>
                <a
                  href={startup.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit relative rounded-md uppercase bg-transparent hover:bg-white border border-white text-white font-medium hover:text-[#1f273a] duration-100 px-10 py-2 mt-3"
                >
                  Discover
                </a>
              </div>
            ))}
          </div>
          <div className="absolute top-0 bottom-0 left-0 w-6 md:w-14 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-6 md:w-14 bg-gradient-to-l from-gray-50 to-transparent" />
        </div>
      </div>
    </section>
  )
} 