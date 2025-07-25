import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import * as cheerio from 'cheerio'

export async function GET() {
  try {
    const parser = new Parser()
    const feed = await parser.parseURL('https://medium.com/feed/bsa-epfl')
    
    // Transform the feed items to match our component's expected format
    const articles = feed.items?.slice(0, 6).map((item) => {
      let thumbnail = null
      let categories: string[] = []
      
      // Extract categories from RSS feed
      if (item.categories && Array.isArray(item.categories)) {
        categories = item.categories
      }
      
      // Extract thumbnail from content:encoded if available
      if (item['content:encoded']) {
        try {
          const $ = cheerio.load(item['content:encoded'])
          
          // Look for the first image in the content
          const firstImg = $('img').first()
          if (firstImg.length > 0) {
            const imgSrc = firstImg.attr('src')
            if (imgSrc && imgSrc.includes('cdn-images-1.medium.com')) {
              thumbnail = imgSrc
            }
          }
          
          // If no image found in content, try to extract from figure tags
          if (!thumbnail) {
            const figureImg = $('figure img').first()
            if (figureImg.length > 0) {
              const imgSrc = figureImg.attr('src')
              if (imgSrc && imgSrc.includes('cdn-images-1.medium.com')) {
                thumbnail = imgSrc
              }
            }
          }
        } catch (error) {
          console.error('Error parsing content for thumbnail:', error)
        }
      }
      
      // Create contentSnippet from content if not available
      let contentSnippet = item.contentSnippet
      if (!contentSnippet && item['content:encoded']) {
        try {
          const $ = cheerio.load(item['content:encoded'])
          contentSnippet = $.text().substring(0, 200) + '...'
        } catch (error) {
          console.error('Error extracting content snippet:', error)
          contentSnippet = "Read our latest insights on blockchain technology and Web3 development."
        }
      }
      
      return {
        title: item.title || "BSA Article",
        link: item.link || "https://medium.com/bsa-epfl",
        pubDate: item.pubDate || new Date().toISOString(),
        contentSnippet: contentSnippet || "Read our latest insights on blockchain technology and Web3 development.",
        thumbnail: thumbnail,
        categories: categories
      }
    }) || []

    console.log('Processed articles:', articles) // Debug log
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching Medium RSS feed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
} 