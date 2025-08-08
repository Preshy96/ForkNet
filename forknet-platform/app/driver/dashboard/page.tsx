"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Truck, DollarSign, Clock, MapPin, Navigation, Star } from 'lucide-react'
import Link from "next/link"

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [availableOrders] = useState([
    {
      id: "order_003",
      restaurantName: "Pizza Protocol",
      customerName: "Mike Chen",
      distance: "1.2 miles",
      earnings: 8.50,
      pickupTime: "5 mins",
      deliveryTime: "15 mins"
    },
    {
      id: "order_004",
      restaurantName: "Noodle Nirvana", 
      customerName: "Emma Davis",
      distance: "0.8 miles",
      earnings: 6.75,
      pickupTime: "3 mins",
      deliveryTime: "12 mins"
    }
  ])

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#822DFF] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-[#1A1D29] font-bold text-xl">ForkNet</span>
              </Link>
              <Badge className="bg-[#00D2FF]/10 text-[#00D2FF] border-[#00D2FF]/20">
                Driver App
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-[#4A5568]">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-[#00D2FF] text-white">MC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1A1D29] mb-2">Driver Dashboard</h1>
              <p className="text-[#4A5568]">Welcome back, Mike Chen!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-[#2ED573]' : 'bg-[#FF4757]'}`}></div>
                <span className="text-[#1A1D29] font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <Button
                onClick={() => setIsOnline(!isOnline)}
                className={isOnline 
                  ? 'bg-[#FF4757] hover:bg-[#E63946] text-white'
                  : 'bg-[#2ED573] hover:bg-[#26C165] text-white'
                }
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4A5568] text-sm">Today's Earnings</p>
                  <p className="text-2xl font-bold text-[#1A1D29]">$127.50</p>
                </div>
                <div className="w-12 h-12 bg-[#2ED573]/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#2ED573]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4A5568] text-sm">Deliveries Today</p>
                  <p className="text-2xl font-bold text-[#1A1D29]">12</p>
                </div>
                <div className="w-12 h-12 bg-[#00D2FF]/10 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-[#00D2FF]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4A5568] text-sm">Avg. Delivery Time</p>
                  <p className="text-2xl font-bold text-[#1A1D29]">22m</p>
                </div>
                <div className="w-12 h-12 bg-[#FFA726]/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[#FFA726]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4A5568] text-sm">Rating</p>
                  <p className="text-2xl font-bold text-[#1A1D29]">4.9</p>
                </div>
                <div className="w-12 h-12 bg-[#822DFF]/10 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-[#822DFF]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Orders */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#1A1D29]">Available Orders</CardTitle>
                  <Badge className="bg-[#2ED573]/10 text-[#2ED573] border-[#2ED573]/20">
                    {availableOrders.length} Available
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableOrders.map((order) => (
                  <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:border-[#822DFF] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-[#1A1D29]">{order.restaurantName}</h4>
                        <p className="text-sm text-[#4A5568]">Deliver to {order.customerName}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#2ED573]">+${order.earnings}</div>
                        <p className="text-xs text-[#4A5568]">Estimated earnings</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-[#4A5568]">
                        <MapPin className="h-4 w-4 mr-1" />
                        {order.distance}
                      </div>
                      <div className="flex items-center text-[#4A5568]">
                        <Clock className="h-4 w-4 mr-1" />
                        {order.pickupTime} pickup
                      </div>
                      <div className="flex items-center text-[#4A5568]">
                        <Truck className="h-4 w-4 mr-1" />
                        {order.deliveryTime} delivery
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#822DFF] hover:bg-[#6B21A8] text-white"
                      >
                        Accept Order
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-200"
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Driver Info & Actions */}
          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Driver Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-[#00D2FF] text-white">MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-[#1A1D29]">Mike Chen</h3>
                    <p className="text-sm text-[#4A5568]">Honda Civic • ABC123</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#4A5568]">Total Deliveries</span>
                    <span className="text-[#1A1D29] font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A5568]">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[#FFA726] fill-current mr-1" />
                      <span className="text-[#1A1D29] font-medium">4.9</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A5568]">This Week</span>
                    <span className="text-[#1A1D29] font-medium">$892.30</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#2ED573]/5 to-[#00D2FF]/5 border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#1A1D29] mb-2">HBAR Earnings</h3>
                <div className="text-2xl font-bold text-[#1A1D29] mb-1">
                  298.75 HBAR
                </div>
                <p className="text-[#4A5568] text-sm mb-4">
                  ≈ $89.63 USD
                </p>
                <Button size="sm" className="w-full bg-[#2ED573] hover:bg-[#26C165] text-white">
                  Withdraw Earnings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/driver/earnings">
                  <Button variant="outline" className="w-full justify-start border-gray-200">
                    <DollarSign className="h-4 w-4 mr-2" />
                    View Earnings
                  </Button>
                </Link>
                <Link href="/driver/active-orders">
                  <Button variant="outline" className="w-full justify-start border-gray-200">
                    <Truck className="h-4 w-4 mr-2" />
                    Active Deliveries
                  </Button>
                </Link>
                <Link href="/driver/profile">
                  <Button variant="outline" className="w-full justify-start border-gray-200">
                    <Star className="h-4 w-4 mr-2" />
                    Driver Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
