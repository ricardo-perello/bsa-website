import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ArticlesSection() {
  return (
    <section id="articles" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">Latest Articles</h2>
          <Button asChild variant="outline" className="mt-4 md:mt-0 border-[#1f273a] text-[#1f273a]">
            <Link href="/articles" className="flex items-center gap-2">
              View All Articles <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article Card 1 */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Article thumbnail"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">April 28, 2025</div>
              <h3 className="text-xl font-bold mb-2">The Future of Decentralized Finance</h3>
              <p className="text-gray-600 mb-4">
                Exploring the potential impact of DeFi on traditional financial systems.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-[#1f273a] text-[#1f273a] hover:bg-[#1f273a] hover:text-white"
              >
                <Link href="/articles/future-of-defi">Read Article</Link>
              </Button>
            </div>
          </div>
          {/* Article Card 2 */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Article thumbnail"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">April 15, 2025</div>
              <h3 className="text-xl font-bold mb-2">Understanding Blockchain Consensus Mechanisms</h3>
              <p className="text-gray-600 mb-4">
                A deep dive into Proof of Work, Proof of Stake, and other consensus algorithms.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-[#1f273a] text-[#1f273a] hover:bg-[#1f273a] hover:text-white"
              >
                <Link href="/articles/consensus-mechanisms">Read Article</Link>
              </Button>
            </div>
          </div>
          {/* Article Card 3 */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Article thumbnail"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">March 30, 2025</div>
              <h3 className="text-xl font-bold mb-2">Web3 Development: Getting Started</h3>
              <p className="text-gray-600 mb-4">
                A beginner's guide to building applications for the decentralized web.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-[#1f273a] text-[#1f273a] hover:bg-[#1f273a] hover:text-white"
              >
                <Link href="/articles/web3-development">Read Article</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 