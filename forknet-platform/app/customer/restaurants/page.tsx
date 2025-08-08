"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, MapPin, Clock, Star, Heart, ArrowLeft, SlidersHorizontal } from 'lucide-react'
import Link from "next/link"
import { demoRestaurants } from "@/lib/demo-data"

const cuisineTypes = ["All", "American", "Italian", "Asian", "Mexican", "Indian", "Healthy", "Fast Food"]
const sortOptions = ["Recommended", "Rating", "Delivery Time", "Distance", "Price"]

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [sortBy, setSortBy] = useState("Recommended")
  const [showFilters, setShowFilters] = useState(false)
  const [restaurants] = useState(demoRestaurants)

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCuisine = selectedCuisine === "All" || restaurant.cuisine === selectedCuisine
    return matchesSearch && matchesCuisine
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/customer/dashboard" className="text-[#4A5568] hover:text-[#1A1D29]">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-[#1A1D29]">Restaurants</h1>
                <p className="text-[#4A5568] text-sm">{filteredRestaurants.length} restaurants available</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-200"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#718096]" />
            <Input
              placeholder="Search restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-[#822DFF] focus:ring-[#822DFF]"
            />
          </div>

          {/* Cuisine Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {cuisineTypes.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCuisine(cuisine)}
                className={
                  selectedCuisine === cuisine
                    ? "bg-[#822DFF] hover:bg-[#6B21A8] text-white whitespace-nowrap"
                    : "border-gray-200 text-[#4A5568] hover:border-[#822DFF] whitespace-nowrap"
                }
              >
                {cuisine}
              </Button>
            ))}
          </div>

          {/* Advanced Filters (Collapsible) */}
          {showFilters && (
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1D29] mb-2 block">Sort By</label>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-md text-[#1A1D29] focus:border-[#822DFF] focus:ring-1 focus:ring-[#822DFF]"
                    >
                      {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1D29] mb-2 block">Delivery Time</label>
                    <select className="w-full p-2 border border-gray-200 rounded-md text-[#1A1D29] focus:border-[#822DFF] focus:ring-1 focus:ring-[#822DFF]">
                      <option>Any time</option>
                      <option>Under 30 mins</option>
                      <option>Under 45 mins</option>
                      <option>Under 60 mins</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1D29] mb-2 block">Price Range</label>
                    <select className="w-full p-2 border border-gray-200 rounded-md text-[#1A1D29] focus:border-[#822DFF] focus:ring-1 focus:ring-[#822DFF]">
                      <option>Any price</option>
                      <option>$ (Under $15)</option>
                      <option>$$ ($15-30)</option>
                      <option>$$$ ($30+)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Restaurant Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.id} href={`/customer/restaurant/${restaurant.id}`}>
              <Card className="bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        // Handle favorite toggle
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    
                    {/* Badges */}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {restaurant.deliveryTime <= 25 && (
                        <Badge className="bg-[#2ED573] text-white">
                          Fast Delivery
                        </Badge>
                      )}
                      {restaurant.rating >= 4.5 && (
                        <Badge className="bg-[#FFA726] text-white">
                          Top Rated
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-[#1A1D29] text-lg group-hover:text-[#822DFF] transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-[#FFA726] fill-current" />
                        <span className="text-[#1A1D29] font-medium ml-1">{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-[#4A5568] text-sm mb-3">{restaurant.cuisine}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-[#718096]">
                        <Clock className="h-4 w-4 mr-1" />
                        {restaurant.deliveryTime} mins
                      </div>
                      <div className="text-[#718096]">
                        ${restaurant.deliveryFee} delivery
                      </div>
                    </div>
                    
                    {restaurant.minimumOrder && (
                      <div className="mt-2 text-xs text-[#718096]">
                        Min. order: ${restaurant.minimumOrder}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-[#718096]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1D29] mb-2">No restaurants found</h3>
            <p className="text-[#4A5568] mb-4">
              Try adjusting your search or filters to find more restaurants.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("")
                setSelectedCuisine("All")
              }}
              className="bg-[#822DFF] hover:bg-[#6B21A8] text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
