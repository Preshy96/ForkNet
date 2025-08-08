"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MapPin, CreditCard, Wallet, Clock, Shield, ArrowLeft, Plus } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const orderItems = [
    { name: "Satoshi Special Burger", price: 12.99, quantity: 1 },
    { name: "Ethereum Fries", price: 6.99, quantity: 1 },
    { name: "Hodl Shake", price: 5.99, quantity: 1 }
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 2.99
  const tax = subtotal * 0.0875
  const total = subtotal + deliveryFee + tax

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      router.push('/customer/order-confirmation')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/customer/restaurant/rest_001" className="text-[#4A5568] hover:text-[#1A1D29]">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-[#1A1D29]">Checkout</h1>
                <p className="text-[#4A5568] text-sm">Complete your order</p>
              </div>
            </div>
            <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20">
              <Shield className="h-4 w-4 mr-1" />
              Secure Checkout
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29] flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-[#F8F9FA] rounded-lg border-2 border-[#822DFF]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#1A1D29]">Home</p>
                      <p className="text-[#4A5568]">123 Main St, San Francisco, CA 94105</p>
                      <p className="text-[#718096] text-sm">Apartment 4B</p>
                    </div>
                    <Badge className="bg-[#822DFF]/10 text-[#822DFF] border-[#822DFF]/20">
                      Selected
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-gray-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Time */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29] flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Delivery Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="asap" className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="asap" id="asap" />
                    <Label htmlFor="asap" className="flex-1 cursor-pointer">
                      <div className="font-medium text-[#1A1D29]">ASAP (25-35 mins)</div>
                      <div className="text-[#4A5568] text-sm">Get your order as soon as possible</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled" className="flex-1 cursor-pointer">
                      <div className="font-medium text-[#1A1D29]">Schedule for later</div>
                      <div className="text-[#4A5568] text-sm">Choose a specific delivery time</div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29] flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[#1A1D29]">Credit/Debit Card</div>
                          <div className="text-[#4A5568] text-sm">Visa, Mastercard, American Express</div>
                        </div>
                        <CreditCard className="h-5 w-5 text-[#4A5568]" />
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="hbar" id="hbar" />
                    <Label htmlFor="hbar" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[#1A1D29]">HBAR Wallet</div>
                          <div className="text-[#4A5568] text-sm">Pay with Hedera HBAR cryptocurrency</div>
                        </div>
                        <div className="flex items-center">
                          <Wallet className="h-5 w-5 text-[#822DFF] mr-2" />
                          <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20 text-xs">
                            Web3
                          </Badge>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-[#1A1D29]">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-[#1A1D29]">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-[#1A1D29]">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName" className="text-[#1A1D29]">Name on Card</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "hbar" && (
                  <div className="p-4 bg-gradient-to-r from-[#822DFF]/5 to-[#00D2FF]/5 rounded-lg border border-[#822DFF]/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-[#1A1D29]">Connected Wallet</span>
                      <Badge className="bg-[#2ED573]/10 text-[#2ED573] border-[#2ED573]/20">
                        Connected
                      </Badge>
                    </div>
                    <p className="text-[#4A5568] text-sm mb-3">HashPack Wallet (0.0.123456)</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4A5568]">Balance:</span>
                      <span className="font-bold text-[#1A1D29]">157.50 HBAR</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-[#1A1D29] text-sm">{item.name}</p>
                        <p className="text-[#4A5568] text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-[#1A1D29]">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-[#4A5568]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#4A5568]">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#4A5568]">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center font-bold text-lg">
                  <span className="text-[#1A1D29]">Total</span>
                  <div className="text-right">
                    <div className="text-[#1A1D29]">${total.toFixed(2)}</div>
                    {paymentMethod === "hbar" && (
                      <div className="text-[#822DFF] text-sm">≈ {(total * 3.33).toFixed(2)} HBAR</div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full h-12 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] hover:from-[#E55A2B] hover:to-[#D14A1F] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
                </Button>

                {paymentMethod === "hbar" && (
                  <div className="p-3 bg-[#00F5A0]/5 rounded-lg border border-[#00F5A0]/20">
                    <div className="flex items-center text-[#00F5A0] text-sm">
                      <Shield className="h-4 w-4 mr-2" />
                      <span>Payment secured by smart contract escrow</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-gradient-to-r from-[#1A1D29] to-[#2A2D39] text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 mr-2 text-[#00F5A0]" />
                  <span className="font-semibold">Secure Checkout</span>
                </div>
                <p className="text-white/80 text-sm">
                  Your payment is protected by enterprise-grade encryption and blockchain security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
