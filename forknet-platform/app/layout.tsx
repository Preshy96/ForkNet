import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { WalletProvider } from "@/contexts/wallet-context"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "ForkNet - Web3 Food Delivery Platform",
  description: "Experience the future of food delivery with NFT delivery proofs, smart contract escrow, and blockchain-verified reputation systems on Hedera Hashgraph.",
  keywords: "Web3, food delivery, blockchain, NFT, Hedera, smart contracts, decentralized",
  authors: [{ name: "ForkNet Team" }],
  creator: "ForkNet",
  publisher: "ForkNet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://forknet.app'),
  openGraph: {
    title: "ForkNet - Web3 Food Delivery Platform",
    description: "Experience the future of food delivery with blockchain technology",
    url: 'https://forknet.app',
    siteName: 'ForkNet',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ForkNet - Web3 Food Delivery Platform",
    description: "Experience the future of food delivery with blockchain technology",
    creator: '@forknet',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider>
            {children}
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
