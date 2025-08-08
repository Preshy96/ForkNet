"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MapPin, Phone, Truck, Star, Share2 } from 'lucide-react'
import Link from "next/link"

export default function OrderConfirmationPage() {
  const [orderStatus, setOrderStatus] = useState("confirmed")
  const [estimatedTime, setEstimatedTime] = useState(35)

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1))
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const orderDetails = {
    id: "ORD-2024-001",
    restaurant: "Bitcoin Burger",
    items: [
      { name: "Satoshi Special Burger", price: 12.99, quantity: 1 },
      { name: "Ethereum Fries", price: 6.99, quantity: 1 },
      { name: "Hodl Shake", price: 5.99, quantity: 1 }
    ],
    total: 28.75,
    deliveryAddress: "123 Main St, San Francisco, CA 94105",
    paymentMethod: "HBAR Wallet",
    transactionId: "0.0.123456@1705316100.123456789"
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-[#2ED573] to-[#26C165] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#1A1D29] mb-4">Order Confirmed!</h1>
          <p className="text-xl text-[#4A5568] mb-6">
            Your order has been placed successfully and is being prepared
          </p>
          <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20 px-4 py-2">
            Order #{orderDetails.id}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#2ED573] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1A1D29]">Order Confirmed</h4>
                      <p className="text-[#4A5568] text-sm">Your order has been received and confirmed</p>
                      <p className="text-[#718096] text-xs">Just now</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#FFA726] rounded-full flex items-center justify-center animate-pulse">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1A1D29]">Preparing Your Order</h4>
                      <p className="text-[#4A5568] text-sm">The restaurant is preparing your delicious meal</p>
                      <p className="text-[#718096] text-xs">Estimated: 15-20 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 opacity-50">
                    <div className="w-10 h-10 bg-[#718096] rounded-full flex items-center justify-center">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1A1D29]">Out for Delivery</h4>
                      <p className="text-[#4A5568] text-sm">Your order is on its way to you</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 opacity-50">
                    <div className="w-10 h-10 bg-[#718096] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1A1D29]">Delivered</h4>
                      <p className="text-[#4A5568] text-sm">Enjoy your meal!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-[#822DFF]" />
                    <div>
                      <p className="font-medium text-[#1A1D29]">Estimated Delivery</p>
                      <p className="text-[#4A5568] text-sm">{estimatedTime} minutes</p>
                    </div>
                  </div>
                  <Badge className="bg-[#2ED573]/10 text-[#2ED573] border-[#2ED573]/20">
                    On Time
                  </Badge>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#FF6B35] mt-1" />
                  <div>
                    <p className="font-medium text-[#1A1D29]">Delivery Address</p>
                    <p className="text-[#4A5568]">{orderDetails.deliveryAddress}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#00D2FF]" />
                  <div>
                    <p className="font-medium text-[#1A1D29]">Contact</p>
                    <p className="text-[#4A5568]">We'll call you when the driver arrives</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Restaurant Info */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Restaurant Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🍔</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1A1D29] text-lg">{orderDetails.restaurant}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-[#FFA726] fill-current" />
                      <span className="text-[#1A1D29] font-medium">4.8</span>
                      <span className="text-[#4A5568] text-sm">(1,247 reviews)</span>
                    </div>
                    <p className="text-[#4A5568] text-sm">456 Crypto Ave, San Francisco, CA</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline" className="border-[#822DFF] text-[#822DFF] hover:bg-[#822DFF] hover:text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-200">
                      <Star className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Order Details */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-[#1A1D29] text-sm">{item.name}</p>
                        <p className="text-[#4A5568] text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-[#1A1D29]">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span className="text-[#1A1D29]">Total</span>
                    <span className="text-[#1A1D29]">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#822DFF]/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#4A5568] text-sm">Payment Method</span>
                    <Badge className="bg-[#822DFF]/10 text-[#822DFF] border-[#822DFF]/20">
                      {orderDetails.paymentMethod}
                    </Badge>
                  </div>
                  <p className="text-[#718096] text-xs">Transaction: {orderDetails.transactionId}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <Link href="/customer/orders">
                  <Button className="w-full bg-[#822DFF] hover:bg-[#6B21A8] text-white">
                    Track Order
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-gray-200">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Order
                </Button>
                <Link href="/customer/restaurants">
                  <Button variant="outline" className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white">
                    Order Again
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Web3 Features */}
            <Card className="bg-gradient-to-br from-[#00F5A0]/5 to-[#2ED573]/5 border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#1A1D29] mb-3">Web3 Benefits</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#00F5A0]" />
                    <span className="text-[#4A5568]">Payment secured in smart contract</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#00F5A0]" />
                    <span className="text-[#4A5568]">NFT delivery proof will be minted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#00F5A0]" />
                    <span className="text-[#4A5568]">Blockchain reputation updated</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
