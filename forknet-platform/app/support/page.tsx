"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, MessageCircle, Phone, Mail, Clock, Search, ArrowRight } from 'lucide-react'
import Link from "next/link"

const faqItems = [
  {
    question: "How do I connect my Hedera wallet?",
    answer: "You can connect your wallet by clicking the 'Connect Wallet' button and selecting from HashPack, Blade, MetaMask, or WalletConnect options.",
    category: "Wallet"
  },
  {
    question: "What are NFT delivery proofs?",
    answer: "NFT delivery proofs are blockchain-verified certificates that confirm your order was successfully delivered, stored permanently on Hedera.",
    category: "Web3"
  },
  {
    question: "How does the escrow payment system work?",
    answer: "Your payment is held in a smart contract until delivery is confirmed with a unique code, ensuring both customer and restaurant protection.",
    category: "Payments"
  },
  {
    question: "Can I use ForkNet without a crypto wallet?",
    answer: "Yes! You can use our demo mode or traditional payment methods. Wallet connection is optional for enhanced Web3 features.",
    category: "General"
  }
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#822DFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-[#1A1D29] font-bold text-xl">ForkNet</span>
            </Link>
            <Link href="/customer/dashboard">
              <Button variant="outline" className="border-[#822DFF] text-[#822DFF] hover:bg-[#822DFF] hover:text-white">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A1D29] mb-4">How can we help you?</h1>
          <p className="text-xl text-[#4A5568] max-w-2xl mx-auto">
            Get support for ForkNet, the Web3 food delivery platform powered by Hedera Hashgraph
          </p>
        </div>

        {/* Search */}
        <Card className="bg-white border-0 shadow-sm mb-12">
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#718096]" />
              <Input
                placeholder="Search for help articles, guides, or common issues..."
                className="pl-10 h-12 border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#822DFF] hover:bg-[#6B21A8] text-white">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#00D2FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-[#00D2FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-2">Live Chat</h3>
              <p className="text-[#4A5568] mb-4">
                Get instant help from our support team
              </p>
              <Badge className="mb-4 bg-[#2ED573]/10 text-[#2ED573] border-[#2ED573]/20">
                Available 24/7
              </Badge>
              <Button className="w-full bg-[#00D2FF] hover:bg-[#00B8E6] text-white">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-[#FF6B35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-2">Phone Support</h3>
              <p className="text-[#4A5568] mb-4">
                Speak directly with our support specialists
              </p>
              <Badge className="mb-4 bg-[#FFA726]/10 text-[#FFA726] border-[#FFA726]/20">
                Mon-Fri 9AM-6PM
              </Badge>
              <Button variant="outline" className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white">
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#822DFF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-[#822DFF]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-2">Email Support</h3>
              <p className="text-[#4A5568] mb-4">
                Send us a detailed message about your issue
              </p>
              <Badge className="mb-4 bg-[#718096]/10 text-[#718096] border-[#718096]/20">
                Response in 24h
              </Badge>
              <Button variant="outline" className="w-full border-[#822DFF] text-[#822DFF] hover:bg-[#822DFF] hover:text-white">
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1A1D29] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-[#1A1D29] text-lg pr-4">{item.question}</h3>
                    <Badge variant="outline" className="text-[#822DFF] border-[#822DFF] text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-[#4A5568] mb-4">{item.answer}</p>
                  <Button variant="ghost" size="sm" className="text-[#822DFF] hover:text-[#6B21A8] p-0">
                    Learn more <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card className="bg-white border-0 shadow-sm max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-[#1A1D29] text-center">Still need help?</CardTitle>
            <p className="text-[#4A5568] text-center">Send us a message and we'll get back to you soon</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1A1D29]">Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1A1D29]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#1A1D29]">Category</Label>
              <select 
                id="category"
                className="w-full p-3 border border-gray-200 rounded-md text-[#1A1D29] focus:border-[#822DFF] focus:ring-1 focus:ring-[#822DFF]"
              >
                <option>Select a category</option>
                <option>Account Issues</option>
                <option>Payment Problems</option>
                <option>Wallet Connection</option>
                <option>Order Issues</option>
                <option>Technical Support</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#1A1D29]">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question in detail..."
                rows={5}
                className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
              />
            </div>

            <Button className="w-full bg-[#822DFF] hover:bg-[#6B21A8] text-white">
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-[#1A1D29] mb-6">Additional Resources</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/support/help-center">
              <Button variant="outline" className="border-gray-200">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help Center
              </Button>
            </Link>
            <Link href="/web3/smart-contracts">
              <Button variant="outline" className="border-gray-200">
                Smart Contracts Guide
              </Button>
            </Link>
            <Link href="/web3/nft-proofs">
              <Button variant="outline" className="border-gray-200">
                NFT Proofs Explained
              </Button>
            </Link>
            <Link href="/support/safety">
              <Button variant="outline" className="border-gray-200">
                Safety Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
