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
            console.log('Element animated:', entry.target)
          } else {
            // Remove animate class when element goes out of view to allow re-animation
            entry.target.classList.remove('animate')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const observeElements = () => {
      const scrollTriggers = document.querySelectorAll('.scroll-trigger')
      console.log('Found scroll triggers:', scrollTriggers.length)
      scrollTriggers.forEach((el) => observer.observe(el))
    }

    // Initial observation
    observeElements()

    // Re-observe when articles change (for dynamic content)
    const timeoutId = setTimeout(observeElements, 100)

    return () => {
      clearTimeout(timeoutId)
      const scrollTriggers = document.querySelectorAll('.scroll-trigger')
      scrollTriggers.forEach((el) => observer.unobserve(el))
    }
  }, [articles]) // Re-add articles dependency to re-run when articles change

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
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <BookOpen size={16} />
              <span>Articles</span>
            </div>
            <h1 className="scroll-trigger text-4xl md:text-6xl font-bold mb-8 text-white">
              Latest
              <span className="gradient-text block">Insights</span>
            </h1>
            <p className="scroll-trigger text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Explore our latest articles on blockchain technology, DeFi, NFTs, and the future of Web3
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="scroll-trigger text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Browse
                <span className="gradient-text block">Articles</span>
              </h2>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="scroll-trigger mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                  />
                </div>
                
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="border-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1] hover:text-white"
                  >
                    {showAllCategories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    Categories
                  </Button>
                  
                  {showAllCategories && (
                    <div className="absolute top-full left-0 mt-2 bg-[#1a1a1a] border border-[#6366f1]/20 rounded-lg p-4 z-10 min-w-[200px]">
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id)
                              setShowAllCategories(false)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === category.id
                                ? 'bg-[#6366f1] text-white'
                                : 'text-gray-300 hover:bg-[#6366f1]/10'
                            }`}
                          >
                            {category.name} ({category.count})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="scroll-trigger flex flex-wrap gap-2 justify-center mb-8">
              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#6366f1] text-white'
                      : 'bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20 hover:bg-[#6366f1]/20'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
              {hasMoreCategories && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20 hover:bg-[#6366f1]/20"
                >
                  {showAllCategories ? 'Show Less' : `+${categories.length - 6} More`}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
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
            ) : displayArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#6366f1]/20 max-w-md mx-auto">
                  <p className="text-gray-300 mb-4">No articles found matching your criteria.</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                    className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayArticles.map((article, idx) => (
                  <div 
                    key={article.title} 
                    className="scroll-trigger glass rounded-2xl overflow-hidden border border-[#6366f1]/20 hover-lift"
                    style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                  >
                    {/* Article Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      {article.thumbnail ? (
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#6366f1]/20 to-[#7c3aed]/20 flex items-center justify-center">
                          <BookOpen size={48} className="text-[#6366f1]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar size={16} />
                          {new Date(article.pubDate).toLocaleDateString()}
                        </div>
                        {article.categories && article.categories.length > 0 && (
                          <span className="px-3 py-1 bg-[#6366f1]/10 text-[#6366f1] text-sm rounded-full border border-[#6366f1]/20">
                            {article.categories[0]}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">{article.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">{article.contentSnippet}</p>
                      
                      {article.categories && article.categories.length > 1 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.categories.slice(1).map((category: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-[#6366f1]/5 text-[#6366f1] text-xs rounded border border-[#6366f1]/10">
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Button 
                        asChild
                        className="w-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                      >
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          Read Article
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-trigger glass rounded-2xl p-12 border border-[#6366f1]/20">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Stay
                <span className="gradient-text block">Informed</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Never miss our latest insights and updates. Follow us on social media 
                and subscribe to our newsletter for the most recent blockchain content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift"
                >
                  <a href="https://medium.com/bsa-epfl" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Visit Our Blog
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