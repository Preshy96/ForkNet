"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Star, TrendingUp, Shield, ArrowLeft, Users, CheckCircle, Trophy } from 'lucide-react'
import Link from "next/link"

export default function ReputationPage() {
  const reputationTiers = [
    {
      name: "Bronze",
      minScore: 0,
      maxScore: 100,
      color: "#CD7F32",
      benefits: ["Basic platform access", "Standard support", "Order history tracking"]
    },
    {
      name: "Silver", 
      minScore: 101,
      maxScore: 250,
      color: "#C0C0C0",
      benefits: ["Priority support", "Exclusive promotions", "Enhanced profile visibility"]
    },
    {
      name: "Gold",
      minScore: 251,
      maxScore: 500,
      color: "#FFD700",
      benefits: ["Premium support", "Early feature access", "Reduced fees", "VIP status"]
    },
    {
      name: "Platinum",
      minScore: 501,
      maxScore: 1000,
      color: "#E5E4E2",
      benefits: ["Dedicated account manager", "Custom features", "Zero fees", "Beta testing access"]
    }
  ]

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
              <h1 className="text-3xl font-bold text-[#1A1D29]">Blockchain Reputation</h1>
              <p className="text-[#4A5568]">Immutable trust system for all participants</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-[#822DFF]/20 to-[#6B21A8]/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Award className="h-12 w-12 text-[#822DFF]" />
          </div>
          <h2 className="text-4xl font-bold text-[#1A1D29] mb-6">
            Immutable Trust Network
          </h2>
          <p className="text-xl text-[#4A5568] max-w-3xl mx-auto leading-relaxed">
            Our blockchain-based reputation system creates permanent, tamper-proof records of all interactions, 
            building genuine trust between customers, restaurants, and drivers.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#2ED573]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-[#2ED573]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Tamper-Proof Records</h3>
              <p className="text-[#4A5568]">
                All ratings and reviews are permanently stored on the blockchain, preventing manipulation or deletion.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-[#FF6B35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Dynamic Scoring</h3>
              <p className="text-[#4A5568]">
                Reputation scores update in real-time based on verified interactions and delivery confirmations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#822DFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-[#822DFF]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Multi-Party Validation</h3>
              <p className="text-[#4A5568]">
                Reputation is built through verified interactions between customers, restaurants, and drivers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reputation Tiers */}
        <div className="bg-white rounded-2xl p-12 mb-16 shadow-lg">
          <h3 className="text-3xl font-bold text-[#1A1D29] text-center mb-12">Reputation Tiers</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reputationTiers.map((tier, index) => (
              <Card key={tier.name} className="border-2 hover:shadow-lg transition-shadow" style={{ borderColor: tier.color + '40' }}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: tier.color + '20' }}>
                    <Trophy className="h-8 w-8" style={{ color: tier.color }} />
                  </div>
                  <CardTitle className="text-xl" style={{ color: tier.color }}>{tier.name}</CardTitle>
                  <p className="text-[#4A5568] text-sm">
                    {tier.minScore} - {tier.maxScore === 1000 ? '1000+' : tier.maxScore} points
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-[#2ED573] mt-0.5 flex-shrink-0" />
                        <span className="text-[#4A5568]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How Reputation Works */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold text-[#1A1D29] mb-8">How It Works</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF6B35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#FF6B35]">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1D29] mb-2">Verified Interactions</h4>
                  <p className="text-[#4A5568]">
                    Every completed order creates verified interaction data stored on the blockchain.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#00D2FF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#00D2FF]">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1D29] mb-2">Multi-Factor Scoring</h4>
                  <p className="text-[#4A5568]">
                    Reputation considers delivery time, order accuracy, customer satisfaction, and more.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2ED573]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#2ED573]">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1D29] mb-2">Immutable Records</h4>
                  <p className="text-[#4A5568]">
                    All reputation data is permanently stored and cannot be manipulated or deleted.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#822DFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#822DFF]">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1D29] mb-2">Tier Advancement</h4>
                  <p className="text-[#4A5568]">
                    Users automatically advance through tiers, unlocking new benefits and privileges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#1A1D29] mb-8">Scoring Factors</h3>
            
            <div className="space-y-4">
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1A1D29]">Order Completion Rate</span>
                  <span className="text-[#822DFF] font-bold">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#822DFF] h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1A1D29]">Customer Ratings</span>
                  <span className="text-[#FF6B35] font-bold">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#FF6B35] h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1A1D29]">Delivery Time</span>
                  <span className="text-[#00D2FF] font-bold">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#00D2FF] h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1A1D29]">Platform Activity</span>
                  <span className="text-[#2ED573] font-bold">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#2ED573] h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Overview */}
        <div className="bg-gradient-to-r from-[#822DFF]/5 to-[#FF6B35]/5 rounded-2xl p-12 mb-16">
          <h3 className="text-3xl font-bold text-[#1A1D29] text-center mb-8">Why Reputation Matters</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2ED573]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#2ED573]" />
              </div>
              <h4 className="font-bold text-[#1A1D29] mb-2">For Customers</h4>
              <p className="text-[#4A5568]">Find trusted restaurants and reliable drivers with verified track records.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-[#FF6B35]" />
              </div>
              <h4 className="font-bold text-[#1A1D29] mb-2">For Restaurants</h4>
              <p className="text-[#4A5568]">Build credibility and attract more customers through consistent quality service.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#00D2FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-[#00D2FF]" />
              </div>
              <h4 className="font-bold text-[#1A1D29] mb-2">For Drivers</h4>
              <p className="text-[#4A5568]">Earn higher ratings and unlock premium delivery opportunities.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#822DFF]/10 to-[#6B21A8]/10 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-[#1A1D29] mb-6">Start Building Your Reputation</h3>
          <p className="text-xl text-[#4A5568] mb-8 max-w-2xl mx-auto">
            Every interaction on ForkNet contributes to your permanent reputation score. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer/restaurants">
              <Button size="lg" className="bg-[#822DFF] hover:bg-[#6B21A8] text-white px-8">
                Start Ordering
              </Button>
            </Link>
            <Link href="/restaurant/dashboard">
              <Button size="lg" variant="outline" className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white px-8">
                Join as Restaurant
              </Button>
            </Link>
            <Link href="/driver/dashboard">
              <Button size="lg" variant="outline" className="border-[#00D2FF] text-[#00D2FF] hover:bg-[#00D2FF] hover:text-white px-8">
                Become a Driver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
