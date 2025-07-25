import type React from "react"
import type { Metadata } from "next"
import { Roboto, Noto_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const roboto = Roboto({
  weight: ['300', '700'],
  subsets: ["latin"],
  variable: "--font-sans",
})

const notoSerif = Noto_Serif({
  weight: ['700'],
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Blockchain Student Association | EPFL",
  description: "The official website of the Blockchain Student Association at EPFL",
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${roboto.variable} ${notoSerif.variable} font-sans antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

