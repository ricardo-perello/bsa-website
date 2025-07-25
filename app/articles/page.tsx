"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Calendar, ExternalLink, ChevronDown, ChevronUp, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAllCategories, setShowAllCategories] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const scrollTriggers = document.querySelectorAll('.scroll-trigger')
    scrollTriggers.forEach((el) => observer.observe(el))

    return () => {
      scrollTriggers.forEach((el) => observer.unobserve(el))
    }
  }, [articles]) // Re-run when articles change

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

  // Get all unique categories from articles, sorted by frequency
  const categoryCounts = articles.reduce((acc, article) => {
    if (article.categories) {
      article.categories.forEach((category: string) => {
        acc[category] = (acc[category] || 0) + 1
      })
    }
    return acc
  }, {} as Record<string, number>)

  const allCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => (b as number) - (a as number)) // Sort by frequency (descending)
    .map(([category]) => category)

  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.contentSnippet?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
                           (article.categories && article.categories.includes(selectedCategory))
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "All Articles", count: articles.length },
    ...allCategories.map(cat => ({ 
      id: cat, 
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: categoryCounts[cat]
    }))
  ]

  // Show first 6 categories by default, rest can be toggled
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 6)
  const hasMoreCategories = categories.length > 6

  // Fallback: if no filtered articles but we have articles, show all
  const displayArticles = filteredArticles.length > 0 ? filteredArticles : articles

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <BookOpen size={16} />
              <span>Articles</span>
            </div>
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-6 text-white">
              Latest
              <span className="gradient-text block">Insights</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Insights, tutorials, and analysis from the BSA community
            </p>
            <div className="scroll-trigger flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
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
      <section className="py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger glass rounded-2xl p-8 border border-[#6366f1]/20">
              <div className="flex flex-col gap-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                  />
                </div>
                
                {/* Category Filters */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-300">Filter by Category:</div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {visibleCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.id)}
                        className={selectedCategory === category.id 
                          ? "bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white border-0" 
                          : "border-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1] hover:text-white"
                        }
                        size="sm"
                      >
                        {category.name} ({category.count})
                      </Button>
                    ))}
                  </div>
                  {hasMoreCategories && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="text-[#6366f1] hover:text-[#7c3aed]"
                    >
                      {showAllCategories ? (
                        <>
                          Show Less <ChevronUp size={16} className="ml-1" />
                        </>
                      ) : (
                        <>
                          Show {categories.length - 6} More <ChevronDown size={16} className="ml-1" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="scroll-trigger text-center py-12">
                <div className="inline-flex items-center gap-2 text-gray-300">
                  <div className="w-6 h-6 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin"></div>
                  Loading articles...
                </div>
              </div>
            ) : error ? (
              <div className="scroll-trigger text-center py-12">
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
            ) : displayArticles.length === 0 ? (
              <div className="scroll-trigger text-center py-12">
                <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#6366f1]/20 max-w-md mx-auto">
                  <p className="text-gray-300 text-lg mb-4">
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
                      className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="scroll-trigger flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">
                    {displayArticles.length} Article{displayArticles.length !== 1 ? 's' : ''}
                  </h2>
                  <p className="text-gray-400">
                    Showing {displayArticles.length} of {articles.length} articles
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayArticles.map((article, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#6366f1]/20 hover-lift animate-fade-in" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
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
                      <div className="p-6">
                        <div className="flex items-center text-sm text-[#6366f1] mb-3">
                          <Calendar size={16} className="mr-2" />
                          {article.pubDate ? new Date(article.pubDate).toLocaleDateString() : ""}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">{article.title}</h3>
                        <p className="text-gray-300 mb-4 line-clamp-3">
                          {article.contentSnippet?.slice(0, 150)}{article.contentSnippet && article.contentSnippet.length > 150 ? "..." : ""}
                        </p>
                        {article.categories && article.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {article.categories.map((category: string, catIdx: number) => (
                              <span
                                key={catIdx}
                                className="px-2 py-1 bg-[#6366f1]/10 text-[#6366f1] text-xs rounded-full border border-[#6366f1]/20"
                              >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </span>
                            ))}
                          </div>
                        )}
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift"
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
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger glass rounded-2xl p-12 border border-[#6366f1]/20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Contribute to Our
                <span className="gradient-text block">Blog</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Have insights to share? We welcome contributions from students, researchers, 
                and industry professionals. Join our community of writers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="https://medium.com/bsa-epfl" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Visit Medium
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift"
                >
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 