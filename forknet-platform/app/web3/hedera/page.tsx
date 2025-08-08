"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Zap, Shield, Leaf, DollarSign, Clock, Users } from 'lucide-react'
import Link from "next/link"

export default function HederaNetworkPage() {
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#822DFF]/10 text-[#822DFF] border-[#822DFF]/20">
            Powered by Hedera Hashgraph
          </Badge>
          <h1 className="text-4xl font-bold text-[#1A1D29] mb-4">
            Built on the Hedera Network
          </h1>
          <p className="text-xl text-[#4A5568] max-w-3xl mx-auto">
            ForkNet leverages Hedera Hashgraph's enterprise-grade distributed ledger technology 
            to provide fast, secure, and sustainable Web3 food delivery experiences.
          </p>
        </div>

        {/* Why Hedera */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1D29] mb-8 text-center">Why Hedera Hashgraph?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#2ED573]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-[#2ED573]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Lightning Fast</h3>
                <p className="text-[#4A5568] mb-4">
                  Transactions finalize in 3-5 seconds with 10,000+ TPS throughput, 
                  ensuring instant order confirmations and payments.
                </p>
                <Badge className="bg-[#2ED573]/10 text-[#2ED573] border-[#2ED573]/20">
                  3-5 Second Finality
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#00D2FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="h-8 w-8 text-[#00D2FF]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Ultra Low Fees</h3>
                <p className="text-[#4A5568] mb-4">
                  Predictable fees as low as $0.0001 per transaction, 
                  making micropayments and frequent transactions economical.
                </p>
                <Badge className="bg-[#00D2FF]/10 text-[#00D2FF] border-[#00D2FF]/20">
                  $0.0001 Per TX
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#00F5A0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-[#00F5A0]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Carbon Negative</h3>
                <p className="text-[#4A5568] mb-4">
                  The most sustainable public ledger, using 0.00017kWh per transaction 
                  compared to Bitcoin's 700kWh.
                </p>
                <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20">
                  Carbon Negative
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1D29] mb-8 text-center">Technical Advantages</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29] flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-[#822DFF]" />
                  Enterprise Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#822DFF] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-[#1A1D29]">Asynchronous Byzantine Fault Tolerance</h4>
                    <p className="text-[#4A5568] text-sm">Mathematically proven security against malicious actors</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#822DFF] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-[#1A1D29]">Hashgraph Consensus</h4>
                    <p className="text-[#4A5568] text-sm">Fair ordering and timestamping of all transactions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#822DFF] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-[#1A1D29]">Bank-Grade Governance</h4>
                    <p className="text-[#4A5568] text-sm">Governed by global enterprises including Google, IBM, Boeing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29] flex items-center">
                  <Clock className="h-6 w-6 mr-2 text-[#00D2FF]" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Transaction Throughput</span>
                  <Badge className="bg-[#2ED573]/10 text-[#2ED573] border-[#2ED573]/20">
                    10,000+ TPS
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Finality Time</span>
                  <Badge className="bg-[#00D2FF]/10 text-[#00D2FF] border-[#00D2FF]/20">
                    3-5 Seconds
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Energy per Transaction</span>
                  <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20">
                    0.00017 kWh
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#4A5568]">Network Uptime</span>
                  <Badge className="bg-[#822DFF]/10 text-[#822DFF] border-[#822DFF]/20">
                    99.99%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ForkNet Integration */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A1D29] mb-8 text-center">How ForkNet Uses Hedera</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-[#822DFF]/5 to-[#00D2FF]/5 border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Smart Contract Services</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#822DFF] rounded-full mt-2"></div>
                    <span className="text-[#4A5568]">Escrow payments for order protection</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#822DFF] rounded-full mt-2"></div>
                    <span className="text-[#4A5568]">Automated driver and restaurant payouts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#822DFF] rounded-full mt-2"></div>
                    <span className="text-[#4A5568]">Reputation system with immutable reviews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#00F5A0]/5 to-[#2ED573]/5 border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Token & NFT Services</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2"></div>
                    <span className="text-[#4A5568]">NFT delivery proof certificates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2"></div>
                    <span className="text-[#4A5568]">HBAR payments and rewards</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2"></div>
                    <span className="text-[#4A5568]">Loyalty tokens and achievements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Network Stats */}
        <Card className="bg-white border-0 shadow-sm mb-16">
          <CardHeader>
            <CardTitle className="text-[#1A1D29] text-center">Hedera Network Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#822DFF] mb-2">39</div>
                <p className="text-[#4A5568]">Governing Council Members</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#2ED573] mb-2">50B+</div>
                <p className="text-[#4A5568]">Total Transactions</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#00D2FF] mb-2">$40B+</div>
                <p className="text-[#4A5568]">Market Cap</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">100+</div>
                <p className="text-[#4A5568]">Countries Served</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learn More */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1A1D29] mb-6">Learn More About Hedera</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-[#822DFF] text-[#822DFF] hover:bg-[#822DFF] hover:text-white"
              asChild
            >
              <a href="https://hedera.com" target="_blank" rel="noopener noreferrer">
                Official Website <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-200"
              asChild
            >
              <a href="https://docs.hedera.com" target="_blank" rel="noopener noreferrer">
                Developer Docs <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-200"
              asChild
            >
              <a href="https://portal.hedera.com" target="_blank" rel="noopener noreferrer">
                Network Explorer <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
