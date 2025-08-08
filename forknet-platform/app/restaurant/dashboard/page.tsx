"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Store, DollarSign, Clock, Users, TrendingUp, Package, CheckCircle } from 'lucide-react'
import Link from "next/link"

export default function RestaurantDashboard() {
  const [activeOrders] = useState([
    {
      id: "order_001",
      customerName: "Alex Johnson",
      items: ["Satoshi Special Burger", "Ethereum Fries"],
      total: 24.77,
      status: "preparing",
      orderTime: "2 mins ago"
    },
    {
      id: "order_002", 
      customerName: "Sarah Kim",
      items: ["Dragon Ramen", "Crypto Pad Thai"],
      total: 36.48,
      status: "ready",
      orderTime: "8 mins ago"
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
              <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
                Restaurant Portal
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-[#4A5568]">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-[#FF6B35] text-white">BB</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1D29] mb-2">Bitcoin Burger Dashboard</h1>
          <p className="text-[#4A5568]">Manage your restaurant orders and menu</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4A5568] text-sm">Today's Revenue</p>
                  <p className="text-2xl font-bold text-[#1A1D29]">$1,247</p>
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
                  <p className="text-[#4A5568] text-sm">Orders Today</p>
                  <p className="text-2xl font-bold text-[#1A1D29]">47</p>
                </div>
                <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-[#FF6B35]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4A5568] text-sm">Avg. Prep Time</p>
                  <p className="text-2xl font-bold text-[#1A1D29]">18m</p>
                </div>
                <div className="w-12 h-12 bg-[#00D2FF]/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[#00D2FF]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4A5568] text-sm">Rating</p>
                  <p className="text-2xl font-bold text-[#1A1D29]">4.8</p>
                </div>
                <div className="w-12 h-12 bg-[#FFA726]/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[#FFA726]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Orders */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#1A1D29]">Active Orders</CardTitle>
                  <Link href="/restaurant/orders">
                    <Button variant="ghost" size="sm" className="text-[#822DFF]">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-[#1A1D29]">{order.customerName}</h4>
                        <p className="text-sm text-[#4A5568]">{order.orderTime}</p>
                      </div>
                      <Badge className={
                        order.status === 'ready' 
                          ? 'bg-[#2ED573]/10 text-[#2ED573] border-[#2ED573]/20'
                          : 'bg-[#FFA726]/10 text-[#FFA726] border-[#FFA726]/20'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm text-[#4A5568]">• {item}</p>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1A1D29]">${order.total.toFixed(2)}</span>
                      <div className="flex space-x-2">
                        {order.status === 'preparing' && (
                          <Button size="sm" className="bg-[#2ED573] hover:bg-[#26C165] text-white">
                            Mark Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button size="sm" className="bg-[#00D2FF] hover:bg-[#00B8E6] text-white">
                            Assign Driver
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/restaurant/menu">
                  <Button className="w-full justify-start bg-[#822DFF] hover:bg-[#6B21A8] text-white">
                    <Store className="h-4 w-4 mr-2" />
                    Manage Menu
                  </Button>
                </Link>
                <Link href="/restaurant/orders">
                  <Button variant="outline" className="w-full justify-start border-gray-200">
                    <Package className="h-4 w-4 mr-2" />
                    View All Orders
                  </Button>
                </Link>
                <Link href="/restaurant/analytics">
                  <Button variant="outline" className="w-full justify-start border-gray-200">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#822DFF]/5 to-[#FF6B35]/5 border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#1A1D29] mb-2">Restaurant Status</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-[#2ED573] rounded-full"></div>
                  <span className="text-[#1A1D29]">Open & Accepting Orders</span>
                </div>
                <Button size="sm" variant="outline" className="w-full border-gray-200">
                  Change Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
