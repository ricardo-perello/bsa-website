"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

export default function ArticlesSection() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/articles')
        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }
        const data = await response.json()
        setArticles(data.articles || [])
      } catch (err: any) {
        setError("Failed to load articles.")
        console.error('Error fetching articles:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const displayedArticles = showAll ? articles : articles.slice(0, 3)
  const hasMoreArticles = articles.length > 3

  // Fallback articles for when API fails or returns empty
  const fallbackArticles = [
    {
      title: "Introduction to Blockchain Technology",
      link: "https://medium.com/bsa-epfl",
      pubDate: new Date().toISOString(),
      contentSnippet: "Learn the fundamentals of blockchain technology, including distributed ledgers, consensus mechanisms, and smart contracts.",
      thumbnail: null,
      categories: ["Blockchain", "Education"]
    },
    {
      title: "DeFi Protocols: A Comprehensive Guide",
      link: "https://medium.com/bsa-epfl",
      pubDate: new Date().toISOString(),
      contentSnippet: "Explore the world of Decentralized Finance (DeFi) and understand how different protocols work together to create financial services.",
      thumbnail: null,
      categories: ["DeFi", "Finance"]
    },
    {
      title: "The Future of Web3 Development",
      link: "https://medium.com/bsa-epfl",
      pubDate: new Date().toISOString(),
      contentSnippet: "Discover the latest trends in Web3 development and how to build the next generation of decentralized applications.",
      thumbnail: null,
      categories: ["Web3", "Development"]
    }
  ]

  const articlesToShow = displayedArticles.length > 0 ? displayedArticles : fallbackArticles

  return (
    <section id="articles" className="py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
            <BookOpen size={16} />
            <span>Latest Articles</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Stay Updated with
            <span className="gradient-text block">Latest Insights</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our latest articles on blockchain technology, DeFi, NFTs, and the future of Web3
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-gray-300">
              <div className="w-6 h-6 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin"></div>
              Loading articles...
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#6366f1]/20 max-w-md mx-auto">
              <p className="text-red-400 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articlesToShow.map((article, idx) => (
                <div 
                  key={idx} 
                  className="hover-lift"
                >
                  <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#6366f1]/20 h-full flex flex-col">
                    {article.thumbnail ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-[#6366f1]/20 to-[#7c3aed]/20 flex items-center justify-center">
                        <BookOpen size={48} className="text-[#6366f1]" />
                      </div>
                    )}
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="text-sm text-[#6366f1] mb-3">
                        {article.pubDate ? new Date(article.pubDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : ""}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">{article.title}</h3>
                      
                      <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">
                        {article.contentSnippet ? 
                          (article.contentSnippet.slice(0, 120) + (article.contentSnippet.length > 120 ? "..." : "")) :
                          "Read our latest insights on blockchain technology and Web3 development."
                        }
                      </p>
                      
                      {article.categories && article.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.categories.slice(0, 3).map((category: string, catIdx: number) => (
                            <span
                              key={catIdx}
                              className="px-3 py-1 bg-[#6366f1]/10 text-[#6366f1] text-xs rounded-full border border-[#6366f1]/20"
                            >
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                      >
                        <Link href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <ExternalLink size={16} />
                          Read Article
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {hasMoreArticles && (
              <div className="text-center mt-12">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white px-8 py-3 text-lg font-semibold hover-lift"
                >
                  {showAll ? (
                    <>
                      Show Less <ChevronUp size={20} className="ml-2" />
                    </>
                  ) : (
                    <>
                      Show More <ChevronDown size={20} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
            
            <div className="text-center mt-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 px-8 py-3 text-lg font-semibold hover-lift">
                <Link href="https://medium.com/bsa-epfl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink size={20} />
                  Visit our Medium
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
} 