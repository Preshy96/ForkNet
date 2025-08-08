"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, Eye, Download, ArrowLeft, Zap, Award, Lock } from 'lucide-react'
import Link from "next/link"
import { demoNFTProofs, demoOrders } from "@/lib/demo-data"

export default function NFTProofsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-[#4A5568]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#1A1D29]">NFT Delivery Proofs</h1>
              <p className="text-[#4A5568]">Blockchain-verified delivery authentication</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-[#00F5A0]/20 to-[#2ED573]/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Shield className="h-12 w-12 text-[#00F5A0]" />
          </div>
          <h2 className="text-4xl font-bold text-[#1A1D29] mb-6">
            Permanent Delivery Verification
          </h2>
          <p className="text-xl text-[#4A5568] max-w-3xl mx-auto leading-relaxed">
            Every delivery on ForkNet is immortalized as an NFT on the Hedera blockchain, 
            providing immutable proof of successful delivery and building trust across the ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#00F5A0]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-[#00F5A0]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Immutable Records</h3>
              <p className="text-[#4A5568]">
                Once minted, delivery proofs cannot be altered or deleted, ensuring permanent verification.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#822DFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-[#822DFF]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Cryptographic Security</h3>
              <p className="text-[#4A5568]">
                Each NFT contains encrypted delivery data secured by Hedera's consensus mechanism.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-[#FF6B35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Collectible Value</h3>
              <p className="text-[#4A5568]">
                Build your delivery history as a unique NFT collection with potential future value.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-12 mb-16 shadow-lg">
          <h3 className="text-3xl font-bold text-[#1A1D29] text-center mb-12">How NFT Proofs Work</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#FF6B35]">1</span>
              </div>
              <h4 className="font-bold text-[#1A1D29] mb-2">Order Placed</h4>
              <p className="text-[#4A5568] text-sm">Customer places order and payment is held in escrow</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00D2FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#00D2FF]">2</span>
              </div>
              <h4 className="font-bold text-[#1A1D29] mb-2">Delivery Completed</h4>
              <p className="text-[#4A5568] text-sm">Driver delivers order with unique verification code</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#2ED573]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#2ED573]">3</span>
              </div>
              <h4 className="font-bold text-[#1A1D29] mb-2">NFT Minted</h4>
              <p className="text-[#4A5568] text-sm">Delivery proof NFT is automatically minted on Hedera</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#822DFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#822DFF]">4</span>
              </div>
              <h4 className="font-bold text-[#1A1D29] mb-2">Permanent Record</h4>
              <p className="text-[#4A5568] text-sm">Immutable proof stored forever on the blockchain</p>
            </div>
          </div>
        </div>

        {/* Sample NFT Proofs */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#1A1D29] text-center mb-12">Sample Delivery Proofs</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {demoNFTProofs.map((proof) => {
              const order = demoOrders.find(o => o.id === proof.orderId)
              return (
                <Card key={proof.id} className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#1A1D29] flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-[#00F5A0]" />
                        NFT Proof #{proof.tokenId}
                      </CardTitle>
                      <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20">
                        Verified
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#4A5568]">Order ID</p>
                        <p className="font-medium text-[#1A1D29]">{proof.orderId}</p>
                      </div>
                      <div>
                        <p className="text-[#4A5568]">Delivery Code</p>
                        <p className="font-medium text-[#1A1D29]">{proof.deliveryCode}</p>
                      </div>
                      <div>
                        <p className="text-[#4A5568]">Restaurant</p>
                        <p className="font-medium text-[#1A1D29]">{order?.restaurantName}</p>
                      </div>
                      <div>
                        <p className="text-[#4A5568]">Timestamp</p>
                        <p className="font-medium text-[#1A1D29]">
                          {new Date(proof.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-[#F8F9FA] p-4 rounded-lg">
                      <p className="text-[#4A5568] text-sm mb-2">Transaction ID</p>
                      <p className="font-mono text-xs text-[#1A1D29] break-all">{proof.transactionId}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-[#00F5A0] hover:bg-[#00E090] text-white">
                        <Eye className="h-4 w-4 mr-2" />
                        View on Explorer
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#822DFF] text-[#822DFF]">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#00F5A0]/10 to-[#2ED573]/10 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-[#1A1D29] mb-6">Start Building Your NFT Collection</h3>
          <p className="text-xl text-[#4A5568] mb-8 max-w-2xl mx-auto">
            Every order you place creates a unique NFT proof. Start your delivery journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer/restaurants">
              <Button size="lg" className="bg-[#00F5A0] hover:bg-[#00E090] text-white px-8">
                Order Now
              </Button>
            </Link>
            <Link href="/customer/profile">
              <Button size="lg" variant="outline" className="border-[#822DFF] text-[#822DFF] hover:bg-[#822DFF] hover:text-white px-8">
                View My Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
