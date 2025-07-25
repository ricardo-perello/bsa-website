"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
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

  return (
    <section id="articles" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">Latest Articles</h2>
          <Button asChild variant="outline" className="mt-4 md:mt-0 border-[#1f273a] text-[#1f273a]">
            <Link href="https://medium.com/bsa-epfl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Visit our Medium <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading articles...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedArticles.map((article, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {article.thumbnail ? (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Article thumbnail"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{article.pubDate ? new Date(article.pubDate).toLocaleDateString() : ""}</div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.contentSnippet?.slice(0, 120)}{article.contentSnippet && article.contentSnippet.length > 120 ? "..." : ""}
                    </p>
                    {article.categories && article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.categories.map((category: string, catIdx: number) => (
                          <span
                            key={catIdx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                        ))}
                      </div>
                    )}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#1f273a] text-[#1f273a] hover:bg-[#1f273a] hover:text-white"
                    >
                      <Link href={article.link} target="_blank" rel="noopener noreferrer">Read Article</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {hasMoreArticles && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  className="border-[#1f273a] text-[#1f273a] hover:bg-[#1f273a] hover:text-white"
                >
                  {showAll ? (
                    <>
                      Show Less <ChevronUp size={16} className="ml-2" />
                    </>
                  ) : (
                    <>
                      Show More <ChevronDown size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button asChild className="bg-[#1f273a] hover:bg-[#2a3349]">
                <Link href="/articles">
                  View All Articles
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
} 