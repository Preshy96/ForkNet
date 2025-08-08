"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Clock, DollarSign, ArrowLeft, CheckCircle, AlertTriangle, Users } from 'lucide-react'
import Link from "next/link"

export default function SmartContractsPage() {
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
              <h1 className="text-3xl font-bold text-[#1A1D29]">Smart Contract Escrow</h1>
              <p className="text-[#4A5568]">Secure payments with automated release</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-[#00D2FF]/20 to-[#0099CC]/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Zap className="h-12 w-12 text-[#00D2FF]" />
          </div>
          <h2 className="text-4xl font-bold text-[#1A1D29] mb-6">
            Trustless Payment Protection
          </h2>
          <p className="text-xl text-[#4A5568] max-w-3xl mx-auto leading-relaxed">
            Our smart contract escrow system automatically holds payments until delivery is confirmed, 
            protecting both customers and restaurants without requiring trust in intermediaries.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#2ED573]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-[#2ED573]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Customer Protection</h3>
              <p className="text-[#4A5568]">
                Your payment is held securely until delivery is confirmed. No delivery, no payment.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-[#FF6B35]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Restaurant Assurance</h3>
              <p className="text-[#4A5568]">
                Guaranteed payment upon successful delivery. No chargebacks or payment disputes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#822DFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-[#822DFF]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D29] mb-4">Instant Settlement</h3>
              <p className="text-[#4A5568]">
                Payments are released automatically upon delivery confirmation. No waiting periods.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-12 mb-16 shadow-lg">
          <h3 className="text-3xl font-bold text-[#1A1D29] text-center mb-12">Smart Contract Flow</h3>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#FF6B35]">1</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1A1D29] mb-2">Order Placement</h4>
                <p className="text-[#4A5568]">
                  Customer places order and payment is automatically locked in the smart contract escrow. 
                  Funds are held securely on the Hedera blockchain.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-[#00D2FF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#00D2FF]">2</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1A1D29] mb-2">Order Preparation</h4>
                <p className="text-[#4A5568]">
                  Restaurant receives order notification and begins preparation. Payment remains in escrow 
                  until delivery is completed and verified.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-[#2ED573]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#2ED573]">3</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1A1D29] mb-2">Delivery Confirmation</h4>
                <p className="text-[#4A5568]">
                  Driver delivers order with unique code. Customer confirms receipt, triggering 
                  automatic payment release from the smart contract.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-[#822DFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#822DFF]">4</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1A1D29] mb-2">Automatic Settlement</h4>
                <p className="text-[#4A5568]">
                  Smart contract automatically distributes payment to restaurant and driver. 
                  NFT delivery proof is minted as permanent record.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-[#2ED573]/5 to-[#00F5A0]/5 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#1A1D29] flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-[#2ED573]" />
                Security Guarantees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-[#2ED573] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1D29]">Immutable Code</p>
                  <p className="text-[#4A5568] text-sm">Smart contracts cannot be altered once deployed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-[#2ED573] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1D29]">Consensus Security</p>
                  <p className="text-[#4A5568] text-sm">Protected by Hedera's consensus mechanism</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-[#2ED573] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1D29]">Automated Execution</p>
                  <p className="text-[#4A5568] text-sm">No human intervention required for payments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FF6B35]/5 to-[#E55A2B]/5 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#1A1D29] flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-[#FF6B35]" />
                Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1D29]">Timeout Protection</p>
                  <p className="text-[#4A5568] text-sm">Automatic refund if delivery isn't confirmed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1D29]">Multi-sig Override</p>
                  <p className="text-[#4A5568] text-sm">Emergency resolution for complex disputes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1D29]">Transparent Process</p>
                  <p className="text-[#4A5568] text-sm">All actions recorded on the blockchain</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-2xl p-12 mb-16 shadow-lg">
          <h3 className="text-3xl font-bold text-[#1A1D29] text-center mb-8">Technical Implementation</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-bold text-[#1A1D29] mb-4">Smart Contract Features</h4>
              <ul className="space-y-3 text-[#4A5568]">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#00D2FF] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Multi-party escrow with automatic release conditions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#00D2FF] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Time-locked refunds for failed deliveries</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#00D2FF] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Gas-efficient execution on Hedera network</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#00D2FF] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Integration with NFT proof minting</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-[#1A1D29] mb-4">Hedera Advantages</h4>
              <ul className="space-y-3 text-[#4A5568]">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#2ED573] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Low transaction fees (under $0.01)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#2ED573] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Fast finality (3-5 seconds)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#2ED573] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Carbon-negative network</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#2ED573] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Enterprise-grade security</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#00D2FF]/10 to-[#822DFF]/10 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-[#1A1D29] mb-6">Experience Secure Payments</h3>
          <p className="text-xl text-[#4A5568] mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our smart contract escrow system for safe, secure food delivery payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer/restaurants">
              <Button size="lg" className="bg-[#00D2FF] hover:bg-[#00B8E6] text-white px-8">
                Place Your First Order
              </Button>
            </Link>
            <Link href="/restaurant/dashboard">
              <Button size="lg" variant="outline" className="border-[#822DFF] text-[#822DFF] hover:bg-[#822DFF] hover:text-white px-8">
                Join as Restaurant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
