'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { useWallet } from "@/contexts/wallet-context"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import { Search, MapPin, Clock, Star, ShoppingCart, User, Bell, Filter, Heart, Zap, Award, TrendingUp, Gift } from 'lucide-react'

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: "Burger Palace",
    image: "/burger-restaurant.png",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "0.5 HBAR",
    cuisine: "American",
    distance: "0.8 km",
    isPartner: true,
    discount: "20% OFF"
  },
  {
    id: 2,
    name: "Noodle House",
    image: "/asian-noodle-restaurant.png",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: "0.3 HBAR",
    cuisine: "Asian",
    distance: "1.2 km",
    isPartner: true,
    discount: null
  },
  {
    id: 3,
    name: "Pizza Corner",
    image: "/italian-pizza-restaurant.png",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: "0.4 HBAR",
    cuisine: "Italian",
    distance: "0.5 km",
    isPartner: false,
    discount: "Free Delivery"
  },
  {
    id: 4,
    name: "Taco Fiesta",
    image: "/mexican-taco-restaurant.png",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: "0.6 HBAR",
    cuisine: "Mexican",
    distance: "1.5 km",
    isPartner: true,
    discount: null
  },
  {
    id: 5,
    name: "Green Bowl",
    image: "/healthy-salad-restaurant.png",
    rating: 4.9,
    deliveryTime: "15-25 min",
    deliveryFee: "0.2 HBAR",
    cuisine: "Healthy",
    distance: "0.3 km",
    isPartner: true,
    discount: "15% OFF"
  },
  {
    id: 6,
    name: "Spice Garden",
    image: "/indian-curry-restaurant.png",
    rating: 4.4,
    deliveryTime: "35-45 min",
    deliveryFee: "0.7 HBAR",
    cuisine: "Indian",
    distance: "2.1 km",
    isPartner: false,
    discount: null
  }
]

const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Fast Food", icon: "🍔" },
  { name: "Asian", icon: "🍜" },
  { name: "Italian", icon: "🍕" },
  { name: "Mexican", icon: "🌮" },
  { name: "Healthy", icon: "🥗" },
  { name: "Indian", icon: "🍛" }
]

export default function CustomerDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showWalletModal, setShowWalletModal] = useState(false)
  const { isConnected, walletAddress, balance } = useWallet()

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesCategory = selectedCategory === "All" || restaurant.cuisine === selectedCategory
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Wallet Status */}
              {isConnected ? (
                <div className="hidden sm:flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    {balance} HBAR
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowWalletModal(true)}
                  className="hidden sm:flex border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
              
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Link href="/customer/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground">
                Discover amazing food from Web3-powered restaurants
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center space-x-6 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  127
                </div>
                <div className="text-xs text-muted-foreground">FORK Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  23
                </div>
                <div className="text-xs text-muted-foreground">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  4.9
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Rewards Banner */}
          <Card className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Gift className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Earn 2x FORK Tokens Today!</h3>
                    <p className="text-white/90 text-sm">Order from partner restaurants and double your rewards</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="bg-white text-purple-600 hover:bg-gray-100">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background border-border/50 focus:border-purple-300 dark:focus:border-purple-700"
              />
            </div>
            <Button variant="outline" size="lg" className="h-12 px-6">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={`whitespace-nowrap ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "hover:bg-purple-50 dark:hover:bg-purple-950/30"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.id} href={`/customer/restaurant/${restaurant.id}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-0 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/10">
                <div className="relative">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {restaurant.isPartner && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
                        <Award className="w-3 h-3 mr-1" />
                        Partner
                      </Badge>
                    )}
                    {restaurant.discount && (
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800">
                        {restaurant.discount}
                      </Badge>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 h-8 w-8"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-purple-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3">{restaurant.cuisine}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                    <div className="font-medium text-purple-600 dark:text-purple-400">
                      {restaurant.deliveryFee}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/customer/orders">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Track Orders</h3>
                <p className="text-muted-foreground text-sm">View your order history and track deliveries</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/web3/nft-proofs">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">NFT Collection</h3>
                <p className="text-muted-foreground text-sm">View your delivery proof NFTs</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/web3/reputation">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Reputation Score</h3>
                <p className="text-muted-foreground text-sm">Build your on-chain reputation</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </div>
  )
}
