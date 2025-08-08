"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, Award, Wallet, Edit, Save, X } from 'lucide-react'
import { demoUser, demoOrders, demoNFTProofs } from "@/lib/demo-data"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: demoUser.name,
    email: demoUser.email,
    phone: demoUser.phone,
    address: demoUser.address
  })

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to the backend
  }

  const handleCancel = () => {
    setFormData({
      name: demoUser.name,
      email: demoUser.email,
      phone: demoUser.phone,
      address: demoUser.address
    })
    setIsEditing(false)
  }

  const totalSpent = demoOrders.reduce((sum, order) => sum + order.total, 0)
  const completedOrders = demoOrders.filter(order => order.status === 'delivered').length

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1D29] mb-2">Profile</h1>
          <p className="text-[#4A5568]">Manage your account information and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#1A1D29]">Personal Information</CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="border-[#822DFF] text-[#822DFF] hover:bg-[#822DFF] hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="border-gray-200"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-[#2ED573] hover:bg-[#26C165] text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={demoUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#822DFF] text-white text-xl">
                      {demoUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1D29]">{demoUser.name}</h3>
                    <p className="text-[#4A5568]">Customer since {new Date(demoUser.joinedDate).getFullYear()}</p>
                    <Badge className="mt-2 bg-[#822DFF]/10 text-[#822DFF] border-[#822DFF]/20">
                      Verified Account
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1A1D29]">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2">
                        <User className="h-4 w-4 text-[#718096]" />
                        <span className="text-[#1A1D29]">{formData.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1A1D29]">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2">
                        <Mail className="h-4 w-4 text-[#718096]" />
                        <span className="text-[#1A1D29]">{formData.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#1A1D29]">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2">
                        <Phone className="h-4 w-4 text-[#718096]" />
                        <span className="text-[#1A1D29]">{formData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joined" className="text-[#1A1D29]">Member Since</Label>
                    <div className="flex items-center space-x-2 p-2">
                      <Calendar className="h-4 w-4 text-[#718096]" />
                      <span className="text-[#1A1D29]">
                        {new Date(demoUser.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#1A1D29]">Default Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2">
                      <MapPin className="h-4 w-4 text-[#718096]" />
                      <span className="text-[#1A1D29]">{formData.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order History Summary */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Order Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#822DFF] mb-2">{demoUser.totalOrders}</div>
                    <p className="text-[#4A5568]">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#2ED573] mb-2">{completedOrders}</div>
                    <p className="text-[#4A5568]">Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF6B35] mb-2">${totalSpent.toFixed(0)}</div>
                    <p className="text-[#4A5568]">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* HBAR Wallet */}
            <Card className="bg-gradient-to-br from-[#822DFF]/5 to-[#00D2FF]/5 border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#1A1D29]">HBAR Wallet</h3>
                  <Wallet className="h-5 w-5 text-[#822DFF]" />
                </div>
                <div className="text-3xl font-bold text-[#1A1D29] mb-2">
                  {demoUser.hbarBalance.toFixed(2)} HBAR
                </div>
                <p className="text-[#4A5568] text-sm mb-4">
                  ≈ ${(demoUser.hbarBalance * 0.30).toFixed(2)} USD
                </p>
                <Button size="sm" className="w-full bg-[#822DFF] hover:bg-[#6B21A8] text-white">
                  Manage Wallet
                </Button>
              </CardContent>
            </Card>

            {/* NFT Collection */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29] flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  NFT Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-[#00F5A0] mb-1">
                    {demoNFTProofs.length}
                  </div>
                  <p className="text-[#4A5568] text-sm">Delivery Proof NFTs</p>
                </div>
                <div className="space-y-2">
                  {demoNFTProofs.slice(0, 2).map((nft) => (
                    <div key={nft.id} className="flex items-center justify-between p-2 bg-[#F8F9FA] rounded">
                      <span className="text-sm text-[#1A1D29]">#{nft.tokenId}</span>
                      <Badge className="bg-[#00F5A0]/10 text-[#00F5A0] border-[#00F5A0]/20 text-xs">
                        Verified
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 border-[#00F5A0] text-[#00F5A0] hover:bg-[#00F5A0] hover:text-white">
                  View Collection
                </Button>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1A1D29]">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-200">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-200">
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-200">
                  Notification Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
