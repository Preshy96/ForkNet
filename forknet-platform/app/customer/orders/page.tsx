"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Clock, MapPin, Star, Truck, Package, CheckCircle, XCircle } from 'lucide-react'
import Link from "next/link"
import { demoOrders, demoUser } from "@/lib/demo-data"

const statusColors = {
  pending: "bg-[#FFA726]/10 text-[#FFA726] border-[#FFA726]/20",
  preparing: "bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20",
  on_the_way: "bg-[#00D2FF]/10 text-[#00D2FF] border-[#00D2FF]/20",
  delivered: "bg-[#2ED573]/10 text-[#2ED573] border-[#2ED573]/20",
  cancelled: "bg-[#FF4757]/10 text-[#FF4757] border-[#FF4757]/20"
}

const statusIcons = {
  pending: Clock,
  preparing: Package,
  on_the_way: Truck,
  delivered: CheckCircle,
  cancelled: XCircle
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders] = useState(demoOrders)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1D29] mb-2">Your Orders</h1>
          <p className="text-[#4A5568]">Track your current and past orders</p>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#718096]" />
                <Input
                  placeholder="Search orders by restaurant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-md text-[#1A1D29] focus:border-[#822DFF] focus:ring-1 focus:ring-[#822DFF]"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="on_the_way">On the Way</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
            return (
              <Link key={order.id} href={`/customer/orders/${order.id}`}>
                <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-[#F8F9FA] rounded-lg flex items-center justify-center">
                          <StatusIcon className="h-8 w-8 text-[#4A5568]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1A1D29] text-lg">{order.restaurantName}</h3>
                          <p className="text-[#4A5568] mb-2">
                            {order.items.length} items • ${order.total.toFixed(2)}
                          </p>
                          <p className="text-[#718096] text-sm">
                            {new Date(order.createdAt).toLocaleDateString()} at{' '}
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-[#4A5568]">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {order.deliveryAddress.split(',')[0]}
                        </div>
                        {order.estimatedDelivery && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {order.estimatedDelivery}
                          </div>
                        )}
                      </div>
                      {order.nftProofId && (
                        <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20">
                          NFT Verified
                        </Badge>
                      )}
                    </div>

                    {/* Order Items Preview */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 bg-[#822DFF]/10 rounded-full border-2 border-white flex items-center justify-center"
                            >
                              <span className="text-xs font-medium text-[#822DFF]">
                                {item.name.charAt(0)}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-8 h-8 bg-[#F8F9FA] rounded-full border-2 border-white flex items-center justify-center">
                              <span className="text-xs font-medium text-[#4A5568]">
                                +{order.items.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-[#822DFF]">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-12 w-12 text-[#718096]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1D29] mb-2">No orders found</h3>
            <p className="text-[#4A5568] mb-4">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your search or filters."
                : "You haven't placed any orders yet."
              }
            </p>
            <Link href="/customer/restaurants">
              <Button className="bg-[#822DFF] hover:bg-[#6B21A8] text-white">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
