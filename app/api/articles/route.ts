import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import * as cheerio from 'cheerio'

export async function GET() {
  try {
    const parser = new Parser()
    const feed = await parser.parseURL('https://medium.com/feed/bsa-epfl')
    
    // Transform the feed items to match our component's expected format
    const articles = await Promise.all(
      feed.items?.slice(0, 6).map(async (item) => {
        let thumbnail = null
        
        if (item.link) {
          try {
            // Fetch the article HTML
            const response = await fetch(item.link, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; BSA-Website/1.0)'
              }
            })
            
            if (response.ok) {
              const html = await response.text()
              const $ = cheerio.load(html)
              
              // Look for og:image meta tag
              let img = $('meta[property="og:image"]').attr('content')
              if (img) {
                thumbnail = img
              } else {
                // Fallback to twitter:image
                img = $('meta[name="twitter:image"]').attr('content')
                if (img) {
                  thumbnail = img
                }
              }
            }
          } catch (error) {
            console.error('Error fetching article content for', item.title, ':', error)
          }
        }
        
        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          contentSnippet: item.contentSnippet,
          thumbnail: thumbnail
        }
      }) || []
    )

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching Medium RSS feed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
} 