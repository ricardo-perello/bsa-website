"use client"

import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Calendar, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

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

  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.contentSnippet?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
                           article.title.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "defi", name: "DeFi" },
    { id: "blockchain", name: "Blockchain" },
    { id: "web3", name: "Web3" },
    { id: "cryptocurrency", name: "Cryptocurrency" },
    { id: "technology", name: "Technology" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1f273a] to-[#2d3748] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Articles
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Insights, tutorials, and analysis from the BSA community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-white text-[#1f273a] hover:bg-gray-100"
              >
                <a href="https://medium.com/bsa-epfl" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  Visit our Medium
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-[#1f273a] text-white" : ""}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f273a] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  {searchTerm || selectedCategory !== "all" 
                    ? "No articles found matching your criteria." 
                    : "No articles available at the moment."}
                </p>
                {(searchTerm || selectedCategory !== "all") && (
                  <Button 
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">
                    {filteredArticles.length} Article{filteredArticles.length !== 1 ? 's' : ''}
                  </h2>
                  <p className="text-gray-600">
                    Showing {filteredArticles.length} of {articles.length} articles
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article, idx) => (
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
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar size={16} className="mr-2" />
                          {article.pubDate ? new Date(article.pubDate).toLocaleDateString() : ""}
                        </div>
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.contentSnippet?.slice(0, 150)}{article.contentSnippet && article.contentSnippet.length > 150 ? "..." : ""}
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-[#1f273a] text-[#1f273a] hover:bg-[#1f273a] hover:text-white"
                        >
                          <a href={article.link} target="_blank" rel="noopener noreferrer">
                            Read Article <ArrowRight size={16} className="ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1f273a] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Contribute to Our Blog
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Have insights to share? We welcome contributions from students, researchers, 
              and industry professionals. Join our community of writers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-white text-[#1f273a] hover:bg-gray-100"
              >
                <a href="https://medium.com/bsa-epfl" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  Visit Medium
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1f273a]"
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 